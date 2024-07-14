---
title: "[러버덕 타임] 알고리즘의 시간복잡도 설명하기"
date: 2023-03-14T17:49
thumb: "rubber-duck.jpg"
tags: 
    - ❮러버덕❯
    - 컴퓨터공학
    - 알고리즘
---

알고리즘 과목을 공부하다가 '시간복잡도'라는 개념 자체는 이해는 하겠는데, 이게 수식이랑 어떻게 연관되고 이걸 어떻게 계산해내야 하는지를 이해하는 데 어려움을 겪었습니다. 그래서 러버덕을 꺼내보았습니다. 저와 비슷한 상황에 있는 사람에게 알려준다는 생각으로 최대한 풀어서 설명해봤습니다.

---

# 점근적 분석의 개념에 대한 설명

## 극한이란? 

극한이란 함수나 수열에서 입력값이 특정 수치에 다가감에 따라 그 결과값이 다다르는 수치를 의미합니다. 

극한의 예를 들어 봅시다. f(x) = x + 3이라는 함수가 있다고 할 때, x가 정확히 3일 때 저 함수의 정확한 값 f(3)은 6이 될 것입니다. 하지만 x가 정확하게 정해지지 않았고 그저 3과 아주 가까운 어떤 수라고 생각해 봅시다. 

- x가 2.5일 때 저 함수의 값은 5.5 입니다. 
- x가 2.75일 때 저 함수의 값은 5.75가 됩니다. 
- x가 2.99999일 때 저 함수의 값은 5.99999가 됩니다. 
    
x가 3에 아주 가까운 수라면 저 함수의 값은 6에 아주 가까운 수일 것입니다. 이것이 바로 극한이라는 개념입니다.

## 점근적 분석이란? 

'점근적 분석'이란 수학적 분석에 있어서 극한(limit)을 묘사하는 방법입니다. 점근적 분석은 이러한 극한의 개념을 사용해 '만약 x가 무한대에 가깝다면?' 이라는 전제로 수학적인 분석을 수행하는 것입니다. 

점근적 분석의 예를 들어 봅시다. f(n) = n² + 3n이라는 함수가 있다고 할 때, 

- n이 작은 숫자인 2일 때는 f(2) = 4+6 이 되고 여기서 3n은 n²보다 큰 영향을 미칩니다. 
- n이 여전히 작지만 그래도 큰 숫자인 30이면 f(30) = 900 + 90으로 n²의 영향이 3n보다 훨씬 커지게 됩니다. 
- 만약 n이 100,000,000과 같이 매우 큰 숫자라면 3n의 영향력은 거의 없다고 할 수 있습니다. 
    
**만약 n이 무한대에 '가까운' 수라면, 3n은 완전히 무시해도 상관이 없어질 겁니다**. 이 경우를 **'f(n)은 점근적으로 n²와 같다'** 라고 하고 **f(n)~n²** 라고 표기합니다.

## 알고리즘

이제 컴퓨터공학으로 넘어가볼까요? 우리가 어떠한 알고리즘이 얼마나 효율적인지를 비교하고 분석하려면, 컴퓨터가 자료를 받아서 알고리즘을 통해 연산을 수행하고 그 결과를 출력하는데 걸리는 시간을 알 필요가 있습니다. 당연히 소요시간이 적을수록 그만큼 계산이 빠르다는 것이고 그만큼 더 효율적이라는 것을 의미합니다. 다만 이를 위해서 알고리즘을 실제로 실행해서 걸리는 시간을 실제로 측정하는 것은 무의미한데, 그 실측된 시간에는 알고리즘의 고유한 효율성뿐만 아니라 그 알고리즘이 가동되는 컴퓨터의 성능과 환경, 알고리즘을 어떻게 코드로 구현했는지, 그 알고리즘에 투입되는 자료 등 다양한 외부적 요소들이 개입되기 때문입니다. 

따라서 어떤 알고리즘의 고유한 효율성 그 자체만을 측정하기 위해서는, 알고리즘에 투입되는 자료의 크기가 커질수록 작업 시간이 어떻게 증가되는지를 수학적으로 계산할 필요가 있습니다. 왜냐하면 자료의 크기가 커지면 커질수록 효율적인 알고리즘과 비효율적인 알고리즘의 수행 시간은 아주 명백하게 차이가 날 것이기 때문입니다. 자료의 크기에 비례해서 증가하는 수행 시간의 증가율을 '수행 시간의 성장률(growth rate)' 이라고 하고, 그 크기가 무한대에 가깝다는 전제로 계산한 알고리즘의 수행 시간, 즉 점근적으로 계산한 알고리즘의 고유한 효율성을 바로 알고리즘의 '시간복잡도'라고 합니다. 알고리즘끼리 시간복잡도를 비교하면 어떠한 알고리즘이 더욱 혹은 덜 효율적인지 알 수 있습니다.

