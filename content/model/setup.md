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
    parent: "getstart"
weight: 10
toc: true
---
KubeDL model uses Kaniko underneath to generate the image that incorporates the model artifacts.

## Create Docker Credentials

Docker credentials is also required for Kaniko to be able to push the image to docker registry:
Below command creates a Kubernetes secret that contains the docker credentials.

```bash
kubectl create secret docker-registry regcred --docker-server=https://index.docker.io/v1/ --docker-username=<username> --docker-password=<password> --docker-email=<email>
```

Replace `username`, `password`, `email` to your own.
