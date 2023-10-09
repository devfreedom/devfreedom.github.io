---
title: "[필기] <도커를 활용한 클라우드 컴퓨팅> 강의"
date: 2022-09-04T11:00
thumb: "docker-logo.png"
tags: 
    - ❮필기❯
    - 도커
    - 클라우드
---

요새 빅데이터다 클라우드다 뭐다 해서 도커라던가 쿠버네티스같은 컨테이너 기반 가상화 솔루션들이 대세라고 하더라고요. 리눅스에서 로컬로 초급 웹앱이나 돌려보는 초보자로써는 아직 클라우드에서의 개발이나 DevOps 환경은 엄두도 안나지만 그래도 배워두면 좋을 것 같아서 강의를 들어 봤습니다. 지금은 개념 정도만 이해가 될 뿐이라서 실제로 환경을 구현해서 활용을 하려면 많은 시간과 노력이 필요할 것 같습니다.

---
# 1. 가상화
- 플랫폼 가상화
    - 전체 컴퓨터를 simulate
    - 주어진 하드웨어 플랫폼 위에서 제어프로그램(host)를 통해 실행
- 리소스 가상화
    - 결합된/단편화된/단순화된 리소스를 simulate
    - 저장소, namespace, 네트워크 자원 등 특정 시스템의 리소스를 가상화로 확장
- 서버 가상화
    - 한 서버를 여러 가상 서버로 파티션을 나누어 각 가상 서버가 자체적인 OS를 운영
- 앱/데스크탑 가상화
    - 시뮬레이션 된 가상 앱 및 데스크탑을 중앙 서버에 상주시킴으로써 사용자 기기에 일일히 설치하지 않아도 됨
- 네트워크 가상화
    - 네트워크 부하 분산 및 방화벽 등을 programming/provisioning

## 1-1. 클라우드 컴퓨팅에서의 가상화
- 서버 통합, 재해 복구, 테스트, 단련, 작업 공간 등으로 활용 가능
- 클라우드를 통해 가상화된 컴퓨터의 시스템 리소스 제공
- 인터넷 기반의 컴퓨팅
- 네트워크, 서버, 스토리지, 앱, 서비스 등 어디서나 접근 가능한 on-demand 모델
- 일관성과 규모의 경제를 달성하기 위해 자원의 공유에 의존함
- Traditional IT → IaaS → PaaS → SaaS → (Serverless)
    - On-premise = Traditional IT 
        - 사용자가 직접 인프라/플랫폼/앱을 관리하는 모델
        - IDC를 직접 구축하거나 공간을 할당받아 물리서버를 설치하고 여기서 모두 관리
    - IaaS
        - e.g. AWS EC2
        - 가상 서버, 데이터 스토리지 및 호스팅 컴퓨터, 네트워크 등 IT인프라를 지원해주는 서비스 
        - 업체에서는 하드웨어만 서비스로 제공하고 OS나 앱은 직접 관리하게 됨

## 1-2. 컨테이너 기술
- 컨테이너는 동일한 운영 체제 커널을 공유하고, 시스템의 나머지 부분으로부터 앱 프로세스 격리
    - OS수준에서 제공하는 가상화
    - Guest OS를 돌리는 VM과는 달리 hypervisor 없이 호스트 운영체제를 쪼개서 작동
    - hypervisor 역할을 container runtime이 대체함
- 컨테이너 = runtime instance = 앱과 그 구동환경을 격리한 공간
    - host infra로부터 앱을 분리하였기 때문에 portable하고 scalable함
- 기존 가상화 기술보다 가볍고, 성능이 좋고, 밀집도가 좋음
    - 빌드/배포 속도, 이식성이 좋아짐
- UNIX 운영체제에서 수십년간 사용되었던 개념이 현대적으로 재탄생된 것

---

# 2. 도커
## 2-1. 도커 컨테이너
- 소프트웨어를 제어할 수단을 제공
    - Docker → [libcontainer] [libvirt] [lxc] [systemd-nspawn] → cgroups/namespaces/netlink/netfliter/apparmor/selinux/capabilities
    - 앱과 앱 사이를, 그리고 앱과 host를 분리하고 조절 기능을 제공
    - 컨테이너 런타임 환경을 지원하는 모든 장치에서 실행 가능
        - 앱을 호스트 운영체제와 연결할 필요가 없음
- 도커로 앱을 패키징하면 앱 외부에서 그 전개와 런타임 문제를 컨트롤할 수 있음
    - e.g. 앱을 네트워크에 노출하는 방식, 앱의 스토리지/메모리/입출력을 관리하는 방식, 접근 권한 제어
- host OS 및 다른 컨테이너로부터 단일 앱과 그 의존성(외부 소프트웨어 라이브러리 전체)을 격리함
- 시스템 자원의 효율적 사용을 가능하게 함
    - VM보다 메모리를 훨씬 적게 사용하고 속도가 빠르며 밀도있게 배치될 수 있음
- 수요에 맞는 scaling을 간단히 할 수 있고 그만큼 업데이트가 기민해짐
- 앱 이동을 가능하게 함
    - 보안을 위해서는 방화벽 뒤에서 앱을 실행해야 함
    - 편의를 위해서는 퍼블릭 클라우드에서 앱을 실행해야 함
    - 도커 컨테이너는 앱 실행과 관련된 모든 것들을 capsulate 하기 때문에 앱이 실행되는 환경을 local으로든 cloud로든 쉽게 옮길 수 있음
- microservice를 활용 가능하게 함
    - 전통적인 monolithic 앱을 부분적 microservice들로 해체할 수 있음
    - 다수의 느슨히 결합된 컴포넌트들인 microservice들을 필요에 따라 별개의 팀/스케줄 상에서 line-of-business 앱들의 부분들이 개별적으로 확장/수정/서비스 되도록 할 수 있음
