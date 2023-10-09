---
title: "[필기] 컴퓨터공학과 <네트워크> 과목 - 전반부"
date: 2023-03-30T18:16
thumb: "network.jpg"
tags: 
    - ❮필기❯
    - 컴퓨터공학
    - 네트워크
---

## 네트워크 기본 개념

### Node & Link
- Node: 네트워크에 사용되는 장비, 단말, 시스템
- Link: 노드와 노드 사이의 논리적인 회선

### Sync & Async
- Synchronous transmission: 송신과 수신간의 타이밍을 맞춰 고속 전송
- Asynchronous transmission: 송신과 수신간의 타이밍을 맞추지 않고 저속 전송

### Flow control
- '흐름 제어 기술'은 송신측과 수신측의 데이터 처리 속도가 달라서 발생하는 문제를 방지함
- Software flow control (XON/XOFF) 방식
	1. 송신측에서 임의의 크기로 데이터를 수신측으로 보냅니다. 수신측에서는 이 데이터를 받아 처리하다가 버퍼에 데이터가 어느정도 차면 송신측으로 XOFF(transmit off) 신호를 보냅니다. 
	2. XOFF 신호를 받은 송신측은 데이터 송신을 즉시 멈추게 됩니다.
	3. 수신측은 받아놓은 데이터의 처리를 마무리하게 되고, 버퍼에 여유 공간이 다시 생기면 송신측에 XON(transmit on) 신호를 보내게 됩니다.
	4. XON 신호를 받은 송신측은 데이터 송신을 다시 재개합니다.
- Sliding window 방식
    - 2개의 네트워크 호스트간 패킷 교환을 제어하는 방식이며, TCP에서 이 방식을 사용함
    1. 송신측은 sequence number와 window size로 정의된 만큼의 데이터(window)만 일단 수신측으로 전송합니다.
    2. 수신측은 이 데이터를 받고나서 수신을 증명하는 ACK 신호를 송신측으로 보냅니다.
    3. ACK 신호를 받은 송신측은 이어서 다음 차례의 데이터(window)를 수신측으로 전송하게 됩니다.

## Casting
- Unicast
    - 정보 전송 프레임에 송신측의 MAC과 단일 목적지(수신측)의 MAC을 첨부
    - 수신측은 목적지의 MAC이 자신의 MAC과 같다면 수신하여 처리하고, 다르다면 프레임을 폐기함
    - 하나의 특정 수신자에게 전송하는 방법
    - 일반적으로 사용하는 방식
- Multicast
    - 패킷 헤더에 단일 수신측의 MAC 대신 수신측이 참여중인 그룹 주소를 표시하여 전송
    - 사전에 그룹에 가입된 다수의 수신자에게 전송하는 방법
        - IGMP: 호스트와 라우터간의 멀티캐스트 통신 프로토콜
        - CGMP, IGMP snooping: 라우터와 스위치간의 멀티캐스트 통신 프로토콜
        - MRP: 라우터와 라우터간의 멀티캐스트 통신 프로토콜
    - 장점
        - 유니캐스트 구성에서는 동일 패킷을 다수의 수신자에게 중복으로 여러번 전송해야 하는데, 이러한 낭비를 해결함
        - 클라이언트가 여러 멀티캐스트 주소를 받아들일 수 있으므로 수신측은 여러 멀티캐스트 데이터를 동시에 받을 수 있음
    - 단점
        - 라우터가 멀티캐스트를 지원해야만 함
        - UDP를 사용하므로 신뢰성이 보장되지 않음
        - 서버가 멀티캐스트 주소로 데이터를 보내는 도중 클라이언트가 접속하면 데이터를 처음이 아닌 중간부터 받게 됨
- Broadcast
    - 로컬 네트워크에 연결된 모든 불특정 다수에 프레임을 송신
    - 브로드캐스트용 주소가 미리 정해져 있고, 수신측이 이 주소로 데이터를 수신해 처리
    - 네트워크 트래픽이 증가하고, 클라이언트의 처리장치에 부하가 발생
    - 수신측의 MAC을 모르는 경우, 네트워크상의 모든 시스템에 정보를 전파해야 하는 경우, 라우터를 찾거나 라우터간 정보 교환이 필요할 때 사용함

