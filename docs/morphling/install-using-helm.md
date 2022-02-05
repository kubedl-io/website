---
sidebar_position: 2
---

# Install Using Helm

## Install Helm

Helm is a package manager for Kubernetes. A demo installation on MacOS:


```bash
brew install helm
```

Check the [helm website](https://helm.sh/docs/intro/install/) for more details.

## Install Morphling

From the root directory, run


```bash
helm install morphling ./helm/morphling --create-namespace -n morphling-system
```

You can override default values defined in [values.yaml](https://github.com/alibaba/morphling/blob/main/helm/morphling/values.yaml) with `--set` flag.
For example, set the custom cpu/memory resource:


```bash
helm install morphling ./helm/morphling --create-namespace -n morphling-system  --set resources.requests.cpu=1024m --set resources.requests.memory=2Gi
```

Helm will install CRDs and other Morphling components under `morphling-system` namespace.

## Uninstall Morphling


```bash
helm uninstall morphling -n morphling-system
```

## Delete all Morphling CRDs

```bash
kubectl get crd | grep morphling.kubedl.io | cut -d ' ' -f 1 | xargs kubectl delete crd
```
