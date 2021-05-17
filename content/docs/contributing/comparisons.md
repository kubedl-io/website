---
title: "Comparisons"
description: "Comparisons"
lead: ""
date: 2021-04-01T14:54:39-07:00
lastmod: 2021-04-01T14:54:39-07:00
draft: false
images: []
menu:
  docs:
    parent: "contributing"
weight: 400
toc: true
---
## Comparisons with Kubeflow
KubeDL currently supports training workloads on Kubernetes, and will have more functionalities coming later.
Kubeflow is a machine learning toolkit for Kubernetes that contains many projects for different purposes.

Both projects share the same goal to enable machine learning run on Kubernetes, but largely solve different problems,
or in different approaches, or can complement each other in this area.

KubeDL training shares some functionalities with certain Kubeflow training operators to enable training jobs run on Kubernetes.
But there are noticeable feature differences in KubeDL from in Kubeflow:
- KubeDL enables more machine learning frameworks particularly the two open sourced projects by Alibaba mentioned below,
in addition to industry trending frameworks(TensorFlow, PyTorch, MPI) in a single controller.

    - https://github.com/mars-project/mars  Mars is a tensor-based unified framework for large-scale data computation
     which scales Numpy, pandas, Scikit-learn and Python functions. Think of it as the distributed version of numpy, but there are more than that.
    - https://github.com/alibaba/x-deeplearning An industrial deep learning framework for high-dimension sparse data.
     This project stems form Alibaba internal large scale deep learning production practices targeted for high dimensional sparse data typically found in e-commerce.
- Integrate multi framework support in a single controller so that coherent metrics and monitoring support is possible,
  and that reduces operational burdens and resource allocations (compared with per framework per controller in Kubeflow.)
- Built-in metadata and events persistent controller to save job metadata and events in external storages
  such as MySQL to outlive api-server state. This functionality does not exist in Kubeflow and can potentially complement that in Kubeflow.
- Schedule jobs in a cron-like way.
- Enable jobs run in host network mode in heterogeneous cluster environments. Due to large complexity in Alibaba and Alibaba's customer's environments,
 host network sometimes becomes a must-have feature to enable machine learning job run on Kubernetes.
- Automatic file sync into container to include external artifacts on job launch.
- Built-in advanced scheduling strategy practiced in Alibaba internal world's largest GPU and CPU clusters.
- Dag scheduling strategy across different roles in distributed machine learning setting.
- And more...

That said, some features can be enabled by running KubeDL as-is, to complement same missing functionalities in Kubeflow.