---

## 통신 프로토콜

### 통신 프로토콜의 주요 요소
- Syntax: 데이터의 구조, 형식, 표현 순서
- Semantics: 데이터의 각 비트 영역이 가지는 의미
- Timing: 데이터를 언제 어떤 속도로 전송할 것인가?

### ISO OSI 7계층 & IETF TCP/IP 계층
```
Application      Gateway/Software, L7 switch(DPI)           Application        TCP(HTTP, FTP, SMTP), UDP(DNS, TFTP, SNMP), Telnet, SSH     Message/Data                   Provide application services to end users by delivering parsed data
Presentation     Gateway/Software                           Application        MS-SMB, ASCII, Unicode, MIME, UTF-8, Media codecs           Message/Data                   Define data compression, encryption, and encoding      
Session          Gateway/Software                           Application        TCP, UDP, NetBIOS, TLS, SSH, RPC                            Message/Data                   Define end-to-end application communication, manage duplex modes and TCP/IP sessions         
Transport        Gateway/Software, L4 switch                Transport          TCP, UDP                                                    Segment(TCP)/Datagram(UDP)     Define end-to-end integrity with comm./state/error control
Network          Router, L3 switch                          Internet           IP(IGMP/ICMP), (R)ARP, NDP, BGP, OSPF, RIP, NAT, IPsec      Packet                         Define logical address, packet, routing, security, traffic control    
Data-link        Bridge, L2 switch, Modem, Wi-Fi router     Network Access     Mux, Demux, MAC management                                  Frame                          Define frame and synchronization, perform link-level flow/error control
Physical         Repeater, Hub, Antenna, Coaxial            Network Access     Ethernet, Token Ring, Frame Relay, ATM                      Bit                            Define bit stream, circuitry, and cable
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
OSI Layers       Equipments                                 TCP/IP Layers      Protocols                                                   Protocol Data Unit             Roles
```

---

## 1. OSI 물리 계층 = TCP/IP 네트워크 액세스 계층

### 물리 계층의 역할
- 물리적 연결 장치를 정의
    - 케이블의 규격(꼬임선/동축/광), 구성(접지/신호/전원), 커넥터 모양 등
    - 회선에서의 전기적 신호 형태 (단극성/양극성)
    - bit stream의 형식

### 물리 계층 장비
- 리피터
    - 물리적인 회선의 길이를 연장해줌
        - 입력된 신호를 증폭시켜 다시 출력함
- 허브/공유기
    - 여러 단말들을 접속받아 물리적 회선을 중계함
- 케이블
    - Unshielded twisted pair (UTP)
        - CAT-3 10Mbps, CAT-5 10/100Mbps, CAT-5e 1Gbps, CAT-6 1Gbps
    - Shielded twisted pair (STP)
        - CAT-6 1Gbps, CAT-6a 10Gbps, CAT-7 10Gbps
    - Coaxial cable
        - 100 base 2 (얇음) / 100 base 5 (두꺼움)

### Baseband & Broadband
- Baseband
    - 신호 변조를 사용하지 않고 직접 전송
    - 단일 채널
    - 디지털 신호
    - 양방향
    - bus/ring topology
- Broadband
    - 신호변조기를 사용해 신호를 변조하여 전송
    - 다중 채널
    - 아날로그 신호
    - 단방향
    - bus/tree topology

### Network topology
- Star topology
    - 중앙전송제어장치를 중심으로 단말들을 점대점 연결
    - 장점
        - 장애 발견과 유지보수가 용이함
        - 어떠한 단말의 고장이 다른 단말에 영향을 주지 않음
    - 단점
        - 중앙제어장치에 장애 발생시 전체 네트워크에 장애 발생
        - 중앙제어장치에서 단말이 멀어질수록 케이블 구축 비용 증가
