---
title: "[필기] <웹 스크래핑을 위한 파이썬> 강의"
date: 2022-09-21T21:31
thumb: "python-logo.png"
tags: 
    - ❮필기❯
    - 파이썬
    - 프로그래밍
---

### 파이썬 초기 세팅
- 시작하기 전에 파이썬 언어 버전을 결정해야 함
    - python2와 python3은 호환되지 않음
    - 최신 버전의 경우 불안정할 수 있으므로 여기서는 python3.5를 사용함
- 관리자 권한으로 설치 진행
- 설치시 Add Python to PATH 옵션을 활성화

### 파이썬 기초
- 변수
    - 변수명은 반드시 문자로 시작하며, 숫자가 중간에 포함될 수 있음
    - 변수명은 대소문자를 구별함 (case-sensitive)
    - 파이썬 자체 내장 예약어들은 변수명으로 사용할 수 없음
    - 문자열은 그 값을 ' 또는 " 로 반드시 묶어주어야 함
- formatter
    - %d = decimal
    - %f = float
    - %s = string
    - %c = single character
    - 다중 formatter 사용법

```
print("This is %s item and that is %s item" %(var1, var2))

# 출력값: This is var1 item and that is var2 item
```

- `input("Please input the value : ")`
    - 입력값을 무조건 string으로 저장함
        - int(input()) 를 사용해 정수로 바꿔주기
        - float(input()) 를 사용해 실수로 바꿔주기
- slicing
    - 마지막 인덱스를 지정하면 그 앞 문자까지 잘라냄
- meta character
    - \n = line break
    - \# = tab = 8개 빈칸 
    - meta character 앞에 \를 붙이면 취소됨
- strip()과 rstrip()
- lower()
- replace("string 1", "string 2")
- split("seperator character")
- len()

### os모듈로 파일 입출력
- 'import os'를 사용해 os모듈을 사용해야 함
- `os.getcwd` 
    - = get current working directory
- `os.chdir("path")` = change dir.
    - 'temp'처럼 디렉토리가 t로 시작을 할 경우, 주소를 그대로 입력하게 되면 \t 메타캐릭터가 발동되므로 반드시 역슬래시를 한번 더 사용해 escape해야 함
```
C:\\TempDir
```
- `os.listdir("path")` 
    - = list dir.
    - 목록을 끊어서 출력하려면 다음과 같은 반복문을 사용
        - `for name in os.listdir("path") :`

### print(name)
- `os.mkdir("path")`
    - = make dir.
    - 폴더를 한번에 하나씩만 만들 수 있음
    - os.makedirs("path")는 다중의 폴더를 자동으로 만들어 줌
        - 단, path에 오타가 있을 경우, 상위 폴더가 없을 경우 에러를 출력해주는 mkdir과는 다르게 상위 폴더를 오타가 난 이름 그대로 자동으로 만들어버림
- `os.rmdir("path")`
    - = remove dir.
    - 폴더 안에 다른 파일이 없는 경우, 즉 빈 폴더만 삭제해줌
    - os.removedirs("path")는 폴더의 내용을 포함한 폴더 전체를 무조건 삭제함
- `f = open("filename", "mode character")`
    - 파일을 메모리 영역으로 가져옴
    - mode arg.는 다음을 사용할 수 있음
        - w = write = 새 파일을 만들 때 사용 (텍스트)
            - 기존에 이미 내용이 작성된 파일의 경우엔 기존 내용을 새로운 내용으로 전부 덮어써버림
        - r = read = 파일을 불러와 열람할 때 사용 (텍스트)
        - a = append = 파일에 내용을 추가할 때 사용 (텍스트)
        - rb = read binary = 파일을 바이너리 형태로 불러옴 (그림 등의 파일)
        - wb = write binary = 파일을 바이너리 형태로 작성함 
    - f.readline()
        - 파일의 내용을 한 줄씩 읽어옴
        - 파일의 내용을 여러 줄로 전부 읽어오려면 f.readlines()를 사용
            - 단, 줄바꿈을 하지 않으므로 for문을 이용해 한 줄씩 출력을 해야 함
    - f.write(contents)
        - 내용을 메모리에 작성하게 됨
        - A 파일을 읽어서 B 파일에 쓸 경우에는 다음과 같이 작성
            - B.write(A.read())
    - f.close()
        - 메모리에 저장된 내용을 저장장치에 파일로 저장함

### openpyxl로 엑셀 파일 입출력 
- `wb = openpyxl.load_workbook("filepath")`
    - `sheet = wb["Sheetname"]` 으로 작업 대상 워크시트를 지정
    - `dataframe_name = {}` 로 데이터프레임을 생성
    - 다음과 같은 반복문 코드로 워크시트의 내용을 불러올 수 있음
```    
for i in range(column_count, sheet.max_row + 1) :
    column1 = sheet.cell(row=i, column=1).value
    column2 = sheet.cell(row=i, column=2).value
    dataframe_name[column1] = column2
```

### csv모듈로 csv 입출력
- 파일 불러오기

```
import csv
f = open("filepath", encoding="utf-8")
read = csv.reader(f)
```
 
