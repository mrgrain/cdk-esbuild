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

### Lambda function

Install the the lambda package:

```
npm install @aws-cdk/aws-lambda
```

Use `TypeScriptCode` as the `code` of a [lambda function](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Function.html#code):

```ts
import * as lambda from "@aws-cdk/aws-lambda";
import { TypeScriptAsset } from "@mrgrain/cdk-esbuild";

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
import { TypeScriptAsset } from "@mrgrain/cdk-esbuild";

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

_Code and Source constructs seamlessly plugin to high-level CDK features. They share the same set of parameters, props and build options:_

- ⚙ `TypeScriptCode` & `JavaScriptCode` implements `lambda.Code` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Code.html)) \
  for use in lambda functions

- 🧺 `TypeScriptSource` & `JavaScriptSource` implements `s3deploy.ISource` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-deployment-readme.html)) \
  for use in S3 bucket deployments

<!-- - `TypeScriptAsset` & `JavaScriptAsset` extending `s3.Asset` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-s3-assets.Asset.html)) \
  as a base for the above and generic use \
  ⚠️ Internal use only! Will be made available in an upcoming version (Target: 1.95.0) -->

_Bundling powers all other features. You normally won't have to use it, but it's there if you need it:_

- 📦 `EsbuildBundling` implements `core.BundlingOptions` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.BundlingOptions.html)) \
  provides a _esbuild_ bundling interface wherever needed

## `TypeScriptCode`, `JavaScriptCode`

> ℹ️ _Although these classes are currently identical, please use the appropriate class as functionality might diverge in future releases._

**Default build options:**

- `bundle=true`
- `platform=node`
- `target=nodeX` with `X` being the major node version running the code

### Parameters

- `entryPoints: string | string[]` \
  A single or list of relative paths to the entry points of your code from the root of the project.

### Props

- `props.buildOptions` as per esbuild [(reference)](https://esbuild.github.io/getting-started/#build-scripts) \
  **All build options are optional.** \
  Same defaults and functionalities apply, with a few changes as noted below. Generally speaking usage of entry and output options are different, as these are inferred by CDK.

- ❌ `buildOptions.entrypoints` \
  _Not available. Option is exposed as parameter._

- `buildOptions.outdir: string` \
  The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
  For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory.

- `buildOptions.absWorkingDir: string` \
  Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory).\
  Docker-based builds also use this path to mount local files into the container. A large `absWorkingDir` can slow down the Docker build. \
  If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set `absWorkingDir` is to use a combination of `resolve` and `__dirname` (see "A note for library authors" below).

> ### ⚠️ A note for library authors
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

- `props.forceDockerBundling: boolean (false)` \
  Force use of Docker bundling and skip local bundling. This can be useful in CI environments. The `absWorkingDir` path (or current working directory) will be mounted into the container as context. By default bundling with a locally installed binary is preferred and Docker will only be used if the local bundling fails.

## `TypeScriptSource`, `JavaScriptSource`

> ℹ️ _Although these classes are currently identical, please use the appropriate class as functionality might diverge in future releases._

**Default build options:**

- `bundle=true`
- `platform=browser`
- `--define:process.env.NODE_ENV=\\\"production\\\"` or actual value of `NODE_ENV` if set

> 💡 See [Static Website with React](examples/website) for a complete working example of a how to deploy a React app to S3.

### Parameters & Props

_Code and Source constructs share the same set of parameters, props and build options. Please see above for details._

<!-- ### `TypeScriptAsset`, `JavaScriptAsset`

_Currently these classes are identical and simply an alias for each other. However, it is encouraged to use the appropriate class, as functionality might diverge in future releases._

**Defaults**

- `bundle=true` -->

## `EsbuildBundling`

**⚠️ Status: Experimental**

Low-level class that can be used where a `BundlingOptions` are required. This class provides the local und Docker-based bundling but doesn't come with any kind of safeguards.

#### Parameters

- `buildOptions` \
  All esbuild options are available, with adapted functionality as described above.

- `props.localBundling: boolean (true)` \
  Use bundling with the locally installed esbuild binary over the Docker build.

- `props.copyDir?: string` \
  Copy additional files to the output directory, before the build runs.

- `props.esbuildVersion?: string` \
  _Docker build only._ A npm compatible version constraint. If not provided will attempt to read from a `package-lock.json` or `package.json` in the `absWorkingDir`. Otherwise uses the constraint provided by this package (usually `^0.x.0`).

## Versioning

**⚠️ Status: Experimental**

_Because this package builds on CDK APIs that are marked experimental, it also has to be considered experimental._

The package tracks the **minor** version number of CDK releases. It might work with newer versions of CDK, but has not been tested. Features changes, including breaking changes, will only be introduced alongside minor releases.

**Patches releases** will contain fixes to this library only and do not necessarily reflect CDK patches.

### Future & AWS CDK v2

With the monolithic version 2 of CDK (aka Mono-CDK) approaching fast, versioning for this library will change as well.

A major 2.0 release will be marked alongside CDK. However from that point on, this package will use _semantic versioning_ and not longer align version numbers with AWS CDK. New major versions will appear with breaking changes, including updated of minimum (peer) dependencies.

I also hope to be able to drop the _experimental_ status, but we will see about this. A lot hinges on the relevant CDK packages here.