선형 검색 알고리즘을 예로 들어 보겠습니다.

이 알고리즘은 n개의 원소가 있는 배열을 하나씩 확인해가면서 내가 찾고자 하는 원소와 일치하는 것이 있는지를 검색하는 함수로 이루어져 있습니다. 자료는 존재하고 셀 수 있는 것이어야 하므로 n은 당연히 0보다 큰 자연수입니다. 이 알고리즘을 코드로 나타내면 다음과 같을 것입니다.

**Pseudocode**

```
선형 검색 함수 {
	for (지금은 0인 반복자 i가 배열의 크기 n과 같아질 때 까지 i에 1을 하나씩 더함) {
		if (배열에서 i번째 원소의 값이 내가 찾고자 하는 값과 같다면) {
			return 배열에서 i번째 원소의 값; }
		return -1; }
}
```

이 함수에서 반복문이 수행되는 순서는 다음과 같습니다.

1. 반복자 i가 n과 같아졌는지를 비교 확인
2. i가 n보다 작으면 이번엔 배열에서 'i번째 원소'와 '찾고자 하는 값'이 같은지 비교
3. 같다면 i번째 원소의 값을 출력
4. 아니라면 i에 1을 더함

반복문은 n번 반복해서 수행되고, 반복문 자체를 한 번 수행하는 데 걸리는 시간이 c1이라고 하면, 반복문을 마지막까지 반복하는 데에 소요되는 시간은 c1 * n이 됩니다. c1은 실측을 해봐야 알 수 있는 것이지만, 위에서 언급했다시피 이 시간은 여러 요인들에 의해 변동되므로 중요하지 않습니다. **중요한 것은 이 반복문이 n번 수행된다는 것입니다**. 여기에 반복자 i를 처음으로 정의하고 0을 할당하는 시간, 반복문을 처음으로 정의하는 시간 등 알고리즘의 수행에 별도의 시간이 필요합니다. 이러한 작업에 소요되는 시간을 c2라고 한다면, 알고리즘 전체의 수행에 필요한 시간은 (c1 * n) + c2 라고 할 수 있습니다. 참고로 프로그램의 기능을 실행하는 데 소요되는 간접적인 자원이나 시간을 '오버헤드(overhead)'라고 합니다. 여기서 오버헤드는 c2가 되겠습니다.

자, 이제 크기가 무한대에 가까운 배열에 이 알고리즘을 사용한다고 생각해봅시다. n은 무한대에 가까운 수가 될 것이고, 반복문을 거의 무한대만큼 반복을 하게 되겠지만, 반복문을 한 번 수행하는데 c1만큼 시간이 걸리고, c2만큼의 시간은 알고리즘을 준비하는 데 한 번만 필요하다는 사실은 변함이 없습니다. c1과 c2는 고정된 상수일 뿐이므로 그것이 몇 초인지 몇 분인지 몇 시간인지는 무한대만큼 반복을 가정한 상황에서는 중요하지 않습니다. **중요한 것은 이 알고리즘은 자료 크기인 n에 비례해서 c1 * n 만큼의 시간이 걸리게 될 것이라는 사실**이고, 그것이 바로 선형 검색 알고리즘의 시간복잡도 입니다.


---

# 점근적 표기법의 종류

위에서 언급한 점근적 표기법인 f(n)~n²은 수학적인 표기법입니다. 하지만 우리가 컴퓨터공학에서 알고리즘의 시간복잡도를 표기하기 위해서는 단순히 해당 알고리즘이 어떻게 수학적으로 점근적으로 행동하는지 뿐만 아니라, 그 알고리즘이 어떠한 맥락과 상황에 따라 어떤한 시간복잡도를 가지는지 함께 나타낼 필요가 있습니다. 무슨 말이냐구요?

알고리즘에 투입되는 자료라는 것은 언제나 항상 똑같은 값과 형식과 순서로 주어지지 않습니다. 알고리즘마다 논리적 구조가 제각각 다르기 때문에, 알고리즘에 따라 어떠한 자료는 계산에 시간이 적게 걸리고, 어떠한 자료는 계산에 시간이 많이 걸리기도 합니다. 그렇기 때문에 **주어진 자료가 알고리즘에게 처음부터 얼마나 '유리한지'를 최선, 최악, 평균의 경우로 나누어 감안**해서 시간복잡도를 표현할 필요가 있고, 그것이 알고리즘에서의 점근적 표기법입니다.


