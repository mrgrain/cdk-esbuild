
# CDK Python project example

This is an example how to use cdk-esbuild with Python.

All interfaces are available, but the esbuild binary must be available in path, see [esbuild docs for details](https://esbuild.github.io/getting-started/#install-esbuild).

## Getting started

To set up a new virtualenv, run

```
$ python3 -m venv .venv
```

Then activate the venv and install all dependencies:

```
$ source .venv/bin/activate
$ pip install -r requirements.txt
$ npm install --location=global esbuild
```

Finally run the CDK app:

```
$ cdk synth
```