---
title: "[개발 일기] 머신러닝 멘토링 세션 - PyTorch로 감정 분류기 개발하기"
date: 2024-02-01T19:12
thumb: "neural-network.jpg"
tags: 
    - ❮개발 일기❯
    - 인공지능
    - 머신러닝
    - Python
    - PyTorch
    - 백엔드
    - 자연어 처리
---

자연어 처리 머신러닝을 기반으로 감정 분류기를 개발하는 과정에서 현직자 멘토께서 조언해주신 내용을 정리해봤습니다.

---

# 브레인스토밍

### Q. 사용자가 일기를 작성하면 그 일기의 감정을 파악해 '기쁨', '슬픔', '즐거움' 등으로 자동 분류를 하고자 합니다. 머신러닝을 어떻게 활용할 수 있을까요?

A. 두 가지 방법이 있을 수 있겠네요.

1. 모델로 학습해서 사용하는 방법이 있습니다.
    - Word embedding
        - 예를 들면 '일출'이라는 단어가 있을 때 단어의 벡터를 추출해 그것과 연관된 '해돋이'라는 단어를 유사도 기반으로 연결하는 vectorization 모델이 있습니다.
            - e.g. Word2Vec, fastText
        - '후처리 사전'을 만든다고 생각하시면 됩니다.
    - 모델 종류
        - Interpretable / Explainable 모델 
            - 분류 모델 + Local Interpretable Model-Agnostic Explanation (LIME)
            - 구현 난이도가 높으므로 여기서는 고려하지 않도록 하겠습니다.
        - NER 모델
            - Named-entity recognition은 일종의 형태소 분석기라고 생각하시면 됩니다.
            - e.g. ['오늘', '비', '가', '왔다'] → [0, '슬픔', 0, 0] 
    - 장점
        - 구현이 간단합니다.
        - 모델 학습 속도도 빠르고 사전 학습된 모델들도 많습니다.
    - 단점
        - 문맥적인 정확도가 낮을 수 있습니다.
            - '일출'을 예로 들면 '해돋이'가 아닌 '일몰' 역시 유사도가 높게 나올 수 있습니다.
2. 사람이 직접 '단어-감정' pair를 태깅/매핑을 하는 방법이 있습니다.
    - 과정
        1. 먼저 문장에 tokenize 과정을 수행합니다.
        2. 각 토큰에 감정을 태깅합니다.
            - 단어에 감정을 태깅하는 작업에는 Amazon Groundtruth 등의 툴을 활용할 수 있습니다.
    - 장점
        - 정공법으로써 성능도 높고 정확도도 뛰어납니다.
    - 단점
        - 공개된 데이터 소스를 구하고, 태깅으로 데이터를 구축하는 데 상당한 시간과 노력이 소요됩니다.
        - '차원의 저주' 현상      
            - 데이터 학습을 위해 '공간의 차원이 증가'하지만 학습 데이터가 부족하면 '데이터의 밀도'가 급격히 감소하고, 이로 인해 데이터 분석이나 머신러닝 모델의 성능에 부정적인 영향을 미치는 '차원의 저주' 현상이 발생할 수 있습니다.
            - 분류할 감정이 몇 종류인지 역시 중요합니다.  
                - 만약 분류될 클래스가 100개라면 적어도 10000개의 학습 데이터가 필요하고, 그만큼 수동으로 태깅을 해주어야 하므로 상당한 시간과 노력이 필요합니다.

### Q. KoBERT를 활용할 수는 없을까요?

A. KoBERT는 '한국어에 대한 이해'만을 가지고 있으므로, 이를 '감정 분류'에 사용하려면 학습을 한번 더 시켜줘야 합니다.
- KoBERT는 한국어 기반의 Bidirectional Encoder Representations from Transformers (BERT) 모델입니다.
    - 다음과 같은 사전 학습을 이미 거친 pre-trained 모델입니다.
        - e.g. ['오늘', '날씨', '가', '참', '덥', '네요'] 
            1. 토큰의 일부를 마스킹 처리합니다. 
                - ['오늘', '날씨', "masked", '참', "masked", '네요']
            2. 마스킹된 토큰을 예측합니다.
                - {'날씨': '가', '참': '덥'}
    - 분류, 번역, QA, summarization 등으로 fine-tuning을 진행합니다.
