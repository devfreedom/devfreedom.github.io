---
title: "[필기] 컴퓨터공학과 <알고리즘> 과목 - 전반부"
date: 2022-12-11T17:34
thumb: "algorithm.jpg"
tags: 
    - ❮필기❯
    - 컴퓨터공학
    - 알고리즘
---

눈물로 써내려가는 알고리즘 과목 필기입니다. 원래는 자료구조 과목을 먼저 수강하고 배워야 하는 내용인데, 수강신청이 꼬이는 바람에 자료구조는 나중에 배우게 됐습니다. 자료구조 개념은 일단 여기서 필요한 부분만 찾아서 선행학습을 해볼 예정입니다.

### 알고리즘이란?

- **알고리즘의 역사**
  - '대수학의 아버지'로 불리우는 페르시아의 수학자인 무함마드 이븐 무사 알콰리즈미(Muḥammad ibn Mūsā al-Khwārizmī)의 라틴 이름인 Algoritmi로부터 유래함
  - 가장 오래된 알고리즘은 '유클리드 호제법(Euclidean Algorithm)'
    - 기원전 300년경 그리스의 수학자 유클리드(Euclid)에 의해 증명
    - 2개의 자연수 사이의 최대공약수를 구하는 알고리즘
      - 2개의 자연수 a > b에 대해서 a를 b로 나눈 나머지가 r일 때, a와 b의 최대공약수는 b와 r의 최대공약수와 같다는 성질을 이용
      - a가 b로 나누어 떨어지지 않을 경우, a를 b로 나누고, 그 나머지로 b를 계속 나누고, 마지막으로 나누어 떨어지는 그 숫자가 최대공약수가 됨
- **알고리즘의 요건**
  - 입출력: 입력과 출력을 가지고 있어야 함
  - 정확성: 주어진 입력에 대해 항상 올바른 답을 주어야 함
    - 분석 기준: 모든 유효한 입력에 대해서 유한 시간 내에 올바른 해를 찾아내는가? (무결성 확인)
  - 유한성: 유한 시간 내에 종료되어야 함
  - 효율성: 시간적, 공간적 효율성을 가져야 함
    - 분석 기준 1: 해를 찾아내는 데 소요되는 시간이 적은가?
      - 해를 찾아내는데 걸리는 절대(실측) 시간의 경우 프로그래밍 언어, 컴퓨터의 성능, 프로그래머의 실력 등의 다양한 변수에 따라 달라질 수 있으므로 알고리즘 분석 용도로는 부적절함
      - 입력 개수에 따른 소요시간 증가율이 더 중요한 기준 = 시간복잡도 = 입력 크기에 비례하여 작업시간이 어떠한 비율로 증가하는가?
      - 최선의 조건을 전제로 하는 수행 시간 분석은 좋은 방법이 아님
        - Worst case analysis, average case analysis 활용
    - 분석 기준 2: 해를 찾아내는 데 필요한 기억 장소의 사용량이 적은가?
      - 공간복잡도 = 입력 크기에 비례하여 작업 공간이 어떠한 비율로 증가하는지 분석하는 것
      - 실측으로 공간사용량을 측정하는 경우 프로그래밍 언어, 프로그래머의 실력 등의 다양한 변수에 따라 달라질 수 있으므로 공간복잡도를 시간복잡도와 함께 사용함
  - 수행성(컴퓨터): 컴퓨터로 수행이 가능해야 함
- **알고리즘의 종류**
  - 문제 해결 방법에 따른 분류
    - 분할 정복 알고리즘
      - 주어진 문제의 입력을 분할하여 문제를 해결하는 알고리즘
      - 분할된 입력에 똑같은 알고리즘을 적용함 (주로 재귀를 이용함)
      - e.g. Merge Sort, Quick Sort, Selection Sort
    - 그리디 알고리즘
      - 가능한 해들 중에서 가장 좋은 해를 찾는 알고리즘
      - 수행 시점에서 가장 좋은 해를 찾아 나감
      - 근시안적인 최적해를 찾는다고 할 수 있으며 근시안적인 최적해들을 모아서 문제의 최적해를 찾음
      - e.g. 동전 거스름돈 문제, 최소 신장 트리 문제, 최단 경로 찾기 문제, 부분 배낭 문제
    - 동적 계획 알고리즘
      - 최적해 문제 해결 알고리즘
        - 입력 크기가 작은 부분 문제를 해결하고, 이를 이용해서 보다 큰 부분 문제들을 해결하여, 최종적으로 주어진 입력 크기의 문제를 해결하는 방법
      - e.g. 모든 쌍 최단 경로, 연속 행렬 곱셈, 배낭 문제, 동전 거스름돈 문제
    - 근사 알고리즘
      - 지수 시간이 걸리는 문제(NP 문제)에 대한 근사해를 찾는 알고리즘
      - e.g. 여행자 문제, 정점 커버 문제, 통 채우기 문제, 클러스터링 문제
    
    - 백트래킹 기법
      
      - NP 완전 문제의 해를 탐색하기 위한 알고리즘
      - e.g. 여행자 문제, 체스 퀸 배치 문제
    
    - 분기 한정 기법
      
      - 큰 입력에 대해서 백트래킹 기법이 갖는 단점을 보완하기 위해 고안된 기법
      - e.g. 여행자 문제
- **알고리즘의 표현 방법**
  - Human language
  - Workflow diagram
  - Pseudocode
    - 주의할 점
      - 의사코드를 실제 프로그래밍 언어로 변환하는 데 어려움이 없어야 함
      - (의사)코드는 명확해야 하며, 명확하다는 것과 자세하다는 것은 다른 의미임
        - 지나치게 세부사항을 기재하는 것은 오히려 알고리즘의 명확성을 떨어뜨림

### 알고리즘의 설계와 분석

- **알고리즘 수행 시간**
  
  - 주로 수행 시간을 사용하여 알고리즘이 얼마나 효율적인지를 분석하게 됨
    - 전제 조건: 실제로 구현할 것, 동일한 하드웨어를 사용할 것
    - 해를 구하는 데 소요된 절대적 시간이 아닌, 입력된 값의 크기에 비례해 어떠한 비율로 시간이 더 소모되는지 그 시간복잡도를 비교 분석
  - e.g. 입력값 𝑛에 상수 3을 더하는 알고리즘 (수행 시간이 상수인 알고리즘)
    - 입력된 상수 그 자체의 '크기'가 변하더라도 입력된 상수의 '갯수'는 변하지 않는 알고리즘의 경우 수행 소요시간은 변하지 않음
  - e.g. 입력값 𝑛을 𝑛번 만큼 더하는 알고리즘 (수행 시간이 입력 𝑛에 비례하는 알고리즘)
    - 입력된 값인 n의 크기가 변하면 알고리즘 내에서 𝑛의 '갯수'도 변하는 알고리즘의 경우 𝑛에 비례하여 수행 소요시간이 변함
      - 변종 알고리즘으로 입력값 𝑛에 따라 수행 소요시간이 𝑛³에 비례하는 알고리즘도 있을 수 있음
  - e.g. 팩토리얼 함수 알고리즘
    - 재귀 알고리즘의 일종으로써 함수 팩토리얼이 몇 번 수행되는지, 즉 재귀가 몇 번 일어나는지 그 호출 횟수 n에 따라서 수행 소요시간이 변함

