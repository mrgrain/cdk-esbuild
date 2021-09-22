# cdk-esbuild

_CDK constructs for [esbuild](https://github.com/evanw/esbuild), an extremely fast JavaScript bundler_

[Getting started](#getting-started) | [Documentation](#documentation) | [Versioning](#versioning)

## Why?

_esbuild_ is an extremely fast bundler and minifier for Typescript and JavaScript.
This package makes _esbuild_ available to deploy lambda functions, static websites or to publish build artefacts (assets) for further use.

AWS CDK [supports _esbuild_ with Lambda Functions](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html). However the implementation cannot be used with any other Constructs and doesn't expose all of _esbuild_'s build interface.

This package is running _esbuild_ directly in Node.js and bypasses Docker which the AWS CDK implementation uses. This makes it quicker and easier to use for Node.hs users, but incompatible for other languages.

## Getting started

Install `cdk-esbuild` and required peer dependencies:

```
npm install @mrgrain/cdk-esbuild @aws-cdk/core @aws-cdk/aws-s3-assets
```

### Lambda function

> 💡 See [Lambda Function](examples/lambda) for a complete working example of a how to deploy a lambda function.

Install the the lambda package:

```
npm install @aws-cdk/aws-lambda
```

Use `TypeScriptCode` as the `code` of a [lambda function](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Function.html#code):

```ts
import * as lambda from "@aws-cdk/aws-lambda";
import { TypeScriptCode } from "@mrgrain/cdk-esbuild";

const bundledCode = new TypeScriptCode("src/index.ts");

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

Use `TypeScriptSource` as one of the `sources` of a [static website deployment](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-deployment-readme.html#roadmap):

```ts
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import { TypeScriptSource } from "@mrgrain/cdk-esbuild";

const websiteBundle = new TypeScriptSource("src/index.tsx");

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

# Documentation

The package exports various different constructs for use with existing CDK features. A major guiding design principal for this package is to _extend, don't replace_. Expect constructs that you can provide as props, not complete replacements.

For use in **lambda functions**, the following classes implement `lambda.Code` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Code.html)):

- `TypeScriptCode` & `JavaScriptCode`
- `InlineTypeScriptCode` & `InlineJavaScriptCode`
- `InlineTsxCode` & `InlineJsxCode`

For use with **S3 bucket deployments**, classes implementing `s3deploy.ISource` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-deployment-readme.html)):

- 🧺 `TypeScriptSource` & `JavaScriptSource`

> _Code and Source constructs seamlessly plugin to high-level CDK features. They share the same set of parameters, props and build options:_

Underlying classes the power the other features. You normally won't have to use them, but they are there if you need them:

- `TypeScriptAsset` & `JavaScriptAsset` implements `s3.Asset` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-s3-assets.Asset.html)) \
  creates an asset uploaded to S3 which can be referenced by other constructs

- `EsbuildBundling` implements `core.BundlingOptions` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.BundlingOptions.html)) \
  provides a _esbuild_ bundling interface wherever needed

## `TypeScriptCode`, `JavaScriptCode`

> ℹ️ _Although these classes are currently identical, please use the appropriate class as functionality might diverge in future releases._

**Default build options:**

- `bundle=true`
- `platform=node`
- `target=nodeX` with `X` being the major node version running the code

### Parameters

- `entryPoints: string | string[] | Record<string, string>` \
  A single or list of relative paths to the entry points of your code from the root of the project.

### Props

- `props.buildOptions?` as per esbuild [(reference)](https://esbuild.github.io/getting-started/#build-scripts) \
  **All build options are optional.** \
  Same defaults and functionalities apply, with a few changes as noted below. Generally speaking usage of entry and output options are different, as these are inferred by CDK.

- ❌ `buildOptions.entryPoints` \
  _Not available. Option is exposed as parameter._

- `buildOptions.outdir: string` \
  The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
  For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
  _Cannot be used together with `outfile`._

- `buildOptions.outfile: string` \
  Relative path to a file inside the CDK asset output directory. \
  For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point.\
  _Cannot be used with multiple `entryPoints` or together with `outdir`._

- `buildOptions.absWorkingDir: string` \
  Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory).\
  Docker-based builds also use this path to mount local files into the container. A large `absWorkingDir` can slow down the Docker build. \
  If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set `absWorkingDir` is to use a combination of `resolve` and `__dirname` (see "A note for library authors" below).

> **⚠️ A note for library authors**
>
> When developing a library consumed by other packages, you'll most likely have to set `absWorkingDir`. The easiest way to do this, is to resolve based on the directory name of the file, and traverse the tree upwards to the root of your library package (that's where `package.json` and `tsconfig.json` are):
>
> ```ts
> // file: project/src/index.ts
> const props = {
>   buildOptions: {
>     absWorkingDir: path.resolve(__dirname, ".."), // now: /user/project
>   },
> };
> ```
>
> This will dynamically resolve to the correct path, wherever the package is installed.

- `props.copyDir?: string` \
  **⚠️ Experimental** - _Likely to change once esbuild supports this natively_ \
  Relative path to a directory copied to the output before the build is run (i.e esbuild will overwrite existing files).

