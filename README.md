## Website
https://kubedl.io

This website is built using [Hugo](https://gohugo.io/) and uses the [Doks hugo theme](https://getdoks.org/).

This git repo is based off the example [Doks git repo](https://github.com/h-enk/doks).

## Requirements

Use npm to install dependencies and run commands. Installing npm is pretty simple. Download and install [Node.js](https://nodejs.org/) (it includes npm) for your platform.

## Get started

### 1. Clone the repo

```bash
git clone https://github.com/jian-he/website.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run start
```

### 4. Make your content changes
The result will be refreshed in real-time at http://localhost:1313

### 5. Add a file
For example:
```bash
hugo new docs/recipes/hostnetwork.md
```
## Other commands

Doks comes with [commands](https://getdoks.org/docs/prologue/commands/) for common tasks.

## Documentation

- [Hugo](https://gohugo.io/documentation/)
- [Doks](https://getdoks.org/)

## Communities

- [Hugo Forums](https://discourse.gohugo.io/)
- [Doks Discussions](https://github.com/h-enk/doks/discussions)

## FAQ

### `index.md` vs `_index.md`
Throughout the repo, you will see `index.md` and `_index.md` files.

`_index.md` is added in the `branch`  folder, e.g. the `prologue/_index.md` lists the files under that `prologue` menu.

`index.md` is added in the `leaf` foler, e.g. `workloads/mars/index.md`.

See the [doc](https://gohugo.io/content-management/page-bundles/#readout) for details