- **수학적 귀납법**
  
  - 어떤 성질이 모든 자연수에 대해 성립함을 증명하기 위해 사용되는 방법
    - 어떤 자연수에 대해서 참이면, 다음 자연수도 참임을 증명
  - 재귀 함수
    - 함수 안에서 그 함수를 스스로 호출하는 함수
      - 알고리즘/로직을 내부적으로 반복하다가 일정한 조건이 만족되면 수행을 종료하고 결과값을 도출함
      - e.g. 팩토리얼 함수, 수열의 점화식, merge sort, quick sort, Tower of Hanoi
    - 재귀 호출의 정당성은 수학적 귀납법과 관련됨
      - 자기보다 작은 문제에 대해서 이 알고리즘이 제대로 작동한다고 가정
      - 작은 문제와 자신의 문제의 관계를 파악하고, 자신의 문제에서도 결론이 맞음을 보임
    - 재귀 알고리즘 설계 유의사항
      - 무한 루프에 빠지지 않도록 주의해야 함
      - 재귀적인 관계를 잘 파악해야 함

- **점근적 표기법**
  
  - 입력의 크기가 충분히 큰 알고리즘의 경우에 대한 분석을 점근적 분석이라고 함
    
    - 입력의 크기가 작은 문제는 알고리즘의 효율성이 중요하지 않음
      - 비효율적인 알고리즘도 무방함
    - 입력의 크기가 충분히 큰 문제는 알고리즘의 효율성이 매우 중요함
      - 비효율적인 알고리즘은 치명적임
  
  - 복잡도는 입력 크기에 대한 함수로 표기하는데, 이 함수는 주로 여러 개의 항을 가지는 다항식임
    
    - 다항식을 단순한 함수로 표현하기 위해 점근적 표기(Asymptotic Notation)를 사용함
      
      - *lim*f(𝑛) = 입력 크기 𝑛이 무한대로 커질 때의 복잡도를 간단히 표현하기 위해 사용하는 표기법
      - Big-O = 어떠한 경우에도 표기된 함수만큼의 성능은 보장 = asymptotic upper bound
        - 최악의 경우를 상정하므로 가장 많이 사용하는 알고리즘 성능 표기법
        - 복잡도 f(𝑛)과 O 표기를 그래프로 나타냈을 때, 기준점 𝑛<sub>0</sub>보다 큰 모든 경우에 g(𝑛)보다 f(𝑛)이 항상 높음
          - 소요시간 증가 폭이나 그래프 가파르기의 변동에 대한 정보를 알려주지는 않음
      - Big-Ω (omega) = 운이 좋다면 알고리즘은 표기된 함수만큼의 성능을 낼 수도 있음 = asymptotic lower bound
        - 최선의 경우를 상정하므로 거의 사용되지 않음
        - 복잡도 f(𝑛)과 Ω 표기를 그래프로 나타냈을 때, 기준점 𝑛<sub>0</sub>보다 큰 모든 경우에 g(𝑛)보다 f(𝑛)이 항상 낮음
          - 소요시간 증가 폭이나 그래프 가파르기의 변동에 대한 정보를 알려주지는 않음
      - Big-Θ (theta) = 알고리즘의 거의 정확한 성능 = asymptotic tight bound
        - 점근적 상한선과 점근적 하한선의 교집합
        - 복잡도 f(𝑛)과 Θ 표기를 그래프로 나타냈을 때, 기준점 𝑛<sub>0</sub>보다 큰 모든 경우에 점근적 하한인 g(𝑛)보다 높고 점근적 상한인 g(𝑛)보다 낮음
          - 소요시간 증가 폭이나 그래프 가파르기의 변동에 대한 정보를 알려주지는 않음
    
    - 데이터의 개수가 많을수록 차수가 가장 큰 항이 가장 영향을 크게 미치고 다른 항들은 상대적으로 무시함
      
      - 이 때문에 점근 표기법에서는 최고차항으로만 알고리즘의 성능을 대략적으로 표시
      - e.g. T(𝑛) = 2𝑛² + 3𝑛 + 1 인 알고리즘의 경우, 입력값이 10,000일 때 2차항의 비중이 99.98%, 1차항의 비중이 0.02%이므로 1차항은 무시할만한 수준

- **재귀 알고리즘과 점화식**
  
  - 알고리즘 속에서 자신과 똑같지만 크기가 다른 문제를 발견할 수 있는 경우, 즉 재귀 호출이 존재하지 않더라도 알고리즘이 재귀적 '성질'을 포함하는 경우 그 알고리즘의 복잡도는 점화식을 이용하여 접근이 가능함
  - 점화식 = 어떤 함수를 자신보다 더 작은 변수에 대한 함수와의 관계로 표현하는 방법
    - e.g.
      - 등차수열의 점화식 𝑓(𝑛) = 𝑓(𝑛-1) + 1
      - 팩토리얼의 점화식 𝑓(𝑛) = 𝑛 × 𝑓(𝑛-1)
      - 피보나치 수열의 점화식 𝑓(𝑛) ＝ 𝑓(𝑛−1) + 𝑓(𝑛−2)
      - 병합 정렬의 수행 시간 점화식 = T(𝑛) = 2T(𝑛/2) + 오버헤드
        - 크기가 𝑛인 병합 정렬의 소요시간은 크기가 𝑛/2인 병합 정렬을 2번 하고 나머지 오버헤드를 더한 시간임
  - 점화식으로 표현된 식의 점근적 복잡도를 구하는 방법
    - 반복대치
      - T(𝑛)에서 T(1)이 될 때까지 계속 대치함
      - e.g. 팩토리얼 알고리즘의 경우 
        - T(𝑛) = T(𝑛−1) + 𝒄
          - 상수 시간 𝒄는 '𝑛이 1일 경우 1을 리턴'하는 파트와 '𝑛!을 리턴'하는 파트를 1회 수행하는 시간
        - 크기가 1(즉, 𝑛=1)인 T(1) ≤ 𝒄 이므로 T(𝑛)을 전개, T(𝑛) ≤ 𝒄𝑛 이므로 T(𝑛) = O(𝑛)
    - 추정 후 증명
      - 식의 모양을 보고 점근적 복잡도를 추정한 다음 그것이 옳음을 귀납적으로 증명하는 방법
      - e.g. T(𝑛) ≤ 2T(𝑛/2) + 𝑛 의 점근적 복잡도는 T(𝑛) = O(𝑛log𝑛)
        - 즉, 충분히 큰 𝑛에 대하여 T(𝑛) ≤ 𝒄𝑛log𝑛 인 양의 상수 𝒄가 존재한다고 '추정'하고 이를 증명
    - 마스터 정리
      - 특정한 모양을 가진 재귀식에 대해 바로 결과를 알 수 있는 정리

