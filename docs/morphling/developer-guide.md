---
sidebar_position: 8
---

# Developer Guide

There's a `Makefile` in the root folder which describes the options to build and install. Here are some common ones:

## Build the controller manager binary


```bash
make manager
```

## Run the tests


```bash
make test
```

## Generate manifests, e.g., CRD YAML.


```bash
make manifests
```

## Build Morphling component images.


```bash
make docker-build
```

## Push Morphling component images.


```bash
make docker-push
```

## Generate the helm chart

Generate the helm chart, the helm chart will be generated under [helm/morphling](https://github.com/kubedl-io/morphling/tree/main/helm/morphling)


```bash
make helm-chart
```

To develop/debug Morphling controller manager locally, please check the [Debug Guide]({{< ref "debug-guide" >}}).
