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
- xgboostjob

These kinds can be used in the kubectl command.

### Submit

```bash
kubectl apply -f https://raw.githubusercontent.com/alibaba/kubedl/master/example/tf/tf_job_mnist.yaml
```
### List
```bash
kubectl get tfjobs -n kubedl
```

### Get

```bash
kubectl describe tfjob mnist -n kubedl
```

### Delete

```bash
kubectl delete tfjob mnist -n kubedl
```
