# Go Lambda example

This is an example how to create a Node.js Lambda Function using cdk-esbuild and Go.

All features are available, but refer to the specific [Go usage instructions](https://github.com/mrgrain/cdk-esbuild#python-net-go) for further details.

## Getting started

Install all dependencies:

```console
go mod tidy
```

You can now run the CDK app:

```bash
cdk synth
```

### Install esbuild locally (optional, but recommended)

Inside your Go project, run the following command to install a local version of esbuild:

```console
npm install esbuild
```

This will create a `package.json` and `package-lock-json` file in your project root.
These files should be committed to version control.

In automated builds, add `npm ci` as an additional setup step.

### Testing your code

To execute the provided example test, simply run:

```console
go test
```
