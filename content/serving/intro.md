---
title: "Introduction"
description: "Introduction"
lead: ""
date: 2020-11-12T15:22:20+01:00
lastmod: 2020-11-12T15:22:20+01:00
draft: false
images: []
menu:
  serving:
    parent: "servingintro"
weight: 100
toc: true
---



KubeDL Serving provides a group of user freindly APIs to construct online model inference services. It closely cooperates with `training` and `model` stages, making end-to-end deep learning development automatically.

KubeDL provides CRD `Inference` to accomplish this:

## Inference With Single Model

Inference describes an expeced inference service including adopted framework, predictor templates, autoscaling polices... An example YAML looks like below, this example shows how inference service serves single model:

```yaml
apiVersion: serving.kubedl.io/v1alpha1
kind: Inference
metadata:
  name: hello-inference
spec:
  framework: TFServing
  predictors:
  - name: model-predictor
    modelVersion: model
    replicas: 3
    autoScale:
      minReplicas: 1
      maxReplicas: 10
    batching:
      batchSize: 32
    template:
      spec:
        containers:
        - name: tensorflow
          args:
          - --port=9000
          - --rest_api_port=8500
          - --model_name=mnist
          - --model_base_path=/kubedl-model/
          command:
          - /usr/bin/tensorflow_model_server
          image: tensorflow/serving:1.11.1
          imagePullPolicy: IfNotPresent
          ports:
          - containerPort: 9000
          - containerPort: 8500
          resources:
            limits:
              cpu: 2048m
              memory: 2Gi
            requests:
              cpu: 1024m
              memory: 1Gi
```

## Inference With Multiple Models

Inference is able to serve multiple models simultaneously, which may appers in serving different model versions and takes A/B tests, for example:

```yaml
apiVersion: serving.kubedl.io/v1alpha1
kind: Inference
metadata:
  name: hello-inference
spec:
  framework: TFServing
  predictors:
  - name: model-a-predictor
    modelVersion: model-a
    replicas: 3
    trafficPercentage: 90  # 90% traffic will be roted to this predictor.
    autoScale:
      minReplicas: 1
      maxReplicas: 10
    batching:
      batchSize: 32
    template:
      spec:
        containers:
        - name: tensorflow
          args:
          - --port=9000
          - --rest_api_port=8500
          - --model_name=mnist
          - --model_base_path=/kubedl-model/
          command:
          - /usr/bin/tensorflow_model_server
          image: tensorflow/serving:1.11.0
          imagePullPolicy: IfNotPresent
          ports:
          - containerPort: 9000
          - containerPort: 8500
          resources:
            limits:
              cpu: 2048m
              memory: 2Gi
            requests:
              cpu: 1024m
              memory: 1Gi
  - name: model-b-predictor
    modelVersion: model-b
    replicas: 3
    trafficPercentage: 10  # 10% traffic will be roted to this predictor.
    autoScale:
      minReplicas: 1
      maxReplicas: 10
    batching:
      batchSize: 64
    template:
      spec:
        containers:
        - name: tensorflow
          args:
          - --port=9000
          - --rest_api_port=8500
          - --model_name=mnist
          - --model_base_path=/kubedl-model/
          command:
          - /usr/bin/tensorflow_model_server
          image: tensorflow/serving:1.11.1
          imagePullPolicy: IfNotPresent
          ports:
          - containerPort: 9000
          - containerPort: 8500
          resources:
            limits:
              cpu: 2048m
              memory: 2Gi
            requests:
              cpu: 1024m
              memory: 1Gi
```