- 여기서는 모델로 학습을 하되, 정확도를 human review로 보정하는 방식을 고려해볼 수 있습니다.

### Q. 머신러닝 서비스를 웹 서비스와 어떻게 연동할까요?

A. 단기간에 빠르게 개발하기에는 Flask가 좋습니다.
- TensorFlow나 Keras는 자바스크립트로도 사용할 수 있는 방법이 있는 것으로 알고 있습니다.
- 하지만 현업에서 대세로 사용되는 머신러닝 프레임워크는 PyTorch이므로 파이썬 기반의 서버를 구축하는 것이 좋습니다.


### Q. 감정 분류용 머신러닝 백엔드 처리 구조를 어떻게 설정하는 것이 좋을까요?

1. 사용자가 일기를 작성함 
    - → 웹 서비스 백엔드가 일기 데이터를 받아 DB에 저장 
        - → 머신러닝 서비스 백엔드가 DB로부터 일기 데이터를 가져와서 감정 분류를 별도로 수행
            - → 머신러닝 서비스 백엔드가 감정 분류 결과를 DB에 저장
2. 사용자가 일기를 작성함 
    - → 머신러닝 서비스 백엔드가 이를 받아 감정 분류를 먼저 수행
        - → 머신러닝 서비스 백엔드가 일기 데이터와 감정 분류 결과를 DB에 함께 저장

A. 이건 백엔드 설계 이슈에 가깝고, 두 구조 모두 머신러닝 자체의 구현이나 성능과는 무관합니다.
- 각각 장단점이 있겠네요.
    - 1번의 경우 머신러닝 서비스 백엔드가 일종의 logger 역할도 하게 되므로 만약 감정 분류 결과가 부정확하거나 이슈가 발생한 경우 이를 다시 피드백으로 활용할 수 있을 것 같습니다.
    - 2번의 경우 성능 측면에서 유리할 것 같습니다.

---

# 구현 

### HuggingFace KoBERT 기반으로 작성한 예시 코드

1. 라이브러리 준비
    ```
    # Transformers를 준비합니다.
    !pip install transformers
    !pip install sentencepiece

    # KoBERT를 준비합니다.
    # kobert_tokenizer 폴더를 다운로드 받습니다.
    !pip install 'git+https://github.com/SKTBrain/KoBERT.git#egg=kobert_tokenizer&subdirectory=kobert_hf'
    !pip install -U accelerate
    ```

2. 데이터 준비
    ```
    import os
    import pandas as pd
    import numpy as np

    import torch
    import torch.nn as nn
    import torch.optim as optim

    from torch.utils.data import Dataset, DataLoader, random_split

    # Google Colab과 연동해 Drive를 저장소로 사용합니다.
    from google.colab import drive
    drive.mount('/content/drive')

    # 저장소에 있는 작업 디렉토리의 경로를 지정해줍니다. 아래의 경로는 예시입니다.
    workdir = './drive/Colab Notebooks/test'

    data = pd.read_csv(os.path.join(workdir, 'dataset.csv), encoding='cp949')
    ```

3. PyTorch 데이터셋 정의
    ```
    # 텍스트를 입력하면 감정(label)을 출력합니다.

    class SentenceDataset(Dataset):
        def __init__(self, sentences, labels=None):
            self.Sentences = sentences
            self.Labels = labels
        
        # 데이터의 개수를 지정해줍니다.
        def __len__(self):
            return len(self.sentences)
        
        # 지정된 개수만큼 데이터를 불러옵니다.
        def __getitem__(self.index):
            sentence = self.sentences[index]
            label = None
            if self.labels is not None:
                label = self.labels[index]
            return sentence, label
    ```