### pandas로 파일 입출력
- `dataframe.to_csv("path", encoding ="utf-8", index=boolean)`
    - 데이터프레임을 csv 파일로 저장함
    - index 파라미터 = 제일 첫 컬럼으로 인덱스를 추가할 것인지 여부를 선택

### 사용자 정의 함수
- 클래스 안에 함수를 사용할 경우 self. 네임스페이스를 사용해야 함
    - 원본 클래스를 복사해서 다른 클래스에서 자체적으로 함수를 사용하라는 의미
- 모듈을 불러올 때 importError가 발생할 경우, sys.path로 path 목록을 확인하기
    - 모듈이 속한 디렉토리가 없다면 sys.path.append("path")로 추가해주기
- 모듈을 통째로 불러오면 메모리 부하가 늘어날 수 있으므로, 필요한 함수만 불러오는 것이 좋음
    - `from module_name import function1, function2...`
- 웹 스크래핑 관련 모듈
    - re = 문자열을 다루는 정규식 관련 모듈
    - datetime
    - calendar
    - bisect
    - sets
    - decimal
    - random
    - math
    - htmllib
    - sgmllib
    - formatter
    - csv
    - os.path
    - fileinput

### 정규식
- 정규식 작업을 위해서는 import re 코드를 사용해 re모듈을 불러와야 함
- 정규식 문법
    - . = 임의의 한 문자가 존재함
    - ? = 바로 앞의 한 문자가 존재하거나 존재하지 않음
    - \* = 바로 앞의 문자가 존재하지 않거나 무한대로 존재 (길이 제한 없음)
    - \+ = 바로 앞의 문자가 한 번 이상 존재
    - ^ = 바로 뒤의 문자로 문자열이 시작함
    - $ = 바로 앞의 문자로 문자열이 끝남
    - {int} = 숫자만큼 반복
    - {int,} = 숫자 이상만큼 반복
    - {int1, int2} = 숫자 1 이상, 숫자 2 이하만큼 반복
    - (str) = 문자나 문자열을 묶음
    - [str1, str2, ...] = 대괄호 안에 있는 문자들이 존재하는지 검색
    - [ ^ ] = ^ 기호 바로 뒤에 문자가 존재하지 않음
    - [:alpha:] = 알파벳과 모든 글자 포함
    - [:alnum:] = alphanumeric 검색
    - [:digit:] = 숫자만 검색
    - [:upper:] = 대문자만 검색
    - \ = escape char = 메타캐릭터를 취소
        - \ \\ = 역슬래쉬(\) 문자 자체를 검색
    - \d = 모든 숫자를 검색 = [0-9]
    - \D = 숫자를 제외한 모든 문자를 검색
    - \s = 공백을 검색
    - \S = 공백이 아닌 문자를 검색
    - \w = 숫자 또는 문자를 검색
    - \W = 숫자 또는 문자가 아닌 것을 검색
- `re.search("regex_pattern", data)`
    - "주어진 data로부터 앞에 정의된 regex 패턴을 찾아라"
    - 지정한 패턴 중 일부만 일치해도 찾음
        - 완전히 일치해야 할 경우에는 re.match()를 사용
    - 일치하는 첫 번째 데이터만 반환함
        - 정규식에 부합하는 모든 데이터를 반납하려면 re.findall()을 사용
- `re.compile("regex_pattern")`
    - 정규식 패턴을 정의함
- `re.split("seperator char", data)`
    - 구분자 문자와 일치하는 지점을 전후로 문자열을 나눔
- `re.sub("original_str", "alternative_str", data)`
    - 원본 문자열을 대체 문자열로 바꿈

### BeautifulSoup
- `bs = BeautifulSoup(html_document, 'parsing_engine')`
    - html 데이터를 불러와서 작업을 준비함
    - 파싱 엔진은 html의 경우 html.parser를 사용
    - bs.find('html_tag', limit='count_int')
        - bs.find(html_attr="value")
        - 조건이 일치하는 하나의 항목을 찾음
        - 모든 항목을 찾으려면 bs.find_all()을 사용
- bs4와 정규식의 조합
    - `var = bs.find_all(re.recompile("regex_condition_html"))`
- HTML 태그에 있는 텍스트 내용 가져오기
    - `bs.find_all(text="string")`
    - `html_tag.strings`
    - `html_tag .get_text(' ', strip=true)`
        - strip=true 매개변수를 사용해 메타캐릭터를 제거할 수 있음
        - 첫번째 매개변수로 구분자를 설정할 수 있음'
- `soup.select('html_tag')`
    - bs4가 파싱한 html 중에서 특정 항목을 선택함
    - `soup.select('.class_name')`
        - `soup.select('tag.class > tag.class ')`
    - `soup.select('parent_tag > child_tag > child_tag')[array_index]`
        - 부등호 사이에 반드시 공백이 있어야 함
    - `soup.select('#id_name')`
        - `soup.select('#id_name > tag.class')`
    - `soup.select('html_tag[attr=value]')[array_index]'`

### Selenium 초기 설정

```
from selenium import webdriver
path = '/usr/bin/chromedriver'
driver = webderiver.Chrome(path)
driver.get("URL")
time.sleep(page_loading_buffer_sec)
```

