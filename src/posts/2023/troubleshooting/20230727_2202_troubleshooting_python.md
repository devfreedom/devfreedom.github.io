---
title: "[트러블슈팅] [리눅스] 파이썬과 관련된 여러가지 문제들 해결하기"
date: 2023-07-27T22:02
thumb: "python-logo.png"
tags: 
    - ❮트러블슈팅❯
    - 파이썬
    - 리눅스
    - 프로그래밍
    - Python
---

파이썬으로 프로그래밍을 하거나 파이썬으로 작성된 프로그램을 사용할 때 겪는 여러가지 문제들과 실수들을 짚어보는 시간입니다.

## 파이썬 가상환경 (VENV) 에서 pip로 패키지를 설치할 때 전역 설치가 되어버리는 현상

파이썬 가상환경이 활성화된 상태인데도 `pip install [패키지명]` 명령어로 패키지를 설치하면 다음과 같은 메세지가 나오면서 패키지가 시스템에 전역 설치가 되어버리는 현상입니다.

```
Defaulting to user installation because normal site-packages is not writeable
Requirement already satisfied: pandas in ./.local/lib/python3.10/site-packages (2.0.0)
Requirement already satisfied: python-dateutil>=2.8.2 in ./.local/lib/python3.10/site-packages (from pandas) (2.8.2)
Requirement already satisfied: pytz>=2020.1 in /usr/lib/python3/dist-packages (from pandas) (2022.2.1)
(...)
```

### 원인

간단한 실수입니다. 가상환경 내부에다가도 pip를 설치해줬어야죠... (그게 바로 접니다)

가상환경 내부에 pip가 없으니까 시스템상에 전역 설치되어있는 pip를 사용하게 되고, 전역 설치된 pip를 사용하니까 당연히 패키지가 전역 설치되게 됩니다.

### 해결

1. 일단 현재 어디에 설치된 pip를 사용하고 있는지를 확인해봅니다. 아마 시스템에 설치된 pip의 경로를 표시할겁니다.
    ```
    $ which pip
    ```
2. 가상환경을 활성화시키고 가상환경 내부에서 pip를 설치해줍니다. 여기서는 Anaconda를 사용하는 경우를 예로 들겠습니다.
    ```
    $ activate conda [가상환경 이름]
    $ conda install pip
    ```
3. 이제 가상환경이 어디에 설치된 pip를 사용하고 있는지를 다시 한번 확인합니다. 이제는 정상적으로 가상환경 내부에 설치된 pip의 경로를 표시할겁니다.
    ```
    $ which pip
    ```

## 파이썬 또는 애플리케이션의 버전을 업데이트한 이후부터 애플리케이션이 작동되지 않고 크래쉬 될때

어느날부터 OpenSSL을 사용하는 파이썬 어플리케이션을 리눅스 데스크탑에서 실행시키면, 아무런 반응이 없다가 시스템상에서 애플리케이션이 크래쉬됬다는 팝업창이 뜨는 증상이 시작됐습니다.

도대체 무슨 상황인지 알 수가 없어서 터미널에서 직접 애플리케이션을 실행시켰는데 다음과 같은 에러메세지가 나옵니다.

```
Traceback (most recent call last):
    File "/home/user/.local/lib/python3.10/site-packages/pkg_resources/__init__.py", line 534, in load_entry_point
    return get_distribution(dist).load_entry_point(group, name)
  File "/home/user/.local/lib/python3.10/site-packages/pkg_resources/__init__.py", line 2930, in load_entry_point
    return ep.load()
  File "/home/user/.local/lib/python3.10/site-packages/pkg_resources/__init__.py", line 2517, in load
    return self.resolve()
  File "/home/user/.local/lib/python3.10/site-packages/pkg_resources/__init__.py", line 2523, in resolve
    module = __import__(self.module_name, fromlist=['__name__'], level=0)
  File "/usr/lib/python3/dist-packages/OpenSSL/__init__.py", line 8, in <module>
    from OpenSSL import crypto, SSL
  File "/usr/lib/python3/dist-packages/OpenSSL/crypto.py", line 3279, in <module>
    _lib.OpenSSL_add_all_algorithms()
AttributeError: module 'lib' has no attribute 'OpenSSL_add_all_algorithms'
```

### 원인

파이썬용 OpenSSL 버전 호환성 문제입니다.

### 해결

시스템에 설치된 pyOpenSSL 패키지의 버전을 업데이트해서 해결했습니다. 일단 pip를 최신 버전으로 업데이트하고, 그 다음 pyOpenSSL 버전도 업데이트 해줍니다. 

```
$ python3 -m pip install --upgrade pip
$ python3 -m pip install --upgrade pyopenssl
$ pip install pip --upgrade
$ pip install pyopenssl --upgrade
```