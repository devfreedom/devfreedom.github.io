---
title: "[개발 일기] 백엔드 멘토링 세션 - TypeScript + Prisma + MySQL"
date: 2024-02-01T19:12
thumb: "backend.jpg"
tags: 
    - ❮개발 일기❯
    - 백엔드
    
---

TypeScript와 Prisma ORM 기반으로 백엔드를 개발하는 과정에서 현직자 멘토께서 조언해주신 내용을 정리해봤습니다.

---

# 브레인스토밍

Q. 웹앱용 백엔드 서버와 AI 처리용 백엔드 서버를 어떻게 구성하면 좋을까요?

A. 다음 의견을 참고하세요.
- React는 빌드가 완료된 정적 파일을 Nginx를 통해서 루트(/)로 향하게 서비스를 하면 될 것 같습니다.
- MySQL은 Docker로 돌려서 사용하시면 관리하기 편하실거예요.
- 백엔드는 AI용 Flask 서버와 웹앱용 Node 서버 둘 다 pm2로 구동하면 될 것 같습니다. 아니면 dockerize해서 컨테이너 상에서 돌려도 괜찮고요.
- AI용 Flask 서버에 nVidia CUDA 가속을 활용하시려면 nVidia 드라이버와 nVidia CUDA Container Toolkit 도커를 설치하시고 나서, 도커로 서버 실행시 GPU 사용 옵션을 켜주세요.

---

# 구현

## Prisma ORM 관련

### 쿼리 모듈화하기
```
...
    // Prisma는 이런식으로 쿼리를 사용하는데,
    const comments = await prisma.comment.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { authorId: userId },
        orderBy: { createdAt: 'desc' },
    });

    // 예를 들어 pagination 과정이 반복되는 경우 이를 별개의 함수로 분리해서 사용해도 무방합니다.
    const { totalItem, totalPage } = await calculatePageInfo(limit, {
        authorId: userId,
    });

    const pageinfo = { totalItem, totalPage, currentPage: page, limit };

    return {
        data: diaries,
        pageInfo,
    };
...
```

### Q. prisma에서 쿼리를 사용하고 disconnect를 해줘야 하나요? finally로 잡아주는게 좋을까요 아니면 TypeScript의 using 키워드를 사용해야 할까요?

A. DB에서도 최대 세션 수 제한이 있기 때문에, 쿼리 세션을 닫아주지 않으면 문제가 생길 수 있습니다. 
- 다만 매번 disconnect를 하게 되면 추가적인 부하가 발생하기 때문에 성능이 저하될 수 있습니다.
- GET 요청같은거를 지속적으로 넣는 테스트를 수행하면서, MySQL에서 `show full processlists;`를 사용해 대기열이 계속 늘어나고 있는지 확인해보세요.
    - 만약 프로세스 대기열이 계속 늘어나지 않고 알아서 잘 정리가 된다면 굳이 disconnect 처리를 해주지 않아도 되겠네요.
- `EXPLAIN SELECT query` 명령문을 사용해서 쿼리 자체의 성능이 느린것인지 체크를 해볼 필요도 있습니다.


### Q. 만약 DTO validation 과정에서 여러개의 constraint가 걸려서 ValidationError가 여러개 발생할 때, 그 내용을 어떻게 취합해서 확인하거나 전달하는게 좋을까요?

A. 예를 들면 이런 코드로써 ValidationError의 상세정보를 잡아내고 있다고 할 때,

```
const errors = await validate(input);
if(errors.length > 0){
    console.log(errors[0].property?)
    console.log(errors[0].constraints?)
}
```

map() 함수를 돌려서 각 에러당 `${property}가 ${constraint}를 위반합니다`라는 메세지 정도로 출력해서 디버깅을 하거나 아니면 필요에 따라 프론트엔드로 넘겨주거나 등등 하면 될 것 같네요.


## 데이터베이스 관련

### Q. DTO를 왜 사용하나요?

