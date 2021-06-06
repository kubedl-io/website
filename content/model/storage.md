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
    parent: "examples"
weight: 100
toc: true
---

KubeDL Model can support generate image out from different backend storage. It leverages Kaniko to mount the storage
as a PersistentVolume into the container, and create an image that includes the model artifacts and push to the image registry.
Check the full spec [here.](https://github.com/alibaba/kubedl/blob/master/apis/model/v1alpha1/modelversion_types.go#L64)

### Local Storage

```YAML
// LocalStorage defines the local storage for storing the model version.
// For a distributed training job, the nodeName will be the node where the chief/master worker run to output the model.
type LocalStorage struct {
    // The local path on the host
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

### AWS EFS

(work in progress)

```YAML
type AWSEfs struct {
    // VolumeHandle indicates the backend EFS volume. Check the link for details
    // https://github.com/kubernetes-sigs/aws-efs-csi-driver/tree/master/examples/kubernetes
    // It is of the form "[FileSystemId]:[Subpath]:[AccessPointId]"
    // e.g. FilesystemId with subpath and access point Id:  fs-e8a95a42:/my/subpath:fsap-19f752f0068c22464.
    // FilesystemId with access point Id:   fs-e8a95a42::fsap-068c22f0246419f75
    // FileSystemId with subpath:    fs-e8a95a42:/dir1
    VolumeHandle string `json:"volumeHandle,omitempty"`

    // The attributes passed to the backend EFS
    Attributes map[string]string `json:"attributes,omitempty"`
}
```
