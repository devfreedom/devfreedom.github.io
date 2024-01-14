---
title: "[놀이터] [홈서버] Caddy와 Cloudflare DDNS를 사용해 웹 서비스를 안전하게 개방하기"
date: 2024-01-14T20:43
thumb: "home-server.jpg"
tags: 
    - ❮놀이터❯
    - 홈서버
    - 네트워크
    - DevOps
    - Caddy
    - proxy
    - Cloudflare
---

홈서버는 기업용이 아니라 가정용 인터넷 서비스 환경을 기반으로 세팅을 하게 됩니다. 인터넷 서비스 제공자(ISP)인 통신사는 가정용 인터넷 회선에 공인(public) IP 주소를 할당하게 되고, 이 회선에 연결된 공유기는 공인 IP를 사용해 가정용 네트워크와 외부 인터넷 사이의 통신을 수행하게 됩니다. 예를 들어 제가 가입한 인터넷 회선이 123.45.67.8이라는 공인 IP 주소를 할당받았고 이 회선을 유무선공유기에 연결했다면, 인터넷상에서 누구든 이 주소를 사용해서 제 공유기를 찾아올 수 있습니다. 그리고 공유기는 접속된 기기들을 묶어 독립적인 사설(private) 네트워크를 구성하는데, 이 네트워크는 인터넷과는 분리된 별개의 지역적(local) 네트워크입니다. 공유기에 연결된 기기들에게도 주소가 필요하므로 공유기는 사설 네트워크에 속한 각 기기마다 사설 IP 주소를 할당해주게 됩니다. 여기서는 제 공유기가 홈서버와 스마트폰에다가 각각 192.168.219.123과 192.168.219.124라는 사설 IP를 부여했다고 예를 들어 봅시다.

홈서버를 가정 내에서만 사용하려면 굳이 복잡한 설정이 필요하지는 않을겁니다. 그냥 홈서버를 공유기에 연결해 사설 네트워크에 포함시키면 됩니다. 그러면 공유기에 연결되어있는 모든 기기들은 홈서버에 쉽게 접속을 할 수 있습니다. 만약 홈서버의 어떤 웹 서비스가 8080 포트를 열어 제공을 하고 있다면 그냥 스마트폰에서 http://192.168.219.123:8080 주소로 접속을 하면 사용을 할 수 있고, 공유기가 구성한 로컬 네트워크 내부에 속한 기기들만 접속이 가능하니까 공유기의 보안만 충분하다면 매우 안전합니다. 

다만 일반적으로 '서버' 용도로 사용을 한다는 것은 가정 내의 사설 네트워크 뿐만 아니라 인터넷을 통해 외부에서도 접속하는 환경을 전제로 하죠. 그래서 공유기 내부의 로컬 네트워크 안에서만 갇혀있는 홈서버의 서비스를, 공인 IP를 할당받았으므로 인터넷상에 존재하고 인터넷과 통신을 할 수 있는 공유기를 통해 외부에 개방하고 노출시켜줘야 합니다. 이를 위해 공유기의 NAT 기능 중 포트포워딩(port forwarding) 기능을 일반적으로 사용합니다. 

## 단순 포트포워딩의 위험성

NAT(Network Address Translation)이란 패킷에 적힌 출발지와 목적지 IP 주소 및 포트 등을 원하는대로 다시 기록해서 라우터간에 주고받을 수 있게 해주는 기술입니다. NAT이 담당하는 기능들 중에서 '포트포워딩(port forwarding)'의 경우 사설 네트워크의 특정 포트를 인터넷의 특정 포트랑 연결시켜줍니다. 즉, 인터넷으로부터 공인 IP의 특정 포트를 통해 공유기 안으로 들어오는 트래픽을 사설 네트워크 내부의 특정 IP와 포트로 향하게끔, 반대로 사설 네트워크 내부의 특정 IP에서 특정 포트를 통해 공유기 밖으로 나가는 트래픽을 공인 IP의 특정 포트로 향하도록 교통경찰 역할을 해줍니다. 포트포워딩을 사용하면 공유기의 공인 IP를 사설 네트워크에 있는 홈서버의 사설 IP에다가 특정 포트들을 통해 연결시켜 줄 수 있고, 이를 통해 사설 네트워크 외부에서도 인터넷을 통해 사설 네트워크 내부의 홈서버 서비스로 접속을 할 수 있게 됩니다. 

