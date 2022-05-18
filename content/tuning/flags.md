---
title: "Startup flags"
description: "KubeDL startup flags"
lead: "Morphling controller startup flags"
date: 2021-04-01T15:26:42-07:00
lastmod: 2021-04-01T15:26:42-07:00
draft: false
images: []
menu:
  tuning:
    parent: "tuningreferences"
weight: 100
toc: true
---


| Flag Name|  Type | Description    | Default |
|----------|---------|-------------| -----|
|metrics-addr|string|The address the metric endpoint binds to| 8088
enable-leader-election |bool| Enable leader election for controller manager. Enabling this will ensure there is only one active controller manager. | false
enable-grpc-probe-in-suggestion |bool|  Enable Pod readiness/liveness probes in samplings | true