- 부품화된 유닛들의 composability를 제공
    - 독립적 유지보수관리가 가능
- orchestration과 scaling이 쉬움
    - 컨테이너는 가볍고 overhead가 거의 없기 때문
- 확장성
    - 이미지만 한번 만들어 놓으면 그 다음부터는 컨테이너만 관리
    - 서비스 이전이나 신규 서버에 서비스 추가시 docker run 명령어로 처리
    - 개발서버나 테스트서버로 운용하기에 간편함
- 표준성
    - 도커를 사용하지 않는 경우 다양한 언어로 만든 서비스들의 배포 방식은 제각각
        컨테이너라는 표준으로 서버를 배포하므로 모든 서비스들의 배포과정이 동일해짐

## 2-2. 도커 이미지
- 컨테이너 실행에 필요한 파일과 설정값 등을 포함하고 있는 이미지
- 상태값을 가지지 않으며 immutable함
- 도커 이미지를 실행한 상태가 바로 컨테이너
    - 추가되거나 변하는 값은 이미지가 아닌 컨테이너에 저장됨
- 하나의 같은 이미지에서 여러 개의 컨테이너를 생성할 수 있음
    - 컨테이너의 상태가 바뀌거나 삭제가 되더라도 이미지는 변하지 않고 그대로 남아있게 됨
    - e.g. MySQL과 Wordpress를 host에 pull하여 이미지를 생성하면, 그 이미지를 run 하는 컨테이너들을 사용
- 주요 이미지
    - Ubuntu이미지
        - e.g. Debian 기반의 MySQL을 실행하는데 주로 활용
    - GitLab 이미지
        - e.g. CentOS를 기반으로 Ruby, Go, Redis, GitLab, Nginx 등을
- 이미지는 컨테이너를 실행하기 위한 모든 정보를 가지고 있으므로 dependency를 compile하거나 하는 세팅 작업이 필요하지 않음
- 새로운 서버가 추가되면 미리 만들어 놓은 이미지를 다운받고 컨테이너 생성만 하면 됨
- 이미지는 Docker Hub에 등록하거나 Docker Registry 저장소를 직접 만들어서 관리할 수 있음 

## 2-3. Dockerfile
- 도커 이미지를 만들기 위한 Domain Specific Language(DSL) 파일
    - 이 파일의 설정에 기반해 이미지를 빌드
    - Gemfile / Gemfile.lock / app.rb + Dockerfile = Docker image
    - 단순한 텍스트 파일이며 일반적으로 소스와 함께 관리함

## 2-4. Docker Hub
- 도커에서 제공하는 기본 이미지 저장소
    - Base image
        - Ubuntu
        - CentOS
        - Debian
    - 공식 이미지 (base image + add-on)
        - Ruby
        - GoLang
        - Java
        - Python
- 자체적인 build 서비스(create automated build)도 제공함
    - `docker pull` 명령어를 이용해 로컬로 컨테이너를 받아오거나 도커 이미지 빌드시 베이스 이미지 등을 받아오는데 주로 사용됨
        - 개발자가 도커 허브에 auto-build repo를 만듦
            - → 개발자의 GitHub/BitBucket repo에 Dockerfile을 push함
                - → `pull Dockerfile & docker build`
                    - → docker pull을 통해 서버에 도커 이미지가 형성 
- Docker Registry: 도커 이미지 저장소 등을 호스팅하는 서비스
    - 도커 허브에서는 기본적으로 public으로만 이미지가 push됨
        - 보안이 중요하거나 기업 환경에서는 도커 허브 대신 자체적으로 3rd-party/private repository를 구축해서 사용할 수 있음
            - 사설 구축 예제
                1. registry 이미지 다운로드 및 컨테이너 생성
                    - `docker pull registry`
                    - `docker run -d -p 5000:5000 --restart=always --name registry registry`
                2. 도커 이미지를 태깅하여 registry에 추가하기
                    - `docker pull ubuntu`
                    - `docker image tag ubuntu localhost:5000/testimage`
                3. 도커 이미지 배포
                    - `docker pull localhost:5000/testimage`
                - 도커 registry 삭제하는 방법
                    - 기존 registry에 저장된 도커 이미지는 모두 다 삭제되므로 주의해야 함
                    - `docker container stop registry && docker container rm -v registry`

## 2-5. 도커 서비스 환경
- docker-compose
    - 여러 컨테이너를 통합적으로 관리하는 CLI 프로그램
    - 단순 컨테이너 볼륨을 만들어 저장공간을 컨테이너끼리 연결해 공유할 수 있음
        - 실행한 호스트의 저장공간에도 접근 가능하게 할 수 있음
- guest OS 대신 서버 운영을 위한 프로그램과 라이브러리만 격리해서 설치하게 됨
    - 이미지 용량이 크게 줄어듦
- 컨테이너는 호스트와 OS 자원을 직접 사용함
    - hypervisor/VM layer를 사용하지 않고 직접 접근하기 때문에 성능이 좋음
- 다양한 API를 활용해 자유롭게 자동화할 수 있음
- 설정
    - 설정은 보통 환경변수로 제어함
    - 하나의 이미지가 환경변수에 따라 동적으로 설정파일을 생성하도록 만들어야 함
- 공유자원
    - 컨테이너는 삭제 후 새로 만들면 모든 데이터가 초기화됨
    - 데이터는 외부 스토리지 또는 S3와 같은 클라우드 저장소에 연결해서 사용해야 할 필요가 있음
    - 세션이나 캐시를 파일로 사용시 memcached나 redis와 같은 시스템으로 분리
