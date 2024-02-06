---
title: "[필기] 머신러닝 특강 - PyTorch 기반의 머신러닝 파이프라인 체험하기"
date: 2024-02-05T21:09
thumb: "neural-network.jpg"
tags: 
    - ❮필기❯
    - 인공지능
    - 머신러닝
    - Python
    - PyTorch
    - Transformers
---

# 머신러닝 데이터 저장소 활용하기
- HuggingFace는 각종 머신러닝 코드, 데이터셋, 모델 등을 저장하고 공유할 수 있는 머신러닝 특화 저장소 서비스 중 하나입니다.
    - GitHub의 Large File Storage 기반으로 만들어진 repo 서비스입니다.
    - 기능
        - Models: 학습된 머신러닝 모델의 checkpoint들이 있습니다.
        - Datasets: 학습에 사용할 수 있는 데이터셋들입니다.
        - Spaces: 머신러닝 모델을 간단한 서비스로써 실제로 구현 및 시연해놓은 것들입니다.
        - Docs: 각종 도큐멘테이션, 튜토리얼, 설명서 등이 있습니다.

# Transformers pipeline 메소드를 사용해 pre-trained 모델을 빠르고 쉽게 사용하기

## 음성 인식기

```
# Google Colab에서 코딩을 할 경우 대부분의 머신러닝 관련 라이브러리들과 의존성들이 설치되어 있습니다. 
# 다음 명령어로 확인해볼 수 있습니다.
!pip freeze

# Jupyter Notebook 환경에서 터미널 shell 명령어를 사용하기 위해서는 앞에 ! 기호를 붙여 subshell을 활성화해주어야 합니다.

# 설치되어 있지 않다면 모두 설치를 직접 해주어야 합니다.
# !pip install transformers
# !pip install torch

!pip install datasets
!pip install accelerate -U

# HuggingFace와 연동하기 위해서 필요합니다.
from huggingface_hub import notebook_login
notebook_login()



# Transformers pipeline을 사용해보도록 하겠습니다.
# 기본적인 pre-trained 모델을 아키텍쳐나 토크나이저를 따로 불러올 필요가 없이 간편하게 사용할 수 있습니다.
from transformers import pipeline

# HuggingFace에서 음성 인식 모델을 불러오도록 하겠습니다.
speech_recognizer = pipeline("automatic-speech-recognition", model="facebook/wav2vec2-base-960h")

# HuggingFace에서 영문 오디오 데이터셋을 불러와서 테스트하도록 하겠습니다.
from datasets import load_dataset, Audio
audio_dataset = load_dataset("PolyAI/minds14", name="en-us", split="train")

# sampling rate를 모델에 내장된 값과 일치시켜줍니다. 8000에서 16000으로 바꾸게 됩니다.
audio_dataset_recognized = audio_dataset.cast_column('audio', Audio(sampling_rate=speech_recognizer.feature_extractor.sampling_rate))

# 오디오 데이터셋의 일부를 음성 인식기에 입력시키고, speech-to-text 인식 결과를 다음과 같이 확인할 수 있습니다.
result = speech_recognizer(audio_dataset_recognized[:4]['audio'])

from pprint import pprint
pprint([data['text'] for data in result])

# 실제 원문을 출력하고 인식 결과와 비교해서 모델의 정확도를 판단해볼 수 있습니다.
transcript = audio_dataset_recognized["english_transcription"][:4]
print(transcript)
```

## 감정 분류기
```
# HuggingFace에서 text classification 모델 중 koelectra-base-finetuned-nsmc를 사용해보겠습니다.
classifier = pipeline(task="sentiment-analysis", model="beomi/koelectra-base-finetuned-nsmc")

# 입력값을 받아 해당 문장의 감정이 긍정적인지 부정적인지를 모델이 판단해 출력합니다.
def snt_cls(text):
    result = classifier(text)[0]['label']
    if result == "positive":
        print("긍정적인 감정입니다.")
    else:
        print("부정적인 감정입니다.")
```

