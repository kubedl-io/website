---
title: "Quick Start"
description: "Quick Start"
lead: ""
date: 2020-11-12T15:22:20+01:00
lastmod: 2020-11-12T15:22:20+01:00
draft: false
images: []
menu:
  model:
    parent: "getstart"
weight: 50
toc: true
---

## Create a ModelVersion from training job

KubeDL training already supports generating a ModelVersion CRD when the job completes. Thus, a model image is
automatically generated after job succeeds.

To enable this feature, the TensorFlow job spec needs to set the modelVersion field like the example below:

This example uses hostpath volume. The job will first generate the model artifacts under `/kubedl-model` inside the training
container. Correspondingly, the model will be preset on the local host path `/models/mymodel`.
Then a ModelVersion CRD is created and that triggeres a Kaniko container to incorporate the model artifacts and push to modelhub/mnist.
The model artificats will be present at '/kubedl-model' inside the built image.

Note that the container command needs to specify `/kubedl_model` as the model export path. Allowing user-specified path will be supported later

```YAML
apiVersion: "training.kubedl.io/v1alpha1"
kind: "TFJob"
metadata:
  name: "distributed-bbb"
spec:
  cleanPodPolicy: None
  modelVersion:
    modelName: mymodel
    # The image repo to push the model
    imageRepo: jianhe6/mymodel
    storage:
      localStorage:
        # The host dir for THIS model, each model should have its own unique parent folder, in this case, 'mymodel'
        path: /models/mymodel
        nodeName: kind-control-plane
  tfReplicaSpecs:
    Worker:
      replicas: 3
      restartPolicy: Never
      template:
        spec:
          containers:
            - name: tensorflow
              image: kubedl/tf-mnist-estimator-api:v0.1
              imagePullPolicy: Always
              command:
                - "python"
                - "/keras_model_to_estimator.py"
                - "/tmp/tfkeras_example/" # checkpoint dir
                - "/kubedl_model"         # export saved_model dir
```

A Model CRD is also automatically generated with ModelVersion's ownerReference point the Model.

## Create a ModelVersion Manually

This `ModelVersion` CRD will generate an image at `modelhub/model1` in dockerhub, including the model artifacts located at `node1`'s local path at `/foo`

```YAML
apiVersion: model.kubedl.io/v1alpha1
kind: ModelVersion
metadata:
  name: mv-4
  namespace: default
spec:
  modelName: model1
  createdBy: user1
  imageRepo: modelhub/model1
  storage:
    localStorage:
      path: /foo
      nodeName: node1
```

```bash
kubectl get mv (short for modelversion)
NAME                       MODEL    IMAGE                   CREATED-BY   FINISH-TIME
mv-4                       model1   modelhub/model1:v1c072   user1        2021-04-19T21:45:29Z
```

```bash
kubectl describe mv mv-4

...
Spec:
  Created By:  user1
  Image Repo:  modelhub/model1
  Model Name:  model1
  Storage:
    Local Storage:
      Node Name:  node1
      Path:       /foo
Status:
  Finish Time:        2021-04-19T21:45:29Z
  Image:              modelhub/model1:v1c072
  Image Build Phase:  ImageBuildSucceeded
  Message:            Image build succeeded.
```
