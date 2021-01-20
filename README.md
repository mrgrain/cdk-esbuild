# cdk-esbuild

_CDK constructs for [esbuild](https://github.com/evanw/esbuild), an extremely fast JavaScript bundler_

[Getting started](#getting-started) | [Documentation](#documentation) | [Versioning](#versioning)

## Why?

_esbuild_ is an extremely fast bundler and minifier for Typescript and JavaScript. CDK ships out-of-the-box with support for [Lambdas bundled using _esbuild_](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html), however not all of _esbuild_'s interface is supported. This package also provides additional abstractions that can be used independently from a Lambda construct.

**Whenever possible, I'd recommend to use the official CDK package.**

## Getting started

Install `cdk-esbuild` and required peer dependencies:

```
npm install @mrgrain/cdk-esbuild @aws-cdk/core @aws-cdk/aws-lambda
```

Create a new `TypeScriptAsset` to be used as the `code` prop of a [Lambda Function](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Function.html#code):

```ts
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";
import { TypeScriptAsset } from "@mrgrain/cdk-esbuild";

const bundledCode = new TypeScriptAsset("path/from/project/root/index.ts");

const fn = new lambda.Function(this, "MyFunction", {
  runtime: lambda.Runtime.NODEJS_12_X,
  handler: "index.handler",
  code: bundledCode,
});
```

## Documentation

The package exports two different types of classes:

- `TypeScriptAsset` & `JavaScriptAsset` extending `lambda.Code` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Code.html))

- `Bundling` implementing `core.BundlingOptions` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.BundlingOptions.html))

### `TypeScriptAsset`, `JavaScriptAsset`

_Currently these classes are identical and simply an alias for each other. However, it is encouraged to use the appropriate class, as functionality might diverge in future releases._

### `Bundling`

Low-level class that can be used where a `BundlingOptions` are required. This class only handles the local und Docker-based bundling and provides little to no validation.

## Versioning

**Status: Experimental**

_Because this package builds on APIs that are marked experimental, it also has to be considered experimental._

The package tracks the **minor** version number of CDK releases. It might work with newer versions of CDK, but has not been tested. Features changes will only be introduced alongside minor releases.

**Patches releases** will contain fixes to this library only and do not necessarily reflect CDK patches.
