---
title: "How to Contribute"
description: "You are very welcome to contribute to KubeDL"
lead: ""
date: 2021-03-29T17:22:54-07:00
lastmod: 2021-03-29T17:22:54-07:00
draft: false
images: []
menu:
  docs:
    parent: "contributing"
weight: 200
toc: true
---
# Contributing to KubeDL

Welcome to KubeDL!
We encourage you to help out by reporting issues, improving documentation, fixing bugs, or adding new features.
Please also take a look at our code of conduct, which details how contributors are expected to conduct themselves as part of the KubeDL community.

## Developing Environment

As a contributor, if you want to make any contribution to KubeDL project, we should reach an agreement on the version of tools used in the development environment.
Here are some dependents with specific version:

- Golang : v1.13+ (1.14 is best)
- Kubernetes: v1.12+


## Developing guide

### Enable DCO

KubeDL has enabled [DCO](https://github.com/apps/dco).
Thus, you will need to sign-off your commits in your pull requests.
Git has a `-s` command line option that can sign-off your commit automatically:
```
git commit -s -m 'This is my commit message'
```

### Code Structure

KubeDL uses [KubeBuilder](https://github.com/kubernetes-sigs/kubebuilder) for scaffolding code.

KubeDL code base consists of several components:

{{< img src="codestructure.jpg" alt="code" caption="" class="border-0 rounded-circle">}}


### How to Build

There's a `Makefile` in the root folder which describes the options to build and install. Here are some common ones:

#### Build the binary

```bash
make manager
```
#### Run the tests

```bash
make test
```
#### Generate manifests: CRD, RBAC YAML files etc

```bash
make manifests
```
#### Build the docker image

Replace the image name to your own image

```bash
export IMG=kubedl/kubedl:v0.3.0 && make docker-build
```

#### Push the image

Change the image name to your own image.
```bash
docker push kubedl/kubedl:v0.3.0
```

#### Generate the helm chart

Generate the helm chart, the helm chart will be generated under [helm/kubedl](https://github.com/kubedl-io/kubedl/tree/master/helm/kubedl)
```bash
make helm-chart
```

### Git Preparation (Skip if you are familiar with Git)

To put forward a PR, we assume you have registered a GitHub ID.
Then you could finish the preparation in the following steps:

1. **Fork** the repository you wish to work on. You just need to click the button Fork in right-left of project repository main page. Then you will end up with your repository in your GitHub username.
2. **Clone** your own repository to develop locally. Use `git clone https://github.com/<your-username>/kubedl.git` to clone repository to your local machine. Then you can create new branches to finish the change you wish to make.
3. **Set remote** upstream to be `https://github.com/kubel-io/kubedl.git` using the following two commands:

```bash
git remote add upstream https://github.com/kubedl-io/kubedl.git
git remote set-url --push upstream no-pushing
```

Adding this, we can easily synchronize local branches with upstream branches.

4. **Create a branch** to add a new feature or fix issues

Update local working directory:

```bash
cd <project>
git fetch upstream
git checkout master
git rebase upstream/master
```

Create a new branch:

```bash
git checkout -b <new-branch>
```

Make any change on the new-branch then build and test your codes.

## Engage to help anything

### Reporting issues

We regard every user of KubeDL as a very kind contributor.
After experiencing KubeDL, you may have some feedback for the project.
Then feel free to open an issue.

There are lot of cases when you could open an issue:

- bug report
- feature request
- performance issues
- feature proposal
- feature design
- help wanted
- doc incomplete
- test improvement
- any questions on project
- and so on

Also we must remind that when filing a new issue, please remember to remove the sensitive data from your post.
Sensitive data could be password, secret key, network locations, private business data and so on.

### Code and doc contribution

The KubeDL website repo is hosted at [https://github.com/kubedl-io/website](https://github.com/kubedl-io/website).

Every action to make KubeDL better is encouraged.

- If you find a typo, try to fix it!
- If you find a bug, try to fix it!
- If you find some redundant codes, try to remove them!
- If you find some test cases missing, try to add them!
- If you could enhance a feature, please DO NOT hesitate!
- If you find code implicit, try to add comments to make it clear!
- If you find code ugly, try to refactor that!
- If you can help to improve documents, it could not be better!
- If you find document incorrect, just do it and fix that!
- ...

Although contributions via PR is an explicit way to help, we still call for any other ways.

- reply to other's issues if you could;
- help solve other user's problems;
- help review other's PR design;
- help review other's codes in PR;
- discuss about KubeDL to make things clearer;
- advocate KubeDL technology beyond GitHub;
- write blogs on KubeDL and so on.

In a word, **ANY HELP IS CONTRIBUTION**.

## Join KubeDL as a maintainer

You are welcome to join KubeDL maintainer team if you are willing to participate. Please contact one of us in the community.

### Some Requirements

- Have submitted multiple PRs to the community
- Be active in the community, may including but not limited
    - Submitting or commenting on issues
    - Contributing PRs to the community
    - Reviewing PRs in the community