### 수열 알고리즘

- e.g. 등차/비 수열, 피보나치 수열, 팩토리얼 수열, +/- 교행 수열, +/- 교행 분수 수열
- 변수 설정
  - e.g. 100 팩토리얼 함수
    - N: 자연수 1부터 100까지를 보관하는 변수, 초기값을 1로 설정함
    - F: 자연수 N에 대한 누승을 보관하는 변수, 초기값을 1!=1로 설정함
    - S: 자연수 누승의 합을 보관하는 변수, 초기값을 1!=1로 설정함
    - [ N＝N+1 → F＝F×N → S=S+F → N이 100인지 확인 ] 과정을 반복함
    - N이 100이라면 누승의 합을 보관한 변수 S의 값을 리턴하고 종료 

### 정렬 알고리즘

- **정렬 알고리즘이란?**
  - 순서 없이 배열되어 있는 자료를 오름차순이나 내림차순으로 나열하는 것
    - 정렬은 알고리즘에서의 설계와 분석, 생각하는 방법 등을 훈련하기에 적합한 주제
    - 컴퓨터공학을 포함한 모든 과학기술분야에서 가장 기본적이고 중요한 알고리즘 중 하나
    - 데이터베이스 및 자료 탐색에 있어서 필수적임
      - 일반적으로 정렬시켜야 할 대상 = 레코드(Record)
      - 레코드는 보다 작은 단위인 필드(Field)로 구성되어 있음
      - 키(Key) 필드로 레코드 식별
  - 정렬 알고리즘의 종류
    - 실행 방법 기준
      - 비교식 정렬: 비교할 키값을 한번에 두 개씩 비교하고, 교환하여 정렬하는 방식
      - 분배식 정렬: 키값을 기준으로 하여 자료를 여러 개의 부분집합으로 분해하고, 각 부분집합을 정렬함으로써 전체를 정렬하는 방식
        - = Divide and Conquer
    - 장소 기준
      - 내부 정렬: 컴퓨터의 주기억장치에서 정렬
        - 입력의 크기가 주기억장치의 공간보다 크지 않은 경우에 수행
        - 비교식
          - 교환 방식: 키를 비교하고 교환하여 정렬하는 방식
            - e.g. 선택 정렬, 버블 정렬, 퀵 정렬
          - 삽입 방식: 키를 비교하고 삽입하여 정렬하는 방식
            - e.g. 삽입 정렬, 셸 정렬
          - 병합 방식: 키를 비교하고 병합하여 정렬하는 방식
            - e.g. 2-way 병합 정렬, n-way 병합 정렬
          - 선택 방식: 이진 트리를 사용하여 정렬하는 방식
            - e.g. 힙 정렬, 트리 정렬
        - 분배식
          - 분배 방식: 키값을 여러 개의 부분집합으로 분배하여 정렬하는 방식
            - e.g. 기수 정렬
      - 외부 정렬: 주기억장치뿐만 아니라 보조기억장치도 이용하여 정렬
        - 입력의 크기가 주기억장치의 공간보다 큰 경우에 수행
        - 보조기억장치에서 입력을 여러 번에 나누어 주기억장치로 읽어 들인 후 정렬하여 보조기억장치에 다시 저장
        - 대용량의 보조기억장치를 사용하기 때문에 내부 정렬보다 속도는 떨어지지만 내부 정렬로 처리할 수 없는 대용량의 자료에 대한 정렬이 가능함
        - 비교식
          - 병합 방식: 파일을 부분 파일로 분리하여 각각을 내부 정렬 방법으로 정렬하여 병합하는 정렬 방식
            - e.g. 2-way 병합 정렬, n-way 병합 정렬
    - 안정성 기준
      - 안정 정렬: 동일한 값에 대해 기존의 순서가 유지되는 정렬 방식
      - 불안정 정렬: 동일한 값에 대해 기존의 순서가 뒤바뀔 수 있는 정렬 방식
- **Selection sort**
  - 전체 원소들 중에서 기준 위치에 맞는 원소를 선택하여 자리를 교환하는 방식
  - 과정
    - 1단계: 전체 데이터 N개를 비교하여, 그 중에서 가장 작은 수를 선택한 후, 가장 앞쪽의 첫 번째와 교환한다
    - 2단계: 가장 앞쪽 데이터 1개를 제외한 (N-1)개의 데이터를 비교하여, 그 중에서 가장 작은 수를 선택한 후, 앞쪽의 두 번째와 교환한다
    - 3단계: 가장 앞쪽 데이터 2개를 제외한 (N-2)개의 데이터를 비교하여, 그 중에서 가장 작은 수를 선택한 후, 앞쪽의 세 번째와 교환한다
    - 4단계: 더 이상 비교할 필요가 없을 때까지 반복한다
  - 메모리 사용 공간: n개의 원소에 대하여 n개의 메모리 사용
  - 비교 횟수
    - 1단계: 첫 번째 원소를 기준으로 n개의 원소 비교
    - 2단계: 두 번째 원소를 기준으로 마지막 원소까지 n-1개의 원소 비교
    - 3단계: 세 번째 원소를 기준으로 마지막 원소까지 n-2개의 원소 비교
    - i단계: i 번째 원소를 기준으로 n-i개의 원소 비교
  - 시간복잡도: (n-1) + (n-2) + … + 2 + 1 = {n(n-1)}/2 = O(n²)
