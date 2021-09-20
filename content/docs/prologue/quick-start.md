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
kubectl apply -f https://raw.githubusercontent.com/kubedl-io/kubedl/master/example/tf/tf_job_mnist_distributed_simple.yaml
```

### List jobs

```bash
kubectl get tfjobs
```

```bash
NAME                    STATE       AGE   TTL-AFTER-FINISHED   MAX-LIFETIME   MODEL-VERSION
tf-distributed-simple   Running     24s
```

### Get job status

```bash
kubectl describe tfjob tf-distributed-simple
```


### Delete the job

```bash
kubectl delete tfjob tf-distributed-simple
```

## All supported workload kinds

[Workload kinds →]({{< ref "workloadkinds" >}})
