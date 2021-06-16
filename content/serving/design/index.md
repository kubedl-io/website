---
title: "Design"
description: "Design"
lead: ""
date: 2021-06-14T15:22:20+01:00
lastmod: 2020-06-16T15:22:20+01:00
draft: false
images: []
menu:
  model:
    parent: "intro"
weight: 200
toc: true
---
This diagram illustrates the workflow from model generation to inference service deployment.

{{< img src="design.png" alt="design" caption="Workflow" >}}

- A Inference CRD describes which inference framework is adopted, predictor(s) template with its served model-version and inference-related polices, such as auto-scaling, batching...

- The Inference Controller watches the Inference CRD and does the following steps.
  1. Retrieve latest Inference object and creates entry(incluster-dns host) for accessing inference.
  2. Create predictors embedded in inference specification, set framework-related spec and create an deployment for each, .
  3. Each deployment will be injected a model-loader init container to load model artifacts from previously build image, a inference service can serve more than one model version at a time, user is able to speficy traffic percentage of each predictor.
  4. Sync traffic distribution via istio virtual service if inference has more than one predictor.
  5. More features are upcoming... see our [ROADMAP](https://github.com/alibaba/kubedl/projects/1) for details.