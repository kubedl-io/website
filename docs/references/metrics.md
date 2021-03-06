---
sidebar_position: 2
---
# KubeDL Metrics


|    Metric Names     | label | Description    |
|    ------------     | ------ |  -----------    |
|    kubedl_jobs_created | kind  | Counts number of jobs created |
|    kubedl_jobs_deleted | kind  | Counts number of jobs deleted |
|    kubedl_jobs_successful | kind  |  Counts number of jobs successfully finished  |
|    kubedl_jobs_failed  | kind      |   Counts number of jobs failed  |
|    kubedl_jobs_restarted | kind   |   Counts number of jobs restarted  |
|    kubedl_jobs_running | kind     |   Counts number of jobs currently running  |
|    kubedl_jobs_pending | kind     |   Counts number of jobs currently pending  |
|    kubedl_jobs_first_pod_launch_delay_seconds | kind, name, namespace, uid |  Histogram for recording launch delay duration (from job created to first pod running)  |
|    kubedl_jobs_all_pods_launch_delay_seconds | kind, name, namespace, uid |  Histogram for recording launch delay duration (from job created to all pods running)   |

`label` specifics the labels supported for the corresponding prometheus metrics
- `kind` - the target job kind, e.g. TFJob, PyTorchJob, MarsJob, XGBoostJob
- `name` - the name of the job
- `namespace` - the namespace of the job
- `uid` - the uid of the job