- 서비스 빌드 및 배포
    - Image → [push] → Docker repo → [pull] → server 1/2/3/…
    - 초기 구축
        - swarm (= Docker machine cluster)를 구축한다
        - docker-compose.yml로 stack을 구성하고 실행한다
    - 스케일 조정
        - load balancing에는 두 가지 패러다임이 있음
            - cluster의 worker node를 추가하기
            - service의 task container 수 (replicas: 5)를 늘리기
        - 각 노드에 존재하는 swarm loadbalancer가 하나의 docker 실행환경처럼 작동해서 적절한 컨테이너로 부하를 분배
    - 코드 배포
        - 소스코드 수정 후 docker image build하기
        - Docker repo에 새로 만든 이미지 push하기
        - docker-compose.yml파일 또는 swarm에 bind-mount 파일이 변경되었다면 docker-machine scp를 사용해 전송
        - `docker-machine ssh testvm1 "docker stack deploy –c ./docker-compose.yml"` 명령어로 stack을 재배포하면, repo에서 이미지를 새로 끌어와서 업데이트된 컨테이너가 구축됨

## 2-6. 도커 볼륨
- 데이터 존속 방법으로 volume, bind mounts, tmpfs라는 세 가지 방식을 제공함
- 어떠한 유형의 mount를 사용하든 데이터는 컨테이너 내에서 동일하게 보이며, 컨테이너가 사용하는 file system의 폴더나 개별적인 파일들로 표시됨
- 세 가지 유형의 차이는 데이터가 docker host 내에서 어디에 존재하느냐의 차이임
    - 데이터 저장을 위해 상황에 따라 최선의 선택을 해야 함
        - volume: 파일 시스템 내부의 Docker area에 데이터가 존재함
            - 리눅스에서는 /var/lib/docker/volume/ 에 별도로 분리된 공간을 마련함
            - 데이터는 host의 파일 시스템 내부에 분리된 별도의 공간에 저장됨
            - 도커 컨테이너에 의해 생성되며, 완전히 도커에 의해 관리됨
                - bind mount보다 백업과 migration이 쉬움
                - Docker CLI 명령이나 Docker API를 사용하여 관리할 수 있음
                - Linux와 Windows 컨테이너 모두에서 작동함
                - 여러 컨테이너들 사이에서 보다 안전하게 공유될 수 있음
                - 원격 호스트나 cloud provider에 볼륨을 저장/암호화/향상할 수 있게 해줌
                    - volume driver를 통해 지원함
                - 컨테이너에 의해 그 공간을 미리 채울 수 있음
            - mount할 때 이름을 명시적으로 지정하거나, 익명으로도 사용할 수 있음
                - 익명의 경우 도커는 고유한 이름을 임의로 부여함
        - bind mount: 파일 시스템 상에 데이터가 존재함
            - 데이터가 host의 파일 시스템 어디에든 저장될 수 있음
            - host의 파일 시스템과 디렉토리 구조에 의존됨
            - Docker 초기부터 지원해온 방식
            - volume에 비해 기능이 제한적임
            - 파일이나 디렉토리의 경로는 host system의 전체 경로로 참조
                - 해당 항목이 미리 Docker host에 존재할 필요는 없음
                    - 존재하지 않는 경우 그 경로로 파일 또는 디렉토리가 생성됨
            - Docker CLI 명령으로 관리할 수는 없음
        - tmpfs mount: 메모리상에 데이터가 존재함
            - 데이터가 host의 RAM에만 저장되며, 절대로 파일 시스템을 건드리지 않음
            - 전원 끄기, 서비스 종료 등 RAM의 상태에 변화가 생기면 데이터도 사라짐
            - 비영구적인 상태 정보나 민감 정보처럼 컨테이너의 생명주기와 맞춰서 데이터를 보관할 때 사용함
                - e.g. Swarm Service는 내부적으로 tmpfs mount를 사용해서 민감 정보를 보관함

## 2-7. 도커 네트워크 구조
- 컨테이너는 기본적으로 리눅스처럼 eth과 lo 네트워크 인터페이스를 가지고 있음
    - 내부 IP를 순차적으로 할당을 하며, 컨테이너가 재시작될 때마다 변경될 수 있음
    - 만약 외부와 연결을 해야 할 경우에는 호스트에 veth 인터페이스를 생성하고, 컨테이너의 eth와 연결됨
        - veth는 사용자 작업 없이 도커엔진에 의해 자동 생성
        - veth 말고 docker()라는 브리지도 있는데, 이는 veth와 바인딩되어 호스트의 eth와 연결해줌
- Host
    - 호스트의 네트워크 스택을 사용함
    - 이 방식으로 컨테이너를 생성하면 컨테이너가 독립적인 네트워크 영역을 갖지 않음
    - namespace 분리가 없으므로 호스트의 모든 네트워크 인터페이스를 컨테이너에서 사용할 수 있음
    - e.g. docker run --net=host httpd net1
- Bridge
    - 도커의 기본 네트워크 방식
    - docker daemon을 실행하면 먼저 docker0이라는 bridge가 생성됨
    - 컨테이너가 생성되면, 각 컨테이너마다 고유한 namespace 영역이 하나씩 생성됨
        - docker0 bridge에 컨테이너의 인터페이스들이 하나씩 binding 되는 방식
    - docker network inspect bridge 
    - 도커가 관리하는 호스트에 리눅스 브리지를 생성함
    - 기본적으로 브리지의 컨테이너는 서로 통신을 할 수 있음
    - bridge driver를 통해 컨테이너에 대한 외부 액세스 구성 가능
- MACVLAN
    - macvlan 드라이버는 MACVLAN 브리지 모드를 사용해 컨테이너 인터페이스와 상/하위 인터페이스간의 연결을 설정함
    - 물리적 네트워크에서 라우팅 가능한 컨테이너에 IP주소를 제공하기 위해 사용
    - VLAN은 Layer 2 컨테이너 분할을 실행하기 위해 macvlan 드라이버에 트렁킹될 수 있음
