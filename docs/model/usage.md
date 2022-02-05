---
sidebar_position: 3
---
# Quick Start

## Create a ModelVersion from training job

KubeDL training already supports generating a ModelVersion when the job completes. Thus, a model image is
automatically generated after job succeeds.

To enable this feature, the TensorFlow job spec needs to set the `modelVersion` field like the example below:

```yaml
apiVersion: "training.kubedl.io/v1alpha1"
kind: "TFJob"
metadata:
  name: "distributed-tfjob"
spec:
  cleanPodPolicy: None
  # modelVersion defines the location where the model is stored.
  modelVersion:
    # The model name for the model version
    modelName: mymodel
    # The dockerhub repo to push the generated image
    imageRepo: jianhe6/mymodel
    storage:
      # Use hostpath, NFS is also supported.
      localStorage:
        # The host path for storing the generated model.
        # Each job should have its own unique parent folder, in this case, 'mymodel', so that multiple ModelVersions are not collided into the same folder.
        path: /models/mymodel
        # The mounted path inside the container.
        # The training code is expected to export the model under this path, such as storing the tensorflow saved_model.
        mountPath: /kubedl-model
        # The node where the chief worker run to store the model
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
This example uses hostpath volume. The training code will first generate the model artifacts under `/kubedl-model` inside the training
container. Correspondingly, the model will be preset on the local host path `/models/mymodel`.
Then KubeDL creates a ModelVersion CR that triggers a Kaniko container to generate an image that contains the model artifacts at `/kubedl-model`, and also push that to docker hub at`modelhub/mnist`.

Note that the training code needs to specify `/kubedl_model` as the model export path (the same as the mountPath in storage).

KubeDL also creates a Model object with the ModelVersion's ownerReference pointing the Model.

## Create a ModelVersion Manually
A ModelVersion can also be created manually pointing to an existing external storage.

This `ModelVersion` CR will generate a model image at `modelhub/model1` in dockerhub, including the model artifacts from `node1`'s local path at `/foo`

```YAML
apiVersion: model.kubedl.io/v1alpha1
kind: ModelVersion
metadata:
  name: mv-4
  namespace: default
spec:
  modelName: model1
  createdBy: user1
  imageRepo: modelhub/model1
  storage:
    localStorage:
      path: /foo
      nodeName: node1
```

```shell script
kubectl get mv (short for modelversion)
NAME                       MODEL    IMAGE                   CREATED-BY   FINISH-TIME
mv-4                       model1   modelhub/model1:v1c072   user1        2021-04-19T21:45:29Z
```

```shell script
kubectl describe mv mv-4

...
Spec:
  Created By:  user1
  Image Repo:  modelhub/model1
  Model Name:  model1
  Storage:
    Local Storage:
      Node Name:  node1
      Path:       /foo
Status:
  Finish Time:        2021-04-19T21:45:29Z
  Image:              modelhub/model1:v1c072
  Image Build Phase:  ImageBuildSucceeded
  Message:            Image build succeeded.
```
## Tutorial
- An e2e tutorial from KubeDL training, model and serving. [Go->]({{< ref "docs/tutorial/tutorial" >}})
- An e2e video tutorial. [Go->]({{< ref "docs/tutorial/video" >}})