- 비즈니스 로직과는 별개로 데이터만 분리해서 계층간에 통신시키기 위함입니다.
- 유저 사이드의 view에서 요청되는 정보와, 테이블과 매핑된 entity가 다른 경우를 예로 들어 봅시다. 저장된 데이터는 JSON 형식인데, 유저에게는 JSON 문법을 제외한 실제 내용만 텍스트로 제공을 해야 하는 경우입니다. 
    - 만약 DTO가 없다면, 필요 없거나 민감한 데이터들을 제외시키고 유저가 사용할 데이터만 적절하게 선별, 처리 및 변환을 해서 넘겨주는 별도의 로직이 필요하게 됩니다. 
        - 여기서는 JSON serialization 로직이 필요하고 그 과정이 entity 사이드에서 처리가 되어야 하는데 이는 코드의 복잡도를 불필요하게 증가시킵니다.
    - 만약 DTO가 있다면, DTO는 JSON 형식의 데이터 중에서 정확히 어떤 내용만이 유저에게 보내져야 하는지를 규정해줄 수 있습니다.
        - 또한 송수신되는 일회성 데이터를 entity의 라이프사이클과 별개로 관리할 수 있게 됩니다.
- request가 아닌 response의 DTO에는 굳이 validation 로직이 필요하지는 않을 것 같습니다. 있으면 좋지만 만약 오류가 발생하거나 코드가 복잡해진다면 제거해도 무난할 듯 합니다.
- DTO에서 제외할 데이터의 경우 class 안에서가 아니라 class 위에서 @Exclude로 미리 제외를 해주면 확실합니다.
    ```
    import { Exclude } from 'class-transformer';

    @Exclude 
        // 제외할 데이터

    export class testDTO {
        @isDate()
        createdDate: Date;
    }
    ```

### 3계층 구조 관련

- Controller / Service / Data Access 각 레이어의 역할을 충분히 분리해야 합니다.
- 비즈니스 로직의 대부분은 Service layer에서 구축하는 것이 좋습니다.
    - 다만 service끼리 서로 호출을 하는 구조는 좋지 않습니다.
        - A라는 service가 B라는 service를 호출하고, B도 A를 호출하는 '순환 구조'는 반드시 피해야 합니다.
        - 한 service가 다른 service를 일방적으로 호출하는 단방향 dependency 역시 가급적 지양하는 것이 좋습니다.
    - 특정 entity는 특정 service가 전담하도록 설계하고, 만약 여러 다른 service끼리 연동되어야 하는 작업에는 그때 controller가 중개해주는 방식이 좋습니다.
- Controller 레이어는 내부적으로 다음과 같이 세분화해서 구현할 수도 있습니다.
    - HTTP 응답/요청 경로만을 교통정리하는 'Router 로직'
    - router를 통해 특정 경로로 들어온 요청에 맞는 실질적인 작업을, 비즈니스 로직이 미리 구현되어 있는 service를 가져와서 수행하는 'Controller 로직'

## Flask 서버 관련

Flask 서버의 구조를 어떻게 잡아주면 좋을지 간단하게 살펴봅시다. 

이 서버의 목적은 웹앱 백엔드 서버가 요청과 함께 전달해준 데이터를 머신러닝 모델에 돌려 그 결과값을 응답으로 보내주기만 하면 되는 AI 전용 API 서버이므로, 유저 프론트엔드에 필요한 template 또는 view는 다루지 않겠습니다.

1. 우선은 `/config.py` 파일로 설정값들을 저장해줍니다.
    ```
    import os

    basedir = os.path.abspath(os.path.dirname(__file__))

    class Config:
        SECRET_KEY = os.environ.get('SECRET_KEY')

        # 만약 별도의 데이터베이스를 사용하는 경우라면 DB URI도 지정해주어야 합니다. 
        # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')
    ``` 

2. Flask 앱 인스턴스를 만들어주는 application factory를 `/app/__init__.py` 파일에 만들어줍니다.
    ```
    from flask import Flask
    import config

    # application factory 코드를 작성해줍니다.
    def create_app():
        app = Flask(__name__)
        app.config.from_object(config)

        # 만약 Flask extension이 있다면 여기에 입력을 해줍니다.

        # 앱에서 사용할 blueprint를 등록해줍니다. blueprint는 다음 단계에서 정의해줄 예정입니다.
        from app.main import bp as main_bp
        app.register_blueprint(main_bp)

        from app.classify import bp as classify_bp
        app.register_blueprint(classify_bp)

        # 잘 작동되고 있는지 테스트하는 경로와 페이지입니다.
        @app.route('/test/')
        def test_page():
            return '<h1>Testing the Flask Application Factory Pattern</h1>'

        return app
    ```

