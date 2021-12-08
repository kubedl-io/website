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
[XGBoost](https://github.com/dmlc/xgboost), [Mars](https://github.com/mars-project/mars) and MPI distributed training jobs on Kubernetes.

{{< img src="introduction.png" alt="introduction" caption="Introduction" >}}

## Key Features
- Support different kinds of deep learning training jobs in a single controller. You don't need to run each controller for each job kind.
- Expose unified [prometheus metrics]({{< ref "metrics" >}}) for job stats.
- [Persist]({{< ref "metadata-persistency" >}}) job metadata and events in external storage such as Mysql or certain event DB to outlive api-server state.
- [Sync files]({{< ref "code-sync" >}}) on container launch. You no longer need to rebuild the image to include the modified code every time.
- Enable training roles service discovery within [host network]({{< ref "hostnetwork" >}}). Ideal for network communication performance boost or nvlink communication across containers.
- Support advanced scheduling features such as gang scheduling.
- Support attaching [Tensorboard]({{< ref "tensorboard" >}}) to a running or finished job.
- Support training acceleration using cache by integrating with Fluid.
- A user friendly [dashboard]({{< ref "dashboard" >}}) !

## Get started

There are two main ways to install KubeDL.

### Install using Helm

Install KubeDL using Helm charts. [Go →]({{< ref "install-using-helm" >}})


### Install using YAML files

Install KubeDL using YAML files. [Go →]({{< ref "quick-start" >}})

## Features

Highlighted features in KubeDL. [Features →]({{< ref "recipes">}})

## Reference

References for apis, metrics etc. [Reference →]({{< ref "docs/references" >}})

## Contributing

Find out how to contribute to KubeDL. [Contributing →]({{< ref "how-to-contribute" >}})

## Help

Get help on KubeDL. [Help →]({{< ref "help" >}})