암호화되지 않은 일반적인 HTTP 통신에 사용되는 포트는 80인데요, 예를 들어 인터넷상에서 누군가 HTTP 통신을 사용해서 제 공유기로 접속을 하려면 123.45.67.8:80라는 주소를 사용하게 됩니다. 만약 80 포트를 통해 공유기로 들어오는 HTTP 트래픽을 공유기 내부에 있는 홈서버인 192.168.219.123가 8080 포트를 통해 구동중인 웹 서비스로 향하도록 포트포워딩을 설정해준다면, 누구든 http://123.45.67.8:80 이라는 외부 주소를 통해 진입해, 공유기의 포트포워딩 기능을 타고, 내부 주소 http://192.168.219.123:8080 에서 구동중인 제 홈서버의 웹 서비스에 도달할 수 있는거죠.

하지만 이렇게 내부 시스템인 홈서버의 사설 IP를 인터넷상에 공개된 공인 IP에다가 포트포워딩을 통한 단순 포트 연결로써 그대로 외부에 노출해두면 각종 네트워크 공격의 쉬운 표적이 될 수 있습니다. 암호화되지 않은 HTTP 통신을 들여다보고, IP 대역을 스캔하고, 열려있는 포트에 침입하고, 무차별 대입(brute-force) 공격을 일삼는 온갖 봇들이 활개치는 요즘 인터넷 환경에서는 굉장히 위험합니다. 그래서 사설 네트워크 내부의 웹 서비스를 외부로 안전하게 개방하는 것이 중요합니다. 

## 홈서버를 안전하게 개방하고 접속하는 두 가지 방법

