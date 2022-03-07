---
sidebar_position: 1
---

# Introduction

KubeDL enables deep learning workloads to run on Kubernetes more easily and efficiently.

![introduction](/img/tutorial/introduction.png)


Its core functionalities include:

- Support running [training](/docs/training/intro) and [inference](/docs/serving/intro) workloads on Kubernetes (Tensorflow, Pytorch. [Mars](https://github.com/mars-project/mars) etc.)in a single unified controller.
- Automatically tunes the best container-level configurations before an ML model is deployed as inference services. - [Morphling](/docs/morphling/intro)
- Model lineage and versioning to track the history of a model natively in CRD: when the model is trained using which data and which image, each version of the model, which version is running etc.
- Enables storing and versioning a model leveraging container images. Each model version is stored as its own image and can later be served with Serving framework.


KubeDL is a [CNCF sandbox](https://www.cncf.io/sandbox-projects/) project.

![cncf](/img/cncf/cncf-color.svg)