- Overlay
    - 도커 외부에서 다중 호스트 네트워크를 지원하는 오버레이 네트워크를 생성함
    - 로컬(호스트) 리눅스 브리지와 VXLAN을 함께 사용해 물리적 네트워크 인프라를 통해 컨테이너간 통신을 overlay
- None
    - 컨테이너에 자체 네트워킹 스택과 네임스페이스를 제공하지만, 컨테이너 내부에 인터페이스를 구성하지는 않음
    - 추가 구성 없이 컨테이너가 호스트 네트워킹 스택에서 완전히 분리됨
    - e.g. docker run --name net1 --net=none -d httpd

## 2-8. Docker Compose
- 한 번에 여러 개의 컨테이너를 통합 관리 및 운용하기 위한 도구
- 컨테이너별 별도의 설정들을 간편하게 작업할 수 있음
    - dockerfile: 앱에 필요한 환경을 도커파일에 정의함
    - docker-compose.yml: 앱과 같이 수행 될 서비스들을 여기에 설정하면 각 서비스들이 독립된 환경에서 함께 실행될 수 있음
- docker-compose.yml 파일 예제:

```
web :
    build : .
    ports :
        "5000 : 5000"
    volumes :
        .:/code
    links :
        redis
redis:
    image : redis
```

- docker-compose.yml 파일 구조
    - image나 build 지시자가 반드시 있어야 함
    - image
        - 사용할 이미지의 태그나 ID를 명시함
        - 로컬에 그 이미지가 없으면 remote repo에서 pull해서 가져옴
    - build
        - dockerfile이 있는 디렉토리 경로
        - compose가 이 경로에 있는 dockerfile을 빌드해서 사용함
    - dockerfile
        - 기본 dockerfile이 아니라 여기에 지정된 파일명을 dockerfile로 인식해서 빌드해서 사용함
    - 이 외에도 command, links, external_links, extra_hosts, ports, expose, volumes 등이 있음
- docker-compose up 명령어로 compose가 알아서 전체 앱에 필요한 서비스들을 실행하게 함

- 사용하게 되는 경우
    - 단일 호스트상 다수의 독립 환경을 운용할 때 활용
    - 컨테이너 볼륨을 보존할 때 사용
    - 변경된 컨테이너를 재생성 할 때 사용
    - 다양한 환경변수나 요소들을 환경간에 조합 및 이동할 때 사용
    - 하나의 yaml 설정파일에 여러 개의 컨테이너를 정의 및 실행 가능
    - 개발환경, staging 서버, continuous integration에 활용할 수 있다
        - staging server: 임시서버의 개념으로서 운영환경에 적용하기 전에 검증할 수 있는, 실제 운영 환경과 동일한 검증 서버
        - continuous integration: 애플리케이션에 대한 새로운 코드 변경사항이 정기적으로 빌드 및 테스트되어 공유 repo에 병합되므로 여러 개발자가 동시에 개발 작업을 할 경우 서로 충돌할 수 있는 문제를 해결할 수 있음
    - Docker Compose는 컨테이너 환경을 정의한 파일을 읽어 컨테이너를 "순차적"으로 생성함
        - docker-compose.yml은 docker run 명령어도 그대로 사용할 수 있음
            - 각 컨테이너의 의존성, 네트워크, 볼륨, 컨테이너 수 등을 유동적으로 조절할 수 있음

## 2-9. Docker Swarm
- kubernetes을 대신해서 도커가 공식적으로 만든 orchestration 도구
    - orchestration: 여러 호스트 서버의 컨테이너들을 배포 및 관리하는 작업
        - 컨테이너 배포, 자동 배치, 자동 복제, 컨테이너 그룹 load balancing, 장애 복구, 클러스터 외부로 서비스 공개, 컨테이너 추가/제거/확장/축소, 컨테이너 서비스 간의 인터페이스 구축/연결/네트워크 제어
    - Apache Mesos 등이 있음
- 여러 개의 docker 호스트를 함께 클러스터링하여 단일한 가상의 docker host 생성
- 호스트 OS에 agent만 설치하면 간단하게 작동하며 설정이 쉬움
    - agent를 외부에 설치하지는 않음
- docker 명령어와 compose를 그대로 사용할 수 있음
- master 노드와 worker 노드로 시스템이 구성되어 있음
    - master노드에서는 클러스터 관리 작업, 상태 유지, scheduling, Swarm HTTP API endpoint를 제공함
    - worker 노드는 컨테이너를 실행하는 역할을 함
- 머신 생성
    - e.g. `docker-machine create --driver virtualbox testvm1`
- swarm 매니저 등록
    - e.g. `docker-machine ssh testvm1 "docker swarm init --advertise-addr <testVM1 IP>"`
- swarm에 노드 추가
    - e.g. `docker-machine ssh testvm2 "docker swarm join --token <token> <manager-ip>:<port>"`
- docker-machine ssh를 대체하기
    - e.g. `docker-machine env testvm1`
- swarm 매니저를 통한 앱 배포
    - `docker stack deploy -c docker compose.yml testapplication`

---

# 3. DevOps 오케스트레이션
## 3-1. Kubernetes (k8s)
- Docker Swarm과 유사함
- 선언적 구성과 자동화를 용이하게 해줌
- 구글이 15년에 걸친 상용 실증 과정을 거쳐 커뮤니티와 완성한 오픈소스 플랫폼
- 분산 시스템의 탄력적 실행을 위한 프레임워크를 제공
- k8s에 기반해 Rancher, OpenShift, Tectonic 등의 플랫폼이 나오는 등 클라우드 시장의 대세
    - AWS, Google Cloud, IBM, Digital Ocean 등의 provider들이 managed cloud 서비스를 제공하는 것을 가능하게 함
    - k8s Cloud Native Landscape라는 방대한 생태계가 구성되어 있음
        - 서비스메쉬: Istio, linkerd
        - CI: Tekton, Spinnaker
        - 컨테이너 서버리스: Knative
        - 머신러닝: kubeflow
