---
title: "Events Persistency"
description: ""
lead: ""
date: 2021-04-08T14:48:07-07:00
lastmod: 2021-04-08T14:48:07-07:00
draft: false
images: []
menu:
  docs:
    parent: "recipes"
weight: 600
toc: true
---

Kubernetes object events are persisted for only 3 hours by default.
In addition to job meta persistency, KubeDL also supports persisting Kubernetes events into external storage system (usually time-series databases) to outlive api-server state.
Currently, KubeDL watches all Kubernetes events and persist them into external storage.

Currently, only `aliyun-sls` is supported.


## How To Use
Below is an example for seting up KubeDL to persist events into [alicloud simple log service](https://cn.aliyun.com/product/sls).

1. Set up credentials. Create a Secret:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: kubedl-sls-config
  namespace: kubedl-system
type: Opaque
stringData:
  endpoint: zhangbei.log.aliyuncs.com
  accessKey: my-ak
  accessSecret: my-sk
  project: kubedl-project
  logStore: kubedl
```

2. Update the KubeDL Deployment spec to include `--event-storage aliyun-sls` in the startup flag and reference the credentials
  via environment variables.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kubedl
  namespace: kubedl-system
  labels:
    app: kubedl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kubedl
  template:
    metadata:
      labels:
        app: kubedl
    spec:
      containers:
      - image: kubedl/kubedl:v0.3.0
        imagePullPolicy: Always
        name: kubedl-manager
        args:
        - "--event-storage"
        - "aliyun-sls"
        env:
        - name: SLS_ENDPOINT
          value:
          valueFrom:
            secretKeyRef:
              name: kubedl-sls-config
              key: endpoint
        - name: SLS_KEY_ID
          value:
          valueFrom:
            secretKeyRef:
              name: kubedl-sls-config
              key: accessKey
        - name: SLS_KEY_SECRET
          value:
          valueFrom:
            secretKeyRef:
              name: kubedl-sls-config
              key: accessSecret
        - name: SLS_PROJECT
          value:
          valueFrom:
            secretKeyRef:
              name: kubedl-sls-config
              key: project
        - name: SLS_LOG_STORE
          value:
          valueFrom:
            secretKeyRef:
              name: kubedl-sls-config
              key: logStore
```
##  Aliyun-sls Config
The configs defined in the aforementioned `secret`:

| Config Name   |   Description    |
|------------- |-------------|
| endpoint | The sls endpoint to connect to |
| accessKey | The alicloud account access key|
| accessSecret | The alicloud account access secret. |
| project | The sls project for storing the events|
| logStore | The sls log store in the project for storing the events |

## Contributions

Currently, only `aliyun-sls` is supported. You are welcome to contribute your own storage plugin.
