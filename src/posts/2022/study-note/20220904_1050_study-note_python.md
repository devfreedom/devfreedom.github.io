---
title: "[필기] <파이썬 입문> 강의"
date: 2022-09-04T10:50
thumb: "python-logo.png"
tags: 
    - ❮필기❯
    - 파이썬
    - 프로그래밍
---

파이썬이라고는 Coursera에서 Google IT Automation with Python 과정에 포함된 Crash Course on Python 강의 하나 들어본게 다인데, 일을 하다 보니 파이썬을 더 배워야 할 필요가 생겨서 추가적으로 강의를 듣고 공부하게 되었습니다.

급하게 적었기 때문에 내용이 압축되어 있어서 나중에 시간이 되면 한줄 한줄 쉽게 풀어서 복습을 해볼 생각입니다.

### 파이썬 특징
- 파이썬 재단이 경영하는 비영리 프로젝트
- High-level 프로그래밍 언어
- Platform-agnostic 언어
- 객체지향형, 절차형, 함수형, 명령형 multi-paradigm 언어
- 소스코드를 중간언어로 변환 후 바로 실행하는 인터프리터 언어 
- 실행시간에 자료형을 검사하는 dynamically-typed 대화형 언어
- 파이썬 2.x에서  3.x으로 넘어가면서 호환성 상실, Py2의 라이브러리가 더 풍부함
    - 2.7 버전이 마지막 Py2 브랜치
- Class/functional abstraction을 제공하는 객체지향 언어이자 함수형 프로그래밍 언어
- Coroutine을 지원
    - 함수에 진입하는 지점, 그리고 종료되는 지점이 설정 가능한 subroutine 함수
    - 함수에 진입하는 지점을 여러개 가질 수 있는 coroutine 함수 (subroutine도 여기에 포함됨)
    - Productive 'dynamic language'
    
### 파이썬 종류
- Cpython
    - C언어로 구현된 오리지널 파이썬
    - 다른 구현체와 구분하여 언급할 때 이 용어를 사용
    - IronPython: 닷넷용 인터프리터
    - Stackless Python: C스택을 없앤 인터프리터
    - Jython: 자바로 구현해 JVM 위에서 돌아가는 인터프리터
    - PyPy: 파이썬으로 구현한 파이썬 인터프리터

### 파이썬 장점
- 코드의 단순성과 표준성
    - 다른 객체지향 언어보다 간결한 구문
    - 서술문들은 줄로 끝나고 블록 구조는 들여쓰기로 나타냄
    - 실행 가능한 pseudocode처럼 보이는 단순한 구조
- 이식성
    - 모든 OS와 연동되고 다른 언어와도 연결되는 platform-agnostic한 언어
    - Open source
- 객체지향 언어
    - 절차지향 및 객체지향 프로그래밍을 둘 다 지원
    - C++ 및 Java에 비해 손쉬운 방법으로 객체지향 프로그래밍을 지원
    - 절차지향 언어: 주로 사용되는 프로시저/함수를 정의하고 재사용함
    - 객체지향 언어: 데이터와 기능이 결합된 하나의 객체 중심으로 프로그래밍
- 확장 가능한 라이브러리
    - 방대한 표준 라이브러리를 제공함
        - 정규 표현식, 자동 문서 생성, 유닛 테스트, 스레딩, 데이터베이스, 웹 브라우저, CGI, FTP, 전자메일, XML(-RPC), HTML, 암호화, GUI 등을 지원 
        - Python Package Index 2를 참조

### 파이썬 단점
- Global Interpretor Lock이라는 대표적인 단점
    - CPython에서는 하나의 스레드만 동작하는 것을 허용함
    - 다중 스레드의 성능이 떨어지므로 다중 프로세서를 대신 사용할 것을 권장함
    - '다중 프로세싱' 패키지를 통해 다중 스레드와 비슷하게 운용

### 파이썬 프레임워크
- 웹 개발: Django, Pyramid, Bottle, Tornado, Flask, Web2py
- GUI 개발: wxPython, tkInter, PyGtk, PyGObject, PyQt
- 수학/과학: SciPy, Pandas, iPython
- 소프트웨어 개발: Buildbot, Trac, Roundup
- SysAdmin: Ansible, Salt, Openstack

### 파이썬 문법의 특징
- 간결하고 가독성이 좋음 = 협업에 유리
- Dynamic typing and resolution of names
    - 입력한 값을 바로 출력구문으로 호출해서 사용 가능
    - data를 변환해서 사용 가능
    - 자료 입출력시 자료형을 크게 생각하지 않아도 사용 가능
    - 프로그램의 크기를 줄여주고 테스트를 쉽게 해줌
- 유니코드 지원
- 세미콜론과 역슬래시의 예외적 사용
    - 다른 유사 언어와 달리 세미콜론은 명령 끝에 붙이지 않으나, 한 줄로 여러 개의 명령을 선언할 때만 세미콜론으로 구분함
    - 들여쓰기 및 콜론으로 문장을 구분해서 사용함
    - 구문이 길어질 때 다음 줄까지 구문을 이을 경우에 역슬래시 사용
- 주석 기호로는 #를 사용
- string값은 상황에 따라 single quote, double quote, triple single/double quote 기호로 묶어서 표시함
- 파이썬의 소스코드 .py 파일은 python-specific representation 바이트코드인 .pyc 파일로 변환되고, 인터프리터는 이 바이트코드 파일을 사용함

### 파이썬의 구조
- Function: 입력과 출력을 가지는 연산 수행 단위
- Method: Object에서 호출되는 함수의 형태 – 객체에 내장되어 객체를 위해 작동함
- Object: 상태나 행위를 가지는 하나의 구조화된 집합
    - 상태는 variable, 행위는 method로 지칭함
- Module: definitions과 statements를 포함하는 하나의 파일 (.py)
- Package: 모듈들을 포함하는 하나의 디렉토리로써 한 개 이상의 모듈을 가지게 된다

### Python Virtual Machine (PVM)
- 파이썬 컴파일러는 스크립트로부터 인터프리터를 위해 경량화된 중간 코드인 '바이트코드'를 생성함
    - 이 바이트코드는 .pyc 파일에 저장되고 메모리에 옮겨짐
    - 소스코드가 바뀌지 않는 이상 바이트코드도 바뀌지 않고 기존의 것이 사용됨
- 바이트코드 파일을 통해 PVM이 실행되고, 이 PVM이 바이트코드의 명령어를 해석하고 실행함
    - CPU에 의해서 직접 low-level execution이 가능한 C 및 C++에 비해서 속도가 느림

### 파이썬 내장 함수
- 선언할 필요 없이 global하게 사용할 수 있는 함수들
    - e.g. dir() 함수를 사용해 내장함수와 선언된 변수들을 확인할 수 있음

