---
title: "Quick Start"
description: "Tune the configuration for a Mobilenet model with Morphling."
lead: "Tune the configuration for a Mobilenet model with Morphling."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  tuning:
    parent: "tuningintro"
weight: 230
toc: true
---
This example demonstrates how to tune the configuration for a [Mobilenet](https://www.tensorflow.org/api_docs/python/tf/keras/applications/mobilenet) model deployed with [Tensorflow Serving](https://www.tensorflow.org/tfx/guide/serving) under Morphling.

For demonstration, we choose _two_ configurations to tune:
the first one the CPU cores (resource allocation), and the second one is maximum serving batch size (runtime parameter).
We use grid search for configuration sampling.

#### Submit the configuration tuning experiment

{{< btn-copy  text="kubectl -n morphling-system apply -f https://raw.githubusercontent.com/alibaba/morphling/main/examples/experiment/experiment-mobilenet-grid.yaml" >}}

```bash
kubectl -n morphling-system apply -f https://raw.githubusercontent.com/alibaba/morphling/main/examples/experiment/experiment-mobilenet-grid.yaml
```

#### Monitor the tuning experiment status

```bash
kubectl get -n morphling-system pe
kubectl describe -n morphling-system pe
```

#### Monitor sampling trials (performance test)

{{<btn-copy text="kubectl -n morphling-system get trial">}}

```bash
kubectl -n morphling-system get trial
```

#### Get the searched optimal configuration

{{<btn-copy text="kubectl -n morphling-system get pe">}}

```bash
kubectl -n morphling-system get pe
```

Expected output:

```bash
NAME                        STATE       AGE     OBJECT NAME   OPTIMAL OBJECT VALUE   OPTIMAL PARAMETERS
mobilenet-experiment-grid   Succeeded   5m59s   qps           31                     [map[category:env name:BATCH_SIZE value:2] map[category:resource name:cpu value:2000m] map[category:resource name:memory value:2000Mi]]
```

#### Delete the tuning experiment

{{<btn-copy text="kubectl -n morphling-system delete pe --all">}}

```bash
kubectl -n morphling-system delete pe --all
```
