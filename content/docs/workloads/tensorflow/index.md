---
title: "TensorFlow"
description: "Run Tensorflow on Kubernetes."
lead: "Run Tensorflow on Kubernetes."
date: 2021-04-01T16:35:14-07:00
lastmod: 2021-04-01T16:35:14-07:00
draft: false
images: []
menu:
  docs:
    parent: "workloads"
weight: 200
toc: true
---

## Example
```yaml
apiVersion: training.kubedl.io/v1alpha1
kind: "TFJob"
metadata:
  name: "mnist"
  namespace: kubedl
spec:
  cleanPodPolicy: None
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
