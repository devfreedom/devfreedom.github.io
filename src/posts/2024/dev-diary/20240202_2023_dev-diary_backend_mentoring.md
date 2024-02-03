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

## 데이터베이스 관련

### DTO를 왜 사용하나요?

- 비즈니스 로직과는 별개로 데이터만 분리해서 계층간에 통신시키기 위함입니다.
- 유저 사이드의 view에서 요청되는 정보와, 테이블과 매핑된 entity가 다른 경우를 예로 들어 봅시다. 저장된 데이터는 JSON 형식인데, 유저에게는 JSON 문법을 제외한 실제 내용만 텍스트로 제공을 해야 하는 경우입니다. 
    - 만약 DTO가 없다면, 필요 없거나 민감한 데이터들을 제외시키고 유저가 사용할 데이터만 적절하게 선별, 처리 및 변환을 해서 넘겨주는 별도의 로직이 필요하게 됩니다. 
        - 여기서는 JSON serialization 로직이 필요하고 그 과정이 entity 사이드에서 처리가 되어야 하는데 이는 코드의 복잡도를 불필요하게 증가시킵니다.
    - 만약 DTO가 있다면, DTO는 JSON 형식의 데이터 중에서 정확히 어떤 내용만이 유저에게 보내져야 하는지를 규정해줄 수 있습니다.
        - 또한 송수신되는 일회성 데이터를 entity의 라이프사이클과 별개로 관리할 수 있게 됩니다.

- response의 DTO에는 굳이 validation 로직이 필요하지는 않을 것 같습니다. 있으면 좋지만 만약 오류가 발생하거나 코드가 복잡해진다면 제거해도 무난할 듯 합니다.

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

    EXPOSE 5000

    CMD ['python', '-m', 'flask', 'run', '--host=0.0.0.0']
    ```
- 컨테이너 자동화를 위한 Docker-compose.yml
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
- AI 백엔드 서버 Nginx.conf
    ```
    listen 80 default_server;
    listen [::]:80 default_server;
    root /test/front/build/

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }

    location = /openapi.json {
        rewrite ^ /python/openapi.json permanent;
    }

    location /api {
        rewrite "/python/api/gpt(/.*)$ /api/gpt$1 break;
        proxy_pass http://localhost:8777;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    ...
    ```

---

# 기타 조언

- 프론트엔드와 백엔드간에 통신하는 API 라우팅 경로는 별도의 prefix로 subpath를 사용해주면 다른 경로(예를 들면 프론트엔드의 React 페이지 경로)들과 구분하기도 쉽고 직관적입니다.
    - 'api'라는 prefix를 사용한다고 가정해봅시다. Express에서 다음과 같이 라우팅을 해주면 되겠네요.
        ```
        app.use('/api/users', userAuthRouter);
        app.use('/api/comments', commentRouter);
        ```
- Node.js에서 부하테스트를 할 때는 Artillery, k6, Autocannon 등을 활용할 수 있습니다.
- response 에러의 type과 status들을 미리 정의하고 문서화해서, 백엔드와 프론트엔드가 직관적으로 오류를 동일하게 파악할 수 있도록 하는 것이 좋습니다.
- 파이썬을 도커에서 돌릴 때 이미지의 용량이 커지는 경우가 있습니다. 저장소의 용량이 부족해지면 다음 명령어로 Docker volume을 pruning 해주면 됩니다.
    - `$ sudo docker system prune -af --volumes`