4. raw 데이터셋을 PyTorch 데이터셋으로 변환
    ```
    # label을 지정해줍니다.

    # data.Emotion.unique()의 출력값은 다음과 같습니다.
    #     array(['분노', '행복', '불안', '당황', '슬픔', '중립', '혐오'], dtype=object)
    labels = data.Emotion.unique()

    # 데이터를 딕셔너리로 변환합니다. 각 감정(Emotion)에 0부터 6까지 인덱스(label)를 부여합니다.
    label2id = {label:id for id, label in enumerate(labels)}
    id2label = {id:label for label, id in label2id.items()}

    data['label'] = data.Emotion.map(label2id)

    # 전체 데이터의 일부(10%)만 학습에 사용해 빠르게 진행해보겠습니다.
    data = data.sample(frac=.1)

    # 이를 PyTorch용 학습 데이터셋으로 만들어줍니다.
    dataset = SentenceDataset(data.Sentence.values, data.label.values)

    # 학습 데이터셋과 별개로 validation 데이터셋을 준비합니다. 학습 데이터셋에다가 random_split을 적용해 9:1의 비율로 validation 데이터셋을 준비합니다.
    num_data = len(dataset)
    num_train = int(num_data*.9)
    num_valid = num_data - num_train

    train_dataset, valid_dataset = random_split(dataset, lengths=(num_train, num_valid))
    ```

5. 모델과 tokenizer 불러오기
    ```
    # 데이터를 KoBERT 모델에 투입해 분류, 태깅, 문장 생성 등을 수행하게 할 수 있습니다. 
    from kobert_tokenizer import KoBERTTokenizer

    # 여기서는 '분류'를 적용하겠습니다.
    from transformers import BertForSequenceClassification

    model = BertForSequenceClassification.from_pretrained('skt/kobert-base-v1', num_labels=len(labels), id2label=id2label, label2id=label2id)
    tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')

    # tokenizer 모델에 truncation=True 옵션을 넣어줘도 데이터는 원래의 길이 그대로 들어갑니다.
    # 따라서 SequenceClassification 분류 모델이 최대로 입력받을 수 있는 길이에 맞게 (여기서는 512) tokenizer 모델의 데이터 길이를 먼저 제한해줄 필요가 있습니다.
    # 토큰화 단계에서의 불필요한 메모리 과부하를 방지하기 위함입니다.
    tokenizer.model_max_length = model.config.max_position_embeddings
    ```

6. Collator 정의
    ```
    # PyTorch에서는 데이터의 크기와 인덱스를 입력해주면 데이터를 반환해주는 dataset이 있고,
    # 이러한 dataset을 어떻게 shuffle 할지, sampling 할지, batch size는 무엇인지 등을 지정하고 수행하는 DataLoader가 있습니다.

    # 만약 0부터 99까지의 숫자에 각각 문장 하나씩 짝을 지어 100개로 구성된 dataset이 있다고 해봅시다.
    # batch_size=16, shuffle=True 옵션으로 DataLoader가 dataset을 불러오게 되면, 랜덤하게 섞이고 16개의 묶음으로 묶인 데이터가 준비됩니다.

    # 이 데이터 묶음들을 모델에 실제로 적용해주기 위해 PyTorch Tensor 형식으로 변환을 하려고 합니다.
    # 하지만 다차원 행렬인 Tensor에 기존 데이터를 넣어주기 위해서는 한 묶음 안에 들어있는 항목들의 길이가 모두 같아야 합니다.
    # 지금까지 준비된 데이터는 토큰화도 되어있지 않고 문장 길이도 각각 다르기때문에, 가장 긴 문장의 길이를 기준으로, 그보다 짧은 길이의 문장에는 padding을 채워서 길이를 최대 길이로 같게 만들어줍니다.
    # 바로 이 작업에 Collator를 활용합니다. tokenizer에 내장된 [PAD]라는 special token을 사용합니다. 

    class Collator:
        def __init(self, tokenizer, pad='longest', truncation=True):
            self.tokenizer = tokenizer
            self.pad = pad
            self.truncation = truncation
        
        def __call__(self, batch):
            sentences = [b[0] for b in batch]
            labels = [b[1] for b in batch]
            tokenized = self.tokenizer(sentences, padding=self.pad truncation=self.truncation, return_tensors='pt')
            if labels[0] is not None:
                tokenized['labels'] = torch.tensor(labels)
            return tokenized
    ```

