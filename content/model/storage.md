---
title: "Model Storage"
description: "Model Storage"
lead: ""
date: 2020-11-12T15:22:20+01:00
lastmod: 2020-11-12T15:22:20+01:00
draft: false
images: []
menu:
  model:
    parent: "getstart"
weight: 100
toc: true
---

KubeDL Model can support generate image out from different backend storage. It leverages Kaniko to mount the storage
as a PersistentVolume into the container, and create an image that includes the model artifacts and push to the image registry.
Check the full spec [here.](https://github.com/alibaba/kubedl/blob/master/apis/model/v1alpha1/modelversion_types.go#L64)

### Local Storage

```YAML
// LocalStorage defines the local host path for storing the model version.
// For a distributed training job, the nodeName will be the node where the chief/master worker run to output the model.
type LocalStorage struct {
    // The local path on the host to store the model artifacts.
    // +required
    Path     string `json:"path,omitempty"`

    // The name of the node for storing the model. This node will be where the chief worker run to output the model.
    // +required
    NodeName string `json:"nodeName,omitempty"`
}
```

### NFS

```YAML
// NFS represents the NFS for storing the model version.
type NFS struct {
    // The server address, e.g. "***.cn-beijing.nas.aliyuncs.com"
    Server string `json:"server,omitempty"`

    // The path under which the model is stored, e.g. /models/my_model1
    Path   string `json:"path,omitempty"`
}
```