- Bus topology
    - Ethernet(CSMA/CD)에서 사용하며, backbone 케이블에 단말들을 tap하여 연결
    - 장점
        - 새로운 노드를 추가하기에 용이함
    - 단점
        - 케이블 중간에 장애 발생 시 전체 네트워크로는 전송 불가
        - 노드 개수가 증가하면 전송 속도가 저하됨
        - 네트워크 부하가 증가하면 응답시간이 늦어짐
- Inverse tree topology
    - star와 bus의 혼합형
    - 장점
        - 건물의 층내 및 층간 네트워크 구성에 용이
        - 성능이 좋은 스위치를 중심으로 계층적 구성이 가능함
            - 각 노드간 신호 이동 거리를 증가시킬 수 있음
    - 단점
        - 허브간 연결이 끊어질 경우 그 끊긴 허브에 종속된 단말들은 통신 장애 발생
- Ring topology
    - 2중으로 ring을 구성하면 장애 발생에 대비해 신뢰성을 보완할 수 있음
- Mesh topology
    - 모든 노드들을 서로 연결하기 때문에 장애에 대한 신뢰성이 가장 높으나, 구축에 필요한 회선 비용이 커짐

---

## 2. OSI 데이터링크 계층 = TCP/IP 네트워크 액세스 계층

### 데이터링크 계층의 역할
- 물리적 차원을 넘어 링크와 노드를 구성하는 논리적 회선을 구성
- 링크와 노드 수준에서 어떻게 데이터를 잘 주고받을 수 있을까?
    - 프레임 구조, 오류 제어, 흐름 제어, 접근 권한 제어, 동기화 등을 규정함
    - 물리적/하드웨어적 주소인 MAC 주소를 기반으로 노드들을 관리함
    - 시분할 (S)TDM 또는 주파수분할 FDM 방식 등을 통해서 mux-demux를 수행
- HDLC frame
    - 8-bit frame delimiter start flag 
    - Frame header
        - 8/16-bit address
        - 8/16-bit control
    - Information field
    - 16/32-bit frame check sequence (FCS)
    - 8-bit frame delimiter end flag

### Mux & Demux
```
AAAAAAA ↘                                    ↗ AAAAAAA
BBBBBBB → (MUX) → ABABCBCBABCCAABA → (DEMUX) → BBBBBBB
CCCCCCC ↗                                    ↘ CCCCCCC
```
- Multiplexing: 송신측이 다중 채널 데이터를 시간/주파수/코드로 나뉜 단일 회선에다가 싣는 것
- De-multiplexing: 수신측이 단일 회선으로 도착한 데이터를 각 채널별로 분리시키는 것

### 데이터링크 계층 장비
- 브리지/스위치
    - MAC 주소를 기반으로 여러 단말들을 접속받아 교환 기능을 수행

---

## 3. OSI 네트워크 계층 = TCP/IP 인터넷 계층

### 네트워크 계층의 역할
- 수신측 주소를 기반으로 경로 설정을 해서, 데이터가 목적지까지 잘 찾아가게 하는 기능을 수행함
    - 논리적 회선 위에 있는 송신측과 수신측의 논리적 주소를 설정하고 관리함
        - 경로지정을 통해 트래픽을 제어함
        - 논리적 주소의 제어를 통해 네트워크 보안 구성
    - 송신측이 정보를 패킷이라는 데이터 단위로 구성해 보내면, 수신측은 받은 패킷을 분해해서 정보를 취득하는 구조

### 네트워크 계층 장비
- 라우터
    - 네트워크에서 경로설정 기능을 수행함

### 라우팅 프로토콜
- IP 패킷을 목적지까지 전달하기 위해서, 라우터들이 인접한 라우터들과 경로 정보를 주고받아, 이를 라우터 테이블에 저장해, 패킷의 경로를 미리 설정하는 프로토콜
    - 정적 라우팅
        - 관리자가 수동으로 라우터에 명령어를 입력해 직접 경로를 설정함
        - 구성이 간단하고 경로를 확실하게 지정할 수 있음
            - 정적 라우팅은 동적 라우팅보다 우선 순위가 높음
        - 네트워크에 장애나 혼잡이 발생할 경우 이에 유연하게 대처하기 어려움
        - stub 및 소규모 네트워크에서 사용
    - 동적 라우팅
        - 네트워크 상태에 따라 라우팅 테이블이 생성되고, 이에 기반해 경로를 동적으로 설정
            - e.g. 최단 링크 라우팅, 최소 hop count 라우팅, 최상의 링크 상태에 기반한 라우팅
            - 라우터에서는 경로 정보를 지정된 주기대로 업데이트함
            - 라우팅 테이블에는 목적지(host)와 목적지로 갈 수 있는 이웃 라우터(hop)가 기재되어 있음
