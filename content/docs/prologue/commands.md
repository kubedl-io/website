---
title: "Commands"
description: "Commands for jobs"
lead: "Example commands for create, get, delete jobs."
date: 2020-10-13T15:21:01+02:00
lastmod: 2020-10-13T15:21:01+02:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 500
toc: true
---
### Job kind
- tfjob
- pytorchjob
- marsjob
- mpijob
- xdljob
- elasticdljob
- xgboostjob

These kinds can be used in the kubectl command.

### Submit

{{< btn-copy text="kubectl apply -f https://raw.githubusercontent.com/alibaba/kubedl/v0.2.0/example/tf/tf_job_mnist.yaml" >}}
```bash
kubectl apply -f https://raw.githubusercontent.com/alibaba/kubedl/v0.2.0/example/tf/tf_job_mnist.yaml
```
### List

{{< btn-copy text="kubectl get tfjobs -n kubedl" >}}
```bash
kubectl get tfjobs -n kubedl
```

### Get

{{< btn-copy text="kubectl describe tfjob mnist -n kubedl">}}
```bash
kubectl describe tfjob mnist -n kubedl
```

### Delete

{{< btn-copy text="kubectl delete tfjob mnist -n kubedl">}}
```bash
kubectl delete tfjob mnist -n kubedl
```