## 1. Big-theta(Θ)

선형 검색 알고리즘을 다시 예로 들어보겠습니다. 이 알고리즘의 반복문을 한 번 수행하는 데, 최악의 경우에는 k1만큼의 시간이 걸리고, 최선의 경우에는 k2만큼의 시간이 걸린다고 생각해봅시다. 우리는 실제 상황이 아니라 알고리즘 자체에 대한 수학적 생각만 하고 있기 때문에 우리는 현재 주어진 자료가 최선의 경우인지, 최악의 경우인지, n이 정확히 몇인지, k1이 몇인지, k2가 몇인지, 모르고, 알 수도 없고, 알 필요도 없습니다. 하지만 이 알고리즘을 무한대에 가까운 숫자인 n번 반복 실행한다고 가정했을 때, 

- 반복문 밖의 오버헤드 c2는 사실상 없는 거나 마찬가지일 것이므로 무시될 것이고, 
- 알고리즘의 궁극적인 소요시간은 k1 * n과 k2 * n 사이의 그 어딘가라는 사실은 예상할 수 있습니다. 

그래프로 그려본다면, 선형 검색 함수 f(n)의 그래프는 k1 * n 그래프와 k2 * n 그래프 사이에 어디엔가 끼어있겠죠. **이 알고리즘은 최선의 상황이든 최악의 상황이든 어찌됐든 평균적으로는 n의 크기에 비례해서 시간이 걸린다**고 말할 수 있고, 이 알고리즘의 수행 시간을 Θ(n)이라고 표시하는 것이 'Big-theta 표기법' 입니다. 


## 2. Big-O

이번에는 이진 검색 알고리즘을 예로 들어보겠습니다. 이진 검색 알고리즘이란 오름차순 또는 내림차순으로 정렬된 정수 배열에서, 중간값을 먼저 골라 찾고자 하는 원소와 일치하는지 확인하고, 없을 경우 찾고자 하는 원소가 중간값보다 큰지 작은지를 판단해 나머지 영역을 다시 반씩 나누어가는 과정을 반복해 나가는 알고리즘입니다. 

1부터 100까지 오름차순으로 나열된 자료가 있다고 생각해봅시다. 이 경우 자료의 크기인 n은 100이 됩니다. 내가 찾고자 하는 원소가 50일 때, 이진 검색 알고리즘은 일단 자료의 중간값을 고르게 됩니다. 그 중간값이 바로 내가 찾고자 하는 숫자니까 단 한번에 계산을 끝낸 운 좋은 경우입니다. 이런 최선의 경우 이진 검색 알고리즘의 수행 시간은 Θ(1)이 됩니다.

하지만 최악의 경우는 어떨까요? 내가 찾고자 하는 숫자가 99일 경우, 알고리즘은 먼저 중간값인 50을 고르고 나서, 찾고자 하는 99가 중간값인 50보다 크다는 사실을 파악하고는 50보다 큰 영역의 중간값인 75를 선택해 비교합니다. 99는 여전히 75보다 크므로 75보다 큰 영역에서 중간값인 88을 선택하고, 이러한 작업을 마지막까지 반복하게 됩니다. 이런 최악의 경우 이진 검색 알고리즘의 수행 시간을 수학적으로 계산해보면 Θ(logn)이 됩니다. 

n이 무한대에 가깝게 클 때, 이 알고리즘은 최악의 상황에서 Θ(logn)의 성능을 가지지만, 그 외의 상황에서는 이보다 더 나은 성능을 가질 수도 있다는 것을 나타낼 때 우리는 'Big-O 표기법'을 사용합니다. Big-O 표기법으로 나타낸 이진 검색 알고리즘의 시간복잡도는 O(logn)이며, 이는 '최악의 상황이 주어지더라도 logn에 비례하는 수행 시간보다 더 느리지는 않다'는 것을 의미합니다. **Big-O 표기법으로 나타낸 알고리즘의 효율성은 최악이 아닌 상황에서 얼마나 더 뛰어난 성능을 보여주는지에 대해서는 이야기하지 않습니다**. 그저 최악의 상황에서도 보장하는 알고리즘 성능, **알고리즘 성능의 최저값**, 즉 알고리즘 시간복잡도의 '점근적 하한'만을 나타낸다고 볼 수 있습니다. 