### 식별자
- 고유하게 구별 및 식별이 필요한 것에 사용하는 유니코드 형식의 이름
    - 변수, 자료형, 서브루틴 등을 가리키는 토큰
    - 처리해야 할 정보를 가리킬 방법으로 사용
- 영문자 A-Z, a-z, _로 시작함
    - 단일 underscore로 시작하는 식별자는 private라는 의미
    - 두개의 underscore로 시작하는 식별자는 strong private라는 의미
    - 두개의 underscore로 끝나는 식별자는 언어에 의해 정의된 특별한 이름을 의미
- 문장부호, 특수문자는 사용하지 않음
- 대소문자를 구분함

### 키워드
- 파이썬에서 미리 사용하기 위해 예약해둔 단어를 의미
    - 상수, 변수, 다른 식별자로 사용할 수 없음
    - 파이썬 버전이 바뀔때마다 추가 및 제외되므로 확인이 필요함
- import keyword | keyworld.kwlist로 그 목록을 확인 가능함
- e.g. False, None, True, and, as, assert, break, etc…

### 변수
- 값을 저장할 수 있는 메모리상의 가상 공간을 의미
- 숫자 값, 문자열 값, 클래스 객체를 나타탬
- 빈 공간인 변수에다가 상수(값)을 지정(mapping)하여 시스템 메모리에 저장함
- 상수(literal constant)는 변경할 수 있지만 변수 이름은 그대로 유지됨
- 특정 데이터 형식(=할당 메모리 양)과 레이블을 사용하여 선언함
    - `fruit_bucket = 'Apple'`
        - 변수 fruit_bucket에 상수 Apple을 할당함
        - fruit_bucket은 문자열을 할당받았으므로 '문자열 변수'가 됨 
- 여러가지 변수를 한번에 할당하는 방법에는 여러가지가 있음
    - e.g. `A = B = C = 100`
        - 이 경우 변수 A, B, C에 모두 상수 100이 할당됨
    - e.g. `A, B, C = 12, 3.141, "Apple"`
        - 이 경우 A에는 12가, B에는 3.141이, C에는 Apple이 할당됨

### 자료형
- 데이터의 자료가 가질 수 있는 값이자 구조로, 그 자료에 적용할 수 있는 연산을 결정하기도 함
- 파이썬의 모든 값은 데이터를 가지고 있고 이는 모두 객체임
- 데이터의 유형은 실제로 class이며, 변수는 이 클래스의 instance가 됨
- type() 함수를 통해 이 자료형을 확인할 수 있음 
- Numbers: 수치를 관리하는 자료형
    - 접두어를 사용하면 진수를 사용할 수도 있음
        - Binary(0b/0B), Octal(0o,0O), Hexadecimal(0x/0X)
            - e.g. 16진법 0xFB = 10진법 251
            - e.g. 2진법 0b1101011 = 10진법 107
    - Integer(Boolean 포함): 정수, 양수, 음수
    - Float: 실수와 지수형
    - Complex: 복소수 (실수+허수를 입력하게 되면 complex형으로 처리)
- None
- Sequences
    - Strings: 문자열의 집합
        - Single quote를 사용해 문자열 상수를 지정
            - e.g. `'Hello World!'`
        - 문자열 내부에 single quote가 포함된 경우 double quote를 사용
            - e.g. `message = "It is called 'apple', according to him."`
        - 문자열 내부에 double quote가 포함된 경우 single quote를 사용
            - e.g. `message = 'he said "Hello World" to her.`
        - Triple double quote의 경우 multiline string을 하나로 묶을 때 사용
            - e.g. 
                - """he showed
                - the screenshot
                - to her"""
        - `'Hello' = "Hello" = '''Hello''' = """Hello"""`
            - 다만 이 경우 출력값은 single quote를 사용한 'Hello'로 출력됨
        - Escape sequence/code
            - 제어문자 = 문자열 내부에서 영향을 받지 않고 독립적인 역할을 하는 문자열
                - \n : newline (줄바꿈)
                - \v : vertical tab
                - \t : tab
                - \r : carriage return
                - \f : formfeed
                - \a : bell
                - \b : backslash
                - \ooo : Null
                - quote 기호 앞에 escape code인 역슬래시(\)를 사용하게 되면 해당 quote 기호를 문자열로써 포함시킬 수 있음
                    - e.g. `message = 'They said \"It is called \'apple\', right?\", and he said yes.\"`
                - 8진수 확장 문자에 해당하는 ASCII 문자를 출력하는 제어문자
                    - \x로 시작되는 16진수 숫자를 통해 ASCII 문자를 출력할 수 있음
                    - \로 시작되는 8진수 숫자를 통해 ASCII 문자를 출력할 수 있음
                    - 16진수가 아니게 되는 시점에서 종료됨
                        - e.g. 알파벳 A는 10진수 기준 65임
                        - 8진수인 '\101' = 10진수 65와 동일 = A가 출력됨
                        - 16진수인 '\x41' = 10진수 65 와 동일=  A가 출력됨
                    - 이를 활용해 8진수 확장 문자를 사용해 다른 escape code도 구현 가능
                        - e.g. newline인 '\n' 대신에, n의 8진수값인 012나 16진수값인 0A에 기반해 '\012' 라던가 '\x0A'를 사용해도 \n과 동일하게 작동
    - Tuple
    - List
- Sets
- Mappings: Dictionary

### 연산자
- 대상을 두고 operand를 계산할 때 사용되는 문자(operator)
- 연산자들은 처리하는 우선순위가 정해져 있으므로 다중 연산시 우선순위를 확인할 필요가 있음
- 산술연산자
    - +, -, *, /, = 등
    - % : Remainder
    - ** : Square
    - // : Floor division
- 관계연산/비교연산자
    - 두 개의 값을 비교해 그 결과인 논리상수/boolean 상수를 반환함
        - <, >, <=, >=, != 등
- 논리연산자
    - AND, OR, NOT 등
- 비트연산자
    - Bitwise operation을 위해서 사용함
    - &, |, ~, ^, >>, << 등
- 대입연산자
    - 오른쪽에 있는 계산값을 왼쪽에 있는 변수에 대입하기 위해 사용함
    - =, +=, -=, *=, /= 등
- 기타 연산자
    - dictionary, string, list, tuple 등의 sequence에서 값을 찾을 수 있는지 여부를 확인
        - is, is not, in, not in 등

### Sequence 자료형
- 문자열, 수치 등을 관리하는 기본 자료형
- 항목을 나열하고 배열하는 형식을 취함
- 자료를 관리하기 위해 지점과 위치를 참조하는 indexing
    - 문자열은 각 한 문자씩 인덱스를 가지고 나열됨
        - 맨 처음 문자열이 0, 그 다음 문자열이 1, 그 다음 문자열이 2 …
            - e.g. "Hello World"라는 문자열의 0번 index는 맨 첫 글자인 'H'가 됨
            - index 값이 음수인 경우 앞이 아닌 뒤에서부터 카운트 됨
