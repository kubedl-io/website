---
title: "Gang Scheduling"
description: ""
lead: ""
date: 2021-04-07T15:35:16-07:00
lastmod: 2021-04-07T15:35:16-07:00
draft: false
images: []
menu:
  docs:
    parent: "recipes"
weight: 901
toc: true
---

Gang Scheduling is a critical feature for Deep Learning workloads to enable all-or-nothing scheduling capability, as
most DL frameworks requires all workers to be running to start training process. Gang Scheduling avoids resource
inefficiency and scheduling deadlock sometimes.

KubeDL supports gang scheduling with different schedulers as a backend. Today, several Kubernetes schedulers support
gang scheduling, including the [Coscheduling Scheduling Plugin](https://github.com/kubernetes-sigs/scheduler-plugins/blob/master/pkg/coscheduling/README.md),
[YuniKorn](https://yunikorn.apache.org/), KubeBatch. Each has its own advantages and its own API protocols.

KubeDL provides a plugin framework to support different schedulers as a backend. Currently, KubeDL supports kube-coscheduler and kube-batch.


{{< img src="kubedl-gangschedule.png" alt="kubedl gang" caption="kubedl gang schedule" div align="center" >}}

### How to Enable

Enable gang scheduling using the KubeDL controller startup flag `--gang-scheduler-name`.
For example: `--gang-scheduler-name=kube-coscheduler`

By default, it is empty meaning not enabled. Supported values are `kube-coscheduler` and `kube-batch`.

### Reference

- How to setup kube-scheduler plugins. [Go ->](https://github.com/kubernetes-sigs/scheduler-plugins)
- How to setup kube-batch scheduler. [Go ->](https://github.com/kubernetes-sigs/kube-batch)