3. 특정 기능을 담당하는 요소들을 하나의 '모듈'처럼 묶어서, 경로와 연동해 패턴화시켜 사용하는 blueprint를 만들어줍니다. 여기서는 'main'이라는 이름의 블루프린트를 `/app/main/__init__.py` 파일에 만들겠습니다.
    ```
    from flask import Blueprint

    bp = Blueprint('main', __name__, url_prefix='/')

    # 이렇게 해주면 create_app()에서 blueprint와 함께 routes도 함께 등록됩니다.
    from app.main import routes
    ```

4. main이라는 blueprint를 사용할 경로를 라우팅하는 컨트롤러를 `/app/main/routes.py` 파일에다가 만들어줍니다.
    ```
    from app.main import bp

    # 주요 기능이므로 서버의 기본 경로, 즉 루트로 라우팅하도록 하겠습니다.
    @bp.route('/')
        def index():
        # 테스트를 위해서 HTML 출력값을 반환해봅시다.
        return '<p>This is The Main Blueprint</p>'
    ```

5. 이제 이러한 구조를 활용해서 각 API 엔드포인트마다 블루프린트와 컨트롤러를 만들어주면 됩니다.
    - 전체 디렉토리 및 파일 구조
        ```
        /
        ├ /app
        │  ├ /main
        │  │  ├ __init__.py        # main 블루프린트
        │  │  └ routes.py          # main 컨트롤러
        │  ├ /classify
        │  │  ├ __init__.py        # classify 블루프린트
        │  │  └ routes.py          # classify 컨트롤러
        │  └ __init__.py           # app factory
        └ config.py                # 설정값
        ```
    - `/classify/__init__.py` 파일
        ```
        from flask import Blueprint

        from transformers import BertForSequenceClassification, pipeline
        from kobert_tokenizer import KoBERTTokenizer

        # classify 블루프린트를 만들어줍니다.
        bp = Blueprint('classify', __name__, url_prefix='/')

        # 이렇게 해주면 create_app()에서 blueprint와 함께 routes도 함께 등록됩니다.
        from app.classify import routes

        # 모델이 저장되어 있는 경로를 지정합니다.
        model_path = "/test/ml/checkpoint-1234"

        # 경로로부터 모델을 불러옵니다.
        model = BertForSequenceClassification.from_pretrained(model_path)

        tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
        tokenizer.model_max_length = model.config.max_position_embeddings

        # Transformers의 pipeline 메소드를 사용해 추론합니다.
        classifier = pipeline('text-classification', model=model, tokenizer=tokenizer)

        # 입력된 문장으로부터 머신러닝 모델이 파악/분류한 감정을 반환합니다.
        def classify_sentiment(sentence):
            result = classifier(sentence)
            sentiment = result[0]['label']
            return sentiment
        ```
    - `/classify/routes.py` 파일
        ```
        import requests
        from flask import Blueprint, request, jsonify

        # /classify라는 endpoint로 요청이 들어옵니다.
        @bp.route('/classify', methods=['POST'])
        def classify():
            try:
                # 요청받은 데이터는 Flask의 request 라이브러리를 통해 확인할 수 있습니다.
                # JSON 형식의 데이터를 data라는 변수에 저장합니다.
                data = request.json

                # 그 중에서 감정을 분석하고 분류할 실제 '문장'만 sentence라는 변수에 저장합니다.
                sentence = data.get('text')

                # 머신러닝 모델에다가 문장을 투입하고, 그 문장의 감정을 분류해낸 결과값을 result라는 변수에 저장합니다.
                result = classify_sentiment(sentence)

                # 결과값을 JSON 형식으로 바꾸어줍니다.
                result_json = {'sentiment': result}

                # JSON 형식의 결과값을 웹앱 백엔드 서버에 응답으로써 보내줍니다.
                respond_to_node_server(result_json)

                return jsonify(result_json)
            except Exception as err:
                return jsonify({'Error': str(err)})

        def respond_to_node_server(result_json):
            # 웹앱 백엔드 서버의 URL을 지정합니다.
            node_url = 'http://test:5001/api/classify'

            # requests 라이브러리를 사용해서 외부 서버로 HTTP 요청을 보냅니다.
            # 결과값을 POST 메소드로 웹앱 백엔드 서버에 전송합니다.
            response = requests.post(node_url, json=result_json)

            # HTTP 응답을 확인합니다.
            if response.status_code == 200:
                print('The result has been sent to Node.js server successfully.')
            else:
                print('An error has occured while sending the result to Node.js server.')
        ```

