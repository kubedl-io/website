---
title: "Startup flags"
description: "KubeDL startup flags"
lead: "KubeDL controller startup flags"
date: 2021-04-01T15:26:42-07:00
lastmod: 2021-04-01T15:26:42-07:00
draft: false
images: []
menu:
  docs:
    parent: "references"
weight: 200
toc: true
---

| Flag Name   |   Description    | Default |
|------------- |-------------| -----|
|controller-metrics-addr|The prometheus metrics endpoint for job stats| 8088
enable-leader-election | Enable leader election for controller manager. Enabling this will ensure there is only one active controller manager. | false
gang-scheduler-name |  The name of gang scheduler, by default it is set to empty meaning not enalbing gang scheduling | ""
max-reconciles |  The number of max concurrent reconciles of each controller | 1
