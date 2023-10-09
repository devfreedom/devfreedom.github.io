---
title: "[필기] 리눅스 Bash shell에서 자주 사용하는 명령어 모음"
date: 2023-04-25T21:01
thumb: "linux.jpg"
tags: 
    - ❮필기❯
    - 운영체제
    - 리눅스
---

## 파일 시스템 관련

### 파일 및 디렉토리 정보 관련
- pwd
	- **p**rint **w**orking **d**irectory
	- 현재 작업을 위해 머무르고 있는 디렉토리의 절대경로를 출력하는 명령어
- ls
	- **l**ist **s**egment
	- 파일 및 디렉토리 목록을 표시하는 명령어
	- 사용할 수 있는 옵션
		- -a : 숨김 파일 포함, 모든 파일과 디렉토리 출력 (**a**ll)
		- -l : 권한을 포함한 상세 정보를 함께 출력 (**l**ong)
		- -t : 수정한 시간 순서대로 정렬해서 출력 (**t**imedate)
		- -r : 역순으로 정렬해서 출력 (**r**everse)
		- -R : 하위 디렉토리를 포함하는 전체 목록 출력 (**R**ecursive)
		- -S : 파일 크기 순서대로 정렬해서 출력 (**S**ize)
		- -h : 용량을 블록 단위가 아닌 사람이 읽을 수 있는 단위로 함께 출력 (**h**uman readable)
- ll
	- `ls -l`과 동일함
- cd
	- **c**hange **d**irectory
	- 작업 디렉토리를 변경하는 명령어
	- 사용할 수 있는 파라미터
		- / : 루트 디렉토리
		- .. : 상위 디렉토리
		- - : 바로 전에 위치했던 디렉토리
		- ~ : 홈 디렉토리

### 파일 및 디렉토리 조작 관련
- touch
    - 파일을 생성함
        - 파일이 존재하지 않을 경우, 해당 이름으로 빈 문서를 생성
        - `touch [파일명]`
            - e.g. `touch file.txt`
    - 파일의 timestamp를 변경함
        - 파일이 존재할 경우, 해당 파일의 datetime을 변경
        - 옵션을 사용하지 않을 경우, 파일의 atime/ctime/mtime을 현재 시간으로 갱신함
- mkdir
    - **m**a**k**e **dir**ectory
    - 디렉토리를 생성하는 명령어
        - `mkdir [디렉토리명]`
        - 사용할 수 있는 옵션
            - -p : 하위 디렉토리들을 생성함 (**p**arent directories if required)
                - e.g. `mkdir -p /home/user/Documents/test1/test2/test3`
                - test3 이라는 이름의 디렉토리를 만들기 위해서 상위 디렉토리인 test1과 test2도 함께 생성
- mv
    - **m**o**v**e
	- 파일 및 디렉토리 이름을 변경함
        - `mv [기존의 파일 또는 디렉토리] [새로운 파일 또는 디렉토리]`
	- 파일 및 디렉토리를 이동함
        - `mv [파일 또는 디렉토리] [이동할 위치]`
            - e.g. `mv /home/user/Downloads/file.txt /home/user/Documents`
- cp
    - **c**o**p**y
    - 파일 및 디렉토리를 복사하는 명령어
    - `cp [파일 또는 디렉토리] [복사할 위치 (새로운 파일명으로 지정하는 것도 가능)]`
        - e.g. `cp /home/user/Downloads/original.txt /home/user/Documents/clone.txt`
	- 사용할 수 있는 옵션
		- -r : 하위 디렉토리에 재귀적으로 모두 적용함 (**r**ecursive)
- rm
    - **r**e**m**ove
	- 파일 및 디렉토리를 삭제함 
	- 사용할 수 있는 옵션
		- -r : 하위 디렉토리에 재귀적으로 모두 적용함 (**r**ecursive)
		- -f : 권한이 없는 파일이나 디렉토리도 강제로 삭제함 (**f**orce)


### 파일 내용 관련
- cat 
    - con**cat**enate
	- 파일(들)의 내용을 순서대로 stdout으로써 출력함
        - `cat [파일명1] ([파일명2] ...)`
    - 파일의 내용을 출력하고 그것을 pipe/redirection로 연계해서 입력으로써 활용 가능
        - 출력된 내용을 그대로 새 파일에 입력하기 (=복사와 같은 효과)
            - e.g. `cat original.txt > clone.txt`
        - 출력된 내용들을 하나의 파일로 합치기 
            - e.g. `cat first_part.txt second_part.txt > merged.txt`
            - 파일 이름 대신 `-`을 파라미터로 사용하면 stdin으로써 내용을 입력할 수 있음
                - e.g. `cat original.txt - > user_input_is_merged.txt`
- echo
    - `echo [텍스트 또는 (환경)변수]`
    - 지정된 문자열의 내용을 그대로 출력하는 명령어 (=echo)
        - e.g. `echo Hello World!`
        - e.g. `echo $SHELL`
    - 출력된 내용을 pipe/redirection로 연계해서 입력으로써 활용 가능