# 네이버 영화 리뷰 데이터셋(NSMC) 기반으로 감정 분류 머신러닝 모델 구현하기

## 1. 데이터셋 준비 및 전처리 구현
```
import os
import pandas as pd
import torch

import urllib.request
 
# 학습에 사용할 텍스트 데이터를 URL으로부터 가져옵니다.
urllib.request.urlretrieve("https://raw.githubusercontent.com/e9t/nsmc/master/ratings_train.txt")
urllib.request.urlretrieve("https://raw.githubusercontent.com/e9t/nsmc/master/ratings_test.txt")

class nsmc_dataset(torch.utils.data.Dataset):
    def __init__(self, nsmc_df, labels):
        # 여기서는 pandas DataFrame 형식의 데이터를 사용하려고 합니다.
        self.dataset = nsmc_df
        self.labels = labels

    def __getitem__(self, idx):
        # 인덱스에 맞게 컬럼별로 key-value pair를 추출합니다.
        # 원본 데이터의 보존을 위해서 clone()과 detach()를 해줍니다.
        item = { key: val[idx].clone().detach() for key, val in self.dataset.items() 
        }
        
        # 각 인덱스에 맞게 데이터를 클래스 레이블로써 분류해 사용하고자 합니다.
        # PyTorch Tensor 자료형으로 변환해줍니다.
        item['labels'] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)

# 텍스트 파일을 DataFrame 형식으로 읽어오는 함수를 만들어줍니다.
def load_data(dataset_dir):
    dataset = pd.read_table(dataset_dir)[:500]          # 시범으로 500개만 사용해보도록 하겠습니다.
    return dataset



# 입력된 텍스트를 토큰화하는 함수를 구성해줍니다.
# tokenizer를 불러오기 위해 AutoTokenizer를 사용하도록 하겠습니다.
from transformers import AutoTokenizer

# pre-trained된 tokenizer로 bert-base를 사용해보도록 하겠습니다.
tokenizer = AutoTokenizer.from_pretrained("klue/bert-base")

def tokenize(dataset, tokenizer, max_length):
    input_data = list(dataset['document'])
    tokenized_input = tokenizer(
        input_data,
        return_tensors = "pt",          # PyTorch에서 사용하는 Tensor 자료형으로 지정해줍니다.
        padding = True,
        truncation = True,
        max_length = max_length,
        add_special_tokens = True,
        return_token_type_ids = False   # BERT 이후의 모델 (RoBERTa, ALBERT 등) 에서는 해당 옵션을 False로 명시해주어야 합니다.
    )

    return tokenized_input



# train과 test 데이터셋을 각각의 데이터셋 클래스로 만들어줍니다.
# scikit-learn의 train_test_split()을 사용해서 train 데이터의 일부를 validation 데이터로 split 해주겠습니다.
from sklearn.model_selection import train_test_split

def prepare_dataset(dataset_dir, tokenizer, max_length):
    train_dataset = load_data(dataset_dir, "train.txt")
    test_dataset = load_data(dataset_dir, "test.txt")

    # 여기서는 train 데이터와 test 데이터의 비율을 75%, 25%로 나누어보겠습니다.
    train_dataset, val_dataset = train_test_split(train_dataset, test_size=0.25, random_state=42, stratify=train_dataset['label'])

    # 인덱스를 기준으로 매칭을 하기 위해서 레이블도 나누어줍니다.
    train_label = train_dataset['label'].values
    test_label = test_dataset['label'].values
    val_lebel = val_dataset['label'].values

    # 준비된 데이터셋들을 토큰화합니다.
    train_dataset_tokenized = tokenize(train_dataset, tokenizer, max_length)
    test_dataset_tokenized = tokenize(val_dataset, tokenizer, max_length)
    val_dataset_tokenized = tokenize(test_dataset, tokenizer, max_length)

    # 학습에 필요한 데이터를 최종 가공합니다.
    train_dataset_final = nsmc_dataset(train_dataset_tokenized, train_label)
    test_dataset_final = nsmc_dataset(test_dataset_tokenized, test_label)
    val_dataset_final = nsmc_dataset(val_dataset_tokenized, val_label)

    return train_dataset_final, test_dataset_final, val_dataset_final, test_dataset
```