여러가지 방법들이 있지만, 대표적으로 두 가지 방법이 있습니다. 먼저 사설 VPN을 구축하는 방법인데요, 가정용 사설 네트워크는 인터넷상에 노출하지 않은 채 그대로 고립시켜두고, 대신에 외부에서도 VPN 터널을 통해 사설 네트워크로 직접 1:1 접속할 수 있는 VPN 게이트웨이 서버와 클라이언트를 구축하는 방법입니다. 대표적으로는 WireGuard를 활용하는 방법이 있습니다. 다만 이 경우에는 사설 네트워크 내부로의 접속이 허락된 특정 사용자 및 클라이언트 기기들에다가 VPN 접속 환경을 일일이 마련해주어야 하고, VPN 서버를 구축하고 설정하는 방법도 다소 복잡한 편입니다(다만 리눅스 호스트에서 WireGuard 설정을 쉽게 도와주는 [wg-easy](https://github.com/wg-easy/wg-easy)라는 프로젝트가 있기는 합니다). 접속 권한과 환경 자체를 명백하게 허가해주어야하는 구조상 상당히 안전한 방식이기는 합니다. 

다만 VPN 자체가 사설 네트워크로 진입하는 전용 직통 도로다보니, 만약 클라이언트 기기가 keylogger라던가 remote access trojan 등의 악성코드의 영향을 받고 있어서 공격자가 VPN 접속 과정을 이미 들여다보고 있는 경우라던가, 클라이언트와 연결된 제3자 네트워크가 이미 공격자에게 침해당한 상태라면 오히려 홈서버를 넘어 사설 네트워크 전체가 공격자에게 무방비로 노출되어버리는 사태가 발생할 수 있어서 완전히 안전한 방법은 아닙니다.

두번째는 리버스 프록시(reverse proxy)를 사용하는 방법입니다. 프록시 서버는 클라이언트와 서버 사이의 통신을 대리해주는 중계기 역할을 합니다. 클라이언트의 바로 앞에 자리잡아 클라이언트의 정체를 숨겨주거나 클라이언트의 인터넷 접속을 필터링하는 역할을 하는 프록시 서버를 '포워드 프록시', 반대로 서버의 바로 앞에 자리잡아 서버의 정보를 숨겨주고, 부하를 분산시켜주고, 캐싱과 암호화/복호화를 수행해주는 프록시 서버를 '리버스 프록시'라 합니다. 홈서버가 자리잡은 사설 네트워크의 정보를 숨기고, 사설 네트워크의 안팎을 오가는 통신을 대신 암호화하고, 네트워크 내부로의 진입 과정에서 벌어지는 외부의 공격을 차단하기 위해서는 리버스 프록시가 필요합니다. 

리버스 프록시는 구축이 비교적 쉽고, 웹 서비스가 구동중인 실제 홈서버의 정보가 1차적으로 노출되지 않는데다가, 리버스 프록시 단계에서 HTTPS 통신을 구현준다면 트래픽의 내용이 암호화되어 추가적인 보안을 제공합니다. 여기서는 리버스 프록시를 사용하고자 합니다. 다만 리버스 프록시는 인터넷에 노출되는 홈서버의 실제 정보를 가려주는 위장막(obfuscation layer)일 뿐, 그 자체로 보안 장벽(security layer) 역할을 하지는 않습니다. 리버스 프록시를 사용하더도 만약 구동중인 웹 서비스에 공격자가 접근할 수 있고 웹 서비스의 보안 결함을 악용할 수 있다면 홈서버가 공격당하거나 사설 네트워크가 침입될 수 있습니다. 그래서 리버스 프록시와 함께 추가적인 보안 대책이 필요합니다.

프록시 서버로는 Nginx가 가장 잘 알려져 있습니다. 하지만 개인적으로 Caddy를 추천하고 또 사용하는데는 이런 이유들이 있습니다. 홈서버 용도로는 Caddy 정도면 쉽고 충분하다는 생각입니다.

- 자동으로 HTTPS 구성
    - 가장 중요하고 뛰어난 기능이 아닐까 싶습니다. HTTPS 보안 통신을 수동으로 구현하기 위해서는 SSL 인증서를 발급받고 갱신하고 하는 복잡한 설정들이 필요한데, Caddy는 Let's Encrypt 기반 무료 인증서를 자동으로 발급 및 갱신해 HTTPS를 스스로 설정해줍니다. TLS 1.3 및 HTTPS/3를 지원하는 최초의 프록시 서버이기도 합니다.
- 충분히 좋은 성능
    - Caddy는 Go 언어로 제작되었습니다. 메모리 관리를 위한 가비지 컬렉션이 작동하므로 nginx에 비해서 램 사용량이 높기는 하지만, Caddy는 Nginx를 비롯해 다른 프록시 서버들의 성능을 능가하는 경우가 많다고 합니다. Caddy vs Nginx의 성능 벤치마크는 [35 Million Hot Dogs](https://blog.tjll.net/reverse-proxy-hot-dog-eating-contest-caddy-vs-nginx/#summary) 라는 재치있는 이름의 실험에서 보다 구체적으로 확인할 수 있습니다.
- 가볍고 간결한 설정 환경
    - Caddy는 Caddyfile이라는 YAML 형식의 설정 파일을 사용합니다. Nginx도 Nginx Proxy Manager를 사용하면 Web UI 형태의 시각적인 설정 환경이 가능하지만, 몇 줄의 코드만 작성해주면 되는 Caddy가 가볍고 간결하다는 생각입니다.

 아래의 설명은 데비안 계열 리눅스 환경의 홈서버에서 설정하는 방법입니다.

## 1. 리버스 프록시를 사용하기 위해 사설 네트워크 설정하기

우선은 사설 네트워크에서 설정해줄 것들이 있습니다.

1. 공유기에는 사설 네트워크 내부에 있는 클라이언트들의 사설 IP를 자동으로 동적으로 관리해주는 DHCP 기능이 있습니다. 공유기가 DHCP 서버 역할을 맡아 각 클라이언트들에게 사설 IP를 알아서 부여하고 회수하게 되는데요, 홈서버는 어차피 24시간 365일 켜져있고 공유기에 항상 연결이 되어있어야 하므로 굳이 IP가 바뀌어야 할 이유가 없습니다. 그래서 유지보수의 편의성 차원에서 사설 IP를 고정해주는 것이 좋습니다.
    - 공유기의 관리자 설정 페이지에 들어가면 DHCP 기능 중 '고정 할당' 항목이 있습니다. 여기에다가 홈서버를 추가해주면 됩니다.
        - 예: 홈서버의 하드웨어 MAC 주소가 01:23:45:67:89:AB라면 여기에다가 192.168.219.123이라는 고정된 IP를 할당하도록 추가해줍니다. 그러면 이제부터 공유기가 관리하는 사설 네트워크에서 홈서버는 192.168.219.123이라는 고정된 사설 IP 주소를 가지고 이는 변하지 않습니다.
2. 이제는 포트포워딩을 해주어야 합니다. 단, 인터넷상에 공개된 공유기의 공인 IP 및 HTTP 포트를 사설 네트워크 있는 홈서버의 서비스 포트로 직접 연결해주는 위의 예시와는 달리, 리버스 프록시 서버인 Caddy의 서비스 포트에다가 대신 연결해줍니다. 즉, 인터넷을 홈서버의 웹 서비스와 직접 연결하는 대신 인터넷을 일단 '대리인(proxy)' 역할을 하는 Caddy에다가 연결해주는 작업이라고 생각하시면 됩니다. 
    - 여기서는 비보안 HTTP 통신의 표준 포트인 80 포트를 통해 들어오는 모든 트래픽은 Caddy가 8080 포트를 통해서, 그리고 보안 HTTPS 통신의 표준 포트인 443 포트를 통해 들어오는 모든 트래픽은 Caddy가 8443 포트를 통해서 1차적으로 받도록 진행할 예정입니다. Caddy를 홈서버의 웹 서비스에 연결해주는 작업은 나중에 Caddy를 설치하고 Caddyfile을 편집해서 진행할겁니다.
    - 이를 위해서 공유기의 관리자 설정 페이지에 들어가 포트포워딩 기능을 설정해줍니다.
        - (공유기가 수신하는 HTTP 통신의 표준 포트인) 80 포트를, (홈서버의) 사설 IP 192.168.219.123가 구동하는 (Caddy 리버스 프록시 서버의) 8080 포트로 보내도록 새로 항목을 추가합니다.
        - (공유기가 수신하는 HTTPS 통신의 표준 포트인) 443 포트를, (홈서버의) 사설 IP인 192.168.219.123가 구동하는 (Caddy 리버스 프록시 서버의) 8443 포트로 보내도록 새로 항목을 추가합니다.
    - 이렇게 하면 공유기를 통해 홈서버로 들어오는 모든 HTTP 및 HTTPS 트래픽은 일단 리버스 프록시인 Caddy가 1차적으로 받아 적절하게 처리하게 됩니다. 8080이나 8443 대신 다른 포트를 사용해도 상관은 없습니다만, 나중에 Caddyfile에서 기본 포트를 해당 값으로 지정해주는것 잊지 마세요.

## 2. 가정용 인터넷 회선의 유동 IP를 Cloudflare DDNS로 대응하기

고정된 공인 IP가 필요하고 이를 추가 비용으로 할당받을 수 있는 기업용 인터넷 회선과 달리, 가정용 인터넷 회선은 공인 IP가 고정되어 있지 않습니다. IP 주소라는게 유한한 자원인데다가 주로 인터넷에서 '가게 주인(서버)'이 아니라 '돌아니는 손님(클라이언트)' 역할을 하게 되는 가정용 인터넷 고객들에게 굳이 고정된 주소를 내어줄 필요가 없어서인데요, 그래서 통신사에서는 각 가정용 회선마다 부여하는 공인 IP 주소를 주기적으로 바꾸는데 이를 '유동 IP'라고들 부릅니다.

홈서버를 운영하고자 하는 가정용 인터넷 회선 사용자들은 그래서 매번 공인 IP가 바뀔때마다 이 공인 IP를 기반으로 준비한 모든 세팅을 갱신해줘야하는 불편함이 있습니다. 언제 어떻게 IP가 바뀔지 모르기때문에 난감한데요, 이 문제를 DDNS(Dynamic DNS)가 해결해줄 수 있습니다. 

DNS란 IP 주소(예: 123.45.67.8)와 도메인(https://www.domain1.tld)을 연결해주는 '주소록'같은 체계입니다. 그리고 이 주소록에 기반해서 우리가 도메인만 알면 우리를 IP 주소로 데려가주는 역할을 해주는 것을 DNS 서버라고 합니다. 위에서 언급한대로 만약 가정용 인터넷 회선의 공인 IP가 바뀌더라도, 바뀌어버린 새로운 공인 IP를 DNS 서버가 알아서 추적해서 기존 도메인에 연결해준다면, 아무리 공인 IP가 자주 바뀌더라도 우리는 여전히 동일한 도메인으로 홈서버에 접속할 수 있게 됩니다. 이렇게 IP 주소와 도메인간의 관계를 자동으로 최신화하고 연결해주는 DNS를 '동적(dynamic) DNS' 즉 DDNS라고 합니다.

도메인을 구입하지 않아도 `https://(내가 설정한 hostname).ddns-server.here` 이런식으로 DDNS 서버 자체의 도메인에다가 내 홈서버의 별명인 '호스트네임'을 서브도메인으로써 빌려서 사용할 수 있는 무료 DDNS 서비스들이 있습니다. 일부 공유기에서는 이러한 DDNS 서비스를 자체적으로 제공하기도 합니다. 또는 도메인을 따로 구입하고 여기에 DDNS 서비스를 별도로 연동하기도 합니다. 여기서는 종합 네트워크 인프라 서비스 기업인 Cloudflare에서 도메인을 구입하고, 무료로 제공되는 Cloudflare DNS 서비스를 홈서버상에 DDNS 서버로써 별도로 구동해서 이 도메인을 홈서버의 유동 IP에 연동시키고자 합니다.

1. 먼저 Cloudflare에서 도메인을 구입합니다. 만약 클라우드플레어가 아닌 다른 도메인 등록대행사(registar)를 통해 구매하는 경우에는 도메인을 공인 IP에 연결하는 DNS 설정 과정이 다를 수 있으므로 다른 설명서를 참고하셔야 됩니다.
2. 구매한 도메인에다가 홈서버의 공인 IP를 연결하기 위해 도메인의 DNS 레코드 설정이 필요합니다. 클라우드플레어 대시보드 왼쪽 사이드바 메뉴에서 Domain Registration 항목의 Manage Domains 항목을 선택합니다. 
    1. 구입했던 도메인의 목록이 표시되는데 해당 도메인에 있는 manage 링크를 누릅니다. 
    2. 해당 도메인의 관리 상태가 표시되고, 오른쪽 사이드바 메뉴에 Update DNS configuration 링크가 있습니다. 눌러줍니다. 
    3. 그러면 해당 도메인에 연동된 DNS 레코드의 목록이 표시됩니다. 여기에 새로운 레코드를 추가해주어야 합니다. Add record 버튼을 누릅니다.
        - 최상위 도메인을 등록해주어야하므로 Type은 A로 지정합니다.
        - name에는 루트 도메인을 입력해줍니다. (예: domain1.tld)
        - IPv4 address에는 홈서버의 IPv4 주소, 즉 공유기가 연결된 가정용 인터넷 회선의 공인 IP를 입력해줍니다. (예: 123.45.67.8)
        - Proxy status는 OFF로 비활성화해해서 DNS Only 상태로 설정합니다.
3. 홈서버가 클라우드플레어의 DNS 서비스에 접근하기 위해, 본인임을 증명하는 허가증인 '토큰'을 만들어야 합니다.
    1. https://www.cloudflare.com에 접속해 로그인하고 오른쪽 상단에 있는 사용자 계정 버튼을 누릅니다.
    2. 드롭다운 리스트에서 My Profile을 선택합니다.
    3. 프로필 관리 화면이 나타면 왼쪽 사이드바 메뉴에 있는 API Tokens 항목을 선택합니다.
    4. API Tokens 항목에 있는 Create Token 버튼을 누릅니다.
    5. 맨 아래에 Create Custom Token 항목의 Get started 버튼을 누릅니다.
        - Token name에는 이 토큰의 이름을 마음대로 입력해주면 됩니다. DDNS 구동 목적으로 사용할거니까 'ddns-service' 이런식으로 정하면 됩니다.
        - Permission에서는 이 토큰이 어떤 권한을 가질 것인지, 이 토큰으로 무엇까지 할 수 있을지를 정해주면 됩니다. 네트워크를 나눈 구획인 zone의 구성과 설정값을 읽고, DNS의 설정값을 변경할 수 있도록 하기 위해 다음과 같이 권한을 추가해줍니다.
            - Zone / Zone / Read
            - Zone / Zone Settings / Read
            - Zone / DNS / Edit
        - Zone Resources에서는 그냥 기본값인 Include / All zones 로 그대로 둡니다.
        - 나머지 설정값들도 그대로 두고 Continue to summary 버튼을 눌러 다음 단계로 갑니다.
        - Create Token 버튼을 눌러 토큰을 만들고, 다음 화면에서 표시되는 토큰 문자열을 복사해 파일이나 메모지에 안전하게 보관해둡니다.
    6. 이 토큰을 사용해 다음 단계에서 DDNS 서비스를 홈서버에서 구동할 수 있습니다.

## 3. Caddy 서버와 Cloudflare DDNS 설치하기

사설 네트워크, 도메인, DNS 설정이 끝났으면 이제 실제로 홈서버에 Caddy와 DDNS 서비스를 설치해줘야 합니다. 여기서는 Caddy를 시스템에 직접 전역 설치를 하고, Cloudflare DDNS 서비스는 별개로 Docker 기반의 컨테이너로 구동하려고 합니다. 우선은 홈서버에 Docker Engine이 설치가 되어 있어야 합니다. 도커 엔진의 설치 방법은 [Docker 공식 웹사이트](https://docs.docker.com/engine/install/)를 참조하세요. 

1. Caddy를 시스템에 설치해봅시다. [Caddy 공식 웹사이트](https://caddyserver.com/docs/install#debian-ubuntu-raspbian)에서 설명하는 설치 방법을 따르면 됩니다.
    ```
    sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
    sudo apt update
    sudo apt install caddy
    ```
2. 위에서 설정한 Cloudflare DNS를 홈서버에서 DDNS 서비스로 구동하려고 합니다. 이를 위해서 도커 기반의 [Docker Cloudflare DDNS](https://github.com/oznu/docker-cloudflare-ddns)를 사용하고자 합니다. 다음 명령어를 사용해 해당 도커 이미지를 당겨와 도커 컨테이너로써 구동합니다. 이 과정에서 위에서 발급받은 토큰과 구매한 도메인을 지정해주어야 합니다.
    ```
    sudo docker run -d \
      -e API_KEY=위에서_발급받은_토큰_문자열을_여기에_입력하세요 \
      -e ZONE=루트_도메인을_domain1.tld_이런_식으로_여기에_입력하세요 \
      --restart=always \
      -e RRTYPE=AAAA \
      --network host \
      oznu/cloudflare-ddns:latest
    ```
3. 이제 Caddy를 사용해서 리버스 프록시를 실제로 구동하기 위해 Caddyfile을 편집해야 합니다. Caddyfile은 `/etc/caddy/Caddyfile` 으로써 저장되어 있으며, 텍스트 편집기 아무거나 사용하면 됩니다. nano 편집기를 사용해서 편집하는 명령어는 다음과 같습니다.
    - `$ sudo nano /etc/caddy/Caddyfile`
4. 텍스트 편집기로 Caddyfile을 열고 나서 내용을 편집하면 됩니다. Caddyfile의 구체적인 사용법은 [Caddy Server 공식 도큐멘테이션](https://caddyserver.com/docs/caddyfile)을 참고하시면 됩니다. 여기서는 기본적인 리버스 프록시 구성만 다뤄보고자 합니다. 다음과 같이 설정해줍니다.
    ```
    # The Caddyfile is an easy way to configure your Caddy web server.
    #
    # Unless the file starts with a global options block, the first
    # uncommented line is always the address of your site.
    #
    # To use your own domain name (with automatic HTTPS), first make
    # sure your domain's A/AAAA DNS records are properly pointed to
    # this machine's public IP, then replace ":80" below with your
    # domain name.
    
    # 기본 HTTP 포트로 8080을, HTTPS 포트로 8443을 사용하겠다고 지정해줍니다.
    # 만약 위에서 언급한 공유기 포트포워딩 설정에서 다른 포트를 사용했다면 여기서 해당 포트를 지정해주면 됩니다.
    {
    	http_port 8080
    	https_port 8443
    }
    
    # 만약 홈서버에서 A라는 서비스가 사설 네트워크 내부에서 8000 포트를 통해 구동되고 있고,
    # 이 서비스를 domain1.here라는 도메인으로 인터넷상에 개방하고 싶다면 다음과 같이 설정합니다.
    domain1.tld {
    	reverse_proxy 127.0.0.1:8000
    }
    
    # 만약 홈서버에서 B라는 서비스도 사설 네트워크 내부에서 8001 포트를 통해 구동되고 있고,
    # 이 서비스를 domain1.tld/test라는 도메인으로 인터넷상에 개방하고 싶다면 다음과 같이 설정합니다.
    domain1.tld/test {
    	reverse_proxy 127.0.0.1:8001
    }
    
    # Refer to the Caddy docs for more information:
    # https://caddyserver.com/docs/caddyfile
    ```
5. 여기서 주의할점이 있는데, 인터넷에 올라와있는 일부 튜토리얼에서는 여기에 tls 섹션을 추가해 DNS 서비스 공급자의 API 토큰을 추가해주라고 설명하는 경우가 있습니다. 하지만 공인 IP가 고정되어 있지 않고 변하는 가정용 인터넷 회선이라서 DDNS를 반드시 사용해야만 하는 홈서버의 경우에는 오히려 이 설정값이 유동 IP의 DNS 레코드 갱신을 막아버리고 보안 측면에서도 좋지 않기 때문에 불필요하다고 하네요.
    > There are a some guides that have a Caddyfile which includes a `tls` section with the DNS provider's API key as shown in the following example.
    > 
    > ```
    > example.com {
    >     reverse_proxy 127.0.0.1:8096
    >     tls {
    >         dns <DNS Provider> <API Token>
    >     }
    > }
    > ```
    > 
    > Please proceed with caution when using this option:
    > 
    > - This will **NOT** automatically update your DNS records if you have a dynamic IP.
    > - This is **NOT** required for automatic HTTPS to work in most cases.
    > - Misconfiguration can lead to **compromised domains and/or accounts**.
    > - API keys should only be granted the least permissions required for the application to function.
    > 
    > Please read the [Let's Encrypt documentation](https://letsencrypt.org/docs/challenge-types/) for more info.
6. Caddyfile을 편집해서 내용이 변경되었다면 Caddy 서비스를 다시 시작해줘야 합니다. Caddy 서비스와 관련된 명령어들은 다음과 같습니다.
    - `$ sudo systemctl start caddy.service` 명령어로 Caddy 서버를 시작합니다.
    - `$ sudo systemctl stop caddy.service` 명령어로 Caddy 서버를 정지합니다.
    - `$ sudo systemctl restart caddy.service` 명령어로 Caddy 서버를 재시작합니다.
    - `$ sudo systemctl status caddy.service` 명령어로 Caddy 서버의 구동 상태와 오류를 확인합니다.
    
이 모든 과정을 거치고 정상적으로 구성이 되었다면, 이제 인터넷 어디서든 https://www.domain1.tld 로 접속하면 A 서비스를, https://www.domain1.tld/test 로 접속하면 B 서비스를 사용할 수 있게 됩니다. 이론적으로는 그렇고, www 대신 서브도메인을 사용한다던가 /test와 같은 서브디렉토리를 특정 웹 서비스의 접속 주소로써 문제 없이 사용하고자 한다면 DNS 레코드라던가 해당 서비스가 사용하는 루트 경로 설정값/환경변수 등을 구체적으로 설정해주어야 합니다.

## 5. 추가적인 보안 강화

- ufw 방화벽을 활용해 기본적인 포트 보안을 확보할 수 있습니다.
    - ufw는 사용하기 쉽고 간결한 방화벽 서비스입니다. ufw 서비스를 설치하고 작동시키게 되면 홈서버 관리자가 명확하게 직접 지정해둔 규칙 묶음(ruleset)을 제외한 모든 네트워크 활동을 차단해 보안을 향상시킵니다.
        - `$ sudo apt install ufw` 명령어로 ufw를 설치합니다.
    - ufw 명령어
        - `$ sudo ufw enable` 명령어로 방화벽을 활성화합니다.
        - `$ sudo ufw disable` 명령어로 방화벽을 비활성화합니다.
        - `$ sudo ufw status verbose` 명령어로 방화벽의 상태와 규칙들을 확인합니다.
        - `$ sudo ufw allow [포트 번호]` 명령어로 특정 포트를 허용할 수 있습니다.
        - `$ sudo ufw deny [포트 번호]` 명령어로 특정 포트를 차단할 수 있습니다.
    - 방화벽 규칙 목록 예시입니다.
        ```
        To                         Action      From
        --                         ------      ----           
        80                         ALLOW       Anywhere                  
        443                        ALLOW       Anywhere                  
        8080                       ALLOW       Anywhere                  
        8443                       ALLOW       Anywhere         
        ```  
        - 공유기로 들어오는 HTTP와 HTTPS 트래픽이 사용하는 80 포트와 443 포트를 허용했습니다.
        - 이를 caddy 리버스 프록시 서버가 포트포워딩을 통해 받아 처리하는 8080 포트와 8443 포트를 허용했습니다.
        - 이 외의 포트들은 모두 차단된 상태입니다.
            - 홈서버에서 구동되는 웹 서비스가 사용하는 포트들은 위에서 언급한 명령어를 사용해 수동으로 '허용' 처리를 해주어야 합니다.
                - 예: 만약 위에서 지정한 A라는 서비스가 8000라는 포트에서 구동되고 있다면 `$ sudo ufw allow 8000` 명령어를 사용해서 해당 포트를 허용해주어야 합니다.
- 로그인에 실패한 기록을 모니터링해서, 일정 횟수 이상 허가되지 않은 접속을 시도하는 클라이언트를 차단하는 방식으로 무차별 대입 공격(brute-force attack)을 방지하는 fail2ban을 활용할 수 있습니다.
- fail2ban과 유사하지만 공격자 정보 데이터베이스를 크라우드소싱 방식으로 폭넓게 적립/공유하고 추가적인 기능들로 보안을 강화한 crowdsec을 활용할 수도 있습니다.

이 외도 본인이 운영하고자 하는 홈서버의 구성, 환경, 특성에 따른 해킹 공격 표면과 벡터를 충분히 고려해서 추가적인 보안 대책들을 확보해야 합니다. 홈서버도 엄연히 '서버'니까요.