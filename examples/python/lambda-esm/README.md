
# CDK Python Lambda ESM example

This is an example how to create a Node.js ESM Lambda Function using cdk-esbuild and Python.

All features are available, but refer to the specific [Python usage instructions](https://github.com/mrgrain/cdk-esbuild#python-and-dotnet) for further details.

## Getting started

To set up a new virtualenv, run:

```console
python3 -m venv .venv
```

Then activate the venv and install all dependencies:

```console
source .venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
```

You can now run the CDK app:

```bash
cdk synth
```

### Install esbuild locally (optional, but recommended)

Inside the Python package, run the following command to install a local version of esbuild:

```console
npm install esbuild
```

This will create a `package.json` and `package-lock-json` file in your project root.
These files should be committed to version control.

In automated builds, add `npm ci` as an additional setup step.

### Testing your code

To execute the provided example test, simply run:

```console
pytest
```
