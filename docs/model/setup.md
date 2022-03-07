---
sidebar_position: 2
---

# Setup
KubeDL Model uses Kaniko underneath to generate the image that incorporates the model artifacts.

## Setup Docker Credentials

Docker credentials is required for Kaniko to be able to push the image to docker registry.
Below command creates a Kubernetes secret that contains the docker credentials.

```bash
kubectl create secret docker-registry regcred --docker-server=https://index.docker.io/v1/ --docker-username=<username> --docker-password=<password> --docker-email=<email>
```

Replace `username`, `password`, `email` with your own.
