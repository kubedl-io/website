---
title: "Metadata Persistency"
description: ""
lead: ""
date: 2021-04-08T14:47:51-07:00
lastmod: 2021-04-08T14:47:51-07:00
draft: false
images: []
menu:
  docs:
    parent: "recipes"
weight: 500
toc: true
---

Kubernetes api-server typically stores job information for a limited lifespan. KubeDL has built-in support to persist the
job metadata into external storage to outlive api-server state.
The KubeDL controller will persist the job metadata during the lifecycle of job such as job and pod creation/deletion.

Currently, only `Mysql` is supported.

## DB Schema

## How To Use
Below is an example to setup KubeDL to use `Mysql` as the persistency DB.

1. Set up credentials for KubeDL to connect to DB. Create a `Secret` object like below:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: kubedl-mysql-config
  namespace: kubedl-system
type: Opaque
stringData:
  host: my.host.com
  dbName: kubedl
  user: kubedl-user
  password: this-is-me
  port: "3306"
```

2. Update the Kubedl Deployment spec to include `--meta-storage mysql` in the startup flag and reference the DB credentials
via environment variables. The KubeDL controller uses the env to set up connection with DB.

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
        - "--meta-storage"
        - "mysql"
        env:
        - name: MYSQL_HOST
          value:
          valueFrom:
            secretKeyRef:
              name: kubedl-mysql-config
              key: host
        - name: MYSQL_DB_NAME
          value:
          valueFrom:
            secretKeyRef:
              name: kubedl-mysql-config
              key: dbName
        - name: MYSQL_USER
          value:
          valueFrom:
            secretKeyRef:
              name: kubedl-mysql-config
              key: user
        - name: MYSQL_PASSWORD
          value:
          valueFrom:
            secretKeyRef:
              name: kubedl-mysql-config
              key: password
```


## MySql Config
The configs defined in the aforementioned `secret`:

| Config Name   |   Description    |
|------------- |-------------|
| host | Mysql host name |
| dbName | DB name|
| user | User name|
| password | User password|
| port | The mysql DB port to connect to |

## Contributions

Currently, only `mysql` is supported. You are welcome to contribute your own storage plugin.