- **Bubble sort**
  - 버블 정렬(Bubble Sort)이란 데이터집합을 순회하면서 집합 내의 이웃 요소들끼리의 교환을 통해 정렬하는 것
  - 정렬 과정이 물 속 깊은 곳에서 일어난 거품이 수면을 향해 올라오는 모습과 같다고 해서 버블 정렬(Bubble Sort)이라고 붙여짐
  - 이동 연산은 비교 연산보다 더 많은 시간이 소요되므로 레코드의 이동이 과다한 것이 단점
  - 과정
    - 1단계: 첫 번째 데이터와 두 번째 데이터를 비교하여 큰 데이터가 두 번째에 오도록 한다
      - 다시 두 번째 데이터와 세 번째 데이터를 비교하여 큰 데이터가 세 번째에 오도록 한다
      - 위와 같이 비교하고 교환하여 가장 큰 데이터가 맨 뒤에 오게 된다
    - 2단계: 맨 뒤에 있는 데이터 한 개를 제외한 나머지 데이터 (N-1)개 가운데 가장 큰 데이터가 (N-1)번째 오도록 한다
    - 3단계: 맨 뒤에 있는 데이터 두 개를 제외한 나머지 데이터 (N-2)개 가운데 가장 큰 데이터가 (N-2)번째 오도록 한다
    - 4단계: 더 이상 비교할 필요가 없을 때까지 반복한다
  - 비교 횟수
    - 최상, 평균, 최악의 경우 모두 일정
    - n-1 + n-2 + n-3 + ⋯ + 3 + 2 + 1 = {n(n-1)}/2
  - 시간복잡도: Σ{n(n-1)}/2 = O(n²)
- **Insertion sort**
  - 데이터 집합을 순회하면서 정렬이 필요한 요소를 뽑아내어 이를 다시 적당한 곳에 삽입해 나가는 방법
  - 정렬되어 있는 부분집합에 정렬할 새로운 원소의 위치를 찾아 삽입하는 방법
  - 과정
    - 1단계: 정렬할 자료를 두 개의 부분집합으로 가정한다. 즉, 정렬된 집합과 아직 정렬되지 않은 집합으로 가정한다
      - 부분집합 S: 정렬된 원소들
      - 부분집합 U: 아직 정렬되지 않은 나머지 원소들
    - 2단계: 정렬되지 않은 부분집합 U의 원소를 하나씩 꺼내서 정렬되어 있는 부분집합 S의 마지막 원소부터 비교하면서 위치를 찾아 삽입한다
    - 3단계: 삽입 정렬을 반복하면서 부분집합 S의 원소는 하나씩 늘어나게 되고, 부분집합 U의 원소는 하나씩 감소하게 된다
    - 4단계: 부분집합 U가 공집합이 되면 삽입 정렬이 완성된다
  - 메모리 사용 공간
    - n개의 원소에 대하여 n개의 메모리 사용
  - 시간복잡도 및 비교 횟수 분석
    - Best case: 원소들이 이미 정렬되어 있는 경우
      - 이미 정렬되어 있어서 하나의 원소당 한번씩만 비교하면 됨
      - 전체 비교 횟수 = n-1 (첫 번째 원소는 비교하지 않음)
      - 시간복잡도: O(n)
    - Worst Case: 모든 원소가 역순으로 정렬되어 있는 경우
      - 두 번째 원소: 1번
      - 세 번째 원소: 2번
      - n 번째 원소: n-1번
      - 시간복잡도: O(n²)
    - Average Case: 원소들이 정렬되어 있지 않고, 섞여 있는 경우
      - (1/2) × {n(n-1)/2} = O(n²)
- **Merge sort**
  - 병합 정렬부터는 평균 시간복잡도가 O(𝑛log𝑛)인 알고리즘임
  - 전체 원소들 중에서 기준 위치에 맞는 원소를 선택하여 자리를 교환하는 방식
    - Divide(분할) → Conquer(정복) → Combine(병합)
      - 2-way 병합: 2개의 정렬된 자료의 집합을 결합하여 하나의 집합으로 만드는 병합 방법
      - n-way 병합: n개의 정렬된 자료의 집합을 결합하여 하나의 집합으로 만드는 병합 방법
  - 메모리 사용 공간
    - n개의 원소에 대하여 2xn개의 메모리 사용
    - 분할한 부분집합을 저장하기 위한 추가 저장 공간 필요
  - 비교 횟수
    - 분할 단계: n개의 원소를 두 개로 분할하기 위해서 log𝑛번의 단계 수행
    - 병합 단계: 부분집합의 원소를 비교하면서 병합하는 단계에서 최대 n번의 비교 연산 수행
  - 시간복잡도: log𝑛 × n → O(𝑛log𝑛)
- **Shell sort**
  - 셸 정렬의 셸은 1959년 창안자 도널드 셸의 이름에서 유래됨
  - 주어진 자료 리스트를 매개 변수 h 길이를 갖는 부분집합으로 나누고, 각 부분집합에서 삽입 정렬을 수행함
    - 매개 변수 h의 값을 줄이며, 이 과정을 반복하여 결국 매개 변수 h의 값이 1이 되면 정렬이 완성됨
  - 전체 원소에 대해서 삽입 정렬을 수행하는 것보다 부분집합으로 나누어 정렬하기 때문에 비교 연산과 교환 연산이 감소함
    - 셸 정렬은 삽입 정렬의 시간복잡도 O(n²)보다 개선된 정렬 방법
  - 부분집합 만드는 과정
    - 1단계: 부분집합의 기준이 되는 간격을 매개 변수 h에 저장
    - 2단계: 한 단계가 수행될 때마다 h의 값을 감소시키고 셸 정렬을 순환 호출
    - 3단계: h가 1이 될 때까지 반복
  - 성능
    - 셸 정렬의 성능은 매개 변수 h의 값에 따라 달라짐
    - 정렬할 자료의 특성에 따라 매개 변수 생성 함수를 사용
    - 일반적으로 사용하는 h의 값은 원소 개수의 1/2을 사용하고 한 단계 수행될 때마다 h의 값을 반으로 감소시키면서 반복 수행
  - 메모리 사용 공간: n개의 원소에 대하여 n개의 메모리와 매개 변수 h에 대한 저장 공간 사용
  - 비교 횟수: 처음 원소의 상태에 상관없이 매개 변수 h에 의해 결정
  - 시간복잡도
    - Worst Case: O(n²)
    - Best Case: O(𝑛log<sub>2</sub>𝑛)
    - Average Case: 매개 변수 h에 따라 다르지만, 대개 O(n<sup>1.5</sup>)
