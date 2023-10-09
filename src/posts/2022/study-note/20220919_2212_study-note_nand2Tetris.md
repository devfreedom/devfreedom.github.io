---
title: "[필기] <Nand2Tetris> 강의 - Unit 1"
date: 2022-09-19T22:12
thumb: "nand2tetris.jpg"
tags: 
    - ❮필기❯
    - nand2tetris
    - 컴퓨터공학
    - 논리회로
---

Coursera에서 Coursera For Students 프로그램을 폐지한다는 이메일을 얼마 전에 받았습니다. 학생들에게 매년 무료로 교육과목 1개와 모든 guided project를 제공하는 혜택입니다. 코세라의 지도형 실습 프로젝트는 굉장히 불편하게 만들어져 있어서 굳이 관심이 없고, 어떤 교육과목에 마지막 기회를 쓸까 고민을 많이 했습니다. 아무래도 일반적인 교양 분야 수업에 쓰기는 아깝고, 그렇다고 거창한 Specialization 과정에서 딱 한 과목만 듣자니 좀 애매하더군요. 

이왕이면 쓸모있는 컴퓨터공학 분야나 소프트웨어 개발 분야로 듣자는 생각을 했고 해외 웹에서의 의견을 찾아봤는데 그 중 이스라엘의 예루살렘 히브리 대학교(The Hebrew University of Jerusalem)에서 만든 [From Nand To Tetris](https://www.nand2tetris.org/) (nand2tetris) 라는 교육과목을 많이들 추천하더라고요. 말 그대로 NAND 게이트에서부터 테트리스 게임 소프트웨어까지, 컴퓨터 소프트웨어 공학의 머리부터 발끝까지를 나름대로 직관적이고 쉽게 설명해준다고 합니다. (Hacker News에서 극찬을...)

코세라에서는 Part 1과 Part 2로 나뉘어져 있는데, Part 1은 

1. 부울 함수와 게이트 로직
2. 부울 연산과 ALU
3. 메모리 
4. 기계어 
5. 컴퓨터 아키텍쳐
6. 어셈블러

순서대로 개념을 익혀나가고, 파트 2는 가상 머신, 고수준 언어, 컴파일러, 운영체제 등등 '기계'에서 '사람' 방향으로 배우게 됩니다. 파트 2는 어느 정도는 익숙한 개념들이 얼핏 보여서, 이왕이면 나에게 낯선 새로운 것을 배워보는게 낫겟다 싶어서 최종적으로 파트 1을 선택했습니다.

시작은 했는데 처음부터 숨이 막혀오네요. 끝까지 제대로 배울 수 있을지 모르겠습니다. 배경지식이 없어도 따라할 수 있게 만들었다고는 하는데, 제 생각에는 컴퓨터라는 기계에 대한 최소한의 배경지식은 있어야 하지 않을까 싶네요.

---

## Unit 0
### The Road Ahead
- Don’t worry about the “how” = implementation
- Worry only about the “what” = abstraction
    - what our programming language promises to do

### From Nand to Hack
- The Hack Computer = ROM + CPU + RAM
- Nand2Tetris Part 1 
    - (assembler)-> Computer architecture -(digital design)-> CPU/RAM/Chipset -(gate logic)-> Elementary logic gates -(electrical engineering)-> Hardware
- Nand2Tetris Part 2
    - Human thoughts -(code)-> High-level language -(compiler)-> VM code -(VM translator)-> Low-level code -(assembler)

### From Hack to Tetris
- High-level language: rich language and built-in operations
- This course is about assembly language, not high-level language

## Unit 1
### Boolean Logic
- Boolean values: True/False, 0/1, Yes/No
- Boolean operations
    - x AND y
        - Returns 1 only when both are 1
        - The rest, returns 0
    - x OR y
        - Returns 0 only when both are 0
        - The rest, returns 1
    - NOT(x)
        - Returns the opposite value
        - returns 1 for 0, and returns 0 for 1
    - Boolean operations can be combined
        - e.g. 1 AND (0 OR (NOT (1))) = 0
- Boolean functions
    - e.g. f(x,y,z) = (x AND y) OR (NOT(x) AND z)
- Boolean Identities
    - Commutative laws = interchangeable
        - e.g. (x AND y) = (y AND x)
    - Associative laws 
        - e.g. (x AND (y AND z)) = ((x AND y) AND z)
    - Distributive laws
        - e.g. (x OR (y AND z)) = (x OR y) AND (x OR z)
    - De Morgan laws
        - e.g. NOT(x AND y) = NOT(x) OR NOT(y)
- Boolean algebra
    - Manipulate boolean operations
    - e.g. NOT(NOT(x) AND NOT(x OR y))
        - = NOT(NOT(x) AND (NOT(x) AND NOT(y))    # use De Morgan law
        - = NOT((NOT(x) AND NOT(x)) AND NOT(y))    # use associative law
        - = NOT(NOT(x) AND NOT(y))    # use Idempotence law
        - = NOT(NOT(x)) OR NOT(NOT(y))    # use double negation
        - = x OR y
- These are all verifiable by listing all possible boolean input combinations using Truth Table

### Boolean Functions Synthesis
- Sample Truth Table

```
x / y / z / f
=============
0 / 0 / 0 / 1
0 / 0 / 1 / 0
0 / 1 / 0 / 1
0 / 1 / 1 / 0
1 / 0 / 0 / 1
1 / 0 / 1 / 0
1 / 1 / 0 / 0
1 / 1 / 1 / 0
```

- From Truth Table to Boolean Expression
    - Why? To design a computer by composing it from primitive gates and operations    
    - Step 1. Build a boolean function that results in ‘f’ value, from the first row
        - e.g. NOT(x) AND NOT(y) AND NOT(z) = 1
    - Step 2. Built an another function/clause for each row that has the value of 1
        - 3rd row 0/1/0/1 has its ‘f’ value as 1
            - e.g. NOT(x) AND y AND NOT(z) = 1
    - Step 3. Repeat, 5th row 1/0/0/1 in this case
        - e.g. x AND NOT(y) AND NOT(z) = 1
    - Step 4. Combine all of them using OR operation
        - (NOT(x) AND NOT(y) AND NOT(z)) OR (NOT(x) AND y AND NOT(z)) OR (x AND NOT(y) AND NOT(z))
    - Step 5. Simplify the expression by extinguishing duplicates
        - = (NOT(x) AND NOT(z)) OR (NOT(y) AND NOT(z))
        - = NOT(z) AND (NOT(x) OR NOT(y))
- Mathematical theorem
    - Theory 1. Any boolean function can be represented using an expression containing AND, OR, and NOT operations.
    - But do we really need OR operation?
        - We can replace OR with AND and NOT
            - Proof: (x OR y) = NOT(NOT(x) AND NOT(y))  # De Morgan law
        - We can’t replace AND and NOT though
            - We need AND to combine two possible values
            - We need NOT because if not, zeroes with AND will always return zero as output
    - NAND function
        - NAND gives 0 only if both of its inputs are 1, the rest returns 1
        - NAND = the negation of x AND y
        - x NAND y = NOT(x AND y)
    - Theory 2. Any boolean function can be represented using an expression containing only NAND operations. 
        - Proof
            - NOT(x) = (x NAND x)
            - (x AND y) = NOT(x NAND y)

### Gate Logic
- A technique for implementing boolean functions using logic gates
- Logic gates
    - Elementary: NAND, AND, OR, NOT, etc.
        - e.g. NAND gate
            - if (a==1 and b==1)
            - then out=0 else out=1
    - Composite: Mux, Adder, etc.
- Composite gates
    - (a AND b) AND c
        - if (a==1 and b==1 and c==1)
        - then out=1 else out=0
    - The order of the input bits does not impact the chip’s output
- Gate interface = Gate obstruction
    - How the user thinks about what the gate is supposed to do = ‘what’
    - There should be only one unique way to describe what the gate is supposed to do
    - But there are different ways to achieve this
        - One gate obstruction, many different gate implementations
        - e.g. more efficient, less expensive, more simple, etc.
- Circuit implementations
    - This course does not deal with physical circuitry implementations
    - No electronic engineering

### Hardware Description Language(HDL)
- As a gate architect, demand a full and complete description of the desired gate’s behavior
- e.g. XOR gate
    - Requirement: Outputs 1 if one, and only one, of its inputs, is 1.
    - HDL file which is ‘gate interface’ looks like below
    - Also take a look at how its gate diagram looks like
```
HIP Xor {
    In a, b;
    OUT out;
    PARTS:
        // implementation code 
}
```  
- What’s needed for HDL?
    - HDL is a functional and declarative language, a static description of gate diagrams
        - Good documentation
        - Good self-readable descriptive names for chips and connections
        - Good indentation for readability
    - The order of HDL statement is insignificant
    - Before using a chip part, you must know the interface
        - e.g. NOT(in= , out= ), AND(a= , b= , out= ), OR(a= , b= , out= )
    - Connections like partName(a=a, ...) and partName(..., out=out) are common
-  Common HDLs
    -  VHDL
    -  Verilog

### Hardware Simulation
- Hardware simulator is designed to simulate and test HDL files
    - This course uses a hardware simulator written in Java
    - Interactive simulation
        - Test HDL files simultaneously and interactively
    - Script-based simulation
        - Writes two seperate files, one is HDL code, the other one is test script
        - Hardware simulator loads both and runs the test script
    - Output-compare file comparison
        - Record the result of the simulation called an 'output file'
        - Compare the output file to a desired output called 'compare file'
- Behavioral simulation
    - The chip logic can be implemented in some high-level language
    - Enables high-level planning and testing of a hardware architecture before writing any HDL code
- Hardware construction projects
    - The players
        - System architects (Professors)
            - Decide which chips are needed
            - Creates chip API, test script, compare file
        - Hardware developers (You)
            - Build the chips using the following convenient specifications
                - The chip interface(*.hdl)
                - What the chip is supposed to do (*.cmp)
                - How to test the chip (*.tst)

### Multi-bit Buses
- Arrays of bits
	- It is conceptually convenient to think about such a group of bits as a single entity, sometimes termed "bus"
	- HDLs will usually provide some convenient notation for handling these buses
- e.g. 16-bit adder
	- 16-bit input A and 16-bit input B -(16-bit adder)-> 16-bit output

```
CHIP Add16 {
	IN a[16], b[16];
	OUT out[16];
	PARTS:
		// implementation code }
```

- e.g. 3-way 16-bit input
	- This way we can manipulate inside HDL, the busses and entities

```
CHIP Add3Way16 {
	IN first[16], second[16], third[16];
	OUT out[16];
	PARTS:
		add16(a=first, b=second, out=temp);
		add16(a=temp, b=third, out=out); }
```

- e.g. Let's do 'multi-way chips'
	- Bus is just a bunch of bits together
	- We can get access to seperate bits in a bus 

```
CHIP Add4Way{
	IN a[4];
	OUT out;
	PARTS:
		AND(a=a[0], b=a[1], out=t01);
		AND(a=t01, b=a[2], out=t012);
		AND(a=t012, b=a[3], out=out); }
```

- e.g. Computes a bit-wise and of its two 4-bit input buses 
	- Buses can be composed from (and broken into) sub-buses

```
CHIP And4 {
	IN a[4], b[4];
	OUT out[4];
	PARTS:
		AND(a=a[0], b=b[0], out=out[0]);
		AND(a=a[1], b=b[1], out=out[1]);
		AND(a=a[2], b=b[2], out=out[2]);
		AND(a=a[3], b=b[3], out=out[3]);
```
- Buses can be composed from (and broken into) sub-buses

```
IN lsb[8], msb[8]
Add16(a[0...7]=lsb, a[8...15]=msb, b=..., out=...);
Add16(..., out[0...3]=t1, out[4...15]=t2);
```

- Some syntactic choices of our HDL
	- Overlaps of sub-buses are allowed on output buses of parts
	- Width of internal pins is deduced automatically
	- "false" and "true" may be used as buses of any width

### Project 1
- Elementary logic gates: Not, And, Or, Xor, Mux, DMux
- 16-bit variants: Not16, And16, Or16, Mux16
- Multi-way variants: Or8Way, Mux4Way16, Mux8Way16, DMux4Way, DMux8Way
- Multiplexor(Mux)
	- 2-way Mux enables selecting and outputting, one out of two possible inputs

```
if (sel==0)
	out = a
else
	out = b
```

- Demultiplexor(DMux)
	- Acts like the inverse of multiplexor, works as a distributor
	- Receives a single input, and based on the selection bit, channels it to either a or b output

```
if (sel==0)
	{a, b} = {in, 0}
else
	{a, b} = {0, in}
```

- And16 = AND operator for 16-bit bus
	- Calculation logic is not sequential, 16-bit data gets calaculated at once
- Mux4Way16
	- 4 inputs, 2 selection bits for each 2 input pairs, single output
- End-note
	- Create and edit your *.hdl files using a text editor
	- A chip cannot be used in its own implemention
	- When running an HDL program in the hardware simulator, errors are reported in red at the left-bottom corner
	- Multi-bit buses (unit 1.6) are indexed right(least significant bit) to left(most significant bit)

---

Unit 1까지 학습을 마쳐봤습니다. Unit 1의 과제는 16개의 기초적인 칩에 대한 HDL을 작성하고 테스트 스크립트를 돌려서 올바른 결과값을 출력해야 하는 프로젝트입니다. 개념은 나름대로 이해가 되는데 정작 직접 이걸 구현하려고 하니까 바로 막혀버리네요. 차분하게 로직을 작성하고 테스트하려면 넉넉한 시간이 필요할 것 같습니다. 이 과목은 프로젝트 중심으로 진행되는데, 코세라 수료증 따려고 시작한 공부도 아니고 요즘 다른 우선순위에 시간을 더 열심히 써야하는 상황이라서 일단 과제 작성은 후순위로 미루고 시간이 날 때 강의만 먼저 수강해야겠습니다. 어차피 제가 얻고자 했던건 개괄적이고 이론적인 지식이라서...

아, 그리고 확실히 어느 정도의 배경 지식은 필요합니다. 직접 엔지니어링을 하려면 논리적 사고력도 필수적이구요. 어렵네요. 아무리 쉽게 풀어서 설명하더라도 결국 이것도 컴퓨터공학임은 틀림이 없다는게 체감이 됩니다.