---
title: "Mpi"
description: ""
lead: "Run MPI job on Kubernetes."
date: 2021-09-26T00:09:10+08:00
lastmod: 2021-09-26T00:09:10+08:00
draft: flase
images: []
menu:
  docs:
    parent: "workloads"
weight: 999
toc: true
---

## Example

MPIJob need some specific permission to run. First, apply the following yaml to create rbac resources.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: mpijob
  namespace: kubedl
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - pods/exec
  verbs:
  - create
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: mpijob
  namespace: kubedl
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: mpijob
subjects:
- kind: ServiceAccount
  name: mpijob
  namespace: kubedl
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: mpijob
  namespace: kubedl
```

Then apply the following yaml to create a MPIJob. Which is a tensorflow-benchmarks using horovod as the distributed training framework. The launcher-runs-workloads arg's default value is true in kubedl, so the np is 3 and launcher pod requests the gpu resources.

```yaml
apiVersion: training.kubedl.io/v1alpha1
kind: MPIJob
metadata:
  name: tensorflow-benchmarks
  namespace: kubedl
spec:
  slotsPerWorker: 1
  cleanPodPolicy: Running
  mpiReplicaSpecs:
    Launcher:
      replicas: 1
      template:
         spec:
           serviceAccountName: mpijob # using the sa created above
           containers:
           - image: kubedl/tensorflow-benchmarks:latest
             name: tensorflow-benchmarks
             command:
             - mpirun
             - --allow-run-as-root
             - -np
             - "3"
             - -bind-to
             - none
             - -map-by
             - slot
             - -x
             - NCCL_DEBUG=INFO
             - -x
             - LD_LIBRARY_PATH
             - -x
             - PATH
             - -mca
             - pml
             - ob1
             - -mca
             - btl
             - ^openib
             - python
             - scripts/tf_cnn_benchmarks/tf_cnn_benchmarks.py
             - --model=resnet101
             - --batch_size=64
             - --variable_update=horovod
             resources:
              limits:
                nvidia.com/gpu: 1
    Worker:
      replicas: 2
      template:
        spec:
          containers:
          - image: kubedl/tensorflow-benchmarks:latest
            name: tensorflow-benchmarks
            resources:
              limits:
                nvidia.com/gpu: 1
```

You can inspect the logs to see the training progress. When the job starts, access the logs from the launcher pod:

```
kubectl logs -f tensorflow-benchmarks-launcher  -n kubedl
```

```
+ POD_NAME=tensorflow-benchmarks-worker-0
+ shift
+ /opt/kube/kubectl exec tensorflow-benchmarks-worker-0 -- /bin/sh -c     PATH=/usr/local/bin:$PATH ; export PATH ; LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH ; export LD_LIBRARY_PATH ; DYLD_LIBRARY_PATH=/usr/local/lib:$DYLD_LIBRARY_PATH ; export DYLD_LIBRARY_PATH ;   /usr/local/bin/orted -mca ess "env" -mca ess_base_jobid "844890112" -mca ess_base_vpid 1 -mca ess_base_num_procs "3" -mca orte_node_regex "tensorflow-benchmarks-launcher,tensorflow-benchmarks-worker-[1:0-1]@0(3)" -mca orte_hnp_uri "844890112.0;tcp://10.199.237.61:37649" -mca pml "ob1" -mca btl "^openib" -mca plm "rsh" --tree-spawn -mca orte_parent_uri "844890112.0;tcp://10.199.237.61:37649" -mca plm_rsh_agent "/etc/mpi/kubexec.sh" -mca orte_default_hostfile "/etc/mpi/hostfile" -mca hwloc_base_binding_policy "none" -mca rmaps_base_mapping_policy "slot" -mca pmix "^s1,s2,cray,isolated"
+ POD_NAME=tensorflow-benchmarks-worker-1
+ shift
+ /opt/kube/kubectl exec tensorflow-benchmarks-worker-1 -- /bin/sh -c     PATH=/usr/local/bin:$PATH ; export PATH ; LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH ; export LD_LIBRARY_PATH ; DYLD_LIBRARY_PATH=/usr/local/lib:$DYLD_LIBRARY_PATH ; export DYLD_LIBRARY_PATH ;   /usr/local/bin/orted -mca ess "env" -mca ess_base_jobid "844890112" -mca ess_base_vpid 2 -mca ess_base_num_procs "3" -mca orte_node_regex "tensorflow-benchmarks-launcher,tensorflow-benchmarks-worker-[1:0-1]@0(3)" -mca orte_hnp_uri "844890112.0;tcp://10.199.237.61:37649" -mca pml "ob1" -mca btl "^openib" -mca plm "rsh" --tree-spawn -mca orte_parent_uri "844890112.0;tcp://10.199.237.61:37649" -mca plm_rsh_agent "/etc/mpi/kubexec.sh" -mca orte_default_hostfile "/etc/mpi/hostfile" -mca hwloc_base_binding_policy "none" -mca rmaps_base_mapping_policy "slot" -mca pmix "^s1,s2,cray,isolated"

...

50      images/sec: 68.2 +/- 0.1 (jitter = 0.7) 8.347
50      images/sec: 68.2 +/- 0.1 (jitter = 0.7) 8.333
50      images/sec: 68.2 +/- 0.1 (jitter = 0.6) 8.381
60      images/sec: 68.1 +/- 0.1 (jitter = 0.7) 8.298
60      images/sec: 68.1 +/- 0.1 (jitter = 0.6) 8.441
60      images/sec: 68.1 +/- 0.1 (jitter = 0.7) 8.320
70      images/sec: 68.0 +/- 0.1 (jitter = 0.6) 8.393
70      images/sec: 68.0 +/- 0.1 (jitter = 0.6) 8.268
70      images/sec: 68.0 +/- 0.1 (jitter = 0.6) 8.331
80      images/sec: 68.0 +/- 0.1 (jitter = 0.6) 8.373
80      images/sec: 68.0 +/- 0.1 (jitter = 0.6) 8.356
80      images/sec: 68.0 +/- 0.1 (jitter = 0.6) 8.112
90      images/sec: 67.9 +/- 0.1 (jitter = 0.5) 8.313
90      images/sec: 67.9 +/- 0.1 (jitter = 0.5) 8.231
90      images/sec: 67.9 +/- 0.1 (jitter = 0.5) 8.362
100     images/sec: 67.9 +/- 0.1 (jitter = 0.5) 8.255
----------------------------------------------------------------
total images/sec: 203.64
----------------------------------------------------------------
100     images/sec: 67.9 +/- 0.1 (jitter = 0.5) 8.215
----------------------------------------------------------------
total images/sec: 203.63
----------------------------------------------------------------
100     images/sec: 67.9 +/- 0.1 (jitter = 0.5) 8.466
----------------------------------------------------------------
total images/sec: 203.64
----------------------------------------------------------------

```


## Spec
Check the CRD definition. [Go ->](https://github.com/alibaba/kubedl/blob/master/apis/training/v1alpha1/mpijob_types.go)
