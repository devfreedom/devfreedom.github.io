---
title: "[번역] 안드로이드와 iOS에서 광고 ID 추적을 해제하는 방법 및 그렇게 해야 하는 이유를 알려드립니다"
date: 2022-10-30T16:42
thumb: "eff-logo.png"
tags: 
    - ❮번역❯
    - 전자 프론티어 재단
    - EFF

---

미국의 디지털 민권단체인 전자 프론티어 재단(EFF)에 번역기여자로 참여해 작성한 번역본입니다.

원문: [How to Disable Ad ID Tracking on iOS and Android, and Why You Should Do It Now](https://www.eff.org/deeplinks/2022/05/how-disable-ad-id-tracking-ios-and-android-and-why-you-should-do-it-now)

번역본: [안드로이드와 iOS에서 광고 ID 추적을 해제하는 방법 및 그렇게 해야 하는 이유를 알려드립니다](https://www.eff.org/ko/deeplinks/2022/05/how-disable-ad-id-tracking-ios-and-android-and-why-you-should-do-it-now)

---

이른바 'IDFA'(iOS의 경우) 또는 'AAID'(안드로이드의 경우)로 불리는 광고 식별자, 즉 '광고 ID'는 모바일 기기에서 제3자 추적을 가능하게 하는 핵심 요소입니다. 이를 해제하면 광고 사업자들과 데이터 중개 사업자들이 당신을 추적하고 프로파일링을 하기에 훨씬 더 어려워 집니다. 그리고 판매되는 당신의 개인 정보의 양을 제한할 수 있기도 합니다.

이 글은 기기에서 작동하는 광고 식별자의 역사와 그것이 어떻게 영구적 추적이나 개인 식별과 같은 사생활 침해를 가능하게 했는지를 설명합니다.

하지만 우선은 추적기가 당신의 광고 식별자에 접속할 권한을 제거하는 방법을 알려드리도록 하겠습니다.

**안드로이드 기기에서**

- '설정' 앱을 실행하고 '개인 정보 > 광고' 항목으로 들어갑니다. '광고 ID 삭제'를 누르고 그다음 페이지에서 다시 한번 버튼을 누르세요. 이렇게 하면 기기에 있는 어떠한 앱도 앞으로는 광고 식별자에 접속할 수 없게 됩니다.

- 안드로이드 12에서는 이런 방법으로 권한을 해제할 수 있지만, 오래된 버전의 안드로이드에서는 사용할 수 없습니다. 이 경우에는 '광고 맞춤설정 선택 해제'를 켜는 다음의 방법으로 광고 식별자를 초기화하고 앱들이 당신을 추적하지 못하게 할 수 있습니다.

**iOS 기기에서**

- 애플은 앱이 당신의 IDFA에 접근하기 전에 당신에게 권한을 요청하도록 요구합니다. 새로운 앱을 설치할 때, 앱은 당신을 추적할 권한을 당신에게 요청할 것입니다.

- '앱이 추적하지 않도록 요청'을 선택해 IDFA 접근권을 거부하세요.

- 과거에 추적 요청을 허락한 앱들의 목록을 보려면 '설정 > 개인 정보 보호 > 추적' 메뉴로 들어가세요. 다음과 같은 화면이 나타납니다.

- 과거에 개별 앱들이 부여받았던 추적 권한을 여기서 해제할 수 있습니다. 당신을 추적할 권한을 받은 앱들만 당신의 IDFA에 접근할 수 있습니다.

- '앱이 추적을 요청하도록 허용' 항목을 끌 수도 있습니다. 스위치가 왼쪽으로 가고 배경이 회색으로 변하면 올바르게 꺼진 것입니다. 이렇게 하면 추후에 앱들이 추적을 요청하는 것을 막아버릴 수 있습니다. 만약 당신이 과거에 추적을 허용한 앱이 있다면, 이렇게 하여 그 앱들의 추적도 중단할 것인지 선택할 수 있습니다.

- IDFA를 활용한 제3자 추적기와는 별개로 애플은 자체적인 표적 광고 시스템을 운영하고 있습니다. 이를 해제하려면 '설정 > 개인 정보 보호 > 애플 광고'로 가서, '맞춤형 광고' 스위치를 꺼서 애플의 자체적 표적 광고를 해제하세요.

### 역사

스마트폰이 등장한 초기에는 추적기들이 기기별로 고정된 식별자를 사용했습니다. 애플의 iOS에서는 UDID(Unique Device Identifier)라는 이름으로, 구글의 안드로이드에서는 안드로이드 ID라는 이름으로 존재했는데, 이러한 식별자는 고유하고 영구적이었으며 사용자의 동의나 인식 없이 제3자에 의해 자주 사용되고는 했습니다.

이는 사용자의 사생활에 있어서 문제점으로 여겨졌습니다. 2010년에 언론사 '월스트리트 저널'에서 실시한 조사는 이 문제의 심각성을 고발했으며, 미국 의회의 의원들로부터 여러 번의 청문 과정이 있고 난 뒤에 애플은 UDID로의 접근권을 제한하기 시작했습니다.

업계는 이미 UDID를 사용하는 데이터 수집 방식에 의존하기 시작했으며, 추적기들은 이러한 변화에 살아남기 위해 재빨리 움직이기 시작했습니다. 그러다가 2012년에 애플은 조용히 '광고 식별자(IDFA)'를 도입했습니다. UDID를 대체하는 새로운 식별자인 IDFA는 모든 앱에 기본적으로 허용된 시스템 전반의 고유 식별자라는 점에서 UDID와 거의 비슷한 것이었습니다. 가장 큰 차이점이라고 한다면 IDFA는 초기화될 수 있다는 것입니다만, 사용자가 이를 어떻게할지를 알아야만 그것이 가능했습니다. 애플은 '광고 추적 제한하기'라는 옵션을 사용자들에게 허용하기도 했는데 이는 사용자를 추적하지 말도록 앱에 요청하는 기능입니다. 하지만 이 기능은 앱들이 IDFA에 접근할 권한 그 자체에 영향을 미치지는 않았습니다.

안드로이드 역시 '안드로이드 광고 식별자(AAID)'를 도입함으로써 2013년에 이러한 사례를 따랐습니다. 애플처럼 구글 역시 이 식별자를 모든 앱들이 특별 권한 없이 기본으로 사용할 수 있도록 만들어 두었습니다. 사용자들은 광고 식별자를 초기화할 수는 있었지만 그것을 삭제하거나 접근을 제한할 수는 없었습니다.

2016년에 애플은 '광고 추적 제한하기' 옵션을 새로 설계했는데, IDFA의 고유 번호를 모두 0으로 만듦으로써 사실상 IDFA를 제거하는 기능이 되었습니다. 이는 사상 처음으로 사용자들이 IDFA 추적으로부터 효과적이고 기술적으로 벗어나게 되었다는 것을 의미합니다.

2021년, 애플은 '앱 추적 투명성(ATT)'이라는 것을 도입했습니다. 이는 앱이 IDFA나 기타 식별자를 사용하여 사용자를 추적하기에 앞서 사용자로부터 명백한 동의를 얻도록 하는 조치입니다. 앱 추적 투명성은 광고 추적 업계에 어마어마한 영향을 미쳤습니다. 기존에는 약 20%의 사용자들만이 자발적으로 추적을 해제했다면(나머지 5분의 4는 기본 설정으로써 광고 추적에 동의한 상태라는 것을 의미합니다), 앱 추적 투명성 도입 이후에는 압도적 대다수의 사용자들이 추적을 거부하기를 선택했습니다. 기본 설정이라는 것은 그만큼 중요합니다.

한편, 안드로이드는 마침내 광고 ID를 해제할 수 있는 옵션을 제공하기 시작했습니다. 2022년 4월 1일부터 안드로이드 개발자들은 광고 ID에 접근하기 위해서 별도의 권한을 사용자에게 요청해야 하는데, 다만 이는 '일반 수준의 권한'으로 취급되기 때문에 사용자들은 추적 동의를 요구하는 별도의 팝업창을 볼 수 없습니다. 광고 ID의 주 역할은 제3자가 사용자를 추적하는 것임에도 불구하고, 구글의 개발자 문서는 이러한 권한은 "사용자의 사생활에 아주 적은 위험을 미치는" 데이터를 위한 것이라고 설명합니다. 다르게 말하자면, 안드로이드의 광고 ID는 여전히 기본적으로 사용하도록 설정이 되어 있고 사용자가 자발적으로 해제해야만 하는 방식으로 작동하며, 사용자들은 안드로이드에서 자신의 개인 정보를 지키기 위해서 추가적인 수고를 해야 한다는 것입니다.

2월에 구글은 최종적으로는 아예 광고 ID를 폐지할 수도 있다고 언급했습니다. 구글은 '프라이버시 샌드박스' 프레임워크의 일종을 모바일 기기에 탑재해 '앱간 식별자에 의존하지 않고도' 행동적 광고를 할 수 있도록 하는 계획을 하고 있습니다. 하지만 구글은 적어도 2년 동안은 광고 ID와 관련해 급격한 변화는 없을 것이라고 개발자들에게 확실하게 말해주었습니다.

### 왜 중요할까요?

광고 식별자는 당신의 스마트폰, 태블릿, 기타 스마트 기기들을 각각 고유하게 식별하기 위한 숫자들과 알파벳들의 조합입니다. 광고 식별자는 하나의 목적을 위해서 존재합니다. 바로 다른 기업들이 당신을 추적할 수 있도록 도와주는 것입니다.

제3자 추적기는 당신의 기기에 있는 앱을 통해서 데이터를 수집합니다. 광고 ID는 추적기들이 각기 다른 출처들로부터 온 데이터들을 당신이라는 단 하나의 신원으로 연결해 줍니다. 심지어 모든 앱들과 추적기들이 동일한 ID를 보기 때문에, 데이터 중개 사업자들이 당신에 대한 여러 개의 노트를 비교할 수 있습니다. 중개 사업자 A는 중개 사업자 B로부터 데이터를 사 와서, 이 두 가지 데이터셋을 광고 식별자로 묶을 수 있습니다. 쉽게 말해서 광고 식별자는 폭넓은 범위의 사생활 침해를 가능하게 하는 열쇠입니다. 페이스북이나 구글 등 제3자가 수행하는 침해적 프로파일링, 캠브리지 애널리티카(Cambridge Analytica)와 같은 정치컨설팅 업체에 의한 유사과학적 사이코그래픽스(심리적 시장분석) 표적화, 미군에 의한 위치추적 등이 그 예시입니다.

데이터 유통 과정에 참여하는 자들은 때때로 광고 ID는 익명이거나 가명이므로 개개인을 식별할 수 없는 정보이며 심각한 사생활 침해의 우려가 없다고 반박합니다. 하지만 이는 현실적으로 사실이 아닙니다. 우선, 광고 ID는 정밀한 위치정보와 같이 개인을 명확하게 식별할 수 있는 정보를 수집하는 데 흔히 활용됩니다. 만약 당신이 누군가가 어디서 일하고, 잠들고, 공부하고, 사람들을 만나며, 신앙 활동을 하고, 의료 서비스를 받는지를 볼 수 있다면, 그 사람의 신원을 파악하기 위해 굳이 이메일 주소 같은 것이 필요하지는 않을 것입니다. 그리고 추적기들이 광고 ID를 보다 직접적인 신원 확인 정보들, 예를 들면 이메일 주소나 전화번호에 연결할 수 있게 도와주는 온전한 산업 생태계가 존재한다는 점입니다. 외부와 단절된 환경에서는 광고 ID가 익명일지 모르지만, 이러한 산업이 존재한다는 점을 고려하면 광고 ID는 광범위하게 존재하고 효과적인 개인 식별자입니다.

광고 ID를 해제하게 되면 대부분의 광고 사업자들과 데이터 중개 사업자들이 당신을 추적하기에 훨씬 더 어려워집니다. 이러한 산업은 매일 수백만 수십억 명의 사용자들로부터 수집되는 데이터를 처리하며, 그것을 대규모로 가능하게 하는 광고 ID와 같은 편리한 기술들에 의존합니다. 이런 기술을 그들의 공구 상자에서 꺼내버리게 되면 디지털 세상에서 당신의 신원과 엮이는 데이터의 양을 대폭 줄일 수 있습니다. 이는 당신의 개인정보에 유익할 뿐만 아니라 감시적 광고 산업 자체의 수익성을 낮추기도 합니다. 그냥 하는 말이 아닙니다. 페이스북에 의하면 애플의 앱 추적 투명성 기능은 2022년 페이스북 매출의 약 10억 달러를 감소시킬 것이라고 합니다.

이것이 바람직한 첫걸음이기는 하지만, 광고 ID를 제거하는 것이 모든 추적을 멈출 수 있는 것은 아닙니다. 만약 당신 혹은 당신이 알고 있는 누군가의 특정한 사생활과 연관된 위협이 걱정되신다면 저희가 마련한 다른 정보들을 확인해 보세요. 낙태 접근권에 관련된 분들을 위한 디지털 보안 및 사생활 팁, 개인을 위한 보안 플랜, 시위에 참가하기, 스마트폰 보안 등이 있습니다. 이러한 정보들은 '출산 의료 서비스 제공자, 필요자, 지지자'와 같은 목록 묶음으로 정리되어 있습니다.