- **Quick sort**
  - 정렬할 전체 원소에 대해서 정렬을 수행하지 않고, 기준 값을 중심으로 왼쪽 부분집합과 오른쪽 부분집합으로 분할하여 정렬하는 방법
    - 기준값 = 피봇(Pivot) = 일반적으로 전체 원소 중에서 첫 번째, 가운데나 마지막에 위치한 원소를 선택
    - 왼쪽 부분집합에는 기준 값보다 작은 원소들을 이동시키고, 오른쪽 부분집합에는 기준값보다 큰 원소들을 이동시킴
  - 같은 시간복잡도를 가지는 다른 정렬 방법에 비해서 자리 교환 횟수를 줄임으로써 더 빨리 실행되어 실행 시간 성능이 좋은 정렬 방법임
  - Divide and Conquer
    - 정렬할 자료들을 기준값을 중심으로 2개의 부분집합으로 분할함
    - 부분집합의 원소들 중에서 기준값보다 작은 원소들은 왼쪽 부분집합으로, 기준값보다 큰 원소들은 오른쪽 부분집합으로 정렬함
    - 부분집합의 크기가 1 이하로 충분히 작지 않으면 순환호출을 이용하여 다시 분할함
  - 메모리 사용 공간: n개의 원소에 대하여 n개의 메모리 사용
  - 비교 횟수: 루프의 반복 횟수 대신 재귀 횟수를 이용하여 분석
  - 시간복잡도
    - Worst Case: {n(n-1)/2}
    - Best Case: 𝑛log<sub>2</sub>𝑛
    - Average Case: O(𝑛log𝑛)
- **Heap sort**
  - 힙 자료구조에서 항상 가장 큰 원소가 루트 노드가 되고 삭제 연산을 수행하면 항상 루트 노드의 원소를 삭제하여 반환하는 것을 이용함
    - 최대 힙에 대해서 원소의 개수만큼 삭제 연산을 수행하여 내림차순으로 정렬 수행
    - 최소 힙에 대해서 원소의 개수만큼 삭제 연산을 수행하여 오름차순으로 정렬 수행
  - Heap이란?
    - 최댓값 및 최솟값을 찾아내는 연산을 빠르게 하기 위해 고안된 완전이진트리(Complete Binary Tree)를 기본으로 한 자료구조
    - A가 B의 부모 노드(Parent Node)이면, A의 키(key)값과 B의 키 값 사이에는 대소관계가 성립함
  - 리스트 → 힙 변환 → 힙에서 원소 삭제하며 다시 리스트로 만듦
  - 메모리 사용 공간
    - 원소 n개에 대해서 n개의 메모리 공간 사용
    - 크기가 n인 힙 저장 공간
  - 시간복잡도
    - n개의 노드에 대해서 n번의 힙 재구성 작업 수행
    - n개의 노드에 대해서 완전이진트리는 log2(n+1)의 레벨을 가지므로 완전이진트리를 힙으로 구성하는 평균 시간복잡도는 O(𝑛log<sub>2</sub>𝑛)
- **Tree sort**
  - 이진탐색트리를 이용하여 정렬하는 방법
  - Binary tree
    - 트리 구조 중에서 트리의 모든 노드의 차수를 2 이하로 제한한 트리
    - 이진트리 중 탐색용 자료구조로 사용하기 위해 만든 트리
    - 조건
      - 모든 노드의 키는 서로 다른 유일한 키임
      - 왼쪽 서브트리에 있는 노드들의 키는 루트 노드의 키보다 작음
      - 오른쪽 서브트리에 있는 노드들의 키는 루트 노드의 키보다 큼
      - 왼쪽 서브트리와 오른쪽 서브트리도 이진탐색트리임
  - 과정
    - 1단계: 정렬할 원소들을 이진탐색트리로 구성함
    - 2단계: 이진탐색트리를 중위 우선 순회 함
      - 중위 순회 방법
        - 작업 L: 현재 노드에서 왼쪽 서브트리로 이동
        - 작업 D: 현재 노드 처리
        - 작업 R: 현재 노드에서 오른쪽 서브트리로 이동
      - 중위 순회 경로가 오름차순 정렬이 됨
  - 메모리 사용 공간
    - n개의 원소에 대하여 n개의 메모리 공간 사용
    - 크기가 n인 이진탐색트리 저장 공간
  - 시간복잡도
    - 노드 한 개에 대한 이진탐색트리 구성 시간: O(log<sub>2</sub>𝑛)
    - n개 노드에 대한 이진탐색트리 구성 시간: O(𝑛log<sub>2</sub>𝑛)
    - n개 노드에 대한 시간복잡도: O(𝑛log<sub>2</sub>𝑛)
- **Counting sort**
  - 항목들의 순서를 결정하기 위해 집합에 각 항목이 몇 개씩 있는지 세는 작업을 하면서 선형시간에 정렬하는 방법
  - 정수나 정수로 표현할 수 있는 자료에 대해서만 동작한다는 한계가 있음
  - 두 원소를 비교하는 것을 기본 연산으로 하는 정렬의 하한선은 Ω(𝑛log𝑛)
    - 원소들이 다음의 특수한 성질을 만족하면 O(n) 정렬도 가능함
      - 계수 정렬: 원소들의 크기가 모두 -O(n) ~ O(n) 범위에 있을 때
      - 기수 정렬: 원소들이 모두 k 이하의 자릿수를 가졌을 때 (k: 상수)
  - 과정
    - 1단계: 입력 원소의 최대값까지의 배열을 생성한다
    - 2단계: 입력 원소에 해당하는 배열의 인덱스에 입력 원소의 발생 횟수를 세어 저장한다
      - 이 때, 발생 횟수는 결과 배열에 입력 원소가 위치하는 최대 위치이다
    - 3단계: 발생 횟수가 저장되어 있는 배열을 참고하여 결과 배열에 입력 원소를 저장한다
  - 메모리 사용 공간
    - n개의 원소에 대하여 n + k개의 메모리 사용, k는 입력 원소 중 가장 큰 값
  - 시간복잡도
    - 계수 정렬의 평균 수행 시간은 Θ(n)
    - k가 O(n)을 초과하면 시간은 Θ(k)
    - 만약 k가 O(𝑛log𝑛)을 초과하면 병합 정렬, 퀵 정렬, 힙 정렬보다 시간이 오래 걸림
      - 일반적으로 k가 O(n)을 초과하지 않는 경우에 선형시간으로 정렬하기 위해서 사용함
- **Radix sort**
  - 입력이 모두 k 이하의 자릿수를 가진 자연수인 경우에 쓰일 수 있는 정렬 방법으로 제한적인 범위 내에 있는 숫자에 대해서 각 자릿수별로 정렬함
  - 기수 정렬은 숫자 대 숫자 전체를 비교하는 비교 정렬 방식이 아닌 숫자를 부분적으로 비교하는 정렬 방법
  - Radix = 특정 진수를 나타내는 숫자
    - e.g. 10진수의 기: 0, 1, 2 … 9
  - 주민등록번호, 계좌번호 등의 대량의 숫자를 기반으로 하는 상용 데이터베이스에서의 정렬이라던가 인터넷 주소, 전화번호 등을 정렬하는 데 매우 유용함
  - 과정
    - 1단계: 가장 낮은 자리 수(1의 자리)를 비교하여 정렬한다
    - 2단계: 그 다음 낮은 자리 수(10의 자리)를 비교하여 정렬한다
    - 3단계: 그 다음 낮은 자리 수(100의 자리)를 비교하여 정렬한다
  - 메모리 사용 공간
    - 원소 n개에 대해서 n개의 메모리 공간 사용
    - 기수 r에 따라 버킷 공간이 추가로 필요함
  - 시간복잡도
    - 각 자릿수에 안정한 정렬을 수행하는 for 루프를 k번 반복
      - 루프가 한번 수행될 때, n개의 숫자의 i 자릿수를 읽으며 r개로 분류하여 개수를 세고, 그 결과에 따라서 숫자가 이동
      - O(n+r)시간이 걸림
        - 여기에서 k와 r이 n에 비해 매우 작으면 시간복잡도는 O(n)으로 나타낼 수 있음