- 전통적 배포 시대: 앱을 물리 서버에서 실행함
    - → 가상화된 배포 시대: 단일 물리 서버의 CPU에서 여러 VM을 실행
        - → 컨테이너 개발 시대: VM보다 격리 속성을 완화하여 앱들이 운영체제를 공유함
- service discovery와 load balancing 제공
    - DNS이름을 사용하거나 자체 IP주소를 사용해 컨테이너를 노출시킬 수 있음
    - 컨테이너에 트래픽이 많으면, k8s는 그 트래픽을 load balancing하고 배포하여 배포가 안정적으로 이루어질 수 있게 함
- storage orchestration 제공
    - 로컬 저장소, 공용 cloud provider 등과 같이 원하는 저장소 시스템 자동 탑재 가능
- 자동화된 rollout과 rollback 제공
    - k8s를 통해 배포된 컨테이너의 원하는 상태를 서술해줄 수 있으며, 현재 상태를 원하는 상태로 설정한 속도에 따라 변경시킬 수 있음
        - e.g. k8s를 자동화해서 배포용 새 컨테이너를 만들고, 기존 컨테이너를 제거하고, 모든 리소스를 새 컨테이너에 적용할 수 있음
- 자동화된 bin packing
    - k8s를 사용하면 각 컨테이너에 필요한 CPU와 RAM의 양을 지정해줄 수 있음
    - 자원 요청이 컨테이너에 지정되면 k8s는 컨테이너에 대한 자원을 관리하기 위해 더 나은 결정을 내리는 것이 가능함
- self-healing을 제공
    - 실패한 컨테이너를 다시 시작하고, 교체하고, 사용자 정의 상태 검사에 응답하지 않는 컨테이너를 kill하고, 서비스 준비가 끝날 때까지 그런 과정을 클라이언트에 보여주지 않음
- secrecy 구성 관리
    - 암호, OAuth 토큰, SSH키 등과 같은 중요한 정보를 저장하고 관리할 수 있음
    - 컨테이너 이미지를 재구성하거나 스택 구성에 비밀을 노출하지 않고도 secrecy 구성을 배포 및 업데이트 할 수 있음
- k8s pod에 기반한 다양한 배포 방식
    - Deployment: 새로운 버전의 앱을 다양한 전략으로 무중단 배포 가능
    - StatefulSets: 실행 순서를 보장하고 호스트 이름과 볼륨을 일정하게 사용할 수 있으므로 순서나 데이터가 중요한 경우에 사용
    - DaemonSet: 로그나 모니터링 등 모든 노드에 설치가 필요한 경우에 사용
    - (Cron)Job: 배치성 작업에 사용
- 클라우드 지원
    - 부하에 따른 auto-scaling이 가능
    - IP를 할당받아 load balancer로 사용 가능함
    - 외부 스토리지를 컨테이너 내부 디렉토리에 마운트해서 사용하는 것도 가능함
    - k8s는 Cloud Controller를 제공하며 이를 통해 클라우드에 연동하고 손쉽게 확장할 수 있음
    - 수많은 클라우드 업체에서 모듈을 제공하므로 관리자는 동일한 설정 파일을 서로 다른 클라우드에서 동일하게 사용 가능함
- 아키텍쳐 구조
    - kubectl → (master) API server → (node) kubelet → pod → docker
    - k8s pod이란 co-scheduled된 컨테이너들의 집합
- 구축
    - 시스템 패키지 업데이트, k8s 사용자 생성하기
        - k8s 클러스터에 참여하는 모든 노드에서 시스템 패키지 업데이트 수행하기
        - k8s 클러스터의 master 노드에 k8s 클러스터를 관리할 사용자를 추가하기
    - docker 설치하기
        - k8s는 k8s 서비스 및 앱을 위해 사용되는 컨테이너 실행을 위해 도커를 설치하게 됨
        - k8s는 클러스터에 참여하는 모든 노드에 도커를 설치하게 됨
    - k8s 설치 – master, worker 노드
        - k8s 클러스터 구성에 참여하는 노드 중 '마스터 노드'에 k8s를 설치하기
    - k8s 초기화 – master 노드에
        - k8s 클러스터 초기화를 위해 root 계정으로 환경변수 설정 및 초기화
    - Calico Pod Network 배포하기
        - Container Network Interface: 컨테이너와 컨테이너 네트워크 구현체 사이의 표준 API
        - CNI 구현체는 ACI, Weave Net, Calico 등을 다양하게 지원
        - 정상적으로 Calico Pod 실행을 점검하기
    - k8s 초기화 – worker 노드
        - master 노드에서 k8s 클러스터를 초기화 한 다음에, k8s 클러스터에 조인하려는 worker 노드에서 kubeadm join 명령어를 root 권한으로 실행하기
    - pod 테스트 

## 3-2. Jenkins
- 소프트웨어 개발 시 지속적으로 CI 서비스를 제공하는 툴
- 다수의 개발자들이 하나의 프로그램을 개발할 때 버전 충돌을 방지하기 위해 각자 작업한 내용을 공유영역에 있는 저장소에 자주 업로드해서 CI를 가능하게 함
- 컴파일 오류 검출 가능
- 자동화 테스트 수행 가능
- 정적 코드 분석에 의한 coding protocol 준수 여부 체크 가능 
    - 코드 품질 검사를 빌드 내부에서 수행하여 기술적 부채의 감소에 기여함
