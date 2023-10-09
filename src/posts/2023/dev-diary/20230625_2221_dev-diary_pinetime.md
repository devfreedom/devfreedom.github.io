---
title: "[개발 일기] PineTime 스마트워치 펌웨어를 개조해서 커스텀 워치페이스 만들기"
date: 2023-06-25T22:21
thumb: "pinetime.jpg"
tags: 
    - ❮개발 일기❯
    - C++
    - 임베디드
    - 프로그래밍
---

예전에 [PineTime 스마트워치](https://opencomputings.com/20230422_1513_review_pinetime/)를 리뷰한 적이 있었습니다. 지금도 잘 사용하고 있는데요, 오픈소스 하드웨어라는 장점을 누려보고 싶은 마음이 있었고 내가 직접 워치페이스를 만들어서 사용하고 싶다는 생각도 들었습니다. 그래서 이번에 과감하게 용기를 내어서 펌웨어를 갖고 놀아보기로 했습니다. 아, 용기가 필요한 이유는 바로 파인타임이 C++ 기반의 [InfiniTime](https://github.com/InfiniTimeOrg/InfiniTime) 펌웨어를 사용하고 있기 때문이죠. 메모리 관리를 잘못했다가는 큰일나는 바로 그 C++ 언어인데다가 소비자용 파인타임 제품은 방수 밀폐 처리가 되어있어서 만약에 뭔가가 잘못되면 분해해서 직접 펌웨어 플래싱을 할 수도 없습니다.

사실 그래서 얼마전에 InfiniTime 펌웨어 대신에 MicroPython 기반의 [Wasp-OS](https://github.com/wasp-os/wasp-os) 펌웨어도 한번 설치해봤습니다. 아무래도 C++보다는 파이썬이 메모리 문제에 있어서 안전하고 프로그래밍도 쉬우니까 시도해볼만 하다는 생각이 들었습니다. 하지만 안타깝게도 Wasp-OS가 기본적인 기능이 부족하고 버그도 심한 편이라 실사용이 어려운 수준이었습니다. 인터프리터 언어 특성상 배터리 효율도 좋지 않았구요. 프로그래밍을 통해서 간단한 기능을 추가하거나 디자인을 바꿀 수 있더라도 근본적인 실용성에서 부족함이 있었기때문에 결국 기본기가 탄탄한 InfiniTime을 다시 설치할 수밖에 없었습니다.

다행히 InfiniTime 프로젝트 기여자분들이 노력해서 [InfiniSim](https://github.com/InfiniTimeOrg/InfiniSim)이라는 시뮬레이터를 만들어준 덕분에, 펌웨어를 하드웨어에 실제로 올려보기 전에 소프트웨어적으로 테스트를 할 수 있습니다. 실제 하드웨어상에서 작동할 때 발생할 수 있는 문제를 완전히 예방할수는 없지만 그래도 큰 도움이 됩니다.

제가 C++를 배운지는 20년이 넘었고 워낙 어려운 언어라 잘 하지도 못합니다. 임베디드에서 사용하리라고는 생각도 못해봤구요. 그래서 기능 개선이나 로우레벨 최적화같은건 엄두도 나지 않아서 그냥 워치페이스 정도만 만들어보고자 합니다.

## InfiniSim 준비하기

우선, 직접 하드웨어에다가 테스팅을 하면서 개발하는 대신 시뮬레이터를 적극적으로 사용해서 테스트를 할 수밖에 없는 상황이므로 InfiniTime 소스코드 대신에 InfiniSim을 준비해봅시다. InfiniSim에는 시뮬레이터와 함께, 시뮬레이션의 대상이 되는 펌웨어인 InfiniTime과 함께 lv_drivers와 libpng가 git 서브모듈로써 설정이 미리 되어 있습니다. 그래서 git clone 명령으로 전체를 한번에 가져올 수 있습니다.

```
$ git clone --recursive https://github.com/InfiniTimeOrg/InfiniSim.git
```

다만 InfiniSim이 InfiniTime을 submodule로써 가져올 때 최신 버전의 InfiniTime을 가져오지 않는 경우가 있습니다. 지금같은 경우는 1.13 버전 대신에 1.12 버전을 가져왔네요. 

이 문제를 어떻게 해결해야할까요...

1. InfiniTime submodule을 원격 저장소에서 최신 코드로 가져오기
    - `git submodule update --recursive --remote` 명령어를 사용했더니 빌드가 와장창 깨져버리네요. 이 방법은 실패했습니다.
    - 안정적인 최신 '버전'을 가져오는게 아니라 최신 '커밋'을 가져와서 그런가봅니다.

2. submodule로써 가져올 InfiniTime의 커밋 지점을 InfiniSim 개발 팀에서 갱신해줄 때까지 기다리기
    - `InfiniTime @ 5f3acfa`를 가져와야 하는데 InfiniSim 프로젝트 쪽에서는 `InfiniTime @ f057894`을 submodule로써 가져오게 설정되어 있었습니다.
    - 1.13 버전이 나온지 얼마 안되서 아직 반영이 안됐나봅니다. 무작정 기다리기에는 시간이 아까웠습니다.

3. InfiniTime을 submodule로 가져오는 대신에 그냥 InfiniTime 자체를 최신 '버전' 커밋 지점으로 가져오기
    - InfiniTime을 괜히 복잡하게 InfiniSim의 submodule로써 업데이트할 필요가 없을 것 같습니다. 
        - submodule도 결국은 자체적인 git config 정보를 가지고 있으니까 그냥 독립적인 git 프로젝트로써 업데이트를 해주면 되겠습니다.
    - /InfiniSim/InfiniTime 경로에서 터미널을 열어 `git checkout -b 5f3acfa` 명령어로 특정 커밋 지점으로 간 다음에 `git pull`을 해줬습니다.

결국 3번을 사용해서 해결할 수 있었습니다. 참고로 InfiniTime 1.13 버전에서 전력 소모 최적화가 대폭 이루어져서 이제는 한번 충전하면 12일 넘게 사용할 수 있습니다. 진정한 '성장형' 스마트워치네요.

그리고 나서 dependency들도 별도로 설치해줘야 합니다. 공식 repository에 있는 README.md 파일에 설명이 잘 되어 있습니다. 저는 우분투를 사용하기 때문에 다음 명령어를 사용했습니다.

```
$ sudo apt install -y cmake libsdl2-dev g++ npm
$ npm install lv_font_conv@1.5.2
```

펌웨어에 내장된 리소스가 아닌 별도의 외부 리소스를 사용하려면 추가적인 dependency가 필요합니다. 

```
$ npm install ts-node@10.9.1 @swc/core lv_img_conv@0.3.0
```

워치페이스를 비롯해서 필수적이지 않은 자원들을 추가할 때 지금까지는 항상 펌웨어에 함께 내장시켜서 펌웨어 전체를 플래싱 해줘야 했는데, 최근에는 InfiniTime에서 그런 자원들을 펌웨어에 내장시키지 않고도 OTA로 별도로 추가할 수 있도록 메모리 구조를 개선한 바 있습니다. 상당히 큰 개선사항이지만 안타깝게도 제가 사용하는 안드로이드용 컴패니언 앱인 [Gadgetbridge](https://codeberg.org/Freeyourgadget/Gadgetbridge)에서는 아직 외부 리소스 OTA 전송 기능이 없기 때문에 이건 활용할 수 없네요.

이제 준비가 끝났습니다. 소스코드를 열심히 뜯어고치고서는 바이너리로 빌드를 하고 직접 테스트를 하면 됩니다. 빌드는 다음 명령어로 할 수 있습니다.

```
$ cmake -S . -B build -DInfiniTime_DIR="InfiniTime 소스코드가 있는 위치의 전체 경로"
$ cmake --build build -j4
```

바이너리 빌드가 끝나면 InfiniSim으로 구동해주면 됩니다.

```
$ ./build/infinisim
```

펌웨어부터 시뮬레이터까지 바닥에서부터 만들어낸 임베디드 개발자분들 존경스럽습니다.


## 워치페이스 개조하기

InfiniTime은 기본적으로 4개의 워치페이스를 제공합니다. 그리고 위에서 언급했듯이 최근에는 외부 리소스 OTA 전송 기능이 생기면서, 해당되는 워치페이스 리소스를 얹어주기만 하면 2개의 워치페이스를 추가적으로 사용할 수 있습니다. 저는 외부 리소스는 사용할 계획이 없고, 그렇다고 기본 워치페이스 갯수 자체를 늘리자니 구조적인 변경이 필요하고 골치가 아플것 같아서, 그냥 기본 워치페이스 4종 중에서 하나를 '대체'하는 방향으로 진행하려고 합니다.

### 1. fork한 InfiniTime의 버전을 바꿔주기

우선 제가 개조하고 있는 펌웨어는 InfiniTime 프로젝트의 mainline이 아니고 fork이므로 혼동을 피하기 위해서 버전 숫자부터 바꿔봅시다. 빌드 자동화 소프트웨어인 CMake에서 사용하는 설정 파일을 찾아서 버전 숫자를 1.13.0에서 1.13.1으로 바꿔줍니다.

- InfiniSim/InfiniTime/CMakeLists.txt
    ```
    cmake_minimum_required(VERSION 3.10)

    set(CMAKE_BUILD_TYPE Release CACHE STRING "Choose Debug or Release")

    // project(pinetime VERSION 1.13.0 LANGUAGES C CXX ASM)

    project(pinetime VERSION 1.13.1 LANGUAGES C CXX ASM)

    // (생략)
    ```

![Modified InfiniTime - New Version](../assets/img/infinisim-infinitime-version.png)

빌드를 해보니 펌웨어의 버전이 1.13.1으로 정상적으로 바뀐 것을 확인할 수 있습니다.

### 2. 기존에 있던 워치페이스 중 하나를 지우고 새로 만들기

~~저는 구글 픽셀 스마트폰을 사용하고 있기 때문에 구글의 최신 디자인 언어인 Material You와 유사한 디자인의 워치페이스를 만들고자 합니다. PineTimeStyle이라는 이름의 워치페이스를 없애고 그 자리에 Material이라는 이름의 워치페이스를 준비해봅시다.~~

~~먼저 PINE64에서 제공하는 [PineTime 커스텀 워치페이스 도큐멘테이션](https://wiki.pine64.org/wiki/PineTime_Custom_Watchface_Tutorial)을 읽어봐야겠네요.~~


## 누구나 그럴싸한 계획을 갖고 있다. 기기가 고장나기 전까지는...

![PineTime with broken LCD](../assets/img/pinetime-broken.jpg)

하필이면 글을 적고 난 다음날, 시계를 비눗물로 세척하다가 실수로 화장실 바닥에 떨어뜨렸습니다. 하지만 비싼 물건이 아니다보니 안타까운 마음보다는 "이제 마음놓고 개발용 기기로 사용할 수 있게 되었다"는 생각이 먼저 들더군요. 어차피 표면도 긁혔겠다, 이제부터는 함부로 쓰면 되겠다는 생각에 냉큼 화면 보호필름도 뜯어서 버렸습니다.

액정 화면 중간에 검은색 줄 몇개가 그어지는 하드웨어적인 고장 증상이 생겼습니다. 있는 그대로 사용하기에도 거슬리는데 워치페이스를 새로 만들어봤자 보기 흉할 것 같았습니다. 다행히도 기본 'Digital' 워치페이스는 고장난 부분만 절묘하게 피해서 모든 정보를 정상적으로 표시하고 있었습니다. 그래서 생각이 난건데, 알림창이라던가 버튼같은 UI 컴포넌트들의 배경 색상을 모두 완전한 검은색으로 만들어주면 검은색 줄이 그어진 고장난 부분이 가려져서 거의 눈에 띄지 않겠죠. 그렇게 기본 워치페이스는 일단 그대로 사용하기로 하고 대신에 시스템 UI를 바꿔보기로 했습니다. 버튼이라던가 색상만 바꿔주는 작업은 워치페이스를 새로 만드는 작업보다는 더 간단하고 쉬울거라서 입문하기에 차라리 나을 것 같았습니다. 

## 2. 워치페이스를 새로 만드는 대신에 시스템 UI를 수정하기

일단 공식 도큐멘테이션을 참고해서 색상 정보가 어떻게 메모리에 할당되어 있고 UI 요소가 그것을 어떻게 참조하고 있는지를 살펴봐야겠습니다.

[InfiniTime 개발자 도큐멘테이션](https://docs.infinitime.io/en/latest/developer-documentation/index.html)

InfiniTime은 GUI 렌더링에 [LVGL](https://lvgl.io/)을 사용합니다. 임베디드 개발 환경을 위한 오픈소스 그래픽스 라이브러리입니다.


### Quick Setting 화면의 모든 버튼 배경 색상을 검은색으로 바꾸기

우선은 메인 화면에서 오른쪽으로 스와이프를 하면 나타나는 Quick Setting 화면부터 살펴봅시다. Quick Setting 화면은 /src/displayapp/screens/settings/QuickSettings.cpp 파일에서 제어합니다. 

먼저 버튼의 배경 색상을 지정하는 디폴트값을 찾아봐야겠네요. 코드를 살펴보니까, QuickSettings 클래스의 QuickSettings() 메소드에서 LVGL의 lv_style_set_bg_color() 함수를 사용해서 색상을 지정하는 듯 합니다. LVGL 템플릿에서 제공하는, lv_color.h 파일에서 미리 정의된 검은색인 LV_COLOR_BLACK 매크로를 사용해서 버튼의 배경 색상을 검은색으로 바꿔줍니다.

```
// (생략)

QuickSettings::QuickSettings(Pinetime::Applications::DisplayApp* app,
                             const Pinetime::Controllers::Battery& batteryController,
                             Controllers::DateTime& dateTimeController,
                             Controllers::BrightnessController& brightness,
                             Controllers::MotorController& motorController,
                             Pinetime::Controllers::Settings& settingsController,
                             const Controllers::Ble& bleController)
  : app {app},
    dateTimeController {dateTimeController},
    brightness {brightness},
    motorController {motorController},
    settingsController {settingsController},
    statusIcons(batteryController, bleController) {

// (생략)

  // 원본 코드입니다.
  // lv_style_set_bg_color(&btn_style, LV_STATE_DEFAULT, Colors::bgAlt);

  // 이렇게 바꿔줍니다.
  lv_style_set_bg_color(&btn_style, LV_STATE_DEFAULT, LV_COLOR_BLACK);

// (생략)
```

이렇게 하면 화면 밝기 변경 버튼, 손전등 버튼, 설정 버튼의 배경 색상이 검은색으로 바뀝니다. 

하지만 알림 모드 변경 버튼의 경우 버튼의 배경 색상이 진동(초록색), 방해금지(빨간색), 야간(보라색) 이렇게 세 가지 상태를 가지기 때문에 디폴트값을 사용하지 않습니다. 무음 모드와 야간 모드 상태에서의 배경 색상을 지정한 코드는 쉽게 찾을 수 있습니다.

```
// (생략)

  // 원본 코드입니다.
  // lv_obj_set_style_local_bg_color(btn3, LV_BTN_PART_MAIN, static_cast<lv_state_t>(ButtonState::NotificationsOff), LV_COLOR_RED);
  
  // 이렇게 바꿔줍니다.
  lv_obj_set_style_local_bg_color(btn3, LV_BTN_PART_MAIN, static_cast<lv_state_t>(ButtonState::NotificationsOff), LV_COLOR_BLACK);

  // LVGL 템플릿에서 지정되지 않은 보라색 색상을 사용하기 위해서 메모리에 할당해주는 코드입니다. 여기서는 모든 버튼에 검은색 배경 색상을 적용할 것이므로 이 코드는 필요가 없습니다. 주석처리 하면 됩니다.
  // static constexpr lv_color_t violet = LV_COLOR_MAKE(0x60, 0x00, 0xff);

  // 원본 코드입니다.
  // lv_obj_set_style_local_bg_color(btn3, LV_BTN_PART_MAIN, static_cast<lv_state_t>(ButtonState::Sleep), violet);

  // 이렇게 바꿔줍니다.
  lv_obj_set_style_local_bg_color(btn3, LV_BTN_PART_MAIN, static_cast<lv_state_t>(ButtonState::Sleep), LV_COLOR_BLACK);

// (생략)
```

마찬가지로 이렇게 LV_COLOR_BLACK으로 지정해주면 됩니다.

하지만 이렇게 해도 버튼의 초기 배경 색상만 검은색이 될 뿐, 버튼을 눌러서 진동-방해금지-야간 이렇게 3가지 모드를 토글하다보면 진동 모드의 배경 색상이 초록색으로 나타났습니다. 그래서 알림 모드 상태를 감지하고 변경하는 if 구문 부분에다가 수동으로 lv_style_set_bg_color() 코드를 추가해주기로 했습니다.

```
// (생략)

void QuickSettings::OnButtonEvent(lv_obj_t* object) {
  if (object == btn2) {
    app->StartApp(Apps::FlashLight, DisplayApp::FullRefreshDirections::Up);
  } else if (object == btn1) {

    brightness.Step();
    lv_label_set_text_static(btn1_lvl, brightness.GetIcon());
    settingsController.SetBrightness(brightness.Level());

  } else if (object == btn3) {

    if (settingsController.GetNotificationStatus() == Controllers::Settings::Notification::On) {
      settingsController.SetNotificationStatus(Controllers::Settings::Notification::Off);
      lv_label_set_text_static(btn3_lvl, Symbols::notificationsOff);
      lv_obj_set_state(btn3, static_cast<lv_state_t>(ButtonState::NotificationsOff));
    } else if (settingsController.GetNotificationStatus() == Controllers::Settings::Notification::Off) {
      settingsController.SetNotificationStatus(Controllers::Settings::Notification::Sleep);
      lv_label_set_text_static(btn3_lvl, Symbols::sleep);
      lv_obj_set_state(btn3, static_cast<lv_state_t>(ButtonState::Sleep));
    } else {
      settingsController.SetNotificationStatus(Controllers::Settings::Notification::On);
      lv_label_set_text_static(btn3_lvl, Symbols::notificationsOn);
      lv_obj_set_state(btn3, static_cast<lv_state_t>(ButtonState::NotificationsOn));

      // 여기에다가 코드를 추가해 줍니다.
      lv_obj_set_style_local_bg_color(btn3, LV_BTN_PART_MAIN, static_cast<lv_state_t>(ButtonState::NotificationsOn), LV_COLOR_BLACK);
     
      motorController.RunForDuration(35);
    }

// (생략)
```

![Modified InfiniTime - QuickSettings](../assets/img/infinisim-infinitime-quicksettings.png)

이렇게 하니까 의도했던대로 모든 상태에서의 모든 버튼의 배경 색상이 검은색으로 바뀌었습니다.

### Setting 화면의 모든 버튼 배경 색상을 검은색으로 바꾸기

설정 화면의 버튼들 역시 마찬가지의 방법으로 배경 색상을 바꿔줍시다.

위에서 했던 방식대로 모든 버튼에다가 배경 색상을 일일이 지정해줄까 생각을 했었는데, 코드를 보다 보니까 InfiniTime은 공통적인 UI 요소들을 이미 템플릿처럼 지정해두고 각 화면에서는 그걸 꺼내서 사용하는 구조라는 것을 알게 되었습니다. 그래서 일단 UI 요소들의 스타일을 지정해둔 '테마'인 /src/displayapp/InfiniTimeTheme.cpp 파일을 건드려보기로 했습니다.

```
// (생략)

  style_init_reset(&style_btn);
  lv_style_set_radius(&style_btn, LV_STATE_DEFAULT, 10);
  lv_style_set_bg_opa(&style_btn, LV_STATE_DEFAULT, LV_OPA_COVER);

  // 원본 코드입니다.
  // lv_style_set_bg_color(&style_btn, LV_STATE_DEFAULT, Colors::bg);
  // lv_style_set_bg_color(&style_btn, LV_STATE_CHECKED, Colors::highlight);
  // lv_style_set_bg_color(&style_btn, LV_STATE_DISABLED, Colors::bgDark);

  // 이렇게 바꿔줍니다.
  lv_style_set_bg_color(&style_btn, LV_STATE_DEFAULT, LV_COLOR_BLACK);
  lv_style_set_bg_color(&style_btn, LV_STATE_CHECKED, LV_COLOR_BLACK);
  lv_style_set_bg_color(&style_btn, LV_STATE_DISABLED, LV_COLOR_BLACK);

// (생략)
```

이렇게 하니까 심박수 측정 화면, 시간 설정 화면 등에서 일부 버튼들의 배경 색상이 검은색으로 바뀌었습니다. 하지만 대부분의 설정 및 앱 선택 버튼들은 그대로인 것으로 봐서는 공통적인 요소는 라디오 버튼, 체크박스, 스크롤바 등 일부에 불과한 것 같습니다.

다시 원점으로 돌아가서, 각 앱 및 메뉴 화면에서 별도로 색상을 지정해주기로 했습니다.

우선 무언가의 목록은 /src/displayapp/screens/List.cpp 파일에서 제어하는 것으로 보입니다. 코드를 보니 for문으로 애플리케이션의 개수만큼 목록을 만들어 주는 것으로 보이고, 잘 찾은 것 같습니다. 여기서도 배경 색상을 검은색으로 지정해주었습니다.

```
// (생략)

  for (int i = 0; i < MAXLISTITEMS; i++) {
    apps[i] = applications[i].application;
    if (applications[i].application != Apps::None) {

      static constexpr int btnHeight = (LV_HOR_RES_MAX - ((MAXLISTITEMS - 1) * innerPad)) / MAXLISTITEMS;
      itemApps[i] = lv_btn_create(container, nullptr);
      lv_obj_set_style_local_radius(itemApps[i], LV_BTN_PART_MAIN, LV_STATE_DEFAULT, btnHeight / 3);

      // 원본 코드입니다.
      // lv_obj_set_style_local_bg_color(itemApps[i], LV_BTN_PART_MAIN, LV_STATE_DEFAULT, Colors::bgAlt);

      // 이렇게 바꿔줍니다.
      lv_obj_set_style_local_bg_color(itemApps[i], LV_BTN_PART_MAIN, LV_STATE_DEFAULT, LV_COLOR_BLACK);

// (생략)
```

![Modified InfiniTime - List](../assets/img/infinisim-infinitime-list.png)


하지만 컴파일해서 시뮬레이터를 켜봤더니 예상과는 달리 앱 목록은 아니고 설정 메뉴 목록의 배경 색상이 검은색으로 변경되었습니다. 어차피 설정 메뉴 목록의 배경 색상도 바꿔줘야 하기 때문에 잘됐네요. 그렇다면 앱 목록은 어디에 있는지 찾아봤더니, /src/displayapp/screens/Tile.cpp 파일이 제어하고 있었습니다.

```
// (생략)

  // 원본 코드입니다.
  // lv_obj_set_style_local_bg_color(btnm1, LV_BTNMATRIX_PART_BTN, LV_STATE_DEFAULT, LV_COLOR_AQUA);

  // 이렇게 바꿔줍니다.
  lv_obj_set_style_local_bg_color(btnm1, LV_BTNMATRIX_PART_BTN, LV_STATE_DEFAULT, LV_COLOR_BLACK);

// (생략)
```

![Modified InfiniTime - Tile](../assets/img/infinisim-infinitime-tile.png)

이렇게 앱 목록 화면도 바꿔주었습니다.


### 앱들의 모든 버튼 배경 색상을 검은색으로 바꾸기

사실 반복적이고 쉬운 작업이라 굳이 유사한 코드를 여기에 계속 적을 필요는 없을 것 같습니다. 일단은 스마트폰의 알림 메세지를 표시해주는 알림창인 Notifications.cpp 에서 container의 배경 색상을 검은색으로 바꿨구요, Music 앱, Timer 앱, Stopwatch 앱에서도 `lv_obj_set_style_bg_color` 또는 `lv_obj_set_style_local_bg_color`로 검색해서 색상을 LV_COLOR_BLACK으로 바꿔줬습니다. 

다만 Timer 앱, Alarm 앱, Stopwatch 앱에서 숫자를 높이거나 낮추는 데 사용되는 컴포넌트의 배경 색상에 관한 코드는 없어서 파일 트리를 훑어봤더니 /src/displayapp/widgets/Counter.cpp 라는 별도의 파일이 있더군요. 여기에 숫자 카운터 위젯이 별도의 모듈로 정의되어 있어서 여기서 색상을 변경했습니다.

![Modified InfiniTime - Timer](../assets/img/infinisim-infinitime-timer.png)

InfiniSim 시뮬레이터를 돌려보니 전반적으로 흑백 위주의 깔끔한 인터페이스로 개편이 되었습니다. 액정이 고장나서 줄이 그어진 부분이 거의 눈에 띄지 않을 것 같습니다. 이정도라면 실사용 하는데 전혀 거슬리지 않을 것 같아서 기대가 됩니다.


## 3. 프로젝트 전체를 빌드하고 실제로 스마트워치에 OTA 플래싱하기

공식 InfiniTime 펌웨어에서 지정해둔 UI 요소들의 색상을 이미 메모리에 할당되어 있는 다른 색상으로 바꿔주는 굉장히 단순하고 국소적인 개조라서, 실제로 기기에 올려도 메모리 관련 문제는 터지지 않을 것 같습니다. InfiniSim 시뮬레이터에서 segfault가 터져서 크래시가 한번 일어났고, cmake로 바이너리를 빌드하다가 StopWatch.cpp에서 *directive writing 1 byte into a region of size between 0 and 8 [-Wformat-overflow=]* warning이 몇번 나왔습니다만, LV_COLOR_BLACK으로 색깔을 바꿔준 것 외에 다른 코드는 전혀 건드린게 없기때문에 제 잘못은 아닐겁니다...

이제 GitHub에 있는 [InfiniTime 공식 repository](https://github.com/InfiniTimeOrg/InfiniTime/blob/main/doc/buildAndProgram.md)를 참조해서 펌웨어 본체인 pinetime-app과 부트로더인 MCUBoot을 한데 묶어 OTA로 플래싱이 가능한 DFU 파일을 만들어보겠습니다.

### Dependency 설치하기

펌웨어를 빌드하기 위해서는 여러가지 의존성 라이브러리들과 패키지들이 필요합니다.

- 크로스 컴파일러: [ARM-GCC (10.3-2021.10)](https://developer.arm.com/downloads/-/gnu-rm)
	- deprecated된 GNU Arm Embedded Toolchain을 사용하고 있네요.
	- 10.3 버전을 다운로드 받아서 home 디렉토리에다가 압축을 해제했습니다.
- MCUBoot 툴을 사용하기 위한 파이썬3 `cbor`, `intelhex`, `click`, `cryptography` 모듈
	- InfiniTime용 개발 환경을 별도로 분리하기 위해 파이썬 가상환경(venv) 사용을 추천하고 있습니다.
		```
		python -m venv .venv
		source .venv/bin/activate
		python -m pip install wheel
		python -m pip install -r tools/mcuboot/requirements.txt
		```
- [NRF52 SDK v15.3.0](https://developer.nordicsemi.com/nRF5_SDK/nRF5_SDK_v15.x.x/nRF5_SDK_15.3.0_59ac345.zip)
	- 이것도 역시 다운로드 받아서 home 디렉토리에다가 압축을 해제했습니다.
- NRF52 [adafruit-nrfutil](https://github.com/adafruit/Adafruit_nRF52_nrfutil)
	- OTA로 플래싱 가능한 DFU 파일을 만들기 위해서 필요하다고 합니다.
		```
		$ pip3 install --user adafruit-nrfutil
		```
- 가급적 최신 버전의 CMake 
	- 3.16.5 버전은 검증이 되었다고 합니다. 저는 설치되어 있는 3.25.0 버전을 그대로 사용하기로 했습니다.
- 폰트 생성을 위한 [lv_font_conv](https://github.com/lvgl/lv_font_conv#install-the-script)
	- npm으로 설치가 가능합니다.
		```
		$ npm install lv_font_conv
		```

### InfiniTime 프로젝트를 cmake로 생성하기
dependency들이 모두 준비되었다면 이제 프로젝트를 생성해주면 됩니다. /InfiniTime/build 폴더로 가서 cmake를 실행해주면 되는데, 다만 여기서 옵션들을 반드시 지정해주어야 합니다.
- `-DARM_NONE_EABI_TOOLCHAIN_PATH=/home/owner/gcc-arm-none-eabi-10.3/`
	- 아까 다운로드 받아서 압축을 풀어놓은 ARM-GCC의 위치를 지정해줍니다.
- `-DNRF5_SDK_PATH=/home/owner/nRF5_SDK_15.3.0/`
	- 마찬가지로 NRF52 SDK의 위치를 지정해줍니다.
- `-DCMAKE_BUILD_TYPE=Release`
	- 디버깅하기는 쉽지만 대신 코드 최적화가 되어있지 않아 실제 기기에 올리기에는 용량이 너무 큰 Debug 모드로 빌드할 것인지, 아니면 실제 기기에 올리는 용도로 코드 최적화 과정을 거치는 Release 모드로 빌드할 것인지를 설정합니다. 여기서는 당연히 Release 모드로 지정해줍니다.
- `-DBUILD_DFU=1`
	- DFU 파일을 생성할 것인지를 지정해줍니다. 케이스가 분해되어 있는 개발자 버전의 PineTime이 아니어서 OTA를 통해서만 플래싱이 가능하므로 true(1)로 설정합니다.
- `-DBUILD_RESOURCES=0`
	- 외부 리소스를 함께 생성할 것인지를 지정합니다. 새로운 워치페이스나 폰트를 추가하는 작업이 아니므로 false(0)로 지정합니다.
- `-DTARGET_DEVICE=PINETIME`
	- 타겟 디바이스를 설정합니다. PineTime에다가 올릴 펌웨어이므로 PINETIME으로 지정해줍니다.

아... 그런데 이런 오류가 나오네요.

```
CMake Error at src/displayapp/fonts/CMakeLists.txt:4 (find_program):
  Could not find LV_FONT_CONV using the following names: lv_font_conv
```

InfiniSim에서 가져온 InfiniTime 소스여서 그런지, lv_font_conv가 포함되어 있는 node_modules 디렉토리가 InfiniTime이 아닌 InfiniSim 디렉토리에 들어있어서 인식을 못하지 않나 싶었습니다. 하지만 인터넷을 검색해보니 node_modules 디렉토리를 제대로 설정해줘도 lv_font_conv 패키지를 인식하지 못하는 경우가 있다고 하네요. 곰곰히 생각을 해봤는데, 프로젝트에 설치된 node 모듈이 아니라 혹시 시스템에 설치된 node 모듈을 참조하고 있는건 아닌지 싶어서 해당 패키지를 전역 옵션으로 시스템에 설치를 해 주었습니다.

```
$ sudo npm install -g lv_font_conv
```

그랬더니 cmake가 정상적으로 프로젝트를 준비했습니다.

### 프로젝트 빌드하기

이제 실제로 빌드를 해봅시다. 펌웨어 본체만 빌드하려면 `$ make -j4 pinetime-app` 명령어를, DFU 파일을 빌드하려면 `$ make -j4 pinetime-mcuboot-app` 명령어를 사용하면 됩니다.

분명히 InfiniSim을 통해서 빌드하고 실제로 시뮬레이션까지 해봤으니까 아무 문제 없이 빌드가 잘 되겠지... 라고 생각했지만 안심할 수 없죠. 역시나 에러가 터집니다.

```
/InfiniTime/src/components/heartrate/Ppg.h:10:10: fatal error: libs/arduinoFFT/src/arduinoFFT.h: No such file or directory
   10 | #include "libs/arduinoFFT/src/arduinoFFT.h"
      |          ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
compilation terminated.
```

심박수 측정 앱을 컴파일하다가 발생한 오류인데, arduinoFFT 라이브러리가 필요하지만 찾을 수 없다는 오류입니다. 분명히 arduinoFFT는 git submodule로 지정이 되어 있었는데, 나머지 submodule들과는 달리 /InfiniTime/src/libs/arduinoFFT 디렉토리를 살펴보니 텅텅 비어있었습니다. 어이가 없네요. 그래서 [arduinoFFT의 원격 저장소](https://github.com/kosme/arduinoFFT)에서 코드를 가져와서 수동으로 넣어주었습니다. 이제는 문제가 없겠지 했는데, 오류는 계속됩니다.

```
/InfiniTime/src/components/heartrate/Ppg.cpp:203:3: error: 'ArduinoFFT' was not declared in this scope; did you mean 'arduinoFFT'?
  203 |   ArduinoFFT<float> FFT = ArduinoFFT<float>(vReal.data(), vImag.data(), dataLength, sampleFreq);
      |   ^~~~~~~~~~
      |   arduinoFFT

/InfiniTime/src/components/heartrate/Ppg.cpp:203:14: error: expected primary-expression before 'float'
  203 |   ArduinoFFT<float> FFT = ArduinoFFT<float>(vReal.data(), vImag.data(), dataLength, sampleFreq);
      |              ^~~~~

/InfiniTime/src/components/heartrate/Ppg.cpp:204:3: error: 'FFT' was not declared in this scope
  204 |   FFT.compute(FFTDirection::Forward);
      |   ^~~

/InfiniTime/src/components/heartrate/Ppg.cpp:206:18: error: expected class-name before '(' token
  206 |   FFT.~ArduinoFFT();
      |                  ^
```

여전히 arduinoFFT와 관련된 문제가 생깁니다. 큰일이네요. 

```
#pragma once

#include <array>
#include <cstddef>
#include <cstdint>
// Note: Change internal define 'sqrt_internal sqrt' to
// 'sqrt_internal sqrtf' to save ~3KB of flash.
#define sqrt_internal sqrtf
#define FFT_SPEED_OVER_PRECISION
#include "libs/arduinoFFT/src/arduinoFFT.h"
```

일단 Ppg.h에서는 arduinoFFT.h를 참조하고 있으니까, arduinoFFT 모듈쪽 문제가 아닐까 싶었습니다. 그래서 arduinoFFT.h를 들여다 봤는데 이런 부분이 있었습니다.

```
// Define this to use a low-precision square root approximation instead of the
// regular sqrt() call
// This might only work for specific use cases, but is significantly faster.
// Only works for ArduinoFFT<float>.

// #define FFT_SQRT_APPROXIMATION
```

개발자가 직접 `ArduinoFFT<float>`를 언급한 것으로 봐서는 이걸로 변수같은것을 선언해줄 수 있는 것 같기는 한데, 실제로 작동은 되지 않고 있는 상황입니다. 

이탈리아의 어떤 온라인 포럼에서 이것과 비슷한 사례가 발견되기는 했는데, 그냥 arduinoFFT.h를 들여다보고 거기에 ArduinoFFT가 정의되어 있는지를 찾아보라는 당연한 조언만 있었습니다. 네, 당연히 arduinoFFT 소스코드 전체를 검색해봤죠. 하지만 `ArduinoFFT`는 arduinoFFT 그 어디에도 정의되어 있지 않습니다. 

```
Cand analizezi erorile, ia-le si tu pe rand.
ArduinoFFT e definit in <arduinoFFT.h>, pe care tu il ai referentiat in fisier.
Deci, daca nu ai instalat libraria corespunzatoare, ar trebui mai intai sa ai eroarea ca nu gaseste arduinoFFT.h

Daca o ai instalata, atunci cauta in arduinoFFT.h sa vezi daca e definit ArduinoFFT. Daca nu, inseamna ca e o eroare O versiune incompatibila cu codul din exemplul tau. Putin probabil insa, deoarece libraria ar putea fi mai noua si e back-compatible,

Cand iei cod de pe net, trebuie sa intelegi cam cum functioneaza un limbaj de programare si ce asteapta un compilator de la tine.
Daca cumva ai eroarea ca nu gaseste fisierul, ocupa-te mai intai de ea, dupa care de restul erorilor. Daca nu gaseste un fisier, e clar ca asta va genera tone de alte erori.
Daca-l gaseste, ar trebi sa te asiguri ca-i compatibil Eu cred ca da, insa tot ce-i posibil.
```

이 외에 어떤 개발 문서에서도, 심지어 인터넷상에서도 `arduinoFFT()`가 아닌 `ArduinoFFT<float>`가 사용되는 사례는 찾을 수 없었습니다. 

나름대로 여러가지 방법들을 시도해봤지만 헛수고였습니다.

- 다른 버전의 arduinoFFT 라이브러리를 사용해보기 (최신 1.6 버전부터 초기 버전까지)
	- 동일한 오류가 발생했습니다.
- 오류 메세지가 제안한대로 `ArduinoFFT<float>` 대신 `arduinoFFT<float>` 사용해보기
	- arduinoTTF 소스코드에 정의된 대로, 소문자로 시작하는 `arduinoFFT()`는 정상적으로 인식 및 사용이 가능했습니다. 하지만 매개변수와 관련된 완전히 다른 오류 메세지를 내뱉는걸로 봐서는 `ArduinoFFT()`와 동일한 구조라던가 사용법을 가진 것은 아닌듯 합니다.
- scope 문제를 해결하기 위해 `ArduinoFFT<float>`을 전역에서 선언해보기
	- scope를 바꿔줘도 똑같은 scope 오류 메세지를 내뱉는것으로 봐서, scope 문제가 아니라 컴파일러가 'ArduinoFFT'라는 단어 자체를 이해하지 못하는 것 같았습니다.
- arduinoFFT를 사용하는 모든 InfiniTime 파일에 arduinoFFT의 모든 파일을 `#include` 해주기
	- 이미 arduinoFFT는 정상적으로 InfiniTime에 연결되어있는 상태였습니다.

최근에 InfiniTime 개발팀에서 푸리에 변환을 통한 정밀한 심박수 측정 알고리즘을 구현하고자 arduinoFFT 라이브러리를 사용한 것으로 보이는데, 라이브러리에 정의되어있지도 않은 `ArduinoFFT<float>`는 도대체 어디서 굴러온건지 이해가 되지 않습니다. 분명히 정상적인 코드니까 InfiniTime 개발팀에서 정상적인 펌웨어로 빌드해서 릴리즈를 했을텐데, 왜 로컬 환경에서는 동일한 코드인데도 빌드가 되지 않는건지 정말 난감하네요.

여기서 그만두기에는 너무 답답해서 일단 키보드를 내려놓고 팔짱을 끼고 곰곰히 생각을 해봤습니다.

우선 위에서 언급했듯이 최근에 심박수 측정 알고리즘과 관련해서 대대적인 리팩토링이 있었다는 사실에 주목했습니다. 그래서 InfiniTime 공식 repository의 이슈 트래커를 열심히 살펴봤더니 [해당 사안과 관련된 스레드](https://github.com/InfiniTimeOrg/InfiniTime/pull/1486)가 있더군요. 읽다 보니까,

> This looks good to me! I've opened a PR to the FFT library that would allow us to specify the square root function to use without modifying the library: kosme/arduinoFFT#83. I don't think we should wait for that before merging this. We can update the library and put it in a git submodule in a later PR.

InfiniTime 개발팀이 arduinoFFT의 개발자에게 pull request를 넣었다? 그리고 InfiniTime에 사용할 arduinoFFT를 git submodule로 최신화할 수 있도록 pull request를 추진하겠다? 

아... 설마....

그렇습니다. InfiniTime은 arduinoFFT의 public release가 있는 master 브랜치의 코드를 사용하는게 아니라, develop 브랜치의 코드를 사용하고 있었던겁니다. InfiniTime의 git submodule이 arduinoFFT의 (develop 브랜치) 코드를 정상적으로 가져오지 않았기 때문에 저는 이 사실을 알 수가 없었습니다. 

그래서 얼른 arduinoFFT의 develop 브랜치로 가서 가장 먼저 changelog.txt 파일을 살펴봤습니다.

```
02/19/20 v1.9.0
Remove deprecated API. Consistent renaming of functions to lowercase.
Make template to be able to use float or double type (float brings a ~70% speed increase on ESP32).
Add option to provide cache for window function weighing factors (~50% speed increase on ESP32).
Add some #defines to enable math approximisations to further speed up code (~40% speed increase on ESP32).
```

이 부분이 눈에 확 들어오더군요. 대소문자가 섞인 불규칙한 네이밍을 고쳤다는 내용입니다. public release가 이루어지는 master 브랜치의 arduinoFFT 코드에서 왜 `ArduinoFFT`이라는 대문자 함수를 찾을 수 없었는지 그 이유가 바로 여기에 있었습니다. InfiniTime은 develop 브랜치에서 묵혀뒀던 구형 코드를 사용하기 때문. 어이가 없어서 헛웃음이 나오던 순간이었습니다.

아무튼 /InfiniTime/src/libs/arduinoFFT/ 디렉토리 내에 있는 master 브랜치 출신 arduinoFFT 파일들을 전부 지우고, develop 브랜치로부터 최신 arduinoFFT를 대신 넣어줬더니 빌드가 정상적으로 잘 되었습니다. 

```
[100%] Linking CXX executable pinetime-mcuboot-app-1.13.1.out
Memory region         Used Size  Region Size  %age Used
           FLASH:      411392 B     474632 B     86.68%
     SPARE_SPACE:          0 GB        12 KB      0.00%
             RAM:       64360 B        64 KB     98.21%
post build steps for pinetime-mcuboot-app-1.13.1
   text    data     bss     dec     hex filename
 411392     996   63356  475744   74260 pinetime-mcuboot-app-1.13.1.out
post build (DFU) steps for pinetime-mcuboot-app-1.13.1
Zip created at pinetime-mcuboot-app-dfu-1.13.1.zip
[100%] Built target pinetime-mcuboot-app
```

감격스럽습니다 ㅠㅠ


### 빌드한 DFU 파일을 PineTime에 플래싱하기

마지막 단계만 남았네요. 이렇게 만들어진 pinetime-mcuboot-app-dfu-1.13.1.zip 파일을 컴패니언 앱을 통해서 OTA 플래싱 해주면 됩니다. 저는 가장 대표적인 안드로이드 전용 컴패니언 앱인 [GadgetBridge](https://gadgetbridge.org/)를 사용합니다.

![Flashing modified InfiniTime firmware via GadgetBridge](../assets/img/infinitime-firmware-ota.png)

스마트폰이 InfiniTime과 페어링 된 상태에서 가젯브릿지에 내장된 파일 설치기를 사용해 DFU 파일을 OTA 전송하게 됩니다.

## 드디어 성공!

![PineTime with modified InfiniTime firmware 1](../assets/img/pinetime-modified-1.jpg)

InfiniSim에서 확인할 수 있었던 변경된 UI가 잘 적용되어 있습니다. 액정 화면을 가까이서 자세히 보면 하드웨어적으로 손상된 부분이 보이지만 일상적인 환경에서는 거의 눈에 띄지 않습니다.

![PineTime with modified InfiniTime firmware 2](../assets/img/pinetime-modified-2.jpg)

대부분의 화면에서 검은색 줄이 가려졌습니다.

공학적 열정으로 자원봉사를 해주시는 InfiniTime 개발팀 덕분에 제 스마트워치가 생명연장을 할 수 있게 되었습니다. 기초적이고 단순한 코드 변경이었지만 그래도 여러가지 우여곡절 끝에 직접 펌웨어 빌드와 플래싱까지 해주니 새삼스럽게 애착이 가네요.

원래 하려고 했던 워치페이스 개조는 나중에 PineTime을 새로 구입하게 되면 그때 다시 시도해보도록 하겠습니다. 이번 경험이 많은 도움이 될 것으로 기대합니다.