## 2. 학습 모델 설정

```
import random
import numpy as np
from sklearn.metrics import accuracy_score, f1_score

from transformers import (AutoTokenizer, AutoConfig, AutoModelForSequenceClassification)

# 학습기를 불러옵니다.
from transformers import Trainer, TrainingArguments

# overfitting을 방지하기 위해 사용할 예정입니다.
from transformers import EarlyStoppingCallback

# 학습률 스케줄러를 불러옵니다.
from transformers.optimization import get_consine_with_hard_restarts_schedule_with_warmup



# validation 과정에서 metrics를 계산하기 위한 function입니다.
def compute_metrics(pred):
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)

    # scikit-learn을 사용해 정확도를 계산합니다.
    acc = accuracy_score(labels, preds)

    f1 = f1_score(labels, preds, average="micro")

    return {
        "Accuracy": acc,
        "F1 Score": f1,
    }



# 학습에 사용할 pre-trained tokenizer를 불러옵니다.
def load_tokenizer_and_model_for_train():

    MODEL_NAME = args.model_name
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

    model_config = AutoConfig.from_pretrained(MODEL_NAME)

    # 분류할 클래스 레이블이 '긍정'과 '부정'이므로 2로 지정해줍니다.
    model_config.num_labels = 2
    print(model_config)

    model = AutoModelForSequenceClassification.from_pretrained(
        MODEL_NAME, 
        config = model_config
    )

    print("TOKENIZER AND MODEL LOADED")
    return tokenizer, model



# 학습에 관한 세부사항을 설정하는 함수입니다.
def load_trainer_for_train(model, train_dataset_final, val_dataset_final):
    training_args = TrainingArguments(
        output_dir = args.save_path + "results",        # 출력 디렉토리입니다.
        save_total_limit = args.save_limit,             # 저장될 모델의 총 개수입니다.
        save_steps = args.save_step,                    # 몇 step 단위로 저장할지 정해줍니다.

        num_train_epoch = args.ephochs,                 # 학습 epoch을 설정합니다.
        learning_rate = args.lr,                        # 학습률을 설정합니다.
        per_device_train_batch_size = args.batch_size   # device당 batch size를 지정합니다.
        per_device_eval_batch_size = 2,                 # 모델 평가 단계에서 사용할 batch size입니다.
        warmup_steps = args.warmup_steps,               # 학습률 스케줄러의 warmup step을 지정해줍니다.
        weight_decay = args.weight_decay,               # 가중치 감쇠율을 지정해줍니다.

        logging_dir = args.save_path + "logs"           # 로그가 저장될 디렉토리입니다.
        logging_steps = args.logging_step,              # 몇 step 단위로 로깅할지 정해줍니다.
        
        # 학습 과정에서 사용할 평가 전략을 지정해줍니다.
        #   no: 학습 과정에서 평가하지 않음
        #   steps: eval_steps마다 평가
        #   epochs: epoch 단위마다 평가
        evaluation_strategy = "steps",                  

        eval_steps = args.eval_step,
        load_best_model_at_end = True,
    )

    print("TRAINING ARGUMENTS HAVE BEEN SET.")

    # 조기종료 callback을 설정해줍니다.
    MyCallback = EarlyStoppingCallback(
        early_stopping_patience = 3,
        early_stopping_threshold = 0.001
    )

    # 옵티마이저를 설정해줍니다.
    optimizer = torch.optim.AdamW(
        model.parameters(),
        lr = args.lr,
        betas = (0.9, 0.999),
        eps = 1e-08,
        weight_decay = args.weight_decay,
        amsgrad = False
    )

    # 학습기를 설정해줍니다.
    trainer = Trainer(
        model = model,                                      # 학습에 사용할 transformers 모델 인스턴스
        args = training_args,
        train_dataset = train_dataset_final,
        eval_dataset = val_dataset_final,
        compute_metrics = compute_metrics,                  # 기본적으로는 loss만을 출력하므로 별도로 구현한 함수를 불러와 정확도와 F1 score를 계산합니다.
        callbacks=[MyCallback],
        optimizers = (
            optimizer,
            get_cosine_with_hard_restarts_schedule_with_warmup(
                optimizer,
                num_warmup_steps = args.warmup_steps,
                num_training_steps = len(train_dataset_final) * args.epochs,
            ),
        ),

    )

    print("TRAINER HAS BEEN SET.")

    return trainer
```