- 프로파일링 툴을 이용해 소스 변경에 따른 성능 변화를 감시할 수 있음
- 결합 테스트 환경에 대한 배포작업 가능 
- 각종 배치 작업의 간략화
    - DB구축, 앱을 서버로 deploy, 라이브러리 release와 같이 이전에 CLI로 실행되던 작업들을 웹 인터페이스로 편하게 가능함
- build 자동화의 확립
    - Jenkins와 연동되는 빌드 자동화 툴을 통해 프로젝트 효율성 증가
    - Java의 경우 maven과 gradle이 있음
- 자동화 테스트
    - subversion이나 git과 같은 VCS와 연동해 코드 변경을 감지하고 자동화 테스트를 수행함
- build pipeline 구성
    - 2개 이상의 모듈로 구성되는 layered architecture가 적용된 프로젝트에는 그에 따른 build pipeline도 구성할 수 있음
- 구축 예시
    - spring.io → [push] → GitLab/GitHub → [connect] → Jenkins → 
        - → Docker → Docker Image → Docker Containers

## 3-3. ELK stack
- 접근성과 용이성이 좋아서 최근 가장 인기 있는 log 및 데이터 분석 도구
- ElasticSearch: 분석 및 저장 기능을 담당함
    - Lucene 기반으로 개발된 분산 검색엔진
    - JSON 데이터를 기반으로 분산형 검색과 분석을 수행함
    - near-realtime 검색 플랫폼
    - 주요 개념
        - cluster: 전체 데이터를 함께 보유하고 모든 노드에서 연합 인덱싱 및 검색 기능을 제공하는 하나 이상의 노드 모음을 의미
        - node: 클러스터의 일부이며 데이터를 저장하고 클러스터의 인덱싱 및 검색 기능에 참여하는 단일 서버를 의미
            - 노드에 할당되는 임의 UUID인 이름으로 식별함
        - index: 다소 유사한 특성을 갖는 문서들의 집합
            - 단일 클러스터에서 원하는 만큼의 인덱스를 정의함
        - type: index 내에서 하나 이상의 type를 정의하는 것
        - document: index를 생성할 수 있는 기본 정보 단위이며 JSON으로 표현됨
        - shards: index는 잠재적으로 단일 노드의 하드웨어 제한을 초과할 수 있는 많은 양의 데이터를 저장할 수 있음
            - shard를 이용해 index를 여러 조각으로 분리할 수 있음
        - replication: 장애가 발생할 경우 높은 가용성을 제공함
- Logstash: 수집 기능을 함
    - 수신된 데이터를 저장소에 저장하는 역할을 함
    - 데이터를 중심부에 저장해서 예상되는 항목을 검색하고 예상치 못한 항목을 검출해낼 수 있음
    - 정형, 비정형, 위치정보, 메트릭 등 다양한 유형으로 검색을 수행하고 결합 가능
    - 확장형 플러그인 생태계로 구성된 동적 데이터 수집 및 처리 파이프라인
    - 다양한 데이터 소스에서 동시에 데이터를 수집하고 변환하여 stash 보관소에 전달
    - 수집할 로그를 선정하여 지정된 대상 서버(ElasticSearch)에 인덱싱해서 전송하는 역할을 담당하는 소프트웨어
    - 주요 개념
        - input: 입력을 사용해서 logstash에 데이터를 수집함
            - file, syslog(RFC3164 형식), beats(Filebeat) 등의 다양한 형태의 데이터를 지원
        - filter: Logstash 파이프라인의 중간 처리 장치
            - grok, mutate, drop, clone, geoip 등
        - output: Logstash 파이프라인의 최종 단계
            - elasticsearch: 이벤트 데이터를 elasticsearch에 보냄
            - file: 디스크 파일에 쓰기
            - graphite: graphite에 전송함
            - statsd: 카운터 및 타이머와 같은 통계를 수신하고 UDP를 통해 전송되며, 하나 이상의 플러그 가능한 백엔드 서비스에 집계를 보냄
        - codec: 입력 또는 출력의 일부로 작동할 수 있는 stream filter
            - json, msgpack, plain 등이 있음 
- Kibana: 시각화 도구
    - 확장형 사용자 인터페이스로써 데이터를 구체적으로 시각화 해줌
    - 데이터를 시각적으로 탐색하고 실시간 분석 가능
    - 시각화를 담당하는 HTML + JS 엔진으로 구성됨

## 3-4. Docker ELK
- 리눅스 기반으로 docker-elk를 활용해서 ELK를 설치해볼 수 있다
- Docker 설치 → Docker Compose 설치 → docker-elk repo를 clone하기
    - 필요한 패키지를 설치하기
        - `sudo yum install -y yum-utils device-mapper-persistent-data lvm2`
    - CentOS용 docker-ce stable 버전 repo 설정
        - `sudo yum-config-manager --add-repo`
        - `https://download.docker.com/linux/centos/docker-ce.repo`
    - DockerCE 설치
        - `sudo yum install -y docker-ce`
    - Docker 시작
        - `sudo service docker start`
    - Docker Compose 설치
        - `sudo curl -L "https://github.com/docker/compose/releases/download/[VERSION]/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
    - 권한 수정
        - `sudo chmod +x /usr/local/bin/docker-compose`
    - 테스트
        - `docker-compose -version`
    - docker-elk repo를 clone
        - `git clone https://github.com/deviantony/docker-elk#requirements`
    - SELinux 설정
        - SELinux가 활성화된 경우: `chcon -R system_u:object_r:admin_home_t:s0 docker-elk/`
    - docker-elk 실행
        - docker-compose.yml이 있는 디렉토리에서 실행해야 함
            - `docker-compose build`
            - `docker-compose up -d`
            - `curl -XGET localhost:9200/_cat/indices?v`