## 배포 관련

### 도커 기반으로 서비스 배포하기

개발한 서비스를 dockerize해서 컨테이너 기반으로 배포할수도 있습니다.

Dockerfile이 어떻게 구성되어 있는지 예시를 살펴봅시다.

```
# 빌드를 하기 위한 도커입니다.
# 먼저 node의 LTS 버전 이미지를 받아와서 builder라는 이름을 지정합니다.
FROM node:lts as builder

# 컨테이너 내부의 working directory를 지정해줍니다.
# 오류를 방지하기 위해 모든 경로는 절대경로를 사용해주는 것이 좋습니다.
WORKDIR /usr/src/app

# 소스 코드의 모든 파일을 복사해옵니다.
COPY . .

# 각종 라이브러리들을 설치해줍니다.
RUN ['/usr/local/bin/npm', 'install', '--legacy-peer-deps']
RUN ['/usr/local/bin/npm', 'run', 'build:prod']

# ------------------------------------------------------------

# 구동을 하기 위한 도커입니다. 빌드와 동일한 버전의 node를 사용합니다.
FROM node:lts

# 구동이 될 소스 코드의 경로입니다.
WORKDIR /app

# 빌드가 끝난 파일들을 구동하기 위해서 복사해옵니다.
COPY --from=builder /usr/src/app/.env.production .env

# 프론트엔드 서비스의 경우 빌드가 끝난 static 파일이 저장된 dist 디렉토리를 사용하게 됩니다.
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/package-lock.json .
COPY --from=builder /usr/src/app/data/* /data/

RUN npm ci --only=production --ignore-scripts --legacy-peer-does
RUN npm rebuild

EXPOSE 3000

# 명령어를 실행시킵니다.
CMD ['npm', 'run', 'start:prod]

# ------------------------------------------------------------

# 프록시 서버인 Nginx 역시 포함시켜줄 수 있습니다.
FROM nginx:latest

# 설정값 파일들을 복사해옵니다.
COPY nginx/nginx.conf /etc/nginx
COPY nginx/default.conf /etc/nginx/sites-available/default
RUN ln -s /etc/nginx/sites-available /etc/nginx/sites-enabled

WORKDIR /app
COPY --from-builder /usr/src/app/build /app/build

# 명령어를 실행시킵니다.
CMD ['nginx', '-g', 'daemon off;']
...
```

프론트엔드, 백엔드, AI 서비스는 다음과 같은 환경으로 배포가 가능하겠죠?

- 프론트엔드 Dockerfile
    ```
    # Node로 React 프로젝트를 빌드합니다.
    FROM node:lts as builder
    WORKDIR /usr/src/app
    COPY package*.json ./
    RUN yarn install
    COPY . .
    RUN yarn build

    # Nginx로 빌드된 React 앱을 서빙합니다.
    FROM nginx:latest
    COPY nginx/nginx.conf /etc/nginx
    WORKDIR /app
    COPY --from=builder /usr/src/app/build ./build
    CMD ["nginx", "-g", "daemon off;"]
    ```
- 웹앱 백엔드 서버 Dockerfile
    ```
    FROM node:lts as builder
    WORKDIR /usr/src/app
    COPY . .
    RUN ["/usr/local/bin/npm", "install"]
    RUN ["/usr/local/bin/npm", "run", "build"]
    RUN ["/usr/local/bin/npx", "prisma", "generate"]

    FROM node:alpine
    WORKDIR /app
    COPY --from=builder /usr/src/app/dist ./dist
    COPY --from=builder /usr/src/app/package*.json .
    COPY --from=builder /usr/src/app/.env .
    COPY --from=builder /usr/src/app/prisma ./prisma

    RUN npm install 
    RUN npx prisma generate

    EXPOSE 5001

    CMD ["npm", "run", "server"] 
    ```
- AI 백엔드 서버 Dockerfile
    ```
    FROM python:3.8/slim
    RUN apt update && apt install -y git
    RUN pip install --upgrade pip
    WORKDIR /app
    COPY . .
    RUN pip install -r requirements.txt

    ENV FLASK_APP __init__.py
    EXPOSE 5000

    CMD ['python', '-m', 'flask', 'run', '--host=0.0.0.0']
    ```