- 라우팅 프로토콜의 목적
    - 최적의 경로 설정을 위해서
    - 패킷이 목적지가 아닌 출발 라우터로 되돌아와 계속 맴도는 routing loop을 방지하기 위해
    - 경로 정보를 갱신함으로써 트래픽 발생을 최소화
    - 네트워크 환경 변경에 수월한 convergence를 위해서
- 라우팅 경로 설정 요소
    - Hop count: 낮을수록 좋음
    - Link state (=bandwidth): 높을수록 좋음
    - Maximum Transmission Unit: 나머지 조건이 동일하다면, 높을수록 좋음
- 라우팅 정보처리 방식
    - Source routing
        - 송신 호스트가 목적지까지 전달경로를 결정하는 방식
            - 송신 호스트에서 라우팅 테이블에 모든 경로 정보를 관리함
        - 경로 정보를 전송패킷 헤더에 기록하면, 중간 라우터가 이를 전달함
        - 데이터그램 방식에 이를 적용할 경우, 경로 정보가 없는 일반적인 데이터그램 방식보다 신뢰성이 높아짐
    - Distributed routing
        - 패킷의 전송경로에 위치한 각 라우터가 효율적인 경로 결정에 참여함
        - 주로 데이터그램 방식에서 많이 사용함
        - 네트워크에 있는 호스트 수가 많아질수록 다른 방식보다 효과적임
    - Centralized routing
        - 중앙 routing control center에서 전송경로에 대한 모든 정보를 관리하는 방식
        - 패킷 전송을 원하는 호스트는 일단 반드시 RCC로부터 경로 정보를 얻은 다음, 이후 source routing 방식처럼 데이터 전송
        - 일반 호스트들의 라우팅 부담이 줄어들지만, 네트워크 규모가 커지면 RCC에 트래픽이 과중해져 효율이 떨어짐
    - Hierarchial routing
        - 분산 라우팅 + 중앙 라우팅