- `props.bundlerPriority?: BundlerPriority (BundlerPriority.AttemptLocal)` \
  Set the priority order of available bundlers. It can be useful to limit use to one of the bundlers. For Docker, the `absWorkingDir` path (or current working directory) will be mounted into the container as context. By default bundling with a locally installed binary is attempted first and Docker will only be used if the local bundling fails.

## `TypeScriptSource`, `JavaScriptSource`

> ℹ️ _Although these classes are currently identical, please use the appropriate class as functionality might diverge in future releases._

**Default build options:**

- `bundle=true`
- `platform=browser`

> 💡 See [Static Website with React](examples/website) for a complete working example of a how to deploy a React app to S3.

### Parameters & Props

➡️ _Code and Source constructs share the same set of parameters, props and build options. Please see above for details._

## `InlineTypeScriptCode`, `InlineJavaScriptCode`, `InlineTsxCode`, `InlineJsxCode`

**⚠️ Status: Unstable**

An implementation of `lambda.InlineCode` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.InlineCode.html)) using the esbuild Transform API.
Inline function code is limited to 4 KiB _after_ transformation.

### Parameters

- `code: string` \
  The inline code to be transformed.

- `transformOptions: TransformOptions` \
  Options from the [esbuild Transform API](https://esbuild.github.io/api/#transform-api).

  **Default transform options:** \
  • `loader=ts|js|tsx|jsx` (one of `ts,js,tsx,jsx` depending on the used class)

## `TypeScriptAsset`, `JavaScriptAsset`

Bundles the entry points and creates a CDK asset which is uploaded to the bootstrapped CDK S3 bucket during deployment. The asset can be used by other constructs.

> ℹ️ _The high-level constructs for `TypeScriptSource` and `TypeScriptCode` (and respective JavaScript classes) actually just use this asset._

**Default build options:**

- `bundle=true`

### Parameters

- `scope: cdk.Construct`
- `id: string`
- `props: TypeScriptAssetProps|JavaScriptAssetProps`

### Props

- `props.entryPoints: string | string[] | Record<string, string>` \
  A single or list of relative paths to the entry points of your code from the root of the project.

- `props.copyDir?: string` \
   **⚠️ Experimental** - _Likely to change once esbuild supports this natively_ \
   Relative path to a directory copied to the output before the build is run (i.e esbuild will overwrite existing files).

- `props.bundlerPriority?: BundlerPriority (BundlerPriority.AttemptLocal)` \
  Set the priority order of available bundlers. It can be useful to limit use to one of the bundlers. For Docker, the `absWorkingDir` path (or current working directory) will be mounted into the container as context. By default bundling with a locally installed binary is attempted first and Docker will only be used if the local bundling fails.

- `props.buildOptions?` as per esbuild [(reference)](https://esbuild.github.io/getting-started/#build-scripts) \
  **All build options are optional.** \
  ➡️ See `TypeScriptCode` for detailed explanation on options.

## `EsbuildBundling`

**⚠️ Status: Unstable**

Low-level class that can be used where a `BundlingOptions` are required. This class provides the local und Docker-based bundling but doesn't come with any kind of safeguards.

### Parameters

- `buildOptions?` \
  All esbuild options are available, with adapted functionality as described above.

- `props.priority?: BundlerPriority (BundlerPriority.AttemptLocal)` \
  Priority order of available bundlers. Default `BundlerPriority.AttemptLocal` is to attempt using a locally installed binary first, retrying with Docker in case of failure. Can be set to only use either the local or Docker bundler.

- `props.copyDir?: string` \
  Copy additional files to the output directory, before the build runs.

- `props.esbuildVersion?: string` \
  _Docker build only._ A npm compatible version constraint. If not provided will attempt to read from a `package-lock.json` or `package.json` in the `absWorkingDir`. Otherwise uses the constraint provided by this package (usually `^0.x.0`).

## Versioning

**⚠️ Status: Unstable**

_Because esbuild is still in major version zero, this package must be considered unstable. Notably updates to the minimal version requirement of esbuild will be introduced in minor versions of this package and thus will contain any breaking changes esbuild introduces._

The package tracks the **minor** version number of CDK releases. It might work with newer versions of CDK, but has not been tested. Features changes, including breaking changes, will only be introduced alongside minor releases.

**Patches releases** will contain fixes to this library only and do not necessarily reflect CDK patches.

### Future & AWS CDK v2

With the monolithic version 2 of CDK (aka Mono-CDK) approaching fast, versioning for this library will change as well.

A major 2.0 release will be marked alongside CDK. From that point on, this package will mostly use _semantic versioning_ and not longer align version numbers with AWS CDK.

The big exceptions will be updates to the minimal version requirement of esbuild. As long as esbuild is still in major version zero, these requirement updates will be introduced as minor version updates.

Additionally any parts of the code marked as `unstable` can change at any time. Please note that the unstable flag is applied to new experimental feature and internal classes only.

In future, new major versions will appear with breaking changes, including updated of minimum (peer) dependencies.
