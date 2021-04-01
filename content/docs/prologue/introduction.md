---
title: "Introduction"
description: "KubeDL runs your deep learning workloads on Kubernetes."
lead: ""
date: 2020-10-06T08:48:57+00:00
lastmod: 2020-10-06T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 100
toc: true
---
Currently, KubeDL supports running [TensorFlow](https://github.com/tensorflow/tensorflow), [PyTorch](https://github.com/pytorch/pytorch),
[XGBoost](https://github.com/dmlc/xgboost), and [Mars](https://github.com/mars-project/mars) distributed training jobs on Kubernetes.

## Key Features
- Support different kinds of deep learning training jobs in a single controller. You don't need to run each controller for each job kind.
- Expose unified [prometheus metrics]({{< ref "metrics" >}}) for job stats.
- Save job metadata in a pluggable storage backend such as Mysql to outlive api-server state.
- Run jobs with custom code [on demand]({{< ref "code-sync" >}}). You no longer need to rebuild the image to include the custom code every time.
- Support advanced scheduling features such as gang scheduling.
- [Work-in-progress] a catchy [dashboard](#job-dashboard) !

## Get started

There are two main ways to install KubeDL.

### Install using Helm

Install KubeDL using Helm charts. [Go →]({{< ref "install-using-helm" >}})


### Install using YAML files

Install KubeDL using YAML files. [Go →]({{< ref "quick-start" >}})

## Recipes

Get instructions on how to accomplish common tasks with KubeDL. [Recipes →](https://getdoks.org/docs/recipes/project-configuration/)

## Reference Guides

References for apis, metrics etc. [Reference Guides →]({{< ref "references" >}})

## Contributing

Find out how to contribute to KubeDL. [Contributing →]({{< ref "how-to-contribute" >}})

## Help

Get help on KubeDL. [Help →]({{< ref "help" >}})