### 선택 알고리즘

- 선택 알고리즘이란?
  - n개의 원소가 불규칙하게 저장된 배열에서 i 번째 작은 원소(큰 원소)를 찾는 문제를 해결하기 위한 알고리즘
  - 정렬과 비슷하다고 할 수 있으며 다음 두 종류의 알고리즘이 존재함
    - 평균적으로 선형시간이 소요되는 '평균 선형시간' 선택 알고리즘
      - 퀵 정렬처럼 분할한 후 자기호출 방법을 이용하여 평균적으로 선형시간에 i 번째 작은 원소를 찾는 것
      - 분할의 균형이 맞지 않고, 찾고자 하는 원소가 운 나쁘게 큰 그룹에 속하는 일이 반복되는 경우에는 성능이 보장되지 않는다는 단점이 있음
      - e.g. 배열 A에서 i 번째 원소 찾기
        - 경우1: 원소가 하나뿐인 경우, 그 하나를 리턴
        - 경우2: 원소가 다수인 경우, 먼저 파티션을 통해 중간값이 몇 번째인지 확인
        - 경우3: 중간값이 i와 같을 경우, A[파티션을 통해 얻은 중간]값을 리턴
        - 경우4: 중간값이 i보다 클 경우, 오른쪽 그룹으로 범위를 좁혀 재귀적으로 실행
        - 경우5: 중간값이 i보다 작을 경우, 왼쪽 그룹으로 범위를 좁혀 재귀적으로 실행
      - 시간복잡도
        - T(𝑛) ≤ 𝒄𝑛 임을 추정 후 증명법으로 증명
          - T(n) = O(n) 
          - T(n) = Ω(n)임은 자명하므로 T(n) = Θ(n)
          - Worst case인 경우 T(n) = Θ(n²)
    - 최악의 경우에 선형시간이 소요되는 '최악의 경우 선형시간' 선택 알고리즘
      - 분할의 균형이 나빠 보여도 일정한 상수비를 유지하면 점근적 복잡도는 항상 Θ(n)이 됨
        - 단, 균형을 맞추기 위한 오버헤드가 너무 커져버리면 최악의 경우 선형시간 선택 알고리즘이 될 수 없음
        - 전처리 작업에 대한 오버헤드를 고려해야 함
      - 시간복잡도
        - T(𝑛) ≤ 𝒄𝑛 임을 추정 후 증명법으로 증명
          - T(n) = O(n) 
          - T(n) = Ω(n)임은 자명하므로 T(n) = Θ(n)

### 자료 구조

- **List/Sequence**
  - 리스트는 동일한 값이 두 번 이상 나타날 수 있는 셀 수 있는 정렬된 값을 나타내는 자료의 구조
  - 종류
    - 선형 리스트: 리스트 중에서 순서를 가지고 있는 리스트
      - 순차 방식으로 구현하는 선형 순차 리스트로써, 순차 자료구조는 원소를 논리적인 순서대로 메모리에 연속하여 저장
      - 원소 삽입
        - 1단계: 원소를 삽입할 빈 자리 만들기 = 삽입할 자리 이후의 원소를 한 자리씩 뒤로 이동
        - 2단계: 준비한 빈 자리에 원소 삽입
      - 원소 삭제
        - 1단계: 원소 삭제 = 삭제할 자리의 원소 삭제
        - 2단계: 삭제한 빈자리 채우기 = 삭제한 자리 이후의 원소들을 한 자리씩 앞으로 이동
      - 원소의 삽입과 삭제가 비효율적임
    - 단일 연결 리스트
      - 저장할 때 그 다음 순서의 자료가 있는 위치를 데이터에 포함시키는 방식으로 자료를 저장하는 자료구조
      - 각 노드는 다음 노드를 가리키는 단방향 포인터를 가짐 (head to tail)
      - 원소 삽입: 앞 노드의 포인터가 새 노드를 가리키게 하고, 새 노드의 포인터가 뒤 노드를 가리키게 함
      - 원소 삭제: 앞 노드가 삭제된 노드 뒤에 있는 노드를 가리키게 함
      - 원소의 조작이 간결해지지만, 포인터 데이터가 사라지면 치명적임
    - 이중 연결 리스트
      - 다음 노드의 참조뿐만 아니라 이전 노드의 참조도 같이 가리키게 한 연결 리스트
      - 뒤 노드만을 참고하는 단방향 단일 연결 리스트를 양방향 포인터를 도입해서 보완함 (head and tail)
    - 원형 연결 리스트
      - 이중 연결 리스트에서 마지막 원소가 null 대신 처음 원소를 가리키게 하면 원형 연결 리스트가 됨
      - Linear 리스트를 원형으로 말아서 맨 처음과 맨 뒤를 붙이는 방식
- **Stack**
  - 먼저 들어간 요소가 가장 나중에 나오는 LIFO(Last-in, First-out) 후입선출 자료구조
  - push 연산으로 원소를 쌓고 pop 연산으로 원소를 꺼냄
- **Queue**
  - 먼저 집어 넣은 데이터가 먼저 나오는 FIFO(First-in, First-out) 선입선출 자료구조
  - Rear-to-front 방향으로 진행되며, 후단에서 enqueue(삽입) 연산이 이뤄지고 전단에서 dequeue(삭제) 연산이 이뤄짐
  - 선형 배열로 큐를 구현하게 되면, 선입 요소가 제거되었을 때 후입 요소들이 한 칸씩 앞으로 오는 작업이 추가적으로 필요하게 됨
    - 이를 보완하기 위해 원형으로 전단과 후단이 연결된 '순환 큐'를 사용하면, 나머지 요소들을 한 칸씩 앞으로 움직이지 않고 그 빈 자리를 원형 내에 공백으로 남겨둬도 순서를 유지할 수 있음
      - 순환 큐의 문제점: 전단과 후단이 같은 위치에 있을 때, 이 순환큐는 가득 차있는가? 아니면 비어있는가?
        - 해결책: 큐 배열을 생성할 때 실제 용량보다 1만큼 더 크게 만들어 전단과 후단 사이를 비우면, 전단과 후단이 같을 때는 빈 상태, 후단이 전단보다 1 작으면 가득 찬 상태라고 구분할 수 있음
  - 연결 큐
    - 단일 연결 리스트 기반의 큐
    - 성능은 순환 큐에 비해 느리지만 공백/포화 상태 관리가 필요 없음

