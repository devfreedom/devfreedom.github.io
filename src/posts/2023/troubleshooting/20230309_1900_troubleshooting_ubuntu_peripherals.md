---
title: "[트러블슈팅] 우분투에서 마우스를 연결하면 노트북 내장 터치패드가 자동으로 비활성화 되도록 하기"
date: 2023-03-09T19:00
thumb: "ubuntu-logo.png"
tags: 
    - ❮트러블슈팅❯
    - 우분투
    - 리눅스
    - 운영체제
---

노트북에서 우분투를 사용하면 사용자는 여러 하드웨어들을 인식시키고 작동하게 만드는 복잡한 작업부터 하게 되죠. 아니, 싫어도 어쩔 수 없이 해야 됩니다. 제조사 입장에서 리눅스는 2등 시민이다보니 윈도우즈에서는 너무나 쉽게 작동하는 하드웨어들과 기능들이 리눅스에서는 직접 수동으로 세팅 (또는 심지어 개발)을 해줘야 하니까요. 지금 설명드릴 '외부 마우스 연결시 자동으로 노트북 내장 터치패드 비활성화'도 그중 하나입니다. 이 단순한 기능조차 우분투에서는 기본으로 제공되지 않습니다. 이 맛에 리눅스 씁니다.

[Lorenzo Carbonell](https://github.com/atareao)이라는 스페인 출신 오픈소스 개발자분이 만든, [touchpad-indicator](https://github.com/atareao/Touchpad-Indicator)라는 별도의 애플릿을 사용하면 쉽게 해결됩니다. 설치해서 사용해봅시다.

1.  개발자의 ubuntu PPA repo를 추가하고, 추가된 저장소를 repo 목록에서 업데이트하고, touchpad-indicator를 설치합니다.

    ```
    $ sudo add-apt-repository ppa:atareao/atareao
    $ sudo apt update
    $ sudo apt install touchpad-indicator
    ```

2.  touchpad-indicator를 실행하면 우분투 상단 상태표시줄에 터치패드 모양 아이콘이 추가됩니다. 아이콘을 클릭하면 나오는 메뉴에서 *Preferences*를 클릭합니다.

3.  설정 창이 열리면 *Actions* 탭으로 가서 *Disable touchpad when mouse plugged* 옵션을 켜줍니다.

부팅할 때마다 자동으로 이 기능이 켜지도록 하고 싶다면 *General options* 탭으로 가서 *Autostart* 옵션을 켜주면 됩니다.