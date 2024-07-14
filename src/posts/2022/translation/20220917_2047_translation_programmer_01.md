---
title: "[번역] 1. 당신이 프로그래머가 되어서는 안된다는 신호들"
date: 2022-09-17T20:47
thumb: "programmer.jpg"
tags: 
    - ❮번역❯
    - 프로그래밍
    - 컴퓨터공학
---

1. [당신이 프로그래머가 되어서는 안된다는 신호들](https://devfreedom.github.io/20220917_2047_translation_programmer_01)
2. [당신이 형편없는 프로그래머라는 신호들](https://devfreedom.github.io/20220918_1400_translation_programmer_02)
3. [당신이 평범한 프로그래머라는 신호들](https://devfreedom.github.io/20220918_1510_translation_programmer_03)
4. [당신이 유능한 프로그래머라는 신호들](https://devfreedom.github.io/20220918_1534_translation_programmer_04)
5. [당신이 대단한 프로그래머라는 신호들](https://devfreedom.github.io/20220918_1546_translation_programmer_05)

"바람직한, 그리고 좋지 못한 프로그래머란 무엇인가?"라는 질문에 현업 프로그래머들은 자신의 경력이나 학습 경험에서 우러나오는 나름대로의 다양한 기준과 대답을 가지고 있을 것입니다. 그 기준이 누군가는 보다 엄격하고 누군가는 다소 느슨하지만, 그래도 보편적으로 일치하는 업계 공통적인 견해는 있는 것 같습니다. '프로그래밍' 그 자체를 해온지는 20년이 넘었지만 안타깝게도 소프트웨어 개발을 직업으로 삼기에는 늦었고 또 나와는 맞지 않을 수 있음을 깨달은 한 사람으로서 이 질문은 제 스스로에게 한번쯤은 반드시 물어봐야 하는 질문일지도 모릅니다.

2012년 5월자 Hacker Monthly에 기고된 글 중에 "Signs that you're a bad programmer(당신이 형편없는 프로그래머라는 신호들)"라는 글이 있었습니다. 원본은 찾기 힘들고 복사본만 떠도는 상황이라 작성자가 누구인지는 지금은 알 수 없지만, 일부 출처에서는 '크리스 웨넘'이라는 개발자가 썼다고 합니다. 오래 전에 작성된 글이라서 빠르게 변화하는 IT 분야의 특성상 지금의 업계나 상황과는 다소 다를 수 있고, 개인의 주관과 고집이 뚜렷한 프로그래머들의 특성상 이 사람이 바라보는 '바람직한 프로그래머'의 조건은 제한적일 수도 있습니다. 하지만 시대가 변하더라도 학문과 산업에서 오랫동안 생명력을 유지하는 프로페셔널리즘의 기준이라는게 있고, 모든 다양한 프로그래밍의 뿌리는 결국 컴퓨터공학이고 그 학문의 특성을 공유한다는 사실에는 변함이 없습니다. 요즘에도 이 글이 요약본으로써 간혹 공유가 되는 것을 보면 시대와 업계를 관통하는 통찰이 있지 않을까 하는 생각이 들었고, 비록 저는 직업 프로그래머는 아니지만 어떻게든 프로그래밍을 하는 사람으로써 제 기질을 확인해보는 기회도 가져보고자 해서 시간이 걸리더라도 원문을 전부 번역해 보았습니다.

프로그래머라는 직업을 가져서는 안되는 정말 '형편없는' 개발자라던가 '평범해 빠진' 개발자에 대한 의견도 재치있게 적었고 이후에는 대칭되는 시선으로 바라본 <당신이 유능한 프로그래머라는 신호들> 도 있는데, 먼저 '개발을 해서는 안되는 형편없는 프로그래머'는 어떤 특징을 가지고 있는지 살펴보고 그 다음 단계로 하나씩 넘어가보도록 하죠.

---

## Signs that you shouldn't be a programmer

## 당신이 프로그래머가 되어서는 안된다는 신호들

The following may not have any remedies if you still suffer from them after taking a programming course in school, so you will stand a better chance of advancing your career by choosing another profession.

만약 당신이 학교에서 프로그래밍 수업을 듣고도 다음과 같은 어려움을 겪는다면, 마땅한 해결 방법이 없을지도 모릅니다. 다른 분야를 고르는 것이 당신의 커리어를 향상시키는 데 더 나을 겁니다.

### 1. Inability to determine the order of program execution (프로그램의 실행 순서를 판단할 수 없음)

**Symptoms 증상**

```
a = 5
b = 10
a = b

print a
```

- You look at the code above and aren't sure what number gets printed out at the end
    - 위의 코드를 보고서도 마지막에 어떤 값이 출력될지 확신할 수 없는 경우

**Alternative careers 선택해볼 만한 다른 직업**
- Electrician 전기공
- Plumber 배관공
- Architect 건축가
- Civil engineer 토목공학가
- Artist 예술가


### 2. Insufficient ability to think abstractly (추상적 사고 능력이 부족함)

**Symptoms 증상**

- Difficulty comprehending the difference between objects and classes
    - 객체와 클래스의 차이를 이해하는 데 어려움이 있음
- Difficulty implementing design patterns for your program
    - 프로그램을 작성할 때 디자인 패턴을 구현하는 데 어려움이 있음
- Difficulty writing functions with low cohesion
    - 낮은 응집도로 함수를 작성하는 데 어려움이 있음
- Incompetence with Regular Expressions
    - 정규식을 잘 다루지 못함
- Lisp is opaque to you
    - Lisp 언어가 뚜렷하게 보이지 않는다
       - *아마 Lisp 언어가 현대 프로그래밍 언어에 끼친 막대한 영향을 볼 줄 알아야 한다는 의미인 것 같습니다*
- Cannot fathom the Church-Turing Thesis
    - 처치-튜링 논제를 들여다볼 엄두가 안남
        - *기준이 상당히 높으시네요*

**Alternative careers 선택해볼 만한 다른 직업**

- Contract negotiator 협상가
- Method actor 메소드 배우


### 3. Collyer Brothers syndrome (콜리어 형제 증후군)

> 콜리어 형제는 심각한 저장강박증과 기이한 성격으로 미국 뉴욕시에서 악명이 높았다고 합니다.

**Symptoms 증상**

- Unwilling to throw away anything, including garbage
    - 가비지(garbage)든 뭐든 뭐 하나 버릴 생각을 안함
    - *메모리 관리를 할 줄 몰라서 다행입니다*
- Unwilling to delete anything, be it code or comments
    - 코드든 주석이든 뭐 하나 지울 생각을 안함
- The urge to build booby-traps for defense against trespassers
    - 무단침입자를 막기 위해 방어용 부비트랩을 만들고자 하는 충동
- Unwilling to communicate with other people
    - 타인과 의사소통할 생각을 안함
- Poor organization skills
    - 정리정돈 능력 부족

**Alternative careers 선택해볼 만한 다른 직업**

- Antique dealer 앤티크 상인
- Bag lady 부랑자


### 4. Dysfunctional sense of causality (인과관계에 관한 감각이 없음)

**Symptoms 증상**

- You seriously consider malice to be a reason why the compiler rejects your program
    - 컴파일러가 나를 싫어하기 때문에 자신이 작성한 프로그램을 거부한다고 진심으로 믿음
- When called on to fix a bug in a deployed program, you try prayer
    - 이미 배포된 프로그램의 버그를 고치라고 지적받게 되면 기도를 한다
- You take hidden variables for granted and don't think twice about blaming them for a program's misbehavior
    - 숨겨진 변수들을 대수롭지 않게 생각하고, 프로그램이 오작동하는 이유가 그것 때문이라고 당연히 여김
- You think the presence of code in a program will affect its runtime behavior, even if it is never invoked; Memory constraints, shifted offsets, and compiler peculiarities notwithstanding. See discussion on Reddit. Judge accordingly.
    - 프로그램 속 코드의 존재 자체가 런타임 작동에 영향을 미칠 것이라고 생각함. 코드가 호출되지도 않았음에도... (메모리 제한, 쉬프트된 오프셋 바이너리(?), 컴파일러 특이사항 등이 있긴 하지만)
- Your debugging repertoire includes rituals like shining your lucky golf ball, twisting your wedding ring, and tapping the nodding-dog toy on your monitor. And when the debugging doesn't work, you think it might be because you missed one or didn't do them in the right order
    - 디버깅을 할 때면 골프공 광내기, 결혼반지 비틀기, 모니터 위의 강아지 장난감을 건드리기 등의 의식을 진행해야 함. 만약 디버깅이 잘 되지 않으면 그 레파토리의 순서를 제대로 지키지 않거나 빠뜨렸기 때문이라고 생각함.

**Alternative careers 선택해볼 만한 다른 직업**

- Playing the slot machines in Vegas 라스베가스에서 슬롯머신 땡기기


### 5. Indifference to outcomes (결과물에 무관심함)

Programming could still be a hobby for you, but it would be in society's best interests to defend itself against your entry into the world of professional software development.

프로그래밍은 여전히 당신에게 취미일 수 있지만, 그것이야말로 당신같은 사람이 소프트웨어 전문 개발이라는 직업 세계에 발을 들이지 않도록 이 사회가 스스로를 지킬 수 있는 최선일 겁니다.


**Symptoms 증상**

- You aren't interested in fixing a bug that can be worked around by rebooting the computer
    - 컴퓨터를 껐다가 켜는 방법만으로도 해결될 수 있는 버그를 고치는데 관심이 없다
- Your installation program silently deploys unsolicited third party programs that are unrelated to the function of yours
    - 당신이 만든 설치 프로그램이 본래의 기능과 상관없는 제3자 프로그램을 몰래 조용히 배포하기 시작함
- You don't use any ergonomic model when designing user interfaces, nor do you have any interest in usability studies
    - UI를 디자인할 때 인체공학적 모델을 사용하지 않거나, 사용성에 관한 이론과 개념들에 전혀 관심이 없다
- Your program exhibits pretension and grandeur beyond its utility, eg: displaying splash screens over active programs while loading in the background, or placing multiple launch icons in premium desktop locations; These are actually imposed by management more often than by the programmer, who only implements them. We'd still group them together for the sake of this self-test, though, and at the most suggest that one seek employment at a better firm, while the other goes back to business school to learn less destructive ways of making a profit.
    - (경영자의 간섭적 요구가 없다는 전제 하에) 당신이 만든 프로그램은 기능성을 넘어선 허세와 자아 과잉을 자랑함. 예를 들면 백그라운드에서 로딩되는 활성 프로그램 위에 스플래쉬 화면을 띄운다던가, 주요 데스크탑 위치에 여러 개의 실행 아이콘을 띄운다던가...
- Your program produces output to be read by another (eg: a browser), or implements a network protocol, and relies on the other party's software to be significantly tolerant to spec violations
    - 당신이 만든 프로그램이 브라우저와 같은 외부 프로그램에 의해 읽어지도록 결과물을 만들거나, 네트워크 프로토콜을 구현하거나, 명세서 위반을 밥먹듯이 저지르는 제3자 소프트웨어에 의존하는 경우
- You write busy-wait loops even when the platform offers event-driven programming
    - 개발 플랫폼이 이벤트 주도 프로그래밍을 지원함에도 불구하고 당신은 busy-wait 루프를 작성해댐
- You don't use managed languages and can't be bothered to do bounds checking or input validation
    - (메모리 관리를 알아서 해주는) 매니지드 언어를 사용하지 않고, 메모리 범위 지정(바운드)이라던가 입력값 검증같은건 귀찮아서 하지 않음
- Your user interfaces do not make the difficulty of accidentally invoking a function proportionate to its destructiveness (eg: the "Delete Database" button is next to "Save", just as big, has no confirmation step and no undo)
    - 실수로 작동했을 때 파괴적인 결과가 초래되는 기능에 걸맞는 주의 조치같은건 당신이 구현한 UI에 없음. 예를 들면 "저장" 버튼 옆에 같은 크기로 "데이터베이스 삭제" 버튼을 놔둔다거나... 확인하는 절차나 되돌리는 기능도 없이
- You don't use whitespace, indentation or comments
    - 화이트스페이스, 들여쓰기, 주석을 사용하지 않음

**Alternative careers 선택해볼 만한 다른 직업**

- Debt collection 채권추심원
- Telemarketing 텔레마케터

---

재치있게 빈정대는 농담들로 글을 시작하시는군요. 본격적인 수준의 프로그래밍을 할 수 있느냐 없느냐는 실력이나 지식의 문제라기 보다는 '성향'과 '적성'에 관한 것이라는 맥락으로 이야기하려나 봅니다. 개발하는 분야에 따라 정도의 차이만 있을 뿐, 꼼꼼함, 인내심, 논리적/구조적/체계적/조직적/분석적 사고와 같은 것들은 프로그래머에게 반드시 필요한 소양이라는 것은 엄연한 사실입니다. 그러한 소질이 정말로 없거나 혹은 터득하려고 열심히 노력하지 않는다면 아무리 똑똑한 사람이어도 '프로그래머'라는 직업은 가질 수 없다는 상식적인 이야기가 아닐까요.