7. 학습 파라미터 설정
    ```
    from transformers import TrainingArguments, Trainer

    args = TrainingArguments(
        output_dir = os.path.join(workdir, 'outputs'),

        # 저장할 checkpoint 개수를 지정합니다.
        save_total_limit=1,

        # validation loss가 가장 낮은 checkpoint만 저장합니다.
        # overfitting이 일어나더라도 training loss가 아닌 validation loss를 기준으로 최적의 체크포인트만 저장하니 괜찮습니다.
        load_best_model_at_end=True,

        per_device_train_batch_size=32,
        per_device_eval_batch_size=64,
        num_train_epochs=1,
        evaluation_strategy='steps',
        save_strategy='steps',

        # 평가, 저장, 기록할 batch의 개수를 동일하게 지정해줍니다.
        eval_steps=50,
        save_steps=50,
        logging_steps=50,
    )

    trainer = Trainer(
        model,
        args=args,
        train_dataset = train_dataset,
        eval_dataset = valid_dataset,
        data_collator = Collator(tokenizer)
    )

    trainer.train()
    ```

8. 학습된 모델 불러오기
    ```
    from transformers import pipeline

    # 저장된 가장 최적의 체크포인트 경로를 지정해줍니다. 예: checkpoint-400 디렉토리
    model = BartForSequenceClassification.from_pretrained(os.path.join(workdir, 'outputs', 'checkpoint-400'))

    # Transformers의 pipeline 메소드를 사용하면 빠르게 추론이 가능합니다.
    classifier = pipeline('text-classification', model=model, tokenizer=tokenizer)

    # 실제로 감정 분류기를 사용해봅시다. 아래의 예시 문장을 투입해봅시다.
    classifier('오늘은 정말 힘든 하루였어')

    # 출력값 예시: [{'label': '슬픔', 'score': 0.69395810298}]
    ```

---

# 기타 조언

- VM에서 배포를 하더라도 Flask 서버 코드는 가급적 파이썬 가상환경을 사용해서 독립적으로 유지보수하세요.
- GPU로 학습시킨 모델이라고 하더라도 CPU를 사용해서 '서비스'가 가능합니다.
- 한국어 문장 분리에는 kss, Kiwi, KoalaNLP 등을 활용할 수 있습니다.

---

# 참고자료

- [KoBERT multi-class 7개 감정 분류](https://github.com/Seolini/KoBERT_Korean_multi_classification/blob/main/KoBERT_%ED%95%9C%EA%B5%AD%EC%96%B4_7%EA%B0%9C%EA%B0%90%EC%A0%95_%EB%8B%A4%EC%A4%91%EB%B6%84%EB%A5%98.ipynb)
- [KoBERT를 활용한 감정분류 모델 구현](https://github.com/BBARRY-Lee/Practice-NLP/blob/main/KoBERT%EB%A5%BC_%ED%99%9C%EC%9A%A9%ED%95%9C_%EA%B0%90%EC%A0%95%EB%B6%84%EB%A5%98_%EB%AA%A8%EB%8D%B8_%EA%B5%AC%ED%98%84.ipynb)
- [감정 분류용 대화 데이터셋](https://github.com/JH-lee95/Korean-Sentiments-Classification/blob/master/dataset_preprocessing.ipynb)