- Inter Gateway Protocol (IGP)
    - 단일 관리자가 운영하는 자율 시스템(autonomous system) 내부에서 동작함    
        - Routing Information Protocol (RIP)
            - 목적지까지 거치는 라우터의 수(hop count) 기반의 동적 라우팅 프로토콜
                - 목적지에 도달하는 오직 하나의 경로만 존재함
                - 최대 15 hop count까지 인식함
                - 30초마다 인접 라우터와 자신의 모든 라우팅 테이블 정보를 브로드캐스트 및 수신하여 공유
                    - 현재의 hop count보다 낮은 hop count인 경우에만 경로 정보를 업데이트
                - 180초 경과 후에도 라우팅 정보를 받지 못하면 해당 경로를 라우팅 테이블에서 삭제함
                - 라우터들은 이웃 라우터들과 대등한 수평적인 관계
                - 거리벡터 알고리즘 사용
                - RIPv1은 class-full IP routing만 지원하며, 브로드캐스트 사용해 업데이트함
                - RIPv2는 classless IP routing을 지원하며, 멀티캐스트를 사용해 업데이트하고, VLSM을 지원함
            - 장점
                - 구현과 운영이 간단함
                - 표준 라우팅 프로토콜으로써 모든 벤더가 지원함
            - 단점
                - 네트워크 구성에 있어서 최대 15 hop count가 제한적일 수 있음
                - 최적의 경로를 하나밖에 설정하지 못함
                - 거리벡터 알고리즘을 사용하므로 수렴 시간이 길어짐
                    - 이로 인해 routing loop이 발생할 수 있음
                - 라우팅 테이블이 큰 경우 대역폭이 낭비될 수 있음
                    - split horizon으로 개선: 라우팅 정보를 보내준 곳으로는 해당 라우팅 정보를 보내지 않음
                - 대역폭을 감안하지 않기 때문에, hop count가 낮더라도 비효율적인 경로일 수 있음
                - 장애 발생 시 복구 시간이 길어짐
                    - route poisoning으로 개선: 회선이 고장난 경우 hop count를 16으로 설정해 전체 네트워크에 전파
                    - triggered update로 개선: topology 변화를 네트워크에 즉각적으로 전달
                    - hold-down time으로 개선: down이 발생한 경우, 일정 시간 동안은 동일 정보에 대한 변경을 받아들이지 않음
        - Open Shortest Path First (OSPF)
            - 목적지까지 가는 링크 상태 기반의 동적 라우팅 프로토콜
                - 네트워크를 영역으로 구분, 계층화된 라우팅 사용
                    - 백본 영역인 Area 0과 일반 영역인 Area 1/2/3
                    - 각 영역은 독립적으로 OSPF를 수행함
                        - 라우터의 브로드캐스트는 영역 내로 제한됨
                - Shortest Path First (SPF) 알고리즘으로 최단 우선경로를 찾아 라우팅 테이블에 등록한 다음, 대역폭을 기반으로 계산한 cost가 가장 적게 드는 경로를 결정함
                - 대역폭이 클수록 cost는 적음
            - 장점
                - 모든 라우터가 동일한 topology DB를 기반으로 경로를 계산하므로 routing loop가 발생하지 않음
                - 네트워크 변화시에만 라우팅 정보를 전송하므로 라우팅 트래픽의 양이 적어짐
                - 갱신 정보를 모든 인접 라우터로 확산 전파하는 flooding의 범위가 줄어들기 때문에 갱신 속도를 높일 수 있음
                - 장애 발생 등으로 topology 변경시 link-state packet 기반의 상태 공유로 신속하게 적응을 할 수 있음   
        - Interior Gateway Routing Protocol (IGRP)
            - Cisco에서 개발한 라우팅 프로토콜
            - 대역폭/지연/신뢰도/부하/MTU 등 다양한 metric을 적용해 거리벡터를 계산함
            - 오버헤드 및 라우팅 트래픽을 최소화하며, 멀티패스 라우팅을 지원함
            - 부분적 정보 갱신, 빠른 수렴 속도, VLSM 지원 등, IGRP를 개선한 EIGRP이 있음
- Exterior Gateway Protocol (EGP)
    - AS간에 동작함
        - Border Gateway Protocol (BGP)
            - TCP 포트를 사용하는 연결 지향형 고신뢰 프로토콜
            - 외부 라우팅의 특성상 경로벡터 알고리즘을 사용함
                - 경로벡터 알고리즘은 거리벡터의 hop count 대신 AS 번호를 사용함
                    - routing loop을 방지할 수 있음
            - 동일한 AS간에는 Internal BGP를, 상이한 AS간에는 External BGP를 사용함


---

## 4. OSI 전송 계층 = TCP/IP 전송 계층

### 전송 계층의 역할
- 네트워크 계층에서 수립된 경로에 기반해, 송신측과 수신측이 실제로 패킷을 온전하게 주고받을 수 있는지 그 종단간 완전성을 보장하는 역할을 함
    - 데이터링크 계층이 '노드와 노드 사이의 링크' 차원에서의 통신 방법을 정의한다면,
    - 전송 계층은 '송신 호스트와 수신 호스트라는 각 노드' 차원에서의 통신 방법을 정의함
- 패킷의 분할/병합, 흐름 제어, 전송량 조절, 오류 검출 등을 통해 데이터가 실제로 목적지까지 도착하는지 확인
    - 애플리케이션간에 데이터를 주고받을 수 있는 가상의 데이터 연결 통로를 수립해줌
- 오류 제어
    - Stop-Wait ARQ
    - Go-Back-N ARQ
    - Selective ARQ