## 3-5. Rancher
- 멀티 호스트에서 컨테이너를 실행하고 관리하기 위한 플랫폼
- Docker와 k8s를 운영하고 관리하는 도구
- 컨테이너의 생명주기를 관리하는 기능
- Rancher 하나로 도커 컨테이너를 관리하는데 필요한 전체 소프트웨어 스택 구축이 가능함
- 주요 컴포넌트와 기능
    - Rancher catalog: Spark, Hadoop, Zookeeper, ELK, Gluster, Jenkins
    - User management: AD/LDAP
    - Operation management: CD/CI, code repo, monitoring
    - Container orchestration and scheduling: Docker Swarm, Kubernetes
    - Network services / Storage services
- Rancher의 구성요소
    - Infra orchestration
        - 리눅스 호스트 형태로 원시 컴퓨팅 리소스를 가져올 수 있음
        - 각 리눅스 호스트는 가상 시스템 또는 물리적 시스템이 될 수 있음
        - Rancher는 각 호스트의 CPU, memory, storage, network  이외에 다른 것들은 예측 안함
            - Rancher 관점에서는VM instance인지 bare-metal server인지 구분하지 않음
    - Container orchestration and scheduling
        - 다수의 사용자가 다양한 COS 프레임워크를 사용해 컨테이너화된 앱을 실행하도록 함
        - Docker Swarm, Kubernetes, Mesos, Cattle 등 다양한 프레임워크를 이용해 컨테이너를 배포
        - 사용자는 여러 개의 swarm 또는 k8s 클러스터를 만들 수 있으며, 프레임워크 고유 기능을 이용해 앱을 관리할 수 있음
    - Application catalog
        - Rancher는 실행할 컨테이너의 정보가 담겨 있는 app catalog를 관리함
        - 버튼 한번 클릭으로 간단하게 앱을 실행 가능
        - 자주 사용하는 앱을 카탈로그 형태로 등록도 가능
        - 등록된 앱은 자동으로 실행 및 업그레이드가 가능
    - Enterprise-grade control
        - Active Directory, LDAP, Github 등의 인증 시스템
        - Rancher에서 제공하는 Role-based Access Control(RBAC)를 이용해 유저그룹 권한 설정 가능
- Rancher의 환경 구성
    - 3개의 노드
        - Node-01: Rancher Agent, apps, Docker
        - Node-02: Rancher Agent, apps, Docker
        - Node-03: Rancher Server, Docker
    - 2개의 노드에는 Rancher Agent가 설치되어야 함
        - Rancher Agent: Rancher Server의 명령을 받아서 컨테이너를 실제로 실행/관리/모니터링
    - 나머지 하나의 노드에는 Rancher Server가 설치되어야 함
        - Rancher Server: 모든 Rancher Agent를 관리하며, Agent들에 컨테이너 실행/관리/모니터링 명령을 내림
        - 컨테이너 관리를 위한 web UI를 제공함
    - 모든 노드에는 도커가 설치되어야 함
- Rancher 설치
    - 도커 설치
        - `docker version`
    - Rancher 서버 설치
        - `docker run -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher`
    - 웹 브라우저 로그인
    - Rancher Server URL 설정: Rancher 노드 추가할 때 사용
    - Rancher Node 추가하기: Node의 3가지 역할
        - etcd
            - etcd 데이터베이스를 실행하는데 필요함
                - k8s가 관리하는 모든 클러스터의 데이터가 저장됨
            - 단일 노드에서 etcd를 실행할 수도 있지만, 중복 저장을 위해 3~5개 이상의 노드를 설정하고 도커를 설치
        - Controlplane
            - controlplane 노드는 k8s API 서버, 스케줄러, 컨트롤러 관리자를 실행하는데 사용함
            - 단일 노드에서 실행할 수 있지만, 2개 이상의 노드에서 실행하는것이 권장됨
        - Worker
            - kubelet 및 작업을 실행하는데에 사용함
            - 필요한 경우 스토리지 및 네트워킹 드라이버와 ingress 드라이버도 실행
        - 적어도 하나 이상의 etcd와 controlplane 노드가 필요함
- 멀티 컨테이너 관리
    - Rancher는 컨테이너 시스템을 채택한 팀을 위한 완벽한 멀티 클러스터 관리 플랫폼
        - 여러 개의 k8s 클러스터를 관리할 때 발생하는 운영/보안 문제를 해결하면서 DevOps 팀에 컨테이너 작업 부하를 감지하기 위한 통합 도구
    - Rancher는 swarm이나 mesos보다는 k8s과의 조합이 좋음
    - 중앙 집중식 정책 관리
        - Rancher가 관리하는 모든 k8s 클러스터에 적용할 수 있는 중앙 집중식 보안 정책 제공
    - 직관적 인터페이스
        - Rancher는 k8s API 및 CLI에 대한 접근 뿐만 아니라 pods, 정책, 저장소, 기밀, 서비스 등을 위한 UI 제공

---
# 4. 클라우드 컴퓨팅
## 4-1. AWS기반 Docker 구축
- AWS는 Docker CE와 Docker EE를 모두 지원
- 도커를 활용한 개발 환경 구축
    - 코드의 빠른 전달 및 리소스의 효율적 사용이 가능
    - 운영 표준화: 작은 컨테이너식 앱을 사용하면 손쉽게 배포하고 문제 해결 및 롤백이 가능함
    - 수월한 마이그레이션: 로컬 개발 시스템에서 AWS의 프로덕션 배포로 원활하게 이전이 가능함
    - 개발자를 위한 완전 관리형 플랫폼을 만들 수 있음
    - 분산형 microservice architecture를 손쉽게 구축 및 실행
    - 고도로 확장 가능한 데이터 처리 시스템 구축 가능
    - 표준화된 CI 및 지속적 delivery pipeline을 통해 코드를 배포
    - Container-as-a-Service: 안전한 IT admin 인프라와 컨텐츠로 분산 앱 구축 및 제공
