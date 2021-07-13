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
    parent: "examples"
weight: 50
toc: true
---

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

## Create a ModelVersion from training job

KubeDL training jobs already support generating a ModelVersion CRD when the job completes. Thus, a model image is
automatically generated if enabled.

To enable this feature, in case of TensorFlow, the job spec needs to set the modelVersion field like below YAML example.

- The job will first generate the model CRD defining a local path `/foo` at a particular node.
- Then Kaniko will generate an image that incorporates the model artifacts at that location and push to `modelhub/mnist` in dockerhub.
- Note that the container's running command for the model output path`--model-dir` also needs to be the same as the
path defined in `modelVersion`.

```YAML
apiVersion: training.kubedl.io/v1alpha1
kind: "TFJob"
metadata:
  name: "mnist-job1"
  namespace: default
spec:
  cleanPodPolicy: None
  modelVersion:  # Define the model info
    modelName: mnist
    imageRepo: modelhub/mnist
    storage:
      localStorage:
        path: /foo
  tfReplicaSpecs:
    Worker:
      replicas: 1
      restartPolicy: Never
      template:
        spec:
          containers:
            - name: tensorflow
              image: kubedl/tf-mnist-with-summaries:1.0
              command:
                - "python"
                - "/var/tf_mnist/mnist_with_summaries.py"
                - "--log_dir=/train/logs"
                - "--learning_rate=0.01"
                - "--batch_size=150"
                - "--model_dir=/foo"      # The value needs to be the same as modelVersion.storage.path
              volumeMounts:
                - mountPath: "/train"
                  name: "training"
              resources:
                limits:
                  cpu: 2048m
                  memory: 2Gi
                requests:
                  cpu: 1024m
                  memory: 1Gi
          volumes:
            - name: "training"
              hostPath:
                path: /tmp/data
                type: DirectoryOrCreate
```

A Model CRD is also automatically generated with ModelVersion's ownerReference point the Model.