### 전송 계층 장비
- 게이트웨이
    - 이기종 네트워크간 상호접속 기능을 수행함

### Capsulation
- Encapsulation: 송신측에서 데이터에 제어정보를 부가하는 과정
- Decapsulation: 수신측에서 데이터로부터 제어정보를 제거하는 과정

### TCP & UDP
- Transmission Control Protocol
    - 양방향 전송
        - 데이터를 동시에 양방향으로 전송하는 full-duplex service
    - (논리적) 연결형 서비스 
        - End-to-end 서비스 = 송신측과 수신측이 서로 통신을 시작하기 전에 반드시 TCP 연결을 establish 해야 함
    - 송신측은 전송할 데이터를 '세그먼트' 단위로 나누어 여기에 일련변호, 수신주소, 에러검출코드를 추가해서 보냄
        - 물이 흐르듯 끊임없이 연속되는 바이트 열인 byte stream에다가 가변적인 sliding window 방식의 flow control을 적용
        - 송신측은 보내는 데이터에다가 '데이터를 문제없이 받았다면 수신측은 응답하세요'라는 신호를 함께 전송함 = piggybacking
            - 데이터 없이 단순 응답 신호만 요청하는 것도 가능함
        - 이 데이터가 도착시 수신측은 패킷을 순서대로 조합하고, 에러가 발견된 경우 송신측에 재전송을 요청
        - 수신측의 인증이 필요함
    - 오버헤드가 비교적 높음
    - 높은 신뢰성, 비교적 느린 속도
        - 대용량/고신뢰 데이터 전송에 활용됨
        - TELNET, FTP, SMTP, HTTP, etc.
    - TCP 세그먼트 구성
        - 20-byte IP 헤더 + TCP 세그먼트 
            - TCP 세그먼트 = 20-byte TCP 헤더 + TCP 데이터
                - 20-byte TCP 헤더의 내용
                    - 16-bit 발신지 포트 주소 + 16-bit 목적지 포트 주소
                    - 32-bit 세그먼트 번호
                    - 32-bit 응답 번호
                    - 4-bit HLEN + 6-bit 예약 + URG/ACK/PSH/RST/SYN/FIN + 16-bit window size
                    - 16-bit checksum + 16-bit urgent pointer
                    - options and padding
    - TCP 주소 표현
        - TCP 소켓: 호스트 IP 주소 + 전송 포트
        - 포트 번호로 통신 프로세스 및 상위 응용 서비스를 구분함
            - 주요 포트: 1 ~ 1023
                - FTP: 21
                - TELNET: 23
                - SMTP: 25
                - HTTP: 80
            - 임의 포트: 1024 ~ 65536
    - TCP 연결 수립
        - piggyback 방식의 3-way handshake
            1. Client → (SYN) → Server
            2. Client ← (SYN+ACK) ← Server
            3. Client → (ACK) → Server
    - TCP 연결 해제
        - 4-way handshake
            1. Client → (FIN) → Server
            2. Client ← (ACK) ← Server
            3. Client ← (FIN) ← Server
            4. Client → (ACK) → Server
    - TCP 타이머
        - TCP persist timer
            - 수신측의 window size가 증가하는지를 확인하기 위해 송신측에서 구동함
            - window size가 0인 패킷을 수신할 때 동작
        - TCP retransmission timer
            - RTT보다 다소 큰 수치로 설정하면 됨
                - Round-trip time: 송신측에서 출발한 세그먼트가 수신측에 도착해서, 송신측에 '승인'을 되돌려보내는 데 소요되는 시간
                - 연결거리의 차이, 일시적 지연시간, 변동성 등으로 인해 RTT는 일정하지 않음
    - TCP Silly Window Syndrome
        - 송신측 문제
            - 송신측이 일정 크기 이하의 작은 데이터만 보낼 때, 매우 큰 오버헤드가 발생하는 현상
            - e.g. 3바이트의 데이터를 보낼 때,
                - 송신측에서 생성해야 하는 세그먼트는 IP헤더 20바이트 + TCP헤더 20바이트 + TCP 데이터 3바이트 = 43바이트
                - 3바이트만 보내는 대신 43바이트를 보내야 하므로 매우 비효율적
            - 해결책
                - Nagle's algorithm
                    1. 첫 데이터일 경우 송신측에서 세그먼트로 만들어서 전송
                    2. 수신측으로부터 ACK 응답이 올 때까지 대기
                    3. 수신측으로부터 ACK 응답이 오면, 최대크기의 세그먼트 구성(maximum segment size)이 가능할 정도로 충분한 데이터가 버퍼에 차면, 그 때 세그먼트로 만들어서(clumping) 전송
        - 수신측 문제
            - 송신측이 일정 크기 이하의 작은 데이터만 보낼 때, 수신측은 조금씩 천천히 데이터를 처리하게 되고 버퍼가 가득 차게 됨
                - 이에 수신측은 window size를 줄이게 되고, 송신측 역시 여기에 맞춰 국소 데이터를 전송하게 되는 현상
            - 해결책
                - David Clark's solution
                    - 다음의 조건이 충족되기 전까지는 window를 닫음 (=window size를 0으로 설정해서 보냄)
                        - 버퍼가 새로운 최대 세그먼트 크기만큼 비어있어서 온전한 세그먼트 데이터를 받을 수 있을 때
                        - 버퍼가 절반 이상이 비어있을 때
                - Delayed acknowledgement
                    - 수신측은 수신 버퍼에 충분히 데이터가 쌓일때까지, 송신측으로 ACK 응답을 보내는 것을 보류함
                        - 수신측은 window를 일단 통보하지 않고, window size가 one-full-size 세그먼트 또는 수신 버퍼의 절반 이상이 되면, 그때 통보함      
                    - 송신측은 수신측에 충분한 데이터를 보낼 수 있을때까지, 수신측으로 ACK 응답을 보내는 것을 보류함
                        - one-full-size 세그먼트 또는 수신측이 통보한 maximum-sized window의 절반 이상을 보낼 수 있을 때, 그때 통보함
                    - 다만 장기간 대기하게 되는 경우 송신측에서 데이터를 다시 보냄
                        - 무리한 지연을 방지하기 위해서는 확인 응답 지연을 500ms 미만으로 설정
                    