## 3. Big-omega(Ω)

Big-O 표기법이 '최악의 상황에서도 보장하는 알고리즘의 성능'을 의미한다면, 그 반대인 '최선의 상황에서만 달성되는 알고리즘의 성능'을 나타내는 표기법도 있겠습니다. 이것이 바로 Big-omega 표기법 입니다. 

이진 검색 알고리즘의 경우 최선의 상황에서 Θ(1)의 성능을 가진다고 위에서 언급했습니다. 이를 표현하기 위해 Big-omega 표기법을 사용하면 Ω(1)이 됩니다. 이것이 의미하는 바는 '최선의 상황이 주어졌을 때 이진 검색 알고리즘은 단 한번의 수행만으로 원하는 값을 찾아낼 수 있다'는 것입니다. 

**Big-omega 표기법으로 나타난 알고리즘의 효율성은 최선의 상황에서만 달성될 수 있는 알고리즘의 성능**, 알고리즘 성능의 최댓값, 즉 알고리즘 시간복잡도의 '점근적 상한'만을 나타냅니다. **현실적으로 알고리즘을 사용할 때 최선의 상황만 주어지는 경우는 거의 없으므로 Big-omega는 알고리즘의 고유한 효율성을 비교 분석하는 데에는 거의 사용되지 않습니다**.


---

# 점근적 분석 방법: 반복대치, 추정 후 증명, 마스터 정리

알고리즘 중에서는 **자기 자신을 알고리즘 내부에서 호출해서 사용**하는, 즉 재귀적인 성질을 가진 것들이 있습니다. 

그리고 수열에 있어서 그것을 실제 값으로 나열하는 것이 아니라 **각 항 사이의 관계를 수학적으로 표현하는 관계식**을 '점화식'이라고 합니다. 

피보나치 수열을 예로 들자면 실제 값은 1, 1, 2, 3, 5, 8, 13 … 이런 식으로 나열되지만, 각 숫자 사이의 관계는 바로 앞의 두 숫자를 더한 값이 계속 추가되는 것이므로 점화식으로는

- A<sub>n</sub> = A<sub>n-1</sub> + A<sub>n-2</sub> 
    
이렇게 나타낼 수 있습니다. 이 두 개념을 활용해서 알고리즘을 점근적으로 분석할 수 있습니다. 


## 1. 반복대치법

선택 정렬을 예로 들어 볼까요? 선택 정렬 알고리즘은 다음과 같이 수행됩니다.

1. 먼저 주어진 자료 배열 전체를 탐색해서 최소값을 찾아냄
2. 최소값을 첫 번째(맨 왼쪽) 자리의 원소와 맞교환함
3. 첫 번째 자리의 정렬은 끝났으므로 이제 첫 번째 원소를 제외한 나머지 전체를 탐색해서 최소값을 찾아냄
4. 최소값을 두 번째 자리의 원소와 맞교환함
5. 정렬이 끝난 첫 번째 자리와 두 번째 자리를 제외한 나머지 전체를 탐색해서 최소값을 찾아냄
6. 최소값을 세 번째 자리의 원소와 맞교환함
7. 이 과정을 마지막까지 반복함

선택 정렬 알고리즘을 수행하는데 소요되는 시간을 점화식으로 나타내면 T(n) = cn + T(n-1)이 됩니다. 여기서 T(n)이란 자료의 크기가 n일 때 알고리즘을 n번 수행하는 전체 소요시간이고, c는 알고리즘을 한번 수행하는 데 걸리는 시간, 즉 고정된 상수입니다.

만약 [2, 5, 3, 1, 4] 라는 자료가 주어졌다고 생각해봅시다. 자료의 크기인 n은 5가 되겠죠. 자료의 전체를 탐색하고 최소값인 1을 찾아내 이것을 첫 번째 자리의 원소인 2와 맞교환을 해서 [1, 5, 3, 2, 4]로 만드는 이 과정을 한 번 수행하는데 걸리는 시간은 c가 될 겁니다. 자료의 크기인 5를 점화식에 대입해보겠습니다.

```
T(5) = 5c + T(4)
T(4) = 4c + T(3)
T(3) = 3c + T(2)
T(2) = 2c + T(1)
T(1) = c
```

그리고 이 값을 점화식에 대입해 반복적으로 대치를 해보면 다음과 같이 나옵니다.
    