## 3. 학습 수행

```
# 학습 수행에 앞서 유지보수의 편의성을 위해 전달인자들을 하나의 클래스로 정의해줍니다.
class args():
    dataset_dir = "./"
    model_type = "roberta"                  # 사용할 모델을 종류를 지정합니다.
    model_name = "klue/roberta-large"       # 사용할 모델의 이름을 지정합니다.
    save_path = "./"
    save_step = 200
    logging_step = 200
    eval_step = 100
    save_limit = 5
    seed = 42
    epochs = 10
    batch_size = 8
    max_length = 256
    lr = 3e-5
    weight_decay = 0.01
    warmup_steps = 300
    scheduler = "linear"
    model_dir = "./best_model"              # 추론할 때 저장된 모델을 불러옵니다.



# 학습기에 데이터를 투입해 실제로 학습을 수행하는 함수입니다.
def train():

    # seed를 고정합니다.
    pl.seed_everything(seed=42, workers=False)

    # 학습에 사용할 GPU/CPU device를 설정합니다.
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    print("Device:", device)

    # 모델과 tokenizer를 지정하고 device에 투입합니다.
    tokenizer, model = load_tokenizer_and_model_for_train()
    model.to(device)

    # 데이터셋을 실제로 준비합니다.
    train_dataset_final, test_dataset_final, val_dataset_final, test_dataset = prepare_dataset(args.dataset_dir, tokenizer, args.max_length)

    # 학습기에 데이터와 모델을 투입합니다.
    trainer = load_trainer_for_train(model, train_dataset_final, val_dataset_final)

    print("TRAINING IN PROGRESS...")
    
    # 학습기를 작동시킵니다.
    trainer.train()

    print("TRAINING HAS BEEN COMPLETED")

    model.save_pretrained("./best_model")



# 학습을 시작합니다.
train()
```

## 4. 만들어진 머신러닝 모델에 데이터를 투입해 추론하기
```
# 만들어진 모델을 불러옵니다.
model = AutoModelForSequenceClassification.from_pretrained('./best_model')

# 학습기를 학습이 아닌 추론에 사용하기 위해 옵션을 지정해줍니다. 
# 학습 과정은 끝났으므로 do_train은 False, 추론에 사용할 것이므로 do_predict는 True로 설정합니다.
test_args = TrainingArguments(
    output_dir = OUTPUT_DIR,
    do_train = False,
    do_predict = True,
    per_device_eval_batch_size = BATCH_SIZE,   
    dataloader_drop_last = False    
)

# 학습기를 초기화합니다.
trainer = Trainer(
    model = model, 
    args = test_args, 
    compute_metrics = compute_metrics
)

# 추론을 시작합니다. inference_test_dataset이라는 이름으로 추론용 데이터를 투입한다고 가정합니다.
inference_result = trainer.predict(inference_test_dataset)
```

---

# 기타 정보 및 조언

- 대규모의 LLM들을 학습시킬 때 parameter-efficient fine-tuning methods for large models(PEFT)을 사용합니다.
- 하드웨어 가속을 사용해 Transformers로 학습 및 추론할 때 Optimum을 사용합니다. 