- AWS에서 Docker 실행
    - Amazon ECS는 고도로 확장 가능하고 성능이 좋은 컨테이너 관리 서비스
        - Amazon Fargate: 인프라를 배포하거나 서버 provisioning 및 관리 없이 프로덕션에서 컨테이너를 실행할 수 있도록 하는 기술
    - Amazon EKS를 사용하면 손쉽게 AWS에서 k8s를 실행할 수 있음
    - Amazon ECR은 도커 컨테이너 이미지를 손쉽게 저장/관리할 수 있도록 지원하는 고가용성 private registry이며 저장된 이미지를 암호화하고 압축해서 관리함
    - AWS Batch를 사용하면 도커 컨테이너의 batch processing workload를 실행할 수 있음
- AWS로 도커 컨테이너 배포
    - Amazon ECS '첫 실행 마법사'를 실행함
    - 작업 정의 생성
        - 작업 정의: 애플리케이션에 대한 청사진
        - 이 단게에서 ECS가 컨테이너에 어떤 도커 이미지를 사용하고, 몇 개의 컨테이너를 사용하며, 컨테이너당 리소스 할당은 어떻게 되는지 알 수 있도록 정의해줌
    - 서비스 구성
        - 작업 정의를 생성하고 나면 ECS 서비스를 구성해야 함
        - 서비스는 클러스터에서 작업 정의 사본을 시작 및 유지관리
    - 클러스터 구성
        - Amazon ECS 컨테이너 에이전트를 실행하는 컨테이너 인스턴스 집합인 클러스터에서 실행
        - 클러스터 구성, 보안 설정 검토, IAM 역할 등을 설정하면 됨
    - 리소스 시작 및 확인
        - 이전 단계에서 작업 정의, ECS 서비스 및 클러스터를 구성했으니 이 단계에서는 생성한 리소스를 검토/시작/확인하면 됨
    - 샘플 애플리케이션 열기
        - 이 단계에서는 브라우저가 로드 밸런서 DNS 이름을 가리키도록 하여 샘플 애플리케이션이 실행되고 있는지를 확인

## 4-2. Serverless
- 서버를 구축할 때 안정성, 관리성, 보안성, 유지보수성 등이 고려되어야 함
- 분산 서버 설계 개념이 등장
    - 프론트엔드 서버: 비즈니스 로직을 담당하는 서버 군집체
    - 메모리 데이터 그리드: 메모리 저장소 역할을 담당하는 서버 군집체
    - 데이터베이스 샤드 클러스터: 거대한 데이터를 나눠 가지는 서버 군집체
- Serverless 아키텍쳐
    - 함수 서비스: 프론트엔드 서버의 서버리스 버전
    - 메모리 캐시 서비스: 메모리 데이터 그리드의 서버리스 버전
    - 데이터베이스 서비스: 데이터베이스 샤드 클러스터의 서버리스 버전
- Serverless 서비스
    - Serviceful serverless
        - 서비스형 서버리스는 직접 서비스를 구축하고 provisioning하고 관리할 필요가 없이 서버의 역할을 서비스 형태로 사용하는 것을 의미
        - 단순히 컴퓨팅 리소스, 스토리지, 네트워크 뿐 아니라 머신러닝, 모바일 백엔드, 블록체인, IoT 등의 다양한 서비스를 함께 개발
    - Functions-as-a-Service
        - 함수를 서비스로 제공하는 형태
        - 함수/코드를 실행하기 위해 서버를 올리고 런타임을 구성하고 코드를 배포하는 과정을 없애고, 사용자가 원하는 로직을 함수로 작성만 해놓으면 특정 조건 하에 함수가 실행되고 이를 보장
        - 함수가 호출되면 VM/컨테이너가 실행되고, 해당 런타임 내에서 정의해놓은 함수가 실행됨
        - 실행 후 VM/컨테이너는 종료됨
        - 서버가 계속 대기하면서 사용자의 요청을 처리하는 것이 아니라, 이벤트가 있을 때마다 실행되는 작은 코드
        - AWS Lambda, Azure Functions, Google Cloud Functions 등의 서비스가 있음
- Serverless application 사용 유형
    - 클라이언트에서 사용자 인터랙션 로직을 대부분 처리하는 경우
        - 자주 사용하는 서버 기능은 서버리스형 서비스로 처리하기 (서버의 역할을 줄이기)
        - 각종 연계를 위해 사용하는 작은 함수는 FaaS로 처리하기 (서비스간 로직의 외주화)

## 4-3. Google Cloud Run 기반 Docker 구축
- GCR은 k8s 위에서 Knative 기반으로 동작함
    - 구글 클라우드에 종속되지 않음 = 높은 이식성
    - 완전 관리형 환경 vs GKE 클러스터 중 선택
- 도커 이미지만 있으면 외부에 노출된 서버 앱을 손쉽게 실행할 수 있음
- 서버 리퀘스트를 가정하고, 리퀘스트를 받으면 컨테이너가 실행되고 그 요청을 처리함
- 다양한 프로그래밍 언어와 프레임워크를 지원함
- serverless 기반으로 컨테이너 실행 가능
    - GCR은 HTTP 요청으로 호출 가능한 stateless 컨테이너를 실행하는 플랫폼
    - 간편한 배포, 원하는 방식대로 코딩을 할 수 있음
    - 서버 provisioning이나 관리가 필요 없으므로 코딩에 집중할 수 있음
- GCR 설정
    - Firebase 프로젝트와 연결된 결제 계정이 있어야 무료 quota의 GCR 사용 가능
    - gcloud 베타 구성 요소 설치
        - `gcloud components install beta`
        - `gcloud components update`
        - `gcloud config list`
- GCR 구축은 GCR 도커 샘플을 참고할 것