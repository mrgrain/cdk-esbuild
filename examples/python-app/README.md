
# CDK Python project example

This is an example how to use cdk-esbuild with Python.

All interfaces are available, but the esbuild binary must be available in path, see [esbuild docs for details](https://esbuild.github.io/getting-started/#install-esbuild).

## Getting started

To set up a new virtualenv, run

```bash
python3 -m venv .venv
```

Then activate the venv and install all dependencies:

```bash
source .venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
npm install -g esbuild
```

Run the CDK app providing the `CDK_ESBUILD_MODULE_PATH`:

```bash
CDK_ESBUILD_MODULE_PATH="$(npm prefix -g)/lib/node_modules/esbuild" cdk synth
```