- User Datagram Protocol
    - 단방향 전송
    - 비 (논리적) 연결형 서비스
        - 데이터 전송 경로를 사전에 정하지 않음
    - 수신측은 데이터가 무결하고 정확하게 전송되었는지를 확인하지는 않음
    - 송신측은 전송할 데이터를 '데이터그램' 단위로 한꺼번에 대용량으로 전송함
        - 라우팅이 복잡할 경우 패킷 유실 우려가 있음
    - 헤더의 크기가 작아 오버헤드가 비교적 낮음
    - 낮은 신뢰성, 비교적 빠른 속도
        - 실시간 통신, 화상 통화, 동영상 전송, 단순 메세지 전송, 망 관리 데이터 전송 등에 활용됨
        - DNS, Simple Network Management Protocol (SNMP), Trivial FTP (TFTP), Network File System (NFS), etc.

---

## 5. OSI 세션 계층 = TCP/IP 애플리케이션 계층

### 세션 계층의 역할
- 데이터 교환 수준을 넘어, 연결성 측면에서 송신측과 수신측이 연결을 지속할수 있도록 함
    - 송신측과 수신측 사이의 대화 채널을 수립 및 관리
    - e.g. 두 사람이 유선 전화 통화를 하는 경우를 예로 들자면,
        - 물리 계층부터 전송 계층까지는
            - 두 사람이 실제로 전화기를 가지고 있고,
            - 전화기가 구리선으로 PSTN에 연결이 제대로 되어 있고,
            - circuit switch 교환기를 통해 두 전화기 사이에 경로가 설정되어 있으며,
            - 그 경로를 통해 각 화자가 하는 '말'이 상대방에게 그대로 전달되는지에 관한 것이라면,
        - 세션 계층의 경우 상대방이 실제로 수화기를 들고 있는지 확인한다던가, 만약 상대방이 수화기를 내려놓았다면 본인 수화기도 내려놓는 등의 '연결 상태' 관리를 하는 역할
