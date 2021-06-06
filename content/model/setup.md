---
title: "Setup"
description: "Setup"
lead: ""
date: 2020-11-12T15:22:20+01:00
lastmod: 2020-11-12T15:22:20+01:00
draft: false
images: []
menu:
  model:
    parent: "examples"
weight: 10
toc: true
---
KubeDL model uses Kaniko underneath to generate the image that incorporates the model artifacts.

## Create Dockerfile

A dockerfile is required for the Kaniko container to generate the image. We use a configmap to describe the dockerfile
and it'll be made available to the Kaniko container at runtime. The generated image will have the model artifacts located under `/model`.
Apply below ConfigMap to the Kubernetes cluster.

```bash
kubectl apply -f dockerfile.yaml
```

dockerfile.yaml content as below:

```YAML
apiVersion: v1
kind: ConfigMap
metadata:
  name: dockerfile
  namespace: default
data:
  dockerfile: |
    FROM busybox
    COPY build/ /model
```

## Create Docker Credentials

Docker credentials is also required for Kaniko to be able to push the image to docker registry:
Below command creates a Kubernetes secret that contains the docker credentials.

```bash
kubectl create secret docker-registry regcred --docker-server=https://index.docker.io/v1/ --docker-username=<username> --docker-password=<password> --docker-email=<email>
```

Replace `username`, `password`, `email` to your own.