### 검색 트리

- **Record**
  - 개체에 대해 수집된 모든 정보를 포함하고 있는 저장단위
  - e.g. 학생의 레코드: 이름, 학번, 주소, 연락처 등의 정보 포함
- **Field**
  - 레코드에서 각 정보를 나타내는 부분   
  - e.g. 학생의 레코드 = 이름 필드 + 학번 필드 + 주소 필드 + 연락처 필드
- **Key**
  - 다른 레코드와 중복되지 않도록 각 레코드를 대표할 수 있는 필드
  - 키는 하나의 필드로 이루어질 수도 있고 두 개 이상의 필드로 이루어질 수도 있음
  - e.g. 학생의 키 = 이름 필드 & 학번 필드
- **Search tree**
  - 자료를 저장하고 검색하는데 유용한 자료구조 및 알고리즘
    - 레코드를 트리 모양으로 만들어서 자료를 저장하고 찾음
    - 각 노드(Node)가 규칙에 맞도록 하나씩의 키를 갖고 있음
    - 1:n 관계의 비선형 자료구조
    - 계층 관계로 만들어진 계층형 자료구조
  - 구성요소
    - 노드(Node): 트리를 구성하는 원소
    - 간선(Edge): 노드를 연결하는 선
    - 루트 노드(Root): 트리의 시작 노드
    - 부모 노드(Parent)
    - 자식 노드(Child)
    - 형제 노드(Sibling): 같은 부모 노드를 가진 자식 노드
    - 차수(Degree): 자식 노드 수
    - 레벨(Level): 루트로부터 단계별로 뻗어나가는 특정 깊이를 가지는 노드의 집합
    - 리프 노드(Leaf)/단말 노드(Terminal): 차수가 0인 노드
  - 종류 
    - 자식 노드의 개수에 따른 분류 
      - 이진검색트리: 최대 두 개의 자식 노드로 분기
      - 다진검색트리: 세 개 이상의 자식 노드로 분기
    - 저장되는 장소에 따른 분류
      - 내부검색트리
        - 메인 메모리 내에 존재함
        - 메인 메모리에 모든 키를 수용할 수 있으면 내부검색트리를 사용
      - 외부검색트리
        - 검색트리가 외부 저장장치에 존재하는 경우
          - 검색트리가 메모리를 넘어서는 데이터를 가지고 있을 경우, 메인 메모리에 모든 키를 수용할 수 없음
        - 디스크 접근 시간/속도가 검색의 효율을 좌우함
          - 디스크 접근 단위: 블록(페이지)
          - 디스크에 한 번 접근하는 시간은 수십만 명령어의 처리 시간과 맞먹음
          - 검색트리가 디스크에 저장되어 있다면 트리의 높이를 최소화하는 것이 유리함
          - e.g. B-tree
- **Binary tree**
  - 각 노드는 하나씩의 키 값을 가짐
  - 각 노드의 키 값은 다름
  - 최상위 레벨에 루트 노드가 있고 각 노드는 최대 두 개의 자식을 가짐
  - 임의의 노드의 키 값은 자신의 왼쪽 자식 노드의 키 값보다 크고 오른쪽 자식의 키 값보다 작음
  - 검색 방법
    - 1단계: 키 x를 가진 노드를 검색함
    - 2단계: 트리에 키 x를 가진 노드가 존재하면 해당 노드를 리턴함
    - 3단계: 존재하지 않으면 NIL을 리턴함
  - 삽입 방법
    - 1단계: 이진검색트리 검색 방법을 이용함
    - 2단계: 원소 x가 이진검색트리에 없는지 확인함
    - 3단계: 더 이상 내려갈 곳이 없으면 x를 그 노드의 자식에 매닮
    - 삽입 순서에 따라 균형 잡히지 않고 한쪽으로 기울어진 이진검색트리가 형성될 수 있음
      - 균형이 가장 잘 잡힌 경우 시간복잡도는 Θ(log𝑛), 가장 나쁘게 기울어진 경우 시간복잡도는 Θ(n)
  - 삭제 방법
    - Case 1: r이 리프 노드인 경우 = 단순히 r을 제거함
    - Case 2: r의 자식 노드가 하나인 경우 = r을 제거하고 그 자리에 r의 자식 노드를 갖다놓음
    - Case 3: r의 자식 노드가 두 개인 경우 = r의 직후 원소 s를 찾고, r을 제거한 후, s를 r의 자리에 갖다놓고, s가 있던 자리에 s의 자식 노드를 갖다놓음
- **Red-black tree**
  - 삽입 순서에 따라 균형이 깨지는 형태로 이진트리가 형성되면 시간복잡도가 커지게 됨
  - 이를 해결하기 위해 레드블랙트리는 이진검색트리의 모든 노드에 블랙 또는 레드의 색을 칠하되 다음의 특성을 만족해야 함
    - 노드는 레드 혹은 블랙 중의 하나임
    - 루트 노드는 블랙임
    - 모든 리프 노드는 블랙임
      - 여기서 리프 노드는 일반적인 의미의 리프 노드와 다름
      - 모든 NIL 포인터가 NIL이라는 리프 노드를 가리킨다고 가정함
    - 레드 노드의 자식 노드 양쪽은 언제나 모두 블랙임
      - 레드 노드는 연달아 나타날 수 없으며 블랙 노드만이 레드 노드의 부모 노드가 될 수 있음
    - 어떤 노드로부터 시작되어 리프 노드에 도달하는 모든 경로에는 리프 노드를 제외하면 모두 같은 개수의 블랙 노드가 있음
  - 삽입 방법 ＝ 이진검색트리에서의 삽입과 동일
    - 다만 삽입 후 삽입된 노드를 레드로 칠함
      - 삽입된 노드를 x라 함
    - x의 부모 노드 p의 색상이
      - 블랙이면 아무 문제 없음
      - 레드이면 레드블랙트리의 특성이 깨지므로 후처리가 필요함
  - 삭제 방법 = 이진검색트리에서의 삭제와 동일 
    - 삭제 후 적절한 작업을 통해 레드블랙 특성을 만족하도록 색상을 맞추어 줌
  - 레드블랙트리의 내부 노드의 수가 n인, 즉 '키의 총 수'가 n인 레드블랙트리의 가능한 최대 깊이는 O(log𝑛)
    - 가장 이상적으로 꽉 채워진 트리의 깊이는 |log𝑛|+1
    - 레드블랙 특성 4에 의해 레드 노드는 두개가 연속해서 존재할 수 없으므로 루트에서 임의의 리프에 이르는 경로에서 블랙 노드의 개수보다 많을 수 없음
    - 루트 노드에서 임의의 리프에 이르는 경로의 길이는 2(|log𝑛|+1)을 넘을 수 없음
      - = O(log𝑛)
