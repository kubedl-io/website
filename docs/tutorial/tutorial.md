
This tutorial will walk through [KubeDL Training](docs/training/intro.md), [KubeDL Model](docs/model/intro.md) and [KubeDL Serving](docs/serving/intro.md) concepts.

## Install KubeDL

Follow the instructions to install KubeDL. [Go →](docs/installation/install-using-yaml.md)

## Setup docker credential

The docker credential is required for KubeDL Model to store the model image.
This step is not needed if you don't use KubeDL model. This tutorial will use it.

Follow the setup instruction to setup docker credential. [Go →](docs/model/setup.md)

## Run a job to train a model

This example trains a mnist model using distributed TensorFlow. From project root, run:

```bash
kubectl apply -f example/tf/tf_job_mnist_modelversion.yaml
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
        # The mounted path inside the container.
        # The training code is expected to export the model under this path, such as storing the tensorflow saved_model.
        mountPath: /kubedl-model
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

This example stores the trained model artifacts at a hostpath, in this case `/models/mymodelv1`. KubeDL will
create an image that includes those model artifacts and push that to the dockerhub.

Notes：
1. `modelVersion` field defines where the modelVersion is stored. Currently, local hostpath and NFS are supported.
2. `mountPath` defines the path where the external storage is mounted. The training code should export the model artifacts such as the TensorFlow saved_model under this path.
Check the [documentation](docs/model/usage.md) for more details


## Inspect the job

After the job succeeded, run:

```bash
$ kubectl get tfjob
NAME              STATE       AGE   TTL-AFTER-FINISHED   MAX-LIFETIME   MODEL-VERSION
tf-distributed    Succeeded   45s                                       mv-tf-distributed
```

Here, a ModelVersion named `mv-tf-distributed` is created.

The naming convention of the ModelVersion is to prepend the `mv` to the job name as such: `mv-<JobName>`

## Inspect the model version

There are [`Model` and `ModelVersion`](docs/model/intro.md) . In short, `Model` associates with multiple `ModelVersion`s.

Inspect the model version

```bash
$ kubectl get mv
NAME                   MODEL     IMAGE                    CREATED-BY       FINISH-TIME
mv-tf-distributed      mymodel   jianhe6/mymodel:vf812c   tf-distributed   2021-07-24T00:39:02Z
```

ModelVersion `mv-tf-distributed` belongs to model `mymodel`. The model image is `jianhe6/mymodel:vf812c`.
It is created by job `tf-distributed` at `2021-07-24T00:39:02Z`


## Run the job again

This time suppose we made some changes to the training code. We then change the job name to `tf-distributed-2` and
change the `modelVersion.localStorage.path` field to `/models/mymodelv2`, so that the new model version will be stored at hostpath `/models/mymodelv2` and not colliding with `/models/mymodelv1`

Run it again with `kubectl apply -f kubectl apply -f example/tf/tf_job_mnist_modelversion.yaml`.

Once the job finishes, we get below output:

Two jobs, each has its own model version.
```bash
$ kubectl get tfjob
NAME               STATE       AGE     TTL-AFTER-FINISHED   MAX-LIFETIME   MODEL-VERSION
tf-distributed     Succeeded   3m57s                                       mv-tf-distributed
tf-distributed-2   Succeeded   24s                                         mv-tf-distributed-2
```

Check the model version. We get two. Each has its own generated model image.

```bash
$ kubectl get mv
NAME                    MODEL     IMAGE                    CREATED-BY         FINISH-TIME
mv-tf-distributed       mymodel   jianhe6/mymodel:vf812c   tf-distributed     2021-07-24T00:39:02Z
mv-tf-distributed-2     mymodel   jianhe6/mymodel:vc73be   tf-distributed-2   2021-07-24T00:42:28Z
```

Now, check the model,

```bash
$ kubectl get model
NAME      LATEST-VERSION          LATEST-IMAGE
mymodel   mv-tf-distributed-2     jianhe6/mymodel:vc73be
```
The model named `mymodel`, has the latest model version named ` model-version-tf-distributed-2`, and its latest model image is `jianhe6/mymodel:vc73be`

Deleting the model will delete all its model versions.

## Inspect the model image content

Download the model image and inspect its contents. The model artifacts will be under `/kubedl-model`.

Run `docker run -it jianhe6/mymodel:vc73be /bin/sh`, and then run `ls /kubedl-model` inside the container:

```bash
$ ls /kubedl-model/1627086141
assets          saved_model.pb  variables
```
Here, the `1627086141/` parent folder is created by the training code as its version id.


## Serve the model

Run an Inference workload

```bash
kubectl apply -f example/tf/tf_serving_modelversion.yaml
```
The YAML content looks like below:

```yaml
apiVersion: serving.kubedl.io/v1alpha1
kind: Inference
metadata:
  name: hello-inference
spec:
  framework: TFServing
  predictors:
    - name: model-predictor
      # The model version to be served
      modelVersion: mv-tf-distributed-5f4c7
      # The model path where the model is mounted inside the container,
      # it should be the same as the tensorflow serving model_base_path
      modelPath: /kubedl-model
      replicas: 1
      batching:
        batchSize: 32
      template:
        spec:
          containers:
            - name: tensorflow
              args:
                - --port=9000
                - --rest_api_port=8500
                - --model_name=mnist
                # This should be the same as modelPath field.
                - --model_base_path=/kubedl-model/
              command:
                - /usr/bin/tensorflow_model_server
              image: tensorflow/serving:1.11.1
              imagePullPolicy: IfNotPresent
              ports:
                - containerPort: 9000
                - containerPort: 8500
              resources:
                limits:
                  cpu: 2048m
                  memory: 2Gi
                requests:
                  cpu: 1024m
                  memory: 1Gi
```
Note that the `--model_base_path` option of TensorFlow serving needs to be the same as the `modelPath` spec in the field,
which indicates where the model is mounted into the container.

Inspect the Inference workload state

```bash
kubectl get inference
```
