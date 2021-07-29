---
title: "Web Console"
description: "A Web Console for KubeDL"
lead: "KubeDL provides a web console for viewing and submitting jobs."
date: 2021-04-07T15:35:16-07:00
lastmod: 2021-04-07T15:35:16-07:00
draft: false
images: []
menu:
  docs:
    parent: "recipes"
weight: 700
toc: true
---

{{< img src="blurred.png" alt="console" caption="KubeDL console" class="border-0">}}


KubeDL console consists of a frontend and a backend. Below documentation describes how to build and run them.

## Prerequisites

- NodeJS > 10
- Go > 1.12

## Development

### Build Backend Server
```bash
$ cd console/
$ go build -o backend-server ./backend/cmd/backend-server/main.go
```

### Run Backend Server Locally

1. Create a `kubedl-system` namespace in your Kubernetes if not existing, this is required to create system-level ConfigMaps.
2. Make sure the backend-server uses a `KUBECONFIG` that has permission to create ConfigMap.
2. Run backend server with no authentication (default mode).
    ```bash
    export KUBECONFIG=<path/to/your/kubeconfig> && ./backend-server
    ```

#### Optional Settings
1. Default Training Container Images

    You can set the default container images for submitting the training jobs through web console by creating a `ConfigMap`
    named `kubedl-console-config` in `kubedl-system` namespace as below:
    ``` yaml
     apiVersion: v1
     kind: ConfigMap
     metadata:
         namespace: kubedl-system
         name: kubedl-console-config #
     data:
         images: '{
             "tf-cpu-images":[
               "here set your default container image",
               ...
             ],
            "tf-gpu-images":[
               ...
            ],
            "pytorch-gpu-images":[
               ...
            ]
         }'
    ```

2. Authentication

    By default, the backend-server has no authentication.
    Optionally, you can enable authentication using ConfigMap. That is, use `username` and `password` defined in ConfigMap and to login.

    The backend-server needs to start as `./backend-server --authentication-mode=config`.
    For example, create a ConfigMap like below:

    ``` yaml
    apiVersion: v1
     kind: ConfigMap
     metadata:
         namespace: kubedl-system
         name: kubedl-console-config
     data:
        images:
               ...
        users: '[
            {
            "username":"admin",
            "password":"123456"
            }
        ]'
    ```
    When login to the frontend, use `admin` for username and `123456` for password to login.

### Run Frontend

1. Go to the frontend root dir.
    ```bash
    cd frontend/
    ```

2. Install dependencies
    ```bash
    npm install
    ```
3. Build Frontend Server
    ```bash
    npm run build
    ```
4. Start Frontend Server

    ```bash
    npm start
    ```

#### Optional: Set backend server address

1. Use below config to set the backend-server address.

    Path: console/frontend/config/config.js
    ```javascript
      proxy: [
        {
          target: "http://localhost:9090",
          ...
        }
      ]
    ```

Change the target to your own backend server address. By default, it is `localhost:9090`.



### Editor Tool Recommandation

VSCode + ESlint(Plugin)

VSCode Configuration:
```javascript
{
    "eslint.run": "onSave",
    "eslint.format.enable": true,
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```
