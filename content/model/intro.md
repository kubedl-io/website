---
title: "Introduction"
description: "Introduction"
lead: ""
date: 2020-11-12T15:22:20+01:00
lastmod: 2020-11-12T15:22:20+01:00
draft: false
images: []
menu:
  model:
    parent: "intro"
weight: 100
toc: true
---

KubeDL Model tracks a model's version and lineage in Kubernetes CRD. It leverages docker image to take versioning of a model.
Each model version will generate a corresponding image that includes all the model artifacts.

KubeDL provides two CRDs `Model` and `ModelVersion` to accomplish this:

### ModelVersion

ModelVersion describes a model's version, its location, who creates this model, the image repo for pushing the model and so on.
The backend controller watches this CRD and uses Kaniko to generate a image that incorporates all the artifacts.
Check the full [CRD spec.](https://github.com/alibaba/kubedl/blob/master/apis/model/v1alpha1/modelversion_types.go)

An example YAML looks like below:

```YAML
apiVersion: model.kubedl.io/v1alpha1
kind: ModelVersion
metadata:
  name: mv-3
  namespace: default
spec:
  modelName: model1                     // The model name for the model version
  createdBy: user1                      // The entity (user or training job) that creates the model
  imageRepo: modelhub/resnet            // The image repo to push the generated model
  storage:
    localStorage:                       // The local storage to store the model
      path: /foo                        // The local host path to export the model
      nodeName: kind-control-plane      // The node where the chief worker run to export the model
```

#### Pre-defined KubeDL model path in container
KubeDL pre-defines the path to store the model inside the container as `/kubedl-model`

The model storage such as local fs, nfs will be mounted to /kubedl-model inside each training container. Hence,
the training code inside the container must export the model under `/kubedl-model`, so that it is also present on the external storage.
The ModelVersion controller will trigger a Kaniko container to include the model in the built image.

Each container is also automatically injected with an ENV as `KUBEDL_MODEL_PATH=/kubedl-model`. The code can also get
the path by looking up the ENV.

### Model

Model captures multiple versions for a model. The `Model` currently just provides some information
about the ModelVersion in the status, such as the latest ModelVersion. Once the Model is deleted, all the ModelVersions are cascadingly deleted.
Check the full [CRD spec.](https://github.com/alibaba/kubedl/blob/master/apis/model/v1alpha1/model_types.go)

```YAML
  spec: {}
  status:
    latestVersion:
      imageName: modelhub/resnet:v1c072
      modelVersion: mv-3
```
