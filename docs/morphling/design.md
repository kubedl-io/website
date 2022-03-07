---
sidebar_position: 6
---

# Design

This diagram illustrates the workflow of a `ProflingExperiment`.

![morphlingui](/img/tutorial/morphling/imple.png)


- A user submits a `ProflingExperiment` via a RPC or front-end UI interface, specifying the ML model, tunable configuration parameters, optimization objectives, and sampling budgets.

- Within the sampling budget, Morphling iteratively communicates with the algorithm server to get the next configuration for sampling.

- Then Morphling starts a `Trial` to evaluate that sampling.

- For each `Trial`, a model serving inference instance `Deployment` is launched, and its “readiness” is reported to trigger a client-side RPS stress-test `Job`.

- After the client `Job` completes, the measured peak RPS is stored in the `DB`.

- A `Trial` finishes, and the result is sent to the `ProflingExperiment`.

- The `ProflingExperiment` completes when the sampling budget is reached.

The sequence diagram of the ProflingExperiment workfolow is shown as follows:

![morphlingui](/img/tutorial/morphling/workflow.png)

