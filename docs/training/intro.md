---
sidebar_position: 1
---

# Introduction

KubeDL supports running distributed training jobs on Kubernentes such as [TensorFlow](https://github.com/tensorflow/tensorflow), [PyTorch](https://github.com/pytorch/pytorch),
[XGBoost](https://github.com/dmlc/xgboost), [Mars](https://github.com/mars-project/mars) and MPI.

## Key Features
- Support different kinds of deep learning training jobs in a single controller. You don't need to run each controller for each job kind.
- Expose unified [prometheus metrics](/docs/references/metrics) for job stats.
- [Persist](metadata-persistency) job metadata and events in external storage such as Mysql or certain event DB to outlive api-server state.
- [Sync files](code-sync) on container launch. You no longer need to rebuild the image to include the modified code every time.
- Enable training worker service discovery with [host network](hostnetowrk). Host network is ideal for worker communication performance or nvlink communication across containers.
- Support advanced scheduling features such as gang scheduling.
- Support attaching [Tensorboard](tensorboard) to a running or finished job.
- Support training acceleration using cache by integrating with Fluid.
- A user friendly [dashboard](dashboard) !

## Get started

There are two ways to install KubeDL.

### Install using Helm

[Go →](/docs/installation/install-using-helm)


### Install using YAML files

[Go →](/docs/installation/install-using-yaml)

## Reference

References for apis, metrics etc. [Reference →](/docs/references/metrics)



