---
sidebar_position: 3
---

# Install Using YAMLs

## Install CRDs

From [git root directory](https://github.com/alibaba/morphling), run


```commandline
kubectl apply -f config/crd/bases
```

### Install Morphling Components

The official Morphling component images are hosted under [docker hub](https://hub.docker.com/r/kubedl).

 ```commandline
 kubectl create namespace morphling-system
 kubectl apply -k manifests/configmap
 kubectl apply -k manifests/controllers
 kubectl apply -k manifests/pv
 kubectl apply -k manifests/mysql-db
 kubectl apply -k manifests/db-manager
 kubectl apply -k manifests/algorithm
 ```

To deploy Morphling UI, run

```bash
kubectl apply -k manifests/ui
```
Check the [Morphling UI docs →](ui)

By default, Morphling components will be installed under `morphling-system` namespace.

### Check Installing

Check if all components are running successfully:


```commandline
kubectl get deployment -n morphling-system
```

Expected output:

```commandline
NAME                         READY   UP-TO-DATE   AVAILABLE   AGE
morphling-algorithm-server   1/1     1            1           34s
morphling-controller         1/1     1            1           9m23s
morphling-db-manager         1/1     1            1           9m11s
morphling-mysql              1/1     1            1           9m15s
morphling-ui                 1/1     1            1           4m53s
```

Please wait until all these deployments are `ready`.

## Uninstall Morphling controller


```bash
bash script/undeploy.sh
```

## Delete CRDs


```bash
kubectl delete crd profilingexperiments.morphling.kubedl.io samplings.morphling.kubedl.io trials.morphling.kubedl.io
```
