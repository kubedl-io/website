---
sidebar_position: 2
---

# Quick Start

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

[Workload kinds →](workloads/tensorflow)