- 특정 구간의 자료를 반환하는 slicing 기능
    - [시작 index : 끝index] 형태로 범위를 지정해 문자열을 잘라낼 수 있음
        - e.g. "Hello World" 문자열을 [1:3]로 slicing하게 되면 'ell' 을 출력
    - 시작이나 끝 인덱스를 생략하게 되면 앞이나 뒤 끝부터 범위가 선택됨
        - e.g. "Hello World" 문자열을 [1:]로 slicing 하게 되면 'ello World'가 출력
        - e.g. "Hello World" 문자열을 [:6]로 slicing 하게 되면 'Hello W'가 출력
        - e.g. "Hello World" 문자열을 [0:-2]로 slicing 하게 되면 'Hello Wo'가 출력
- 숫자를 지정해 그 단계만큼 건너뛰면서 문자를 지정하는 step 기능 (Python 2.3 and above)
    - e.g. "Hello World" 문자열을 [::2]로 stepping 하게 되면 'HloWrd'가 출력
- 문자열을 연결하거나 반복할 수 있는 + 및 * 연산자
    - e.g. 'Hello World'*2 는 'Hello WorldHello World'를 출력 
    - e.g. "Hello World"+' !' 는 'Hello World !' 를 출력
- 문자열을 조작하고 제어하는 문자열 함수들의 예시
    - 문자열의 길이를 반환하는 len() 함수
    - 문자열을 소문자로 만드는 str.lower() 함수
    - 전체 문자열에 포함된 특정 문자열의 갯수를 카운트하는 str.count() 함수

### Tuple 자료형
- 숫자와 문자를 함께 관리하는 자료형
- 지정된 값을 변경할 수 없음
- (item0, item1, item2, …) 형태로 지정됨
    - e.g. `fruit_bucket = ('Apple', 'Orange', 'Grape')`
- nested tuple
    - 튜플이 포함된 튜플
    - e.g. `fruit_bucket2 = ((Apple, Strawberry, Orange), Grape, Lemon)`
    - 대단위로 indexing 되고 그 다음 작은 단위로 indexing 됨
        - e.g. fruit_bucket2[0][1]에서 1차 index인 [0]은 대단위 맨 첫번째 항목인 (Apple, Strawberry, Orange)가 되고, 그 다음 2차 index인 [1]은 그 안에서 두번째 항목인 Strawberry이므로, 출력값은 'Strawberry'가 됨
- string과 동일한 방식으로 slicing이 가능
- string과 동일한 방식으로 병합과 반복이 가능
    - e.g. `fruit_bucket*2 = ('Apple', 'Orange', 'Grape', 'Apple', 'Orange', 'Grape')`

### List 자료형
- sequence 중 가장 많이 사용되는 자료형
- [item0, item1, item2, …] 형태로 지정됨
- 지정된 값을 바꿀 수 있는 tuple이라고 생각하면 됨
- 리스트 안에 tuple을 포함시킬수도 있음

### Dictionary 자료형
- key:value 형태로 선언해 비정형 데이터를 매핑할 때 사용하는 자료형
- {key0 : value0, key1 : value1, key2 : value2, ...} 형태로 지정됨
- 키와 값을 pair로 반드시 함께 선언
- value는 변경이 가능하지만 key는 고유값으로써 변경 불가
- key를 호출하면 value를 반환함
- 다양한 타입을 섞어서 사용하는 것이 가능
- 대소문자를 구분함
- 정렬되지 않으므로 순서가 의미가 없음
- e.g.

```
fruit_bucket3={'Yellow' : 'Lemon', 'Green' : 'Lime', 'Red' : 'Apple'}
    # fruit_bucket3['Yellow'] 는 'Lemon'을 반환함
    # fruit_bucket3['Yellow'] = Banana 를 실행하면 기존의 Lemon이 Banana로 치환됨
```

### Set 자료형
- set() 함수를 통해 생성되며, 중복되지 않은 요소들의 모임을 가진 집합
- 집합연산을 위해 사용됨
- e.g. 

```
a = set('abcde')
b = set('cdefg')
print(a)            // 교집합이 아닌 a의 고유한 값인 set(['a', 'b'])를 출력 
print(a&b)          // a와 b의 교집합인 set(['c', 'd', 'e'])를 출력
print(a^b)          // a와 b의 합집합에서 교집합을 뺀 set(['a', 'b', 'f', 'g'])를 출력
```

### 표준 입출력
- shell을 활용해 출력하기
    - print()
        - `print(value1, sep=' ', end='\n', file=sys.stdout, flush=true/false)`
            - value: 출력될 값
            - sep: 연속적인 값을 구분해서 출력해주는 seperator 문자열
            - end: 줄바꿈 지정
            - file: 출력할 스트림 선택
            - flush: 버퍼를 유지할 것인지 삭제할 것인지 선택
        - `print("[flags][width][.precision]type" % (value))`으로 출력서식 정해서 출력하기
            - flags: % 문자열을 사용해 포매팅 시작을 알림
            - width: 출력될 value의 전체 자릿수 지정
            - precision: 소수점 자리수 지정
            - type: 출력값의 데이터형을 키워드로 지정
    - str.format()
        - 문자열 또는 출력을 포매팅
        - `str.format(*args, **kwargs)`
            - e.g. `print('Fruit bucket has {} and {}'.format('Strawberry', 'Apple'))`
        - `str.center/ljust/rjust(width, fillchar)`
        - `str.zfill(width)`
- shell을 활용해 입력하기
    - input()
        - 입력값을 사용자로부터 받음

### 정규식
- 특정 규칙을 가진 문자열의 집합을 표현하는데 사용하는 형식 언어
- 축약된 문법으로 기술된 문자열 패턴
- re모듈을 사용해 정규 표현식을 처리하고 함수/확장문법과 함께 사용
    - re모듈을 import 한 후 dir(re)를 통해 symbol들을 확인
    - re.search()
        - 첫 인자로 찾고자 하는 패턴을, 둘째 인자로 검색대상 문자열을 받아들임
        - 대상 문자열 전체 검색
    - re.match()
        - 첫 인자로 찾고자 하는 패턴을, 둘째 인자로 검색대상 문자열을 받아들임
        - 대상 문자열의 시작부터 검색
        - 키워드와 일치하는 문자열이 대상 문자열의 중간 이후에 존재하는 경우(문자열에 공백이 있는 경우 등)에는 re.match() 함수는 검색할 수 없음
    - re.compile(), re.findall(), re.sub() 등등

### 조건문
- condition의 리턴값이 true일 경우 statement 실행, false일 경우 건너뛰고 다음 statement로 이동
- if, if else, elif(else if) 등