```
T(5) = 5c + T(4) 
     = 5c + 4c + T(3) 
     = 5c + 4c + 3c + T(2) 
     = 5c + 4c + 3c + 2c + T(1) 
     = 5c + 4c+ 3c + 2c + c
```

여기서 우리는

- T(n) = cn + c(n-1) + c(n-2) + c(n-3) + … + c

이라는 사실을 알 수 있습니다.

만약 자료의 크기 n이 무한대에 가까운 수라면, 이 알고리즘을 무한대에 가깝게 반복할 것이고, c는 알고리즘의 1회 수행 시간인 어떠한 고정된 상수이므로 c를 1이라고 생각하고 소거해봅시다. 다시 한번 말씀드리지만, 위에서 설명드렸다시피 알고리즘의 1회 수행 시간이 1초건 10초건 그건 중요하지 않습니다. 즉, c가 실제로 몇인지는 전혀 중요하지 않습니다. 자료의 크기가 무한대에 가깝기 때문입니다. 그렇기 때문에 c를 1로 가정하였습니다.

- T(n) = n + n-1 + n-2 + n-3 + … + 1

보시다시피 이건 등차수열이기 때문에 등차수열의 합을 구하는 공식인 '첫 항과 마지막 항을 더한 뒤 항의 개수를 곱하고 2로 나눈 값'을 사용하면, 

- T(n) = { n ( n + 1 ) } / 2
    
가 되고, 여기서 최고차항은 n² 이므로, 이것이 바로 선택 정렬 알고리즘의 시간복잡도 입니다.


## 추정 후 증명

이번에는 선택 정렬 알고리즘에 추정 후 증명을 적용해 보겠습니다. 추정 후 증명이란 일단 점근적 복잡도를 가정하여 가설로 설정해 놓고 그것이 맞는지를 수학적으로 증명해 보는 방법입니다. 여러 시행착오를 거치는 방법이라고 할 수 있는데요, 수학적 귀납법의 가정과 전개는 다음과 같습니다.

- n이 1일 때 P(n)이 성립을 하는지 확인
- n이 k일 때 P(n)이 성립하면 P(k+1)도 성립하는지 확인
- a ≤ n ≤ b일 때 P(n)이 성립한다면, P(b+1)도 성립하는지 확인

즉, 도미노가 우르르르 순서대로 넘어지듯이, n이 1일때도, n이 2일때도, n이 3일일 때도, n이 무한대에 가까운 숫자일 때에도 P(n)이 성립해야 합니다.

선택 정렬 알고리즘의 점화식은 T(n) = cn + T(n-1) 입니다. 이 점화식의 점근적 복잡도를 O(n)이라고 가정해봅시다. 

- 점근적 복잡도이므로 n이 무한대에 가까운 큰 숫자인 경우를 전제로 한 것이고, 그러므로 최고차항인 n을 제외한 나머지 항은 무시를 하게 됩니다. 위에서 언급했듯이 n이 무한대일 때, 최고차항인 cn에 비하면 나머지 항들의 영향력은 거의 없는 거나 마찬가지일 정도로 작은 숫자일 것이니까요. 

- Big-O 표기법이므로 최악의 상황에서도 n에 비례하는 시간복잡도를 가진다는 가정이고, 이 말은 곧 알고리즘의 전체 수행 시간 T(n)이 최악의 상황을 가정한 시간복잡도인 cn보다 같거나 적어야 한다는 의미입니다. 어떠한 경우에도 cn보다는 더 나은 성능(적은 시간)을 보여야 한다는 의미입니다. 즉, T(n) ≤ cn이어야겠죠.

이 가정이 맞는지 확인해봅시다.

### 기본 전제(base case)

n이 1일 때, T(1)은 알고리즘을 1회 수행하는 시간인 c보다 더 걸릴 수가 없으므로 T(1)은 c보다 커질 수는 없습니다. 즉 T(1)은 c와 같거나 작아야 합니다. T(1) ≤ c가 참이어야 합니다.

- n이 1일 때, 점화식에 실제로 1을 대입해보면 T(1) = c가 됩니다.

따라서 기본 전제는 '참' 입니다.

### 추정 단계(induction step)

만약 시간복잡도가 n이라면, n+1, n+2, n+3, … 무한대에 가까운 n에 대해서도 T(n) ≤ cn이 참이어야 합니다.

