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
KubeDL Model supports different backend storage for generating the model image using Kaniko.
Check the full spec [here.](https://github.com/kubedl-io/kubedl/blob/master/apis/model/v1alpha1/modelversion_types.go#L72)

### Local Storage

```go
// LocalStorage defines the local host path for storing the model artifacts.
// For a distributed training job, the nodeName will be the node where the chief/master worker run to export the model.
type LocalStorage struct {
    // The local path on the host to store the model artifacts.
    // +required
    Path     string `json:"path,omitempty"`

    // This node where chief worker run to export the model.
    // +required
    NodeName string `json:"nodeName,omitempty"`
}
```

### NFS

```go
// NFS represents the NFS for storing the model artifacts.
type NFS struct {
    // The server address, e.g. "***.cn-beijing.nas.aliyuncs.com"
    Server string `json:"server,omitempty"`

    // The path under which the model is stored, e.g. /models/my_model1
    Path   string `json:"path,omitempty"`
}
```
