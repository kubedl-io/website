---
sidebar_position: 1
---

# Introduction

KubeDL Model tracks a model's version and lineage in Kubernetes CRD. It leverages container image to take versioning of a model.
Each model version will generate a corresponding image that includes all the model artifacts.

In short, KubeDL training generates the KubeDL model and can then later by referenced by KubeDL Serving to serve the model directly.

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
  # The model name for the model version
  modelName: model1
  # The entity (user or training job) that creates the model
  createdBy: user1
  # The image repo to push the generated model
  imageRepo: modelhub/resnet
  # The storage will be mounted at /kubedl-model inside the training container.
  # Therefore, the training code should export the model at /kubedl-model path.
  storage:
    # The local storage to store the model
    localStorage:
      # The local host path to export the model
      path: /foo
       # The node where the chief worker run to export the model
      nodeName: kind-control-plane
```

KubeDL mounts the storage such as local fs, nfs at `/kubedl-model` inside each training container by default. Therefore,
the training code inside the container must export the model under `/kubedl-model`, so that it is also present on the external storage.

The ModelVersion controller will then trigger a Kaniko container mounted with the same storage and generate an image that includes the
model artifacts at `/kubedl-model` path.
KubeDL also automatically injects an ENV  `KUBEDL_MODEL_PATH=/kubedl-model` into the generated model image.

### Model

Model is associated with multiple ModelVersions. It just aggregates some information about the ModelVersions in its status, such as the latest ModelVersion like below.
Once the Model is deleted, all its ModelVersions are cascadingly deleted.
Check the full [CRD spec.](https://github.com/alibaba/kubedl/blob/master/apis/model/v1alpha1/model_types.go)

```YAML
  status:
    latestVersion:
      imageName: modelhub/resnet:v1c072
      modelVersion: mv-3
```
