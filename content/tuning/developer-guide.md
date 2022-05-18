---
title: "Developer Guide"
description: "Tune the configuration for a Resnet50 model with Morphling."
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  tuning:
    parent: "tuningcontributing"
weight: 100
toc: true
---

There's a `Makefile` in the root folder which describes the options to build and install. Here are some common ones:

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

## Generate the helm chart

Generate the helm chart, the helm chart will be generated under [helm/morphling](https://github.com/kubedl-io/morphling/tree/main/helm/morphling)

{{< btn-copy text="make helm-chart" >}}

```bash
make helm-chart
```

To develop/debug Morphling controller manager locally, please check the [Debug Guide]({{< ref "debug-guide" >}}).
