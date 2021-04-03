---
title: "Install Using Helm"
description: "Install KubeDL using Helm"
lead: "Install KubeDL using Helm"
date: 2021-03-29T16:47:24-07:00
lastmod: 2021-03-29T16:47:24-07:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 200
toc: true
---

## Install Helm
Helm is a package manager for Kubernetes. You can install helm with command below on MacOS

{{< btn-copy text="brew install helm">}}
```bash
brew install helm
```
Check the [helm website](https://helm.sh/docs/intro/install/) for more details.

## Install KubeDL
From the root directory, run

{{< btn-copy text="helm install kubedl ./helm/kubedl">}}
```bash
helm install kubedl ./helm/kubedl
```

You can override default values defined in `./helm/kubedl/values.yaml` with `--set` flag, for example:

{{< btn-copy text="helm install kubedl ./helm/kubedl --set kubedlSysNamespace=kube-system --set resources.requests.cpu=1024m --set resources.requests.memory=2Gi">}}
```bash
helm install kubedl ./helm/kubedl --set kubedlSysNamespace=kube-system --set resources.requests.cpu=1024m --set resources.requests.memory=2Gi
```

Helm will render templates and apply them to cluster and you are good to go :)

## Enable specific job Kind

KubeDL supports all kinds of jobs(tensorflow, pytorch etc.) in a single Kubernetes operator. You can selectively enable the kind of jobs to support.
There are three options:
1. Default option. Just install the job CRDs required. KubeDL will automatically enable the corresponding job controller.
2. Set env `WORKLOADS_ENABLE` in KubeDL container. The value is a list of job types to be enabled. For example, `WORKLOADS_ENABLE=TFJob,PytorchJob` means only Tensorflow and Pytorch Job are enabled.
3. Set startup flags `--workloads` in KubeDL container command args. The value is a list of job types to be enabled like `--workloads TFJob,PytorchJob`.
