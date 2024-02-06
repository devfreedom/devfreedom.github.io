---
title: "[필기] 머신러닝 특강 - LangChain으로 LLM 활용하기"
date: 2024-02-05T22:46
thumb: "neural-network.jpg"
tags: 
    - ❮필기❯
    - 인공지능
    - 머신러닝
    - Python
    - LangChain
    - LLM
---

# LangChain이란?

LangChain은 Large Langauge Model을 애플리케이션과 손쉽게 연동할 수 있도록 도와주는 프레임워크입니다.

- 간단한 예시 코드
    ```
    !pip install langchain
    !pip install openai
    !pip install streamlit

    # OpenAI API key가 별도의 환경변수 .env 파일에 저장되어있다고 가정하겠습니다.
    from dotenv import load_dotenv
    load_dotenv()

    from openai import OpenAI

    # Streamlit은 인터랙티브한 데이터 앱을 만들 수 있도록 도와주는 프레임워크입니다.
    import streamlit as st

    client = OpenAI(api_key=OPEN_API_KEY)

    # OpenAI의 모델을 사용해보겠습니다. 
    from langchain.chat_models import ChatOpenAI
    from langchain.llms import OpenAI

    """
    # LLM 모델을 사용할 경우, "안녕"이라고 입력을 하면 그 이후의 문장을 예측하고 생성하게 됩니다. 
    llm = OpenAI()
    result_llm = llm.predict("안녕")
    st.write(result_llm)
    """

    """
    # Chat 모델을 사용할 경우, "안녕"이라고 입력을 하면 "무엇을 도와드릴까요?"라는 대화형 답변이 출력됩니다.
    chat_model = ChatOpenAI()
    result_chat = chat_model.predict("안녕")
    st.write(result_chat)
    """

    st.title("이력서를 만들어주는 인공지능")
    story = st.text_input("본인의 학력, 경력, 자격, 성격, 역량 등을 입력해보세요.")
    prompt = "이런 정보를 기반으로 A4 용지 한 장 분량의 이력서를 작성해줘."

    if st.button("이력서를 해결해줘!"):
        st.write(story + "라구요? 이력서를 한번 작성해볼게요.")
        with st.spinner("잠시만 기다려주세요!"):
            result = chat_model.predict(story + prompt)
            st.balloons()
            st.write(result)

    ```

## LLM과 prompt를 chaining하기
- promptTemplate.py
    ```
    from dotenv import load_dotenv
    load_dotenv()

    from langchain.chat_models import ChatOpenAI
    from langchain.prompts import ChatPromptTemplate
    from langchain_core.output_parsers import StrOutputParser

    prompt = ChatPromptTemplate.from_template("{input}에 관한 농담을 하나 해줘.")
    model = ChatOpenAI()
    
    # chain을 구성합니다.
    #   1. template으로 구성된 prompt를,
    #   2. model에 투입하되, 출력값에서 개행 문자를 발견하면 일시정지합니다. 
    #   3. 그 결과를 표준 출력으로 표시합니다.
    chain = prompt | model.bind(stop=["\n"]) | StrOutputParser()

    # chain에 입력값을 넣어 작동시킵니다.
    chain.invoke({"input": "개발자"})
    ```

### Google AI 모델 사용하기
- google_lang.py
    ```
    from dotenv import load_dotenv
    load_dotenv()

    from langchain_google_genai import ChatGoogleGenerativeAI

    llm = ChatGoogleGenerativeAI(model="gemini-pro")
    result1 = llm.invoke("객체지향 프로그래밍에 대해서 중학생 눈높이에서 설명해줘.")
    
    message = HumanMessage(
        content = [
            {
                "type": "text",
                "text": "이 그림을 설명해줘",
            },
            {
                "type": "image_url",
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/a3/ThinkCentre_S50.jpg",
            }
        ]
    )

    result2 = llm.invoke([message])
    ```
