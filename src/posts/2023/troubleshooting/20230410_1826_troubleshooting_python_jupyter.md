---
title: "[트러블슈팅] [리눅스] VSCode에서 Jupyter 확장 프로그램이 파이썬 커널을 찾지 못할 때"
date: 2023-04-10T18:26
thumb: "python-logo.png"
tags: 
    - ❮트러블슈팅❯
    - 파이썬
    - VSCode
    - jupyter-notebook
    - 리눅스
---

VSCode용 jupyter-notebook 확장 프로그램인 Jupyter를 잘 사용하고 있었는데, 언제부터인가 ipynb 파일을 구동할 때 파이썬 커널을 찾을 수 없다면서 오류 메세지를 뿜기 시작했습니다. VSCode, Jupyter extension, ipython, ipykernel, Anaconda 중에서 뭔가가 업데이트되면서 뭔가 꼬인 것 같습니다. 최근에는 구동조차 되지 않아서 오류 메세지가 나오기는 커녕 VSCode에서 사용할 수 있는 파이썬 커널이 아예 나타나지 않았습니다. 상당히 골치 아픈 문제인데, 해외 사례를 찾아봐도 확실한 원인이나 해결 방법이 나오지 않았습니다.

일단은 해볼 수 있는 것부터 해봐야겠죠. 먼저 ipython이나 ipykernel을 최신 버전으로 업데이트해봅니다.

```
$ pip install --upgrade ipython
$ pip install -U ipykernel
```

그리고 혹시라도 누락되어있을 Anaconda의 dependency들을 설치해봅니다.

```
$ conda install jupyter
```

이래도 안되면 Jupyter가 파이썬 커널을 인식할 수 있게 강제로 주소를 잡아주는 방법도 있습니다.

1. 터미널을 열고 다음 명령어를 입력합니다.
    ```
    $ jupyter kernelspec list
    ```

2. 출력되는 주소에는 Jupyter의 파이썬 커널을 설정할 수 있는 문서인 kernel.json이 있습니다. ###### 자리에다가 방금 출력된 주소를 입력하고, 이 명령어를 실행시켜서 텍스트 편집기로 해당 문서를 열어줍니다. 
    ```
    $ gedit #######/kernel.json
    ```

3. 아래와 같은 형식의 문서가 열립니다. 여기서 arvg 바로 밑에줄에 있는 "python" 이라는 문구를, 파이썬이 설치되어 있는 실제 full path로 바꿔주면 됩니다.
    ```
    {
      "argv": [
        "python",
        "-m",
        "ipykernel_launcher",
        "-f",
        "{connection_file}"
      ],
      "display_name": "Python 3 (ipykernel)",
      "language": "python",
      "metadata": {
        "debugger": true
      }
    }
    ```

4. 파이썬이 설치되어 있는 full path는 새로운 터미널을 열고 다음 명령어를 입력하면 확인할 수 있습니다.
    ```
    $ which python3
    ```

여전히 문제가 해결되지 않는다면... Jupyter를 과거 버전으로 롤백하거나 아니면 pre-release 버전으로 다시 설치해서 해결했다는 사례도 있으니 시도해보세요.