---
title: "Install Using Yaml"
description: ""
lead: "Install KubeDL with YAML files."
date: 2021-03-30T17:46:36-07:00
lastmod: 2021-03-30T17:46:36-07:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 300
toc: true
---


## Install CRDs

From [project root directory](https://github.com/alibaba/kubedl), run

```bash
kubectl apply -f config/crd/bases/
```

## Install KubeDL controller

A single yaml file including everything: deployment, rbac etc.

```bash
kubectl apply -f https://raw.githubusercontent.com/kubedl-io/kubedl/master/config/manager/all_in_one.yaml
```
KubeDL controller is installed under `kubedl-system` namespace.

The official KubeDL controller image is hosted under [docker hub](https://hub.docker.com/r/kubedl/kubedl).

## Uninstall KubeDL controller

```bash
kubectl delete namespace kubedl-system
```

## Delete CRDs
```bash
kubectl get crd | grep kubedl.io | cut -d ' ' -f 1 | xargs kubectl delete crd
```

## Enable specific job Kind

KubeDL supports all kinds of jobs(tensorflow, pytorch etc.) in a single Kubernetes operator. You can selectively enable the kind of jobs to support.
There are three options:
1. Default option. Just install the job CRDs required. KubeDL will automatically enable the corresponding job controller.
2. Set env `WORKLOADS_ENABLE` in KubeDL container. The value is a list of job types to be enabled. For example, `WORKLOADS_ENABLE=TFJob,PytorchJob` means only Tensorflow and Pytorch Job are enabled.
3. Set startup flags `--workloads` in KubeDL container command args. The value is a list of job types to be enabled like `--workloads TFJob,PytorchJob`.
