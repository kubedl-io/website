---
title: "Quick Start"
description: "Run a simple MNist Tensorflow job with KubeDL."
lead: "Run a simple MNist Tensorflow job with KubeDL."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 400
toc: true
---

## Submit the TensorFlow job

```bash
kubectl apply -f https://raw.githubusercontent.com/alibaba/kubedl/v0.3.0/example/tf/tf_job_mnist.yaml
```

### Get job status

```bash
kubectl get tfjobs -n kubedl
kubectl describe tfjob mnist -n kubedl
```

### Delete the job

```bash
kubectl delete tfjob mnist -n kubedl
```

## Other commands

[Commands →]({{< ref "commands" >}})