- **B-tree**
  - 다진검색트리가 균형을 유지하도록 하여 최악의 경우에 디스크 접근 횟수를 줄인 것
  - 조건
    - 루트를 제외한 모든 노드는 k/2 ~ k개의 키를 가짐
    - 모든 리프 노드는 같은 깊이를 가짐
    - 분기의 수를 가능하면 늘리되 균형을 맞추기 위해 각 노드가 채울 수 있는 최대 허용량의 반 이상의 키를 채워야함
  - 삽입
    - 1단계: x를 삽입할 리프 노드 r을 찾음
    - 2단계: 노드 r에 공간의 여유가 있으면 키를 삽입하고 끝냄
    - 3단계: 노드 r에 여유가 없으면 형제 노드를 살핌
      - 공간의 여유가 있으면 형제 노드에 키를 하나 넘기고 끝냄
    - 4단계: 형제 노드에 여유가 없으면 노드를 두 개로 분리함
      - 분리 작업은 부모 노드에서의 삽입 작업을 포함함
  - 시간복잡도
    - 임의의 노드가 최대 d개의 자식을 가질 수 있다면 최소한 d/2개의 자식을 가짐(루트만 예외)
      - log<sub>d</sub>n 과 log<sub>d/2</sub>n 사이
    - 검색: O(log𝑛)
    - 삽입 = 검색 + 오버플로우 처리: O(log𝑛)
    - 삭제: O(log𝑛)
      - 언더플로우 없을 경우: 검색 + 삭제(상수 시간)
      - 언더플로우 발생할 경우: 검색 + 언더플로우 처리 = 최악의 경우 = O(log𝑛)
- **다차원 검색트리**
  - 키가 복수 개의 필드로 이루어지는 경우 복수 개의 필드를 그대로 검색에 사용하는 트리
    - 여기서의 키는 '복수 개의 필드로 이루어진 벡터'를 의미
  - 종류
    - KD-트리: 이진검색트리를 다차원 키를 사용해 확장한 것
      - k(k≥2)의 필드로 이루어진 키 사용
        - 각 레벨에서 필드를 번갈아가며 검색에 사용
        - 한 레벨에서는 하나의 필드만 사용함
        - 총 k개의 필드를 사용하는 검색이라면, k개의 레벨을 내려가면 검색에 사용하는 필드가 일치함
      - KD-트리 검색: 임의의 키가 입력되면, 각 필드를 차례대로 사용해서 트리를 검색
      - KD-트리 삽입: 검색하듯이 트리를 따라 내려가다 리프 노드를 만나면 거기에서 왼쪽 또는 오른쪽에 매달아 줌
      - KD-트리 삭제
        - 자식이 없는 경우: 이진검색트리와 마찬가지로 노드 r만 제거
        - 자식이 하나뿐인 경우: 자식 노드를 루트로 하는 서브트리가 한 레벨 위로 이동하므로 분기에 사용하는 필드가 달라지므로 자식이 둘인 경우와 같은 방법으로 삭제
        - 자식이 둘인 경우: 오른쪽 서브트리 중 노드 r에서 분기에 사용한 필드의 값이 가장 작은 노드를 찾아 삭제하고 그 노드를 노드 r의 자리로 이동
    - KDB-트리
      - KD-tree + B-tree
        - 다차원 키 + 디스크의 한 페이지와 한 노드가 일치 + balanced tree
        - 각 레코드는 k차원 공간에서 하나의 점에 해당함
          - 자신이 속한 공간을 담당하는 색인 노드들을 따라감
      - 영역 노드
        - 복수 개의(영역, 페이지 번호) 쌍으로 구성됨
        - 모든 내부 노드(Internal Node)는 영역 노드임
      - 키 노드
        - 복수 개의(키, 페이지 번호) 쌍으로 구성됨
        - 모든 리프 노드는 키 노드임
      - 삽입
        - 1단계: 삽입할 키가 속하는 리프 노드 찾음
        - 2단계: 해당 리프 노드에 키를 더 수용할 수 있는 공간이 있으면 쌍을 삽입
        - 3단계: 수용할 수 없을 때 형제 노드와 재분배 할 수 있으면, 재분배를 함
        - 4단계: 수용할 수 없을 때 형제 노드와 재분배할 수 없으면, 리프 노드를 분할하여 두 개의 영역을 만듦
      - 삭제
        - 1단계: 삭제 후 언더플로우가 생기지 않으면 작업 끝
        - 2단계: 언더플로우가 생기면 이웃 영역과 경계를 재조정해서 재분배 할 수 있으면 재분배하고 작업 끝
        - 3단계 : 언더플로우가 생겼을 때 재분배가 가능하지 않은 경우 병합
          - 병합은 부모 노드에서(영역, 페이지 번호) 쌍 두 개가 하나로 통합 → 재귀 상황
    - R-트리
      - KDB-트리에서는 노드들이 전체 공간을 나누어 커버하는 반면 R-트리는 키들을 모두 포함하는 최소 영역만 노드에 있음
      - B-트리의 다차원 확장
        - 균형잡힌 검색트리
        - 모든 레코드는 리프 노드에서만 가리킴
        - 다차원 도형의 저장 가능
        - 점, 선, 면, 폐공간, 각종 도형
        - MBR(Minimum Bounding Rectangle)로 근사
        - 루트를 제외한 모든 내부 노드는 내림(k/2) ~ k개의 영역을 가짐
        - 모든 리프 노드는 같은 깊이를 가짐
        - 모든 레코드는 리프 노드에서만 가리킴
      - 영역 노드
        - 복수 개의(영역, 페이지 번호) 쌍으로 구성
        - 모든 내부 노드(Internal Node)는 영역 노드임
      - 키 노드
        - 복수 개의(키, 페이지 번호) 쌍으로 구성됨
        - 모든 리프 노드는 키 노드임
    - 그리드 파일
      - 검색트리는 아님
      - 키의 내용에 의해 레코드가 저장된 곳을 ‘단번에’ 알아낼 수 있도록 설계된 다차원 저장, 검색 수단임
      - 공간을 서로 배타적인 격자(그리드) 영역으로 나눈 다음 해당 영역에 속하는 레코드들을 모아서 저장함으로써 임의의 레코드에 대한 저장과 검색을 단번에 할 수 있음