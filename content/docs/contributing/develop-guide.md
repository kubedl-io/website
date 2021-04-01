---
title: "How to Develop"
description: "How to develop KubeDL"
lead: "You can develop KubeDL operator and test it in cluster or run locally."
date: 2021-03-29T17:30:05-07:00
lastmod: 2021-03-29T17:30:05-07:00
draft: false
images: []
menu:
  docs:
    parent: "contributing"
weight: 210
toc: true
---


## Run KubeDL in Cluster

### Install docker

  Follow the [official docker installation guide](https://docs.docker.com/install/).

### Install minikube

  Follow the [official minikube installation guide](https://kubernetes.io/docs/tasks/tools/install-minikube/).

### Customize KubeDL code

  Make your own code changes and validate the build by running `make manager` in KubeDL directory.

### Deploy customized operator

* Prerequisites: create a [dock hub](https://hub.docker.com/) account ($DOCKERID), and create a `kubedl` repository. Also,
[install KubeDL]({{< ref "introduction" >}} );
* step 1: `docker login` with the $DOCKERID account;
* step 2: `export IMG=<image_name>` to specify the target image name. e.g., `export IMG=$DOCKERID/kubedl:test`;
* step 3: `make docker-build` to build the image locally;
* step 4: `make docker-push` to push the image to dock hub under the `kubedl` repository;
* step 5: change the `config/manager/all_in_one.yaml` and replace the image of the kubedl deployment to `$DOCKERID/kubedl:test`

    ```yaml
    spec:
          containers:
            - command:
                - /manager
              image: $DOCKERID/kubedl:test
              imagePullPolicy: Always
              name: kubedl
    ```

* step 6: `kubectl delete deployment kubedl-controller-manager -n kubedl-system` to remove the old deployment if any;
* step 7: `kubectl apply -f config/manager/all_in_one.yaml` to install the new deployment with the customized operator image;

You can now perform manual tests and use `kubectl logs kubedl-controller-manager-0 -n kubedl-system` to check controller logs for debugging.

## Run KubeDL locally

### Set up credentials

To run KubeDL locally, you must have the access to the kubernetes cluster, the credential is the
kube-config cert file.

### Install CRDs and run KubeDL operator locally

```bash
export KUBECONFIG=${PATH_TO_CONFIG}
// or specify the path by --kubeconfig {PATH_TO_CONFIG}
make install
make run
```

KubeDL supports running workloads selectively. You can enable a specific workload by parsing the
parameter `--workloads {workload-to-debug}` while starting KubeDL. Check the printed logs to see
if the job controller is started as expected.