- 컨테이너 통합 구동을 위한 Docker-compose.yml
    ```
    version: "3.8"

    services:
        frontend:
            image: frontend-image:1.00
            ports:
                - "3000:80"
            environment:
                - REACT_APP_BASE_URL=https://test.test/api

        backend:
            image: backend-image:1.00
            env_file:
                - ./backend/.env
            ports:
                - "5001:5001"
            environment:
                - name=value

        flask:
            image: flask
            ports:
                - "5000:5000"
            command: python app.py

        nginx:
            image: nginx:latest
            ports:
                - "80:80"
            volumes:
                - ./nginx-config:/etc/nginx/conf.d
            depends_on:
                - frontend
                - backend

    volumes:
        db_data:
    
    ```
- Nginx.conf
    ```
    # ...

    server {
        listen 80 default_server;
        listen [::]:80 default_server;

        server_name _;

        # 이미 빌드가 완료된, static한 React 프론트엔드 파일들을 루트 경로에서 서빙합니다.
        # 정적 파일만 받아오면 되는 경우이므로 굳이 HTTPS를 적용하지 않아도 됩니다.
        location / {
            root /frontend/build;
            index index.html index.htm index.nginx-debian.html;
            try_files $uri $uri/ =404;
        }

        # 백엔드 서버를 프록시로 구동합니다.
        location /api {
            proxy_pass http://localhost:5001;
        }

    #   location = /openapi.json {
    #       rewrite ^ /python/openapi.json permanent;
    #       rewrite "/python/api/gpt(/.*)$ /api/gpt$1 break;
    #       proxy_set_header Host $host;
    #       proxy_set_header X-Real-IP $remote_addr;
    #       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #       try_files $uri $uri/ =404;
    #   }
    }

    #...
    ```

---

# 기타 조언
- Node.js 관련
    - 프론트엔드와 백엔드간에 통신하는 API 라우팅 경로는 별도의 prefix로 subpath를 사용해주면 다른 경로(예를 들면 프론트엔드의 React 페이지 경로)들과 구분하기도 쉽고 직관적입니다.
        - 'api'라는 prefix를 사용한다고 가정해봅시다. Express에서 다음과 같이 라우팅을 해주면 되겠네요.
            ```
            app.use('/api/users', userAuthRouter);
            app.use('/api/comments', commentRouter);
            ```
    - Node.js에서 부하테스트를 할 때는 Artillery, k6, Autocannon 등을 활용할 수 있습니다.
    - response 에러의 type과 status들을 미리 정의하고 문서화해서, 백엔드와 프론트엔드가 직관적으로 오류를 동일하게 파악할 수 있도록 하는 것이 좋습니다.
- SQL/ORM 관련
    - POST, PUT, DELETE 메소드에서 DB 작업을 할 때 여러 쿼리들을 transaction 단위로 묶어주면 쿼리의 일부가 실패하더라도 무결성을 보장할 수 있습니다.
    - SQL 쿼리에서 만약에 LIKE 연산자를 사용해서 검색을 구현할 경우에, LIKE 대신 MySQL에 full-text search function이라는걸 사용하면 인덱싱 개념으로 이게 훨씬 성능이 좋습니다. 
    - 반복문 안에는 쿼리를 넣지 마세요. 대신에 MANY 연산자로 한꺼번에 불러온 뒤에 for loop를 돌려야 합니다.
- 배포 관련
    - 파이썬을 도커에서 돌릴 때 이미지의 용량이 커지는 경우가 있습니다. 저장소의 용량이 부족해지면 다음 명령어로 Docker volume을 pruning 해주면 됩니다.
        - `$ sudo docker system prune -af --volumes`
    - 도커 컨테이너에 env 파일을 직접 넣어주는 대신에, Dockerfile상에서 환경변수 항목들을 import하게 할 수도 있습니다.

---

# 참고자료

- [Flask 애플리케이션 패턴 및 구조](https://www.digitalocean.com/community/tutorials/how-to-structure-a-large-flask-application-with-flask-blueprints-and-flask-sqlalchemy#creating-the-posts-blueprint-and-rendering-its-templates)