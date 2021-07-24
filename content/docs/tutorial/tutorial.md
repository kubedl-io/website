---
title: "Tutorial"
description: "An end-to-end tutorial from model training to serving."
lead: "An end-to-end tutorial from training a model, saving the model image to the dockerhub, and serve the model."
date: 2021-04-01T15:26:42-07:00
lastmod: 2021-04-01T15:26:42-07:00
draft: false
images: []
menu:
  docs:
    parent: "tutorial"
weight: 200
toc: true
---
This tutorial will walk through [KubeDL Training]({{< ref "docs/prologue/introduction" >}}), [KubeDL Model]({{< ref "model/intro" >}}) and [KubeDL Serving]({{< ref "serving/intro" >}}) concepts.

## Install KubeDL

Follow the instructions to install KubeDL. [Go →]({{< ref "docs/prologue/install-using-helm" >}})

## Setup docker credential

The docker credential is required for KubeDL Model to store the model image.
This step is not needed if you don't use KubeDL model. This tutorial will use it.

Follow the setup instruction to setup docker credential. [Go →]({{< ref "model/setup" >}})

## Run a job to train a model

This example trains a mnist model using distributed TensorFlow. From project root, run:

```bash
kubectl apply -f example/tf/tf_job_mnist_model.yaml
```

Explanation on the [YAML](https://github.com/kubedl-io/kubedl/blob/master/example/tf/tf_job_mnist_model.yaml)

```yaml
apiVersion: "training.kubedl.io/v1alpha1"
kind: "TFJob"
metadata:
  name: "tf-distributed"
spec:
  cleanPodPolicy: None
  # modelVersion defines the location where the model is stored.
  modelVersion:
    modelName: mymodel
    # The dockerhub repo to push the generated image
    imageRepo: jianhe6/mymodel
    storage:
      # Use hostpath, NFS is also supported.
      localStorage:
        # The host dir for THIS model version, each modelVersion should have its own unique parent folder, in this case, 'mymodelv1'
        path: /models/mymodelv1
        # The node for storing the model
        nodeName: kind-control-plane
  tfReplicaSpecs:
    Worker:
      replicas: 3
      restartPolicy: Never
      template:
        spec:
          containers:
            - name: tensorflow
              image: kubedl/tf-mnist-estimator-api:v0.1
              imagePullPolicy: Always
              command:
                - "python"
                - "/keras_model_to_estimator.py"
                - "/tmp/tfkeras_example/" # model checkpoint dir
                - "/kubedl-model"         # export dir for the saved_model format
```

This example stores the trained model at a hostpath, in this case `/models/mymodelv1`. KubeDL will automatically
create a container image that includes the model artifacts within that folder and push that to the dockerhub.

Notes：
1. `modelVersion` field defines where the model is stored. Currently, local hostpath and NFS are supported.
2. `/kubedl-model` is the pre-defined location for storing the trained model inside the model image. The training code is expected to export the model in this location.
Check the [documentation]({{< ref "model/usage" >}}) for more details


## Inspect the job

After the job succeeded, run `kubect get tfjob`:

```bash
NAME              STATE       AGE   TTL-AFTER-FINISHED   MAX-LIFETIME   MODEL-VERSION
tf-distributed    Succeeded   45s                                       model-version-tf-distributed
```

Here, a ModelVersion named `model-version-tf-distributed` is created.

The naming convention of the ModelVersion is to prepend the `model-version` to the job name as such: `model-version-<JobName>`

## Inspect the model version

There are [`Model` and `ModelVersion`]({{< ref "model/intro" >}}) . In short, `Model` associates with a series of `ModelVersion`s.

Inspect the model version

```bash
$ kubectl get mv
NAME                           MODEL     IMAGE                    CREATED-BY       FINISH-TIME
model-version-tf-distributed   mymodel   jianhe6/mymodel:vf812c   tf-distributed   2021-07-24T00:39:02Z
```

ModelVersion `model-version-tf-distributed` belongs to model `mymodel`. The image incorporating the model is `jianhe6/mymodel:vf812c`.
It is created by job `tf-distributed` at `2021-07-24T00:39:02Z`


## Run the job again

This time we made some changes to the code, and we change the job name to `tf-distributed-2` and
change the `localstorage.path` to `/models/mymodelv2`, so that the new model version will be stored at hostpath `/models/mymodelv2`,
and run it again.

Once the job finishes, we get below output:

Two jobs, each has its own model version.
```bash
$ kubectl get tfjob
NAME               STATE       AGE     TTL-AFTER-FINISHED   MAX-LIFETIME   MODEL-VERSION
tf-distributed     Succeeded   3m57s                                       model-version-tf-distributed
tf-distributed-2   Succeeded   24s                                         model-version-tf-distributed-2
```

Check the model version. We get two. Each has its own generated model image.

```bash
$ kubectl get mv
NAME                             MODEL     IMAGE                    CREATED-BY         FINISH-TIME
model-version-tf-distributed     mymodel   jianhe6/mymodel:vf812c   tf-distributed     2021-07-24T00:39:02Z
model-version-tf-distributed-2   mymodel   jianhe6/mymodel:vc73be   tf-distributed-2   2021-07-24T00:42:28Z
```

Now, check the model,

```bash
$ kubectl get model
NAME      LATEST-VERSION                   LATEST-IMAGE
mymodel   model-version-tf-distributed-2   jianhe6/mymodel:vc73be
```
The model named `mymodel`, has the latest model version named ` model-version-tf-distributed-2`, and its latest model image is `jianhe6/mymodel:vc73be`

Deleting the model will  delete all its model versions.

## Inspect the model image content

Download the model image and inspect its contents. The model artifacts will be under `/kubedl-model`.

Run `docker run -it jianhe6/mymodel:vc73be /bin/sh`, and then run `ls /kubedl-model` inside the container:

```bash
$ ls /kubedl-model/1627086141
assets          saved_model.pb  variables
```
Here, the `1627086141/` parent folder is automatically created by the training code library.


## Serve the model