- 애플리케이션간의 '접속 여부', 즉 '세션'을 구축/관리/제어하는 역할을 함
    - 전송 모드: full-duplex / half-duplex / simplex
    - 동기화 기능: 데이터스트림에 동기점을 추가할 수 있음

---

## 6. OSI 표현 계층 = TCP/IP 애플리케이션 계층
- 데이터의 부호화/암호화/복호화/압축

---

## 7. OSI 응용 계층 = TCP/IP 애플리케이션 계층

### 응용 계층의 역할
- 애플리케이션 및 UI

### HTTP 프로토콜

### HTTP 프로토콜 메세지
- 요청 메세지 구조
    - Start Line = [HTTP method] [Request target URL] [HTTP version]
        - e.g. `GET /index.html HTTP/2`
    - Header = [Header field]: value
        - e.g. 
            - `Host: www.wikipedia.org`
                - 서버의 도메인 네임과 포트
                - Host는 반드시 헤더에 포함이 되어야 함
            - `User-Agent: Mozilla/5.0 ...`
                - 클라이언트가 사용하는 웹브라우저, 버전, 기기 등의 정보
            - `Referer: https://www.wikipedia.org/w/index.php`
                - 요청을 보낸 이전 웹페이지의 주소
                - 문법상 올바른 스펠링은 Referrer지만 HTTP 표준을 수립할 당시에 오타가 발견되지 않은 채로 제정되어버림
            - `Accept: text/html`
                - 요청에 대한 서버의 응답으로써 클라이언트가 이러한 MIME의 데이터를 수신하기를 기대한다는 의미
            - `If-Modified-Since: datetime`
                - 데이터의 최종 수정 datetime
            - `Authorization: Bearer ##############`
                - API 사용 등을 위해 클라이언트에서 서버로 보내는 인증 토큰 정보
            - `Origin: https://www.wikipedia.org`
                - 요청이 어느 주소에서 시작되었는지를 나타냄
                - CORS prevention을 위해서는 요청을 보낸 주소와 받는 주소가 같아야 함
            - `Cookie: key1=value1; key2=value2;`
                - 클라이언트가 서버에 쿠키를 보내줄 때 여기에 담아서 보냄
    - (blank line)
    - Body
- 응답 메세지 구조
    - Start Line = [HTTP version] [Status code] [Status message]
        - e.g. `HTTP/2 200 OK`
    - Header = [Header field]: value
        - e.g. 
            - `Location: https://www.wikipedia.org/index.html` 
                - Redirect와 관련된 3xx Error 응답 또는 성공적인 201 Created 응답일 경우, 이후 어느 웹페이지로 redirect를 해야할지를 명시함
            - `Server`
                - 서버의 정보 
            - `Age: 30`
                - 객체가 프록시 캐시에 머무르는 시간
                - 서버에서 최근에 받은 데이터일수록 낮음
            - `Referrer-Policy: no-referrer`
                - 응답에 포함될 referrer 정보에 대한 정책을 설정 
                - 요청 메세지의 일부인 Referer와 스펠링이 다르므로 주의할 것!
            - `WWW-Authenticate`
                - 서버가 클라이언트에게 요구하는 realm별 authentication 정보
            - `Set-Cookie: key1=value1; key2=value2; options;`
                - 클라이언트측에 이러한 쿠키를 저장하라고 서버가 보내주는 응답
    - (blank line)
    - Body
- 요청/응답 공통 헤더
    - `Date: datetime`: HTTP 메세지가 만들어진 datetime
    - `Connection: keep-alive`: HTTP/1.1의 기본값이며 별 의미 없음
    - `Cache-Control: no-store`
        - 로컬 캐시를 제어하는 
    - `Content-Type: text/html`
        - 컨텐츠의 MIME과 문자열 인코딩 등을 명시함
    - `Content-Encoding: deflate`
        - 컨텐츠 압축 및 해제 메커니즘을 명시함
### 쿠키와 세션
- 쿠키
- 세션

- JSON Web Token

# 작성중...