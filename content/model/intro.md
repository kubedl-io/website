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
    localStorage:                       // The local storage where the model is located
      path: /foo
      nodeName: kind-control-plane
```

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
