---
sidebar_position: 2
---
# PyTorch

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
## CRD Spec
Check the CRD definition. [Go ->](https://github.com/alibaba/kubedl/blob/master/apis/training/v1alpha1/pytorchjob_types.go)
