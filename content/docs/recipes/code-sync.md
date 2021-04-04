---
title: "File Sync"
description: "Sync files on container launch."
lead: "Sync files on container launch."
date: 2021-03-29T23:04:09-07:00
lastmod: 2021-03-29T23:04:09-07:00
draft: false
images: []
menu:
  docs:
    parent: "recipes"
weight: 150
toc: true
---

KubeDL supports syncing files from remote on container launch.
User can modify the code, reference the code repository and run the jobs without re-building the image every time to include the modified code.

Currently, only support downloading from github. The implementation is pluggable and can easily support other distributed filesystem like HDFS.

### Git Hub

Users can set the git config in the job's annotation with key `kubedl.io/git-sync-config` as below. The git repo will be
downloaded and saved in the container's `working dir` by default. Please use the git repo's clone url ending with the `.git`,
rather than the git repo's web url.

```yaml
    apiVersion: "kubeflow.org/v1"
    kind: "TFJob"
    metadata:
      name: "mnist"
      namespace: kubedl
      annotations:
 +      kubedl.io/git-sync-config: '{"source": "https://github.com/alibaba/kubedl.git" }'
    spec:
      cleanPodPolicy: None
      tfReplicaSpecs:
        ...
```


A full list of supported options are:

```json5
"source": "https://github.com/sample/sample.git",  // code source (required).
"image": "xxx",     // the image to execute the git-sync logic (optional).
"rootPath": "xxx",  // the path to save downloaded files (optional).
"destPath": "xxx",  // the name of (a symlink to) a directory in which to check-out files (optional).
"envs": [],         // user-customized environment variables (optional).
"branch": "xxx",    // git repo branch (optional).
"revison": "xxx",   // git repo commit revision (optional).
"depth": "xxx",     // git sync depth (optional).
"maxFailures" : 3,  // max consecutive failures allowed (optional).
"ssh": false,       // use ssh mode or not (optional).
"sshFile": "xxx",   // ssh file path (optional).
"user": "xxx",      // git config username (optional).
"password": "xxx"   // git config password (optional).
```
