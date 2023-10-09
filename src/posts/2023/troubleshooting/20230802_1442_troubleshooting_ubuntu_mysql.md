---
title: "[트러블슈팅] [리눅스] 우분투에서 MySQL Workbench 설치시 libproj 의존성 오류가 발생할 때"
date: 2023-08-02T14:42
thumb: "mysql-logo.png"
tags: 
    - ❮트러블슈팅❯
    - 우분투
    - 리눅스
    - MySQL
---

우분투에서 MySQL 개발 환경을 설정하기 위해서는 먼저 [MySQL APT Repository Config](https://dev.mysql.com/downloads/repo/apt/) 패키지를 설치해서 MySQL 저장소를 등록시켜준 다음, 해당 저장소를 통해 mysql-server나 mysql-client-core 등의 구성요소들을 설치하게 됩니다. 마찬가지로 MySQL Workbench도 저장소로부터 mysql-workbench-community 패키지를 설치하거나 아니면 별도로 deb 패키지 파일을 다운로드받아서 MySQL Workbench 커뮤니티 에디션을 설치할 수 있는데, 비교적 최신 버전의 우분투에서는 다음과 같은 의존성 오류가 나타납니다.

```
$ sudo dpkg -i mysql-workbench-community_8.0.28-1ubuntu21.10_amd64.deb 

Selecting previously unselected package mysql-workbench-community.
(Reading database ... 629535 files and directories currently installed.)
Preparing to unpack mysql-workbench-community_8.0.28-1ubuntu21.10_amd64.deb ...
Unpacking mysql-workbench-community (8.0.28-1ubuntu21.10) ...

dpkg: dependency problems prevent configuration of mysql-workbench-community:
mysql-workbench-community depends on libproj19 (>= 7.2.0); however:
Package libproj19 is not installed.

dpkg: error processing package mysql-workbench-community (--install):
dependency problems - leaving unconfigured

Processing triggers for mailcap (3.70+nmu1ubuntu1) ...
Processing triggers for gnome-menus (3.36.0-1ubuntu3) ...
Processing triggers for desktop-file-utils (0.26-1ubuntu3) ...
Processing triggers for hicolor-icon-theme (0.17-2) ...
Processing triggers for shared-mime-info (2.1-2) ...

Errors were encountered while processing:
mysql-workbench-community
```

libproj라는 의존성 패키지가 설치되지 않았다는 오류 메세지 입니다. [PROJ](https://proj.org/)는 지리 좌표 변환 소프트웨어인데 MySQL에서 사용을 하나 봅니다. 일단은 MySQL Workbench 패키지 자체에 문제가 있을수도 있으니 --fix-broken 옵션을 사용해볼 수 있지만, 오류는 여전히 발생합니다.

```
$ sudo apt --fix-broken install ./mysql-workbench-community_8.0.28-1ubuntu21.10_amd64.deb

Reading package lists... Done
Building dependency tree... Done
Reading state information... Done

Note, selecting 'mysql-workbench-community' instead of './mysql-workbench-community_8.0.28-1ubuntu21.10_amd64.deb'
Some packages could not be installed. This may mean that you have
requested an impossible situation or if you are using the unstable
distribution that some required packages have not yet been created
or been moved out of Incoming.

The following information may help to resolve the situation:

The following packages have unmet dependencies:
mysql-workbench-community : Depends: libproj19 (>= 7.2.0) but it is not installable

E: Unable to correct problems, you have held broken packages.
```

libproj19를 설치할 수 없다는 오류입니다. MySQL 버전에 따라서 필요한 libproj 버전도 달라지는데, 최신 버전의 MySQL Workbench의 경우 libproj22를 요구합니다. 그렇다면 libproj19를 별도로 직접 설치해봅시다. 

```
$ sudo apt install libproj19

Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Package libproj19 is not available, but is referred to by another package.
This may mean that the package is missing, has been obsoleted, or
is only available from another source.

E: Package 'libproj19' has no installation candidate.
```

현재 우분투에 등록된 저장소들에서는 해당 패키지를 찾을 수 없다고 나오네요. 그렇다면 PROJ 공식 웹사이트를 참고해봅시다. 

> On Debian and similar systems (e.g. Ubuntu) the APT package manager is used:
> `$ sudo apt-get install proj-bin`

proj-bin이라는 이름의 패키지로 설치할 수 있군요. 하지만 이렇게 설치를 하면 최신 버전의 libproj가 설치되어버립니다. 지금 해보니까 libproj25가 설치되는군요. 의존성 문제가 늘 그렇듯이, 정확한 버전의 패키지가 설치되지 않는다면 해결되지 않습니다. libproj25가 설치되어 있어도 MySQL Workbench를 설치할 때 의존성 오류는 여전히 발생합니다.

그렇다면 최후통첩으로 정확하게 libproj19 버전을 설치해줍시다. 

인터넷에서 검색해보니까 패키지 정보를 공유하는 웹사이트 [pkgs.org](https://pkgs.org/)의 libproj19 검색 결과가 나오네요. libproj19의 경우에는 [Debian 11 Bullseye](https://debian.pkgs.org/11/debian-main-amd64/libproj19_7.2.1-1_amd64.deb.html)의 패키지 저장소에서, libproj22의 경우에는 [Ubuntu 22.04 LTS Jammy Jellyfish](https://ubuntu.pkgs.org/22.04/ubuntu-universe-amd64/libproj22_8.2.1-1_amd64.deb.html)의 패키지 저장소에서 다운로드 받을 수 있다고 나오는군요. 

다운로드 링크를 확인해보니 정상적으로 데비안 및 우분투 공식 서버를 가리키고 있습니다. deb 패키지 파일을 다운로드 받아서 설치해줍니다.

당연한 얘기입니다만, 이렇게 MySQL Workbench가 요구하는 정확한 버전의 libproj 패키지를 설치해주면 문제없이 MySQL Workbench를 설치할 수 있게 됩니다. 다만 해당 패키지가 현재 설치되어있는 우분투 버전의 기본 저장소에 포함되어 있지 않거나 하는 경우에는 이렇게 귀찮아질 뿐입니다.