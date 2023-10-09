---
title: "[트러블슈팅] 우분투에서 블루투스 스피커 또는 이어폰 연결시 음질이 저하되는 현상"
date: 2023-03-09T17:43
thumb: "ubuntu-logo.png"
tags: 
    - ❮트러블슈팅❯
    - 우분투
    - 리눅스
    - 운영체제
    - 블루투스
---

### Ubuntu 22.10 버전부터는 PipeWire가 기본 오디오 서버로 지정되면서 이 문제는 해결되었습니다.

블루투스 기술에서 오디오 장치를 정의하는 프로파일에는 HSP/HFP와 A2DP(+AVRCP)가 있습니다.

HSP(Headset Profile) 또는 HFP(Hands-free Profile)는 마이크를 통해 음성을 발신하고 스피커를 통해 음성을 수신하는 '전화 통화용' 프로파일입니다. 모노 오디오에 비트레이트가 CVSD 코덱 기준 8kHz 또는 mSBC 코덱(wideband speech) 기준 16kHz밖에 안되는 저음질 프로파일입니다. A2DP(Advanced Audio Distribution Profile)의 경우 SBC, AAC, LDAC, aptX 등의 코덱으로 고품질의 음악 감상을 지원하는 프로파일이고 일반적인 음악 감상용 블루투스 기기에는 이 프로파일을 사용하게 됩니다. 미디어 컨트롤 기능을 가진 AVRCP 프로파일과 함께 제공되기도 합니다.

우분투 운영체제에서 음악 감상 전용 블루투스 '스피커'를 연결하게 되면 문제 없이 A2DP 장치로 인식합니다. 문제는 블루투스 스피커에 마이크와 통화 기능, 즉 '핸즈프리' 기능이 탑재된 경우입니다. 이런 블루투스 기기는 HSP/HFP 프로파일과 A2DP(+AVRCP) 프로파일을 모두 지원하는데, 음악 감상에 특화된 블루투스 스피커임에도 불구하고 우분투에서는 무선 통화용 블루투스 핸즈프리로 인식하고는 위에서 언급한 저음질 모노 오디오 코덱으로 음악을 전송하는 현상이 발생합니다. 음질이 매우 낮을 뿐만 아니라, 음량 조절이 되지 않는 경우도 있습니다. HSP/HFP에서 인식하는 볼륨 컨트롤 신호와 미디어 애플리케이션에서 전송하는 볼륨 컨트롤 신호가 다르기 때문입니다.

이 현상은 우분투에서 설정 앱을 켠 다음 오디오 메뉴로 들어가서 현재 사용중인 오디오 출력 기기의 설정을 Headset Head Unit(HSP/HFP)가 아니라 High Fidelity Playback (A2DP Sink)로 바꿔주면 쉽게 해결됩니다. 하지만 우분투의 블루투스 스택에서 기본 설정을 HSP/HFP로 잡는 경우가 있기 때문에, 매번 수동으로 바꿔주는 대신 아예 기본값을 A2DP로 바꿔주는 해결 방법이 있습니다.

1. 블루투스 설정 파일을 루트 권한을 가진 텍스트 편집기로 여세요.

    ```
    $ sudo gedit /etc/bluetooth/main.conf
    ```

2. 맨 마지막 줄에 HSP/HFP를 비활성하는 옵션을 추가합니다.

    ```
    Disable=headset
    ```

3. 시스템을 재부팅합니다.

만약 이렇게 해도 블루투스 스피커가 여전히 핸즈프리 기기로 우선적으로 인식된다면 다음 방법을 시도해보세요.

1. 우분투가 init에서 systemd로 전환한 사용하고 있으므로 systemd에 있는 블루투스 설정을 바꿔봅시다.

    ```
    $ sudo gedit /etc/systemd/system/bluetooth.target.wants/bluetooth.service
    ```

2. 다음과 같은 명령줄이 있을겁니다. 

    ```
    ExecStart=/usr/lib/bluetooth/bluetoothd
    ```

3. 이 명령줄 뒤에 --plugin=a2dp 옵션을 추가합니다.

    ```
    ExecStart=/usr/lib/bluetooth/bluetoothd --plugin=a2dp
    ```

4. 시스템을 재부팅합니다.

---

✱ Stack Overflow에서 정보를 얻었고, 작동 여부를 확인한 사례입니다.