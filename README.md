# cdk-esbuild

_CDK constructs for [esbuild](https://github.com/evanw/esbuild), an extremely fast JavaScript bundler_

[Getting started](#getting-started) | [Documentation](#documentation) | [Versioning](#versioning)

## Why?

_esbuild_ is an extremely fast bundler and minifier for Typescript and JavaScript.
This package makes _esbuild_ available to deploy lambda functions, static websites or to publish build artefacts (assets) for further use.

CDK [supports _esbuild_ with lambdas](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html), but the implementation cannot be used for other things and doesn't expose all _esbuild_'s build interface.

## Getting started

Install `cdk-esbuild` and required peer dependencies:

```
npm install @mrgrain/cdk-esbuild @aws-cdk/core @aws-cdk/aws-s3-assets
```

### Lambda Function

Install the the lambda package:

```
npm install @aws-cdk/aws-lambda
```

Use `TypeScriptCode` as the `code` of a [Lambda Function](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Function.html#code):

```ts
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";
import { TypeScriptAsset } from "@mrgrain/cdk-esbuild";

const bundledCode = new TypeScriptCode("path/from/project/root/index.ts");

const fn = new lambda.Function(this, "MyFunction", {
  runtime: lambda.Runtime.NODEJS_14_X,
  handler: "index.handler",
  code: bundledCode,
});
```

### Static Website

> 💡 See [Static Website with React](examples/website) for a complete working example of a how to deploy a React app to S3.

Install the S3 deployment package:

```
npm install @aws-cdk/aws-s3-deployment
```

Use a `TypeScriptSource` as one of the `sources` of a [static website deployment](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-deployment-readme.html#roadmap):

```ts
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as path from "path";
import { TypeScriptAsset } from "@mrgrain/cdk-esbuild";

const websiteBundle = new TypeScriptSource("path/to/code/index.tsx");

const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
  autoDeleteObjects: true,
  publicReadAccess: true,
  removalPolicy: RemovalPolicy.DESTROY,
  websiteIndexDocument: "index.html",
});

new s3deploy.BucketDeployment(this, "DeployWebsite", {
  destinationBucket: websiteBucket,
  sources: [websiteBundle],
});
```

## Usage

The package exports four different types of constructs:

- `TypeScriptCode` & `JavaScriptCode` extending `lambda.Code` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Code.html)) \
  for use in lambda Functions

- `TypeScriptSource` & `JavaScriptSource` implementing `s3deploy.ISource` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-deployment-readme.html)) \
  for use in S3 bucket deployments

- `TypeScriptAsset` & `JavaScriptAsset` extending `s3.Asset` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-s3-assets.Asset.html)) \
  as a base for the above and generic use \
  ⚠️ Internal use only! Will be made available in an upcoming version (Target: 1.95.0)

- `EsbuildBundling` implementing `core.BundlingOptions` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.BundlingOptions.html)) \
  provides a _esbuild_ bundling interface wherever needed

### Props

- `props.entrypoint` & `entrypoint` \
  Relative path to the entrypoint file of your code from the root of the project. See `props.projectRoot`.

- `projectRoot` \
  Absolute path to the root of the project for the asset. If not set, will attempt to guess the root path using a basic algorithm. The combination of `projectRoot + entrypoint` must always be a valid absolute path. \
  Often the easiest way to set `projectRoot` is to use a combination of `resolve` and `__dirname` (see below).

> ### ⚠️ For library authors
>
> When developing a library, it's strongly recommended to set `projectRoot`. The easiest way to do this, is to resolve based on the directory name of the file:
>
> ```ts
> const props = {
>   projectRoot: resolve(__dirname),
> };
> ```
>
> This will dynamically resolve to the correct path, wherever the package is installed.

- `forceDockerBundling` \
  Force the asset to use Docker bundling and skip local bundling. This can be useful in CI environments. The `projectRoot` path will be mounted into the container as context.

- `buildOptions` as per esbuild [(reference)](https://esbuild.github.io/getting-started/#build-scripts) \
  Regular defaults apply, with a few changes as noted below. Generally speaking overwriting entrypoint or output options is not supported, as these are inferred from cdk.

### `TypeScriptCode`, `JavaScriptCode`

_Currently these classes are identical and simply an alias for each other. However, it is encouraged to use the appropriate class, as functionality might diverge in future releases._

**Defaults**

- `bundle=true`
- `platform=node`
- `target=nodeX` with `X` being the major node version running the code

### `TypeScriptSource`, `JavaScriptSource`

_Currently these classes are identical and simply an alias for each other. However, it is encouraged to use the appropriate class, as functionality might diverge in future releases._

**Defaults**

- `bundle=true`
- `platform=browser`
- `--define:process.env.NODE_ENV=\\\"production\\\"` or actual value of `NODE_ENV` if set

### `TypeScriptAsset`, `JavaScriptAsset`

_Currently these classes are identical and simply an alias for each other. However, it is encouraged to use the appropriate class, as functionality might diverge in future releases._

**Defaults**

- `bundle=true`

### `EsbuildBundling`

Low-level class that can be used where a `BundlingOptions` are required. This class only handles the local und Docker-based bundling and provides little to no validation.

## Versioning

**Status: Experimental**

_Because this package builds on APIs that are marked experimental, it also has to be considered experimental._

The package tracks the **minor** version number of CDK releases. It might work with newer versions of CDK, but has not been tested. Features changes, including breaking changes, will only be introduced alongside minor releases.

**Patches releases** will contain fixes to this library only and do not necessarily reflect CDK patches.

### Future & aws-cdk 2

With the monolithic version 2 of aws-cdk (aka mono-cdk) fast approaching, versioning for this library will change as well.

A major 2.0 release will be marked alongside the aws-cdk. However from that point on, this package will use _semantic versioning_ and not longer align version numbers with aws-cdk. New major versions will appear with breaking changes, including updated of minimum (peer) dependencies.

I also hope to be able to drop the _experimental_ status, but we will see about this. A lot hinges on the relevant cdk packages here.
