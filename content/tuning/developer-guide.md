---
title: "Developer Guide"
description: "Tune the configuration for a Resnet50 model with Morphling."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  tuning:
    parent: "tuningexamples"
weight: 300
toc: true
---
## Build the controller manager binary
{{<btn-copy text="make manager">}}
```bash
make manager
```
## Run the tests
{{<btn-copy text="make test">}}

```bash
make test
```
## Generate manifests, e.g., CRD YAML.
{{<btn-copy text="make manifests">}}

```bash
make manifests
```
## Build Morphling component images.
{{<btn-copy text="make docker-build">}}

```bash
make docker-build
```

## Push Morphling component images.
{{<btn-copy text="make docker-push">}}

```bash
make docker-push
```

To develop/debug Morphling controller manager locally, please check the [Debug Guide]({{< ref "debug-guide" >}}).
