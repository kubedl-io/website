---
title: "Install Using Yaml"
description: ""
lead: "Install Morphling with YAML files."
date: 2021-06-12T17:46:36-07:00
lastmod: 2021-06-13T17:46:36-07:00
draft: false
images: []
menu:
  tuning:
    parent: "tuningexamples"
weight: 100
toc: true
---


## Install CRDs

From [git root directory](https://github.com/alibaba/morphling), run

{{< btn-copy text="kubectl apply -f config/crd/bases" >}}
```commandline
kubectl apply -f config/crd/bases
```


#### Install Morphling Components
The official Morphling component images are hosted under [docker hub](https://hub.docker.com/r/kubedl).

 ```commandline
 kubectl create namespace morphling-system

 kubectl apply -f manifests/configmap
 kubectl apply -f manifests/controllers
 kubectl apply -f manifests/pv
 kubectl apply -f manifests/mysql-db
 kubectl apply -f manifests/db-manager
 ```
By default, Morphling will be installed under `morphling-system` namespace.

#### Check Intsalling

Check if all components are running successfully:

{{< btn-copy text="kubectl get deployment -n morphling-system" >}}
```commandline
kubectl get deployment -n morphling-system
```

Expected output:

```commandline
NAME                   READY   UP-TO-DATE   AVAILABLE   AGE
morphling-controller   1/1     1            1           10m
morphling-db-manager   1/1     1            1           10m
morphling-mysql        1/1     1            1           10m
```

## Uninstall Morphling controller

{{< btn-copy text="kubectl delete namespace morphling-system" >}}
```bash
kubectl delete namespace morphling-system
```

## Delete CRDs
{{< btn-copy text="kubectl delete crd profilingexperiments.tuning.kubedl.io samplings.tuning.kubedl.io trials.tuning.kubedl.io" >}}

```bash
kubectl delete crd profilingexperiments.tuning.kubedl.io samplings.tuning.kubedl.io trials.tuning.kubedl.io
```
