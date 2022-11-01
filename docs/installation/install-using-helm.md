---
sidebar_position: 1
---

# Install Using Helm

## Install Helm
Helm is a package manager for Kubernetes. You can install helm with command below on MacOS

```bash
brew install helm
```
Check the [helm website](https://helm.sh/docs/intro/install/) for more details.

## Install KubeDL
From the [project root directory](https://github.com/kubedl-io/kubedl), run

```bash
helm install kubedl ./helm/kubedl --create-namespace -n kubedl-system
```

Running the command from master branch uses the [daily docker image.](https://hub.docker.com/r/kubedl/kubedl/tags?page=1&ordering=last_updated)

You can override default values defined in [values.yaml](https://github.com/alibaba/kubedl/blob/master/helm/kubedl/values.yaml) with `--set` flag.
For example, set the custom cpu/memory resource:

```bash
helm install kubedl ./helm/kubedl --create-namespace -n kubedl-system  --set resources.requests.cpu=1024m --set resources.requests.memory=2Gi
```
Helm will install CRDs and KubeDL controller under `kubedl-system` namespace.

## Uninstall KubeDL
```bash
helm uninstall kubedl -n kubedl-system
```

## Delete all kubedl.io CRDs
```bash
kubectl get crd | grep kubedl.io | cut -d ' ' -f 1 | xargs kubectl delete crd
```

## Enable specific job Kind

KubeDL supports all kinds of jobs(tensorflow, pytorch etc.) in a single Kubernetes operator. You can selectively enable the kind of jobs to support.
There are three options:
1. Default option. Just install the job CRDs required. KubeDL will automatically enable the corresponding job controller.
2. Set env `WORKLOADS_ENABLE` in KubeDL container. The value is a list of job types to be enabled. For example, `WORKLOADS_ENABLE=TFJob,PytorchJob` means only Tensorflow and Pytorch Job are enabled.
3. Set startup flags `--workloads` in KubeDL container command args. The value is a list of job types to be enabled like `--workloads TFJob,PytorchJob`.
