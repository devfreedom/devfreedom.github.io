---
title: "[트러블슈팅] Selenium WebDriver 사용할 때 'data:,'라는 URL에서 멈추면서 자동화가 실행이 안되는 경우"
date: 2022-09-11T19:31
thumb: "selenium-logo.png"
tags: 
    - ❮트러블슈팅❯
    - 파이썬
---

웹브라우저 자동화를 위해서 Selenium WebDriver를 사용할 때 일반적으로 다음과 비슷한 코드로 WebDriver를 준비하게 됩니다.

```
# WebDriver 설치 경로는 리눅스 기준입니다
driver_path = '/usr/bin/chromedriver'

options = webdriver.ChromeOptions()
options.add_argument('--no-sandbox')
options.add_argument('--disable-gpu')
options.add_argument('--headless')

driver = webdriver.Chrome(executable_path=driver_path, options=options)
```

하지만 간혹 개발 환경에 따라 브라우저가 지정된 URL로 가는 대신 data:, 라고 표시되면서 더 이상 진행이 되지 않는 오류가 생길 수 있습니다.

그럴때는 저 options argument 목록에 아래와 같은 코드를 추가해주면 됩니다.

```
options.add_argument('--remote-debugging-port=9225')
```

StackOverflow 한시간동안 뒤져서 겨우 찾아냈습니다. 무슨 원리인지는 아직 모릅니다... 나중에 공부해서 내용을 업데이트 해볼까 합니다.

아, 그리고 Chrome 인스턴스가 기존에 이미 동작중일 때 WebDriver를 실행하면 동일한 에러가 발생하니까 반드시 WebDriver 실행 전에 크롬 창은 모두 종료하시는 것 잊지 마시구요.