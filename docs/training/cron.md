---
sidebar_position: 6
---

# Cron Scheduling

Cron controller for periodically scheduling training jobs.

## Example

```yaml
apiVersion: apps.kubedl.io/v1alpha1
kind: Cron
metadata:
  name: hello-cron-tf
spec:
  schedule: "0 * * * *" # trigger tf training per hour.
  concurrencyPolicy: Allow
  historyLimit: 10
  template:
    apiVersion: training.kubedl.io/v1alpha1
    kind: TFJob
    workload:
      metadata:
        generateName: cron-tensorflow
      spec:
          cleanPodPolicy: Running
          successPolicy: AllWorkers
          tfReplicaSpecs:
            PS:
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
                      resources:
                        limits:
                          cpu: 2048m
                          memory: 2Gi
                        requests:
                          cpu: 1024m
                          memory: 1Gi          
            Worker:
              replicas: 3
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
                      resources:
                        limits:
                          cpu: 2048m
                          memory: 2Gi
                        requests:
                          cpu: 1024m
                          memory: 1Gi
```

## CRD Spec

Check the CRD definition. [Go ->](https://github.com/kubedl-io/kubedl/blob/master/apis/apps/v1alpha1/cron_types.go)