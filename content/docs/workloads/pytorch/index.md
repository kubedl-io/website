---
title: "PyTorch"
description: "Run PyTorch job on Kubernetes."
lead: "Run PyTorch job on Kubernetes."
date: 2021-04-01T16:38:30-07:00
lastmod: 2021-04-01T16:38:30-07:00
draft: false
images: []
menu:
  docs:
    parent: "workloads"
weight: 100
toc: true
---


## Example

```yaml
apiVersion: training.kubedl.io/v1alpha1
kind: "PyTorchJob"
metadata:
  name: "pytorch-dist-sendrecv-example"
  namespace: "kubedl"
spec:
  pytorchReplicaSpecs:
    Master:
      replicas: 1
      restartPolicy: ExitCode
      template:
        spec:
          containers:
            - name: pytorch
              image: kubedl/pytorch-dist-example
              imagePullPolicy: Always
    Worker:
      replicas: 2
      restartPolicy: ExitCode
      template:
        spec:
          containers:
            - name: pytorch
              image: kubedl/pytorch-dist-example
              imagePullPolicy: Always
```
