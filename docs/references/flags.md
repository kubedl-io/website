---
sidebar_position: 2
---
# KubeDL Controller Startup Flags

| Flag Name   |   Description    | Default |
|------------- |-------------| -----|
|controller-metrics-addr|The prometheus metrics endpoint for job stats| 8088
enable-leader-election | Enable leader election for controller manager. Enabling this will ensure there is only one active controller manager. | false
gang-scheduler-name |  The name of gang scheduler, by default it is set to empty meaning not enabling gang scheduling.Empty means not enabling gang scheduling. Supported values are kube-coscheduler, kube-batch. | ""
max-reconciles |  The number of max concurrent reconciles of each controller | 1
