---
title: "[트러블슈팅] [리눅스] SSH로 GitHub 접속 시 host authenticity 경고 해결하기"
date: 2023-04-13T17:22
thumb: "git-logo.jpg"
tags: 
    - ❮트러블슈팅❯
    - 리눅스
    - VSCode
    - GitHub
    - Git
    - SSH
---

2021년 8월 13일부터 GitHub은 보안 수준 미달을 이유로 ['계정 암호' 기반의 계정 인증을 deprecate](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/) 시켰습니다. 새로운 보안 정책에 맞게 VSCode를 비롯한 IDE에서 git 작업을 하려면 반드시 GitHub Personal Access Token(PAT)을 사용하거나 SSH key를 사용해서 GitHub에 원격 접속을 해야 하는데, 저는 개인용 컴퓨터에서 ED25519 형식의 SSH key를 만들어 사용하기로 했습니다. 리눅스 머신에서 SSH key를 생성하는 방법은 [여기](https://docs.github.com/ko/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=linux)에, GitHub 계정에 이 SSH key를 등록하는 방법은 [여기](https://docs.github.com/ko/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)에 공식 도큐멘테이션으로 잘 설명이 되어 있습니다.

키 등록까지 마치고 이제 git 작업을 하려고 하는데, 다음과 같은 경고 메세지가 나타납니다.

```
The authenticity of host 'github.com (20.200.245.247)' can't be established.
ED25519 key fingerprint is SHA256:+###################################
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? _
```

SSH로 지금 접속하려는 github.com이 '신뢰할 수 있는 호스트(known hosts)'로 등록이 되어 있지 않은데, 접속을 계속 할 것이냐고 묻는 보안 경고입니다. 이걸 왜 확인차 물어보냐면, 악의적인 공격자가 GitHub 서버를 사칭하는 '중간자 공격(man-in-the-middle attack)'을 예방하기 위함입니다. 그리고 때로는 GitHub이 보안을 이유로 자신들의 서버가 진짜 공식 서버라는 것을 증명하는 일종의 신분증인 [RSA SSH host key를 바꾸는](https://github.blog/2023-03-23-we-updated-our-rsa-ssh-host-key/) 일도 있기 때문입니다. 

만약 악의적인 공격자가 사칭하는 가짜 GitHub 서버에 접속하고 있거나, 아니면 GitHub측에서 이미 폐기한 과거의 fingerprint를 신뢰한 채로 GitHub에 접속을 하는 경우 다음과 같은 강력한 경고 메세지를 보게 됩니다.

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
SHA256:#######################################
Please contact your system administrator.
Add correct host key in ~/.ssh/known_hosts to get rid of this message.
Host key for github.com has changed and you have requested strict checking.
Host key verification failed.
```

아무튼 당연하게도 GitHub의 실제 공식 서버에 접속을 해야만 안전하기 때문에, 지금 시도하는 연결의 상대방이 실제로 GitHub이 맞는지를 확인하라는 차원에서 저런 경고 메세지가 표시되는 것입니다. 그래서 우리는 실제 공식 GitHub 서버의 신분증인 최신의 SSH key fingerprint를 확인하고 이것을 '신뢰할 수 있는 호스트'로 등록해주는 절차가 필요합니다. GitHub의 SSH key fingerprint는 [여기](https://docs.github.com/en/enterprise-cloud@latest/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)에서 공식 도큐멘테이션으로 확인할 수 있습니다.

GitHub의 공식 fingerprint를 '신뢰할 수 있는 호스트'로 등록하는 방법에는 두 가지가 있습니다.

- The authenticity of host 'github.com (20.200.245.247)' can't be established 경고 메세지가 뜰 때 GitHub의 공식 fingerprint를 입력해주기
- 리눅스 머신에 저장된 SSH known hosts list에 GitHub의 공식 fingerprint를 수동으로 추가해주기

우선은 첫번째 방법이 가장 간편합니다. 

1. 웹 브라우저를 열고 앞서 언급된 [공식 도큐멘테이션](https://docs.github.com/en/enterprise-cloud@latest/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)에 접속합니다.

2. 위에서 언급했다시피 아래와 같은 메세지가 뜰 때, yes라던가 no라는 응답 대신에, 공식 도큐멘테이션에 있는 RSA, ECDSA, ED25519 형식의 fingerprint 중 하나를 복사해서 저 입력창에 붙여넣기하고 엔터 키를 치면 됩니다. 
    ```
    Are you sure you want to continue connecting (yes/no/[fingerprint])? _
    ```


두번째 방법은 살짝 더 귀찮지만, 대신에 나중에 GitHub 측에서 SSH key와 fingerprint를 바꾸는 일이 생길 때 기존의 fingerprint를 제거하고 새로운 fingerprint를 등록해 최신화하는 데 사용할 수 있습니다.

1. 터미널에서 다음 명령어로 SSH known hosts 목록 파일을 엽니다. (파일이 없으면 만드시면 됩니다)
    ```
    $ sudo nano ~/.ssh/known_hosts
    ```

2. 공식 도큐멘테이션 하단에 있는 세 줄의 코드를 복사해서 해당 파일에 붙여넣고 저장하시면 됩니다.

3. 필요하다면 폐기된 기존의 fingerprint를 제거해줍니다.