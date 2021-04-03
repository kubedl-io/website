---
title: "How to Contribute"
description: "You are very welcome to contribute to KubeDL"
lead: ""
date: 2021-03-29T17:22:54-07:00
lastmod: 2021-03-29T17:22:54-07:00
draft: false
images: []
menu:
  docs:
    parent: "contributing"
weight: 200
toc: true
---

KubeDL is written in the form of Kubernetes operator and use [KubeBuilder](https://github.com/kubernetes-sigs/kubebuilder) for code scaffolding.
### Build the binary


{{< btn-copy text="make manager" >}}
```bash
make manager
```
### Run the tests

{{< btn-copy text="make test" >}}
```bash
make test
```
### Generate manifests: CRD, RBAC YAML files etc

{{< btn-copy text="make manifests" >}}
```bash
make manifests
```
### Build the docker image

{{< btn-copy text="export IMG=<your_image_name> && make docker-build" >}}
```bash
export IMG=<your_image_name> && make docker-build
```

### Push the image

{{< btn-copy text="docker push <your_image_name>" >}}
```bash
docker push <your_image_name>
```
Check the `Makefile` under github root directory for more details

To develop/debug KubeDL controller manager, please check the [debug guide]({{< ref "develop-guide" >}}).