### 반복문
- while
    - condition을 만족하는 경우 statement를 수행
    - 반복횟수를 제어하는 변수가 반드시 필요, 반복문 제어변수가 없을 경우 무한루프 발생
- for
    - 반복 수행할 횟수가 결정된 경우에 주로 사용
    - for 변수 in 순서형자료 → statement 수행
    - 딕셔너리나 리스트 등에 기반해 반복해야 하는 횟수가 결정된 형태를 제어할 때 주로 사용
- range()
    - 정수 범위에 대해서 반복을 하거나 특정 범위의 숫자를 나열하도록 해줌
    - start값, stop값, step size의 순서로 sequence 나열
        - e.g. range(0, 15, 3) 는 0, 3, 6, 9, 12를 출력
        - 시작값은 범위에 포함됨, 종료값은 포함되지 않음
        - 마지막 값에서 step size를 더했을 때 stop값을 초과하게 되는 경우 range()는 종료됨
- enumerate()
    - for문을 효율적으로 사용하기 위한 함수
    - 인덱스값과 그 값을 동시에 저장할 수 있음
    - enumerate([iteration이 가능한 타입의 객체], [시작값 (디폴트는 0)]
        - e.g. `enumerate(fruit_bucket3, 0)`

### 흐름 제어문
- break: 가장 인접한 반복 loop문을 빠져나올 때 사용함
- continue: 가장 인접한 loop문의 맨 앞에 있는 조건부로 제어를 옮겨 이를 계속 실행할것인지를 결정

### 함수
- 여러 개의 실행문을 하나로 묶은 모듈
- 특정 작업을 수행하도록 설계된 하나의 독립된 프로그램 조각
- 모듈화가 기본 개념 = 별도의 파일에 정의된 함수와 데이터
    - 모듈을 호출 및 실행하는 방식으로 사용
- 라이브러리 함수 = 표준함수/내장함수
    - 시스템에서 미리 작성해놓은 함수를 의미함
    - 삼각함수, 지수함수, 날짜함수, 파일함수, DB함수 등
    
### 사용자 정의함수
- 사용자가 직접 만든 함수
- 파이썬 언어의 함수 원형에 기반해 모듈화하여 제작하고 정의함
```
def function_name(parameter1, parameter2, ...):
    "function_docstring"    // 주석문 형태로 설명 작성
    function_suite          // 함수의 기능을 정의
    return [expression]     // 함수의 반환값을 선택적으로 지정
```
### 함수의 호출 및 리턴
- `function_name()`
- return값이 생략되어있으면 함수는 none값을 반환
- return값이 지정되어 있으면 함수에서 지정한 datatype에 맞는 값을 반환

### 매개변수와 전달인자
- Parameter: 호출된 함수가 입력을 받을 수 있는 변수의 이름 = 매개변수
    - 함수의 수행으로 생성된 local variable이라고 하더라도 global 구문을 사용해서 외부에서 접근할 수 있음
    - 인수, 기본값, 가변, 키워드 등 여러가지 형태로 대입하여 사용함
    - return 키워드 뒤에 parameter를 나열해서 지정하면 연산의 결과를 한번에 리턴할 수 있음
- Argument: parameter에 대응해 함수가 호출될 때 넘기는 변수 = 전달인자
    - 매개변수의 갯수를 지정하지 않고 유동적으로 적용하기 위해서는 가변인자를 사용하면 됨
    - *args를 함수의 매개변수로 지정하면, 함수 내에서 전달인자를 몇 개를 입력하든 tuple 형태로 인식함
    - dictionary형태로는 **kwargs를 사용
    - 가변인자는 일반인자 뒤에 위치해야 함
        - e.g. `fruit_bucket(fruit_name, *args)`
    - 가변인자는 단 하나만 사용 가능
        
### Lambda 함수
- 함수의 이름이 없는 함수 = 익명함수
- 한 줄로 표시되는 함수
- 다른 함수의 인자로 함수를 넘겨줄 때 사용함
- filter(), map(), reduce() 등의 함수와 함께 유용하게 사용
- e.g. `add = lambda x,y : x+y`
- e.g. `(lambda x,y,z : x*y-z)(1,2,3)`	
    - 이렇게 하면 연산의 결과를 바로 리턴받을 수 있음

### 고차함수
- 다른 함수를 받는 함수
- 함수를 전달인자로써 넘기며, 다른 함수의 결과값으로 반환 가능
- 데이터 대용량 분산처리에 활용
- map(), reduce(), filter() 등
    - `filter(function, list)`
        - 함수와 리스트를 parameter로 받고, 리스트의 값이 하나씩 parameter function으로 전달됨
        - 출력값을 묶어서 리스트로 리턴함
        - e.g. `print(list(filter(lambda x: x%2==0, range(10))))`
            - 조건과 일치하는 true 반환 값만 리턴함
    - `map(function, seq)`
        - 함수와 시퀀스를 parameter로 받고, 시퀀스의 값이 하나씩parameter function으로 전달됨
        - 출력값을 묶어서 리스트로 리턴함
        - e.g. `print(list(map(lambda a:a*2, [1,2,3,4])))`
            - 입력한 숫자를 배수로 리턴함
    - `reduce(function, seq)`
        - 함수와 시퀀스를 parameter로 받고, 시퀀스의 처음 두 항목을 연산함
        - 결과값이 나오면 그 다음 항목과 계속 연산해 최종적인 하나의 값을 반환함
        - e.g. `reduce(lambda x,y: x+y, range(1,11))`
            - reduce는 module object이므로 from functools import reduce 구문을 통해 모듈을 선언을 해주어야 함

### 재귀함수
- 함수가 직간접적으로 자신을 다시 호출하는 것
- 이러한 recursive call을 활용하면 코드가 간결해지고 이해가 쉬움
- 대신 연산 처리에 메모리와 성능을 많이 요구함
- quick sort, fractal curve, tower of hanoi 등의 알고리즘을 구현할 때 사용
- 종료조건이 반드시 명시되어야 함

### Scoping rule
- 함수나 클래스 등이 선언되면 변수를 사용하게 되는데, 선언된 변수를 저장하거나 namespace에 저장하고 호출할 때 namespace 영역의 우선순위에 따라 호출된다는 규칙
- Local > Global > Built-in 순서대로 호출이 되므로 LGB rule이라고도 함
- local: 함수 내부에 선언될 경우
- global: 함수 외부에 선언될 경우
- built-in: 파이썬 자체적으로 제공하는 내장 함수에 선언될 경우
```
str = "this is global"      // Global 영역
def func():                 // Local 영역
    str = "this is local"   // str은 func() 내부에서만 우선적으로 작동
print(str)                  // 이 출력값은 'this is global'이 됨
```
- 변수 호출 순서와 namespace 영역은 역순이 됨

### 객체지향 프로그래밍
- 메소드 객체 중심의 프로그래밍 방식
- interactive, interpreted
- 자바라던가 닷넷과는 달리 클래스를 포함해서 사용하는 모든 것을 객체로 다룸
- 함수, 클래스, 문자열, 데이터 타입도 객체로 다루며, 타입을 가짐
- 함수 인자값을 받을 수 있음
- 메소드와 속성을 가짐

### 클래스
- 사물이나 개념의 속성과 기능을 모델링해서 abstraction하는 과정
- class = variables + methods = 함수들과 변수들을 묶어놓은 패키지의 개념'
- member variable/field란 특정 객체와 연결되고 모든 메소드에서 접근 가능한 변수를 의미
- public member
    - 해당 클래스 밖에서도 접근 가능한 멤버 
    - 기본적으로 모든 클래스 멤버들은 public임
    - 함수들은 C++에서의 virtual 함수처럼 동적 바인딩임
    - 모든 함수의 첫 인자가 self 키워드로 선언
        - 자바에서의 this와 같이 오브젝트 멤버 접근용 shorthand가 없음
- private member
    - 관습적으로 double-underscore로 시작하는 이름은 non-public으로 취급됨
    - subclass에서 동일한 이름으로 선언된 변수처럼 private멤버가 필요한 경우, name mangling을 통해 private variable을 지원함
    - triple-doublescore로 시작하는 이름은 _className__name 형식으로 변환됨

### 객체
- 고유한 속성을 가지고 클래스에서 정의한 행위를 수행함
- 객체의 행위는 클래스에 정의된 행위에 대한 정의를 공유하여 메모리를 경제적으로 사용
- 클래스에 속하는 객체를 instance라고 함
    - instance는 정의된 클래스를 사용해서 실제로 메모리에 생성되어 로딩된 상태를 의미
    - 클래스 타입으로 선언되고 그 객체가 메모리에 할당되어 사용되는 것을 instance라고 함
    - class가 abstraction되어 실제로 구현된 결과물
        - 정의되고, 이름이 붙어서, 물리적으로 위치되는 것
- 그림판 프로그램을 예로 들면, 동그라미 세모 네모 등의 도형 그리기 도구가 미리 정의되어 있는 것이 클래스고, 그 도형 그리기 도구를 사용해 실제로 도형을 그린 그 결과물이 객체임 
- object = attributes + behaviors
- method
    - 클래스 내부에서 정의된 함수를 의미함
    - 데이터 attribute가 아닌 인스턴스의 속성이 소스코드 내에서 언급되면, 인터프리터는 우선 그 인스턴스의 클래스를 찾음
    - 그 속성이 클래스의 유효한 함수 객체라면, 인스턴스 객체와 함수 객체를 추상 객체로 packing함

### 클래스 선언
- 자료형 선언 → 객체 생성 → 멤버 호출
- e.g. Address 클래스 선언하기
```
class PersonInfo:
    name="Anderson"
    city="Seoul"
    dept="HR"
    print(PersonInfo.city)		// 'Seoul' 을 출력하게 됨
```
- 클래스 내에서 정의되는 함수는 무조건 self를 첫 번째 parameter로 사용해야 함
    - 객체 자신을 참조한다는 의미
    - self 인수는 자동적으로 객체의 참조로 채워지므로 self 인수를 넘길 필요는 없음
    - self를 통해서 클래스 내의 멤버나 메소드를 자유롭게 호출할 수 있음
- 방법
```
class class_name [(inherit_class_name)]:
    < class 변수 선언 >
    def class_function (self, parameter1, parameter2, …):
        < 수행할 명령 >
```
- e.g. 값을 받아서 저장하고 추가하는 클래스 설계하기
    - 값을 받아 저장하는 멤버를 가진 메소드 = empty()
    - 값을 받아 추가하는 메소드 = add()
    - 클래스명: Test
    - 클래스 변수: 없음
    - 메소드: empty(self, addself, x)
- e.g. 값을 받아서 저장하고 추가하는 클래스 선언하기
```
class test:
    def empty(self):
        self.data=[]
    def add(self, x):
        self.data.append(x)
```
- e.g. 인명부 클래스 만들어보기
```
class Registry:
    def PersonInfo(self, name, city, dept):
        self.name=name
        self.city=city
        self.dept=dept
```
- e.g. 인명부에 정보 기록하기
```
person01 = Registry()
person01.PersonInfo("Jackson", "NYC", "Accounting")
person02 = Registry()
person02.PersonInfo("Dominique", "Berlin", "IT")
```

### 클래스 권한
- 파이썬에서 class/instance의 모든 멤버 변수와 메소드 접근권한은 public임
- 과도한 접근권을 제한하고 정보 은닉을 위해서 name mangling 방식을 사용할 수 있음
    - 변수/함수명 앞에 언더스코어 두개를 붙이면 됨
        - __class__
            - 클래스 객체를 참조하기 위한 인스턴스 객체의 내장속성
            - 클래스 영역의 모든 인스턴스 객체의 데이터 참조 및 수정시 사용
- 파이썬은 instance → class → global 영역 순서로 namespace를 찾게 됨
    - 그래도 이름을 찾지 못하면 AttributeError가 발생함

### 클래스의 내장함수
- 모든 클래스 안에서 사용할 수 있는 특별한 메소드
- __init__ : 인스턴스가 만들어질 때 호출되는 생성자
    - 명시적 호출 불가능
    - 변수의 초기화 작업시 사용
    - 클래스 내에 생성자를 명시하면 생성자 매개변수의 개수에 따라서 파라미터가 지정됨
- __del__ : 인스턴스가 사라질 때 호출되는 소멸자
    - 파일을 닫거나 DB 연결을 종료할 때 사용
    - 전달인자 없이 선언

### 연산자 오버로딩
- operator 키워드와 연산자를 겹쳐서 함수명으로 사용하는 것
- 인스턴스 객체끼리 서로 연산을 할 수 있도록 기존 연산자의 기능을 바꾸어 중복으로 정의 
- 삼항 연산은 할 수 없음

### 상속
- 하나의 객체를 설계할 수 있는 concrete/super/parent/base class를 또다른 클래스가 기능/특성을 추가 및 변경하여 새로운 클래스로 정의하는 것
- base class가 상속을 통해 보다 더 큰 규모 또는 다른 특성의 derived class가 됨
- 클래스의 멤버 변수와 메소드는 다른 클래스에게 그대로 전달됨
- derived class가 base class의 메소드를 호출할 때는 선조클래스명 및 멤버변수로 호출 가능
- derived class는 base class의 멤버변수와 메소드를 상속받지만, 생성자는 상속받을 수 없음
- 코드의 재사용성, 간결성, 확장성이 그 목적
- `class DerivedClass (BaseClass1, BaseClass2, …):` 형식으로 상속이 가능함
    - 선조 클래스가 하나 이상인 다중상속을 지원함
        - 다중상속시 두 개 이상의 부모가 같은 메소드를 가지고 있을 경우가 있음
        - 이 경우 먼저 정의된 쪽의 메소드를 호출함
- super()는 선조클래스를 의미하며 이 경우 self 키워드는 현재 오브젝트, 후손클래스를 의미함
    - 명시적으로 후손 클래스에서 선조의 변수나 메소드를 가리킬 때 사용함
    - 후손 클래스에서 후손이 가진 값을 선조 클래스의 생성자를 호출해서 대입할 때 사용함
- overriding
    - 메소드의 재정의
    - 상속받은 후손 클래스에서 상속해준 선조 클래스에 이미 정의되어있는 메소드의 기능을 변경해서 새로 정의하는 것 
    - 오버라이드 하고자 하는 메소드가 선조 클래스에 존재해야 함
    - 선조에서 선언한 메소드가 후손에서 사용할 때 메소드 명이 반드시 같아야 함
    - 하나의 클래스에 같은 메소드를 선언하는 선조가 정의한 메소드의 파라미터 갯수가 같아야 함
        - 파이썬에서는 메소드의 리턴형이 같지 않아도 됨

### Polymorphism
- 다형성, 즉 한 요소에 여러 개념을 넣어놓는 것으로, 주로 overriding이나 overloading을 지칭
- 여러 개의 클래스가 같은 이름의 메소드에서 서로 다른 각자의 방법으로 작동할 수 있도록 설계
- 하나의 선조 객체의 변수로 여러 유형의 후손 객체를 참조할 수 있음
- 변수가 참조하는 객체 유형에 맞는 메소드를 자동으로 호출할 수 있음
- 추상화를 이용해 다양한 구현을 제공함
- 필요조건
    - 상속관계의 클래스이면서 후손 클래스 객체에서 작동
    - 후손 클래스 객체의 메소드 호출은 선조클래스 유형의 변수를 통해야 함
    - 호출된 메소드는 선조클래스 멤버여야 함
    - 선조클래스와 후손클래스에서 메소드의 원형이 같아야 함
- subclassing
    - 선조클래스의 속성과 구조를 그대로 가지는 상속 유형
    - 새로운 데이터 멤버변수와 멤버메소드를 추가하여 코드를 재사용
- subtyping
    - 상속과 선조클래스가 수행할 명령을 선언하는 상속 유형
    - 후손클래스가 상속을 받아 선조클래스의 객체를 후손클래스의 타입으로 대체하여 실행할 수 있도록 함
        - abstract class를 지원하면서 동적 타이핑의 한 종류인 duck typing을 지원함
            - duck클래스를 객체 선언하면 duck이 생성되어 호출됨

### Abstract class
- 한 개 이상의 추상 메소드를 가진 클래스
- 추상 메소드의 내용이 구현되지 않아 인스턴스로 생성 불가능
- 상속을 통해서 추상 메소드를 구현할 수 있음
- ABCMeta 클래스(메타클래스를 이용하기 위해)와 @abstractmethod() (추상메소드의 속성과 정의를 선언하기 위해)를 사용
        - `from abc import abstractmethod, ABCMeta`
- 추상클래스를 선언하고 재정의를 하면서 후손의 객체주소를 각각 생성해서 메소드를 실행
- decorator
    - @abstractmethod → 메소드를 추상메소드로 지정
    - @property → 메소드를 변수로 호출할 수 있도록 지정
    - @staticmethod → 정적 메소드로 선언
    - @classmethod → 클래스 인스턴스 메소드로 선언
    - 사용자가 직접 정의해서 타입 검사나 함수 디버깅 등에 사용함
    - Aspect-oriented programming 을 도입한 요소

### 모듈
- 코드를 담고있는 파일
- 대부분은 파이썬 코드지만 컴파일된 C 및 C++ obj 파일들도 있으며 파이썬 모듈과 동일한 방식으로 사용됨
- 폴더로 묶여 있다면 패키지를 구현해서 사용함
- 별도의 네임스페이스를 가지므로 독립적인 작업이 가능
    - 객체들을 grouping 하는 것과 마찬가지의 방식으로 이름 충돌 문제를 피할 수 있음
- 대부분의 표준 파이썬 함수들은 언어의 core상에 빌드되는 대신, 필요시에 load되는 방식으로 파이썬 자체의 관리를 수월하게 함
- 모듈 이름이 곧 파일이라는 명명 규칙에 따라 만듦
- import sys; print(sys.path)를 통해 기본 모듈 검색 경로를 확인할 수 있음
- module_name.function_name() 형식으로 모듈 내 함수 및 클래스를 사용할 수 있음
- module_name.variable = 'Hello World' 와 같은 방식으로 모듈 namespace에 변수를 정의해서 독립적으로 사용
- 모듈 내용이 폴더로 묶여있다면 패키지로 지정하여 선언
- 모듈을 가져오는 방법
    - `import module_name`
    - `from module_name import component_name`
        - 모듈 내에서 import로 지정한 컴포넌트들을 현재의 global/local namesapce로 로딩함
        - global/local namespace이므로 module_name.function_name() 대신 곧바로 function_name()으로 사용할 수 있음
        - _로 시작하는 name들은 외부에서 접근하지 못하는 내부 name인데 이 방법으로 가져올 수 있음
- 파이썬 내장 라이브러리 모듈을 적극 활용할 필요가 있음
    - help(module_name)을 통해 모듈의 documentation 확인 가능

### 수학 함수 모듈
- math: 산술 연산용
- random: 난수 발생용
- decimal: 진법 변환 에러와 관련해 정확한 결과 값을 얻도록 사용
    - 부동소수점은 실수와 실제 수학적 연산을 정확히 표현하지 못함
        - float와 다르게 decimal 모듈로 실수를 정확하게 표현할 수 있음
        - +infinity, -infinity, NaN도 표현 가능
        - 소수점 자리의 정밀도 조정 가능
        - 큰 정밀도를 필요로 하는 연산에도 사용
- `decimal.Decimal(value, context)`
    - 생성자를 통해 정수, 문자열, 튜플 등으로 값을 전달하여 생성

### datetime 모듈
- 시간을 관리하는 모듈
- 시간과 날짜를 관리하는 클래스를 포함함
    - date클래스: 숫자로 년/월/일을 입력받아서 date 객체를 생성
    - datetime 클래스: 년/월/일(필수) + 시간으로 datetime 객체를 생성
    - timedelta 클래스: 두 날짜 혹은 시간 사이의 기간을 표현함
        - 생성되는 timedelta 객체값은 생성자에 전달된 값과 다름
            - 동일한 기간을 표현하는 방식이 다양하기 때문 (1weeks/7days)
            - 입력된 값으로 정규화 과정을 거쳐 유일한 표현 방식으로 변경하기 때문
- calendar 모듈: 시간과 날짜 외에 달력을 나타내는 모듈

### 에러와 예외처리 
- 오류 발생시 실행은 정지되고 오류가 발생한 정확한 위치, 종류, 설명을 포함한 에러 메세지가 표시됨
- syntax error = parsing error
    - 문법적인 문제로 구문 오류가 발생하면 줄 번호와 위치를 통해 알려줌
- semantic error = exception
    - 프로그램 수행 중에 발생할 수 있는 에러
    - 사전에 프로그래머가 예상해서 처리할 수 있는 가벼운 에러
    - e.g. 존재하지 않는 파일을 열려고 하는경우, 네트워크 연결 오류, 연산의 결과가 크기를 초과하는 경우, 사용하려는 모듈이 존재하지 않을 경우, 인덱스가 배열의 크기를 초과하는 경우, etc. 
    - 예외처리: 이러한 에러를 실행을 멈추지 않고 적절히 대처해 처리하는 방법
        - try ~ except
        - try ~ finally
        - try ~ else
        - try ~ else ~ finally
        - try 구문에서 예외상황이 발생하면 기존에 남은 명령을 무시하고 except로 넘어감
            - except에는 예외종류와 예외변수, 표시 문구 등이 포함됨
            - 예외 상황이 발생하지 않았을 때에는 else로 넘어감
            - 예외 발생 여부와 상관없이 꼭 실행되는 구문이 finally에 포함

### user-defined exception
- exceptions class(의 서브클래스 중 하나)를 inherit/extend하여 사용자 정의 예외를 만듦
- 이 예외는 raise를 사용해 객체로 호출함
    - raise
        - 원하는 에러를 강제로 발생시킬 수 있는 키워드
        - `raise exception_variable [exception_comment]`
            - e.g. `raise ValueError`
    - assert
        - 자신의 문법을 가지고 있어 특정 조건에 충족하는 경우에 예외를 발생시킬 때 사용할 수 있다.
        - assert condition message
            - condition이 false일 때 message가 표시됨
    - unittest
        - 파이썬이 갖추고 있는 기본 클래스들에 필요한 부분을 재정의해서 요청하면 동작함
        - 두 개의 클래스를 통해 정의할 수 있음
        - setUp → runTest → tearDown 순서로 실행됨
- except [class_name]을 사용해 사용자 정의 예외를 잡을 수 있음

### OS모듈
- 사용중인 운영체제의 값을 구현하는 클래스와 메소드들을 제공
- 생성, 삭제 등 파일 탐색기의 명령을 수행
- os.path
    - 파일 경로를 생성 및 수정하고 파일 정보를 다룸
    - 파일 입출력시에 파일 경로를 지정할 때 사용
- sys
    - 인터프리터와 관련된 정보와 기능을 제공
    - 프롬프트를 바꿀 수 있음

### 파일 모듈
- 개별 파일에 대한 모듈
- file 객체를 이용해 제공되는 함수를 통해 CRUD가 이루어짐
    - `open(file, mode)` 	// 피일에 쓰기를 하기 전에 먼저 해당 파일을 지정해 열어주어야 함
        - e.g. `open(file, 'rb')`로 지정하면 파일을 읽기전용으로 1byte씩 읽어서 hex 코드로 출력함	
    - `read()`			// 파일 내용을 읽어옴
    - `write()`			// 파일에 내용을 기록
    - `close()`			// 파일을 닫음
- with문과 파일 입출력
    - 파일 입출력 대상을 as라는 키워드와 함께 코드를 간결하게 작성하도록 도와줌
    - 어떤 블럭에 진입하고 나올 때, 지정된 객체로 하여금 그 시작과 끝에서 어떤 처리를 하도록 함
        - e.g. 
```
with open(file, mode) as f:
    f.read()
```
### persistence와 pickle
- persistence 모듈: 프로그램을 종료한 후에도 사용한 데이터를 프로그램에서 다시 사용하게 함
    - DBM
        - 데이터를 DBM 형식으로 파일에 기록함
        - anydbm 모듈을 사용하면 시스템 가용 모듈 중 DBM과 호환 가능한 최적의 모듈을 찾아줌
        - dictionary 자료형과 동일한 인터페이스
        - 키와 값은 모두 문자열이어야 함 
    - marshal
        - 기본 객체를 2진 포맷으로 저장
            - 기본 객체: none, number, string, tuple, list, dictionary, code, etc.
        - 재귀적인 사전이나 리스트는 처리할 수 없음
        - pyc 파일의 컴파일된 코드를 읽고 쓰는 데 사용됨
        - 일반 객체에는 pickle 모듈을 사용해야 함
    - shelve
        - anydbm와 유사하나, 다만 임의의 파이썬 객체가 값으로 사용됨
        - 객체 저장을 위해서는 cPickle 모듈을 사용함
    - pickle
        - 객체를 파일에 저장하는 개념
        - 객체의 상태를 그대로 저장함
        - 복잡한 자료형을 텍스트 형태나 2진 파일 등으로 변환하여 저장하거나, 네트워크를 통해 다른 시스템으로 전달 가능함
        - 원래의 객체 형태로 복원도 가능함
        - 장점
            - 기본 객체 및 사용자 클래스, 인스턴스를 저장함
            - 서로 참조되는 객체들의 관계까지도 저장함
            - 재귀적인 관계도 모두 처리함
            - 디버깅을 쉽게 하고 문제가 생겼을 때 일반 텍스트 에디터로 쉽게 복구 가능
        - 단점
            - 파일의 용량이 큼
            - 처리 속도가 느림
                - cPickle을 사용해 속도를 보완할 수 있음
        - `import pickle (또는 cPickle)`
            - `pickle.dump (output_object, file_object)`	// 파일 객체를 출력함
            - `file_object = pickle.load`			        // 파일에서 객체를 읽어들임 
            - `S(file object)`				    	        // 문자열로 객체를 출력
            - `object = pickle.loads(S)`			        // 문자열에서 객체를 다시 읽어들임

### XML 모듈
- 웹서비스: 네트워크상에서 서로 다른 종류의 컴퓨터들간 상호작용을 위한 서비스 지향적 분산 컴퓨팅 기술
    - SOAP, WSDL, UDDI 등의 표준 기술들에 기반
    - 메시징 작업을 이용해 데이터를 전송
        - document style: XML
            - HTML과 유사하지만 보다 더 구조화됨
            - 모든 데이터형은 string임
            - tree 구조로 간단한 비교/연산 과정 = 빠른 처리 속도
            - 데이터 구조화는 XSL로 표현, 다양한 데이터형으로 동시저장 = 접근이 용이
            - linking과 stylesheets에 대한 자체적 표준을 가짐
            - SGML의 특정 측면 중 하나
        - dictionary/list/etc. : JSON
- XML모듈은 XML parsing 방법인 SAX와 DOM을 사용함
    - 패키지의 네임스페이스로 나타냄
    - data들을 문법에 맞게 분석하여 새롭게 구성
    - SAX: tree를 만들 때, 응용프로그램의 작업을 수행하기 위해 data를 이용
    - DOM: tree를 만들고 나서, 응용프로그램이 tree를 이용해 작업 수행
    - xml.etree.ElementTree
        - DOM을 pythonic하게 쓰기 위한 것
        - element 중심으로 트리를 구성
        - DOM에서는 node로 트리가 구성되며, element는 node의 일종으로 취급됨

### JSON 모듈
- XML의 자료가 클 경우 XML 파싱을 위해 모드를 모두 메모리에 올려놓고 작업함
- 파싱 자체가 부하가 걸리거나 실패하는 경우가 많음
- 이럴 때 JSON을 활용
    - 데이터 교환용으로 설계된 텍스트 기반 경량 개방형 표준
    - 자바스크립트의 문법 및 객체 표기법을 사용
    - application/json
    - 주로 서버와 웹앱간에 데이터를 전송하는데 사용
    - platform-agnostic
    - language-agnostic
    - JSON 전용 파서 기능이 웹브라우저에 내장되어 있음
    - XML보다 가볍고 빠름
    - string 뿐만 아니라 여러가지 data type을 지원
- JSON 네임스페이스는 XML과 JSON간 변환에 사용함

### 네트워크
- TCP/IP 프로토콜
    - Application layer: NFS, TFTP, HTTP, SMTP 등 TCP 또는 UDP를 사용하는 응용 서비스
    - Socket interface: 소프트웨어로 작성된 통신 접속점이며 이를 통해 응용프로그램이 TCP/IP 사용
    - Transport layer: 호스트 사이의 종점간 연결을 제공, TCP와 UDP로 구성
    - Internet layer: 비연결형 서비스, 데이터그램 방식으로 호스트간 IP패킷을 전달, 라우팅 수행 등
    - Network access layer: IP패킷의 물리적인 전달을 담당하는 서브네트워크 기능
- sockets 모듈
    - 파이썬에서는 sockets 모듈을 통해 망 연결 및 데이터 검색을 쉽게 해줌
    - socket(socket_family, socket_type, protocol=0)
    - TCP는 출발과 도착을 연결하는 하나의 연결통로를 설정해 데이터를 전송하거나 받음
    - TCP는 다른 두 개의 소켓이 연결되는 것에서부터 시작됨
    - 서버와 클라이언트에서 각각 socket()을 생성함
        - → 서버에서 bind()로 주소와 소켓을 결합시킴
        - → 서버에서 listen()을 통해 서버는 접속 요청을 대기하게 됨
            - 클라이언트에서 connect()로 서버에 연결 요청을 함
                - → 서버는 accept()로 연결 요청을 수락함
                - 서버와 클라이언트간 send()와 receive()를 통해 통신을 하게 됨
    - server socket은 항상 클라이언트의 접속을 대기함
        - 클라이언트가 접속하면 새로운 소켓을 만들어 클라이언트와 접속 후 다시 대기함
    - client socket은 새로 만들어진 소켓과 데이터를 전송함

### 웹 어플리케이션
- 웹 클라이언트용 API와 웹 서버 API로 나뉨
- 웹 서버단은 http모듈을 사용
    - client: 클라이언트의 정보값을 가지고 연동하는 네임스페이스
        - HTTPConnection, HTTPMessage, HTTPResponse 등
    - cookiejar: 쿠키의 모든 정보를 포함
    - cookies: 쿠키의 속성값 정보를 포함
    - server: HTTP 서버를 구축할 수 있는 BaseHTTPSRequestHandler, CGIHTTPRequestHander, HTTPServer, SimpleHTTPRequestHandler 등의 클래스를 포함함
- 웹 클라이언트단은 urllib 라이브러리를 사용
    - urllib: HTTP, FTP, file 등의 처리가 동시에 가능
        - 웹페이지 탐색, 데이터 액세스 구문분석 등을 GET과 POST 방식으로 URL 요청
        - 다운로드한 데이터를 액세스해 헤더를 수정
        - 서버의 정보 추출에 사용됨
        - ```urllib.request.urlopen(url, data=none, timeout)```
    - urllib2: 리퀘스트 시점에 헤더 정보를 입력하게 해줌
- HTTP클라이언트(브라우저)가 url 경로와 쿠키를 포함한 request를 HTTP GET/POST를 통해 전송
    - → 웹 서버가 HTTP코드로써 그 내용을 포함해 response를 HTTP 클라이언트에 전송

### 데이터베이스
- SQLite3
    - 오프라인에서 애플리케이션에 넣어 사용하는 경량의 임베디드 데이터베이스
    - DBMS와 달리 API는 단순히 라이브러리를 호출함
    - 데이터 저장시 하나의 파일만 사용함
    - 안드로이드 SDK에도 내장되어 있음
    - 장점
        - 크기가 작고 간결하기 때문에 로컬에서 간단한 DB 구성에 활용
        - 서버를 포함한 네트워크 구성이 필요 없음
        - 데이터의 처리가 빠름
        - cross-platform, open-source
    - 단점
        - DB 엔진 자체가 호스트 프로그램에 임베딩되므로 호스트 프로그램이 DB 처리에 관한 부하를 모두 부담해야 함
- pySQLite3 모듈
    - 파이썬에 내장된 모듈이므로 별도 설치 필요 없음
    - connection 클래스
        - 데이터를 생성
        - 연결된 데이터베이스를 동작시키는 역할
    - cursor 클래스
        - SQL 문장을 수행함
        - 조회된 결과를 가져옴
    - row 클래스
        - 조회된 결과의 한 행을 보여줌
    - SQLite3의 자료형: null / integer / real / text / blob
        - PySQLite3의 자료형: none / int / float / str, bytes / buffer
    - 내장 집계 함수
        - SQLite3에 내장되어 있는 집계 함수를 활용해 결과값의 가공이 가능
            - e.g. 특정 필드의 최댓값 등의 수치연산, 조건 충족하는 튜플의 갯수 찾기
            - e.g. 대소문자가 섞여있는 데이터가 정렬이 제대로 되지 않을 때 일괄 소문자 변환
                - `connection.create_collation()`
- CSV 모듈
    - CSV: 각 항목들의 값이 콤마로 분리되어 있고, 행은 개행문자로 구분하는 파일 포맷
        - 텍스트 형태이므로 열람과 편집이 쉬움
        - 수많은 애플리케이션에서 취급하는 범용 형식
        - 빅데이터 분석에도 주로 활용됨
    - `CSV.DictReader(CSVfile, fieldnames=none, restkey=none, restval=none, dialect='file_format' *args, *kwargs)`