- grep
    - **g**lobal **r**egular **e**xpression **p**rint
    - `grep [패턴] [파일명]`
    - 지정한 패턴(문자열/정규표현식/다중패턴)을 파일의 내용에서 찾아내는 명령어
        - e.g. `grep 'important' document.txt`
- sort


### 장치/디스크/파티션 관련
- mount
	- 장치를 마운트하는 명령어
	- 사용할 수 있는 파라미터
		- 마운트할 디바이스 주소와 마운트할 목표 디렉터리
			- e.g. `sudo mount /dev/sdb1 /mnt/usb`
- df
	- 디스크의 용량을 출력하는 명령어
	- 사용할 수 있는 옵션
        - -h : 용량을 블록 단위가 아닌 사람이 읽을 수 있는 단위로 함께 출력 (**h**uman readable)
- du 
	- 디렉토리 내부의 파일과 디렉토리의 용량을 출력하는 명령어 (**d**isk **u**sage)
	- 사용할 수 있는 옵션
		- -h : 용량을 블록 단위가 아닌 사람이 읽을 수 있는 단위로 함께 출력 (**h**uman readable)
- ln
	- 심볼릭 링크를 생성함 (sym**l**i**n**k)
	- 사용할 수 있는 옵션
		- -s 
	- 사용할 수 있는 파라미터
		- 원본 이름과 링크 이름
			- e.g. `ln -s /test/original /test/symlink`


## 프로세스 관련
- ps
	- 현재 실행중인 프로세스의 정보를 출력하는 명령어
	- 사용할 수 있는 옵션
		- `aux` = 모든 프로세스의 세부적인 정보를 출력
- kill
	- 사용할 수 있는 옵션
		- -9 : 해당 프로세스를 당장 종료하라는 신호를 보냄 = SIGKILL(**9**)
	- 사용할 수 있는 파라미터
		- PID 또는 processname: 특정 프로세스를 지정함
- [CTRL+C 키]
	- 프로세스를 종료함
- [CTRL+Z 키]
	- 프로세스를 일시정지함 (suspend)
	- `fg % 1` 명령어를 사용해서 프로세스 재개 가능

---

## 네트워크 관련
- ipconfig
	- **IP** **config**uration
	- IP주소, 서브넷 마스크, 기본 게이트웨이 주소 등의 정보들을 출력하는 명령어
- netstat
	- **net**work **stat**us
	- 네트워크 상태를 확인함 (net-tools 설치 필요)
	- 사용할 수 있는 옵션
		- -nap : 열려있는 모든 포트 출력
			- `-nap | grep LISTEN` : LISTEN중인 포트 출력
			- `-nap | grep 포트번호` : 특정 포트의 상태 확인

---

## 명령어 다중 연결 및 조작 관련

### 리다이렉션
- 출력 리다이렉션
    - `>`
        - `[명령어] > [파일]`
        - 해당 명령어의 출력을 특정 파일에다가 덮어씌우기(overwrite)
    - `>>`
        - `[명령어] >> [파일]`
        - 해당 명령어의 출력을 특정 파일에다가 덧붙이기(append)

- 입력 리다이렉션
    - `<`
        - `[명령어] < [파일]`
        - 특정 파일을 해당 명령어의 입력으로써 사용함
    - `<<` 
        - **here** **doc**cument
        - `[명령어] << [heredoc 입력을 종료하는 임의의 문자열을 지정해줌]`
        - '입력 종료를 위해 지정한 임의의 문자열'을 입력하기 전까지, 여러 줄의 텍스트를 입력받을 수 있음

### 파이프
- `|`
	- `[명령어] | [명령어]` 
    - 앞 명령어의 결과를 뒤에 나오는 명령어의 입력으로써 사용함
	- e.g. `ls | grep mnt'
		- = 파일 및 디렉터리 목록을 출력(ls)한 다음, 그 목록에서 mnt라는 문자열을 포함하는 파일 및 디렉터리를 찾아냄(grep)
- `&&` 
	- `[명령어] && [명령어]` 
    - 명령어들을 순차적으로 연달아서 실행함
- `;`
	- `[명령어] ; [명령어]` 
    - 전자의 성공 여부와 상관없이 후자가 실행됨
- `&`
	- `[명령어] &`
    - 해당 명령어를 백그라운드 프로세스로써 실행함
- 응용
	- `2>&1`
		- 실행된 명령이 출력한 오류 메세지를 저장하는 방법
			- e.g. `[명령어] > error.txt 2>&1`
		- 2 : 오류를 출력하도록 함
		- `>` : 리다이렉션
		- &1 : 파일로 출력하도록 함

---

### 추가해야 할 내용

cut
textutil 
diff 
wc 
aspell 
tr 
find