```
T(n) = cn + T(n-1) ≤ cn             (기본 전제)
T(1) = c ≤ c                        (n이 1일 때 참)
T(2) = 2c + c = 3c ≤ 2c             (n+1일 때 거짓)
T(3) = 3c + 2c + c = 6c ≤ 3c        (n+2일 때 거짓)
T(4) = 4c + 3c + 2c + c = 10c ≤ 4c  (n+3일 때 거짓)
```

위의 예시에서 보듯, n이 1일때만 참이고, 2부터는 거짓이 되므로, 선택 정렬 알고리즘의 시간복잡도는 O(n)이 아니라는 사실을 알 수 있습니다.

그렇다면 이번에는 시간복잡도가 n²이라고 가정하고 다시 시도해볼까요?

```
T(n) = cn + T(n-1) ≤ cn²
T(1) = c ≤ c                        (n이 1일 때, 즉 전제 조건은 참)
T(2) = 2c + c = 3c ≤ 4c             (n+1일 때 참)
T(3) = 3c + 2c + c = 6c ≤ 9c        (n+2일 때 참)
T(4) = 4c + 3c + 2c + c = 10c ≤ 16c (n+3일 때 참)
```

선택 정렬 알고리즘의 시간복잡도가 O(n²)이라는 가정이 참이라고 증명되었습니다!


## 3. 마스터 정리

특정한 형식을 가진 재귀식의 경우 시간복잡도를 구하기 위해서 재귀 트리(recursion tree)를 사용하는 대신, 쉽게 적용할 수 있는 만능 열쇠(master key)같은 공식이 있는데 이를 마스터 정리(master theorem)라고 합니다. 

다음과 같은 조건을 만족한다면,

- n이 무한대에 가까운 점근적 시간복잡도의 점화식은 T(n) = a * T(n/b) + f(n)의 형식이어야 하고, a ≥ 1, b > 1이어야 함
- 알고리즘의 1회 수행 시간인 c는 당연히 0보다 커야 함
- f(n)은 다항식이어야 함. 즉 f(n) = c * n<sup>k</sup> 형태가 됨. 단항식도 다항식에 포함되므로 k ≥ 0. 만약 다항식이 아닐 경우, 마스터 정리가 사용 가능하다는 것이 분명하게 증명된 예외적인 경우에 한해 마스터 정리 적용 가능.
- a * f(n/b) ≤ c * f(n)을 만족하고 c < 1을 만족하는 상수 c가 존재해야 함

마스터 정리를 사용할 수 있습니다. 마스터 정리를 사용할 수 있을 때, 시간복잡도는

- a < bk 인 경우, T(n) = Θ(n<sup>k</sup>)
- a = bk 인 경우, T(n) = Θ(n<sup>k</sup>log<sub>2</sub>n)
- a > bk 인 경우, T(n) = Θ(n<sup>log<sub>b</sub>a</sup>)

가 됩니다. 

예를 들어 점화식 T(n) = 5T(n/7) + cn²로 표현되는 알고리즘의 경우, k = 2가 되고 5 < 7² 이 되므로 시간복잡도는 Θ(n²)가 됩니다. 

마스터 정리를 사용할 수 없는 형식의 점화식이더라도, 나머지 전제 조건을 만족한다면, 변수를 치환하여 마스터 정리를 쓸 수 있는 형태로 만들어주면 마스터 정리를 적용할 수 있습니다. 마스터 정리의 증명은 수학적으로 복잡하므로 생략하겠습니다.

---

강의를 보고 배우는 것 보다 이걸 직접 풀어서 설명하는게 훨씬 더 힘들었습니다. 그래도 이런 과정을 통해서 개념을 확실하게 이해할 수 있었습니다. 러버덕 효과 좋네요.

본문은 다음의 자료들을 참고해서 공부를 한 내용이고, 저는 학생이다보니 틀린 내용이 있을 수 있습니다. 알려주시면 정정하도록 하겠습니다.

- Asymptotic analysis. In *Wikipedia*.
- Analysis of algorithms. In *Wikipedia*.
- Big O notation. In *Wikipedia*.
- Khan Academy. (n.d.). *[Asymptotic notation](https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation)*.
- Blum, A.  (n.d.). *[Lecture 2: Asymptotic Analysis and Recurrences](https://www.cs.cmu.edu/~avrim/451f11/lectures/lect0901.pdf)*. Carnegie Mellon University.
- Precup, D. (n.d.) *[Lecture 12: More on selection sort. Proofs by induction.](https://www.cs.mcgill.ca/~dprecup/courses/IntroCS/Lectures/comp250-lecture12.pdf)* McGill University.