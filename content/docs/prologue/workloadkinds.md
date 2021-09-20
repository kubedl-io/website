---
title: "Workload Kinds"
description: "Workload Kinds"
lead: "All supported workload kinds by KubeDL controller."
date: 2020-10-13T15:21:01+02:00
lastmod: 2020-10-13T15:21:01+02:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 500
toc: true
---

You can substitute the `kind` in kubectl command with below kinds.

### Training Job kind
- [tfjob]({{< ref "docs/workloads/tensorflow" >}})
- [pytorchjob]({{< ref "docs/workloads/pytorch" >}})
- [marsjob]({{< ref "docs/workloads/mars" >}})
- [mpijob]({{< ref "docs/workloads/mpi" >}})
- [xgboostjob]({{< ref "docs/workloads/xgboost" >}})
- [cron]({{< ref "docs/workloads/cron" >}}): a cron controller for periodically scheduling training jobs.
- xdljob
- elasticdljob


### Model
- [model]({{< ref "model/intro" >}})
- [mv]({{< ref "model/intro" >}}) (short for modelversion)

### Serving
- [inference]({{< ref "serving/intro" >}})
