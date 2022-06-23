# cdk-esbuild

_CDK constructs for [esbuild](https://github.com/evanw/esbuild), an extremely fast JavaScript bundler_

[Getting started](#getting-started) | [Migrating to v3](#migrating-to-v3) |
[Documentation](#documentation) | [API Reference](#api-reference) | [Versioning](#versioning)

> This version is compatible with AWS CDK v2. For the previous, AWS CDK v1 compatible release, see [cdk-esbuild@v2](https://github.com/mrgrain/cdk-esbuild/tree/v2).

## Why?

_esbuild_ is an extremely fast bundler and minifier for Typescript and JavaScript.
This package makes _esbuild_ available to deploy lambda functions, static websites or to publish build artefacts (assets) for further use.

AWS CDK [supports _esbuild_ with Lambda Functions](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html). However the implementation cannot be used with any other Constructs and doesn't expose all of _esbuild_'s build interface.

This package is running _esbuild_ directly in Node.js and bypasses Docker which the AWS CDK implementation uses. The approach is quicker and easier to use for Node.js users, but incompatible with other languages.

**Production readiness**

This package is stable and ready to be used in production, as many do. However _esbuild_ has not yet released a version 1.0.0 and its API is still in active development. Please read the guide on [esbuild's production readiness](https://esbuild.github.io/faq/#production-readiness).

Notably upgrades of the _esbuild_ minimum version requirement will be introduced in **minor versions** of this package and will inherit breaking changes from _esbuild_.

## Getting started

Install `cdk-esbuild`:

```
npm install @mrgrain/cdk-esbuild@3
```

If _peer_ or _optional dependencies_ are not installed automatically (e.g. when using npm v4-6), please use this command to install all of them:

```
npm install @mrgrain/cdk-esbuild@3 esbuild
```

### AWS Lambda: Serverless function

> 💡 See [Lambda Function](examples/lambda) for a complete working example of a how to deploy a lambda function.

Use `TypeScriptCode` as the `code` of a [lambda function](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html#code):

```ts
import * as lambda from "aws-cdk-lib/aws-lambda";
import { TypeScriptCode } from "@mrgrain/cdk-esbuild";

const bundledCode = new TypeScriptCode("src/index.ts");

const fn = new lambda.Function(stack, "MyFunction", {
  runtime: lambda.Runtime.NODEJS_16_X,
  handler: "index.handler",
  code: bundledCode,
});
```

### AWS S3: Static Website

> 💡 See [Static Website with React](examples/website) for a complete working example of a how to deploy a React app to S3.

Use `TypeScriptSource` as one of the `sources` of a [static website deployment](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-deployment-readme.html#roadmap):

```ts
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { TypeScriptSource } from "@mrgrain/cdk-esbuild";

const websiteBundle = new TypeScriptSource("src/index.tsx");

const websiteBucket = new s3.Bucket(stack, "WebsiteBucket", {
  autoDeleteObjects: true,
  publicReadAccess: true,
  removalPolicy: RemovalPolicy.DESTROY,
  websiteIndexDocument: "index.html",
});

new s3deploy.BucketDeployment(stack, "DeployWebsite", {
  destinationBucket: websiteBucket,
  sources: [websiteBundle],
});
```

### Amazon CloudWatch Synthetics: Canary monitoring

> 💡 See [Monitored Website](examples/website) for a complete working example of a deployed and monitored website.

Synthetics runs a canary to produce traffic to an application for monitoring purposes. Use `TypeScriptCode` as the `code` of a Canary test:

> ℹ️ This feature depends on the `@aws-cdk/aws-synthetics-alpha` package which is a developer preview. You may need to update your source code when upgrading to a newer version of this package.
>
> ```
> npm i @aws-cdk/aws-synthetics-alpha
> ```

```ts
import * as synthetics from "@aws-cdk/aws-synthetics-alpha";
import { TypeScriptCode } from "@mrgrain/cdk-esbuild";

const bundledCode = new TypeScriptCode("src/index.ts", {
  buildOptions: {
    outdir: "nodejs/node_modules", // This is required by Synthetics
  },
});

const canary = new synthetics.Canary(stack, "MyCanary", {
  runtime: synthetics.Runtime.SYNTHETICS_NODEJS_PUPPETEER_3_2,
  test: synthetics.Test.custom({
    code: bundledCode,
    handler: "index.handler",
  });
});
```

## Documentation

The package exports various different constructs for use with existing CDK features. A major guiding design principal for this package is to _extend, don't replace_. Expect constructs that you can provide as props, not complete replacements.

For use in **Lambda Functions** and **Synthetic Canaries**, the following classes implement `lambda.Code` ([reference](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Code.html)) and `synthetics.Code` ([reference](https://docs.aws.amazon.com/cdk/api/v2/docs/@aws-cdk_aws-synthetics-alpha.Code.html)):

- `TypeScriptCode` & `JavaScriptCode`

Inline code is only supported by **Lambda**:

- `InlineTypeScriptCode` & `InlineJavaScriptCode`
- `InlineTsxCode` & `InlineJsxCode`

For use with **S3 bucket deployments**, classes implementing `s3deploy.ISource` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-deployment-readme.html)):

- `TypeScriptSource` & `JavaScriptSource`

> _Code and Source constructs seamlessly plug-in to other high-level CDK constructs. They share the same set of parameters, props and build options._

The following classes power the other features. You normally won't have to use them, but they are there if you need them:

- `TypeScriptAsset` & `JavaScriptAsset` implements `s3.Asset` ([reference](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3_assets.Asset.html)) \
  creates an asset uploaded to S3 which can be referenced by other constructs

- `EsbuildBundler` implements `core.BundlingOptions` ([reference](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.BundlingOptions.html)) \
  provides an interface for a _esbuild_ bundler wherever needed

### [API Reference](API.md)

Auto-generated reference for classes and structs. This information is also available as part of your IDE's code completion.

### Escape hatches

It's possible that you want to use an implementation of esbuild that's different to the default one. Common reasons are:

- The current version constraints for esbuild are not suitable
- To use a version of esbuild that is installed by any other means than `npm`, including Docker
- Plugin support is needed for building

For these situations, this package offers an escape hatch to bypass regular the implementation and provide a custom build and transform function.

#### Esbuild binary path

It is possible to override the binary used by esbuild. The usual way to do this is to set the `ESBUILD_BINARY_PATH` environment variable. For convenience this package allows to set the binary path as a prop:

```ts
new TypeScriptCode("fixtures/handlers/ts-handler.ts", {
  esbuildBinaryPath: "path/to/esbuild/binary"
});
```

#### Custom build function

> 💡 See [Using esbuild with plugins](examples/esbuild-with-plugins) for a complete working example of a custom build function using this escape hatch.

Constructs that result in starting a build, take a `buildFn` as optional prop. While the defined type for this function is `any`, it must implement the same signature as esbuild's `buildSync` function.

```ts
new TypeScriptCode("fixtures/handlers/ts-handler.ts", {
  buildFn: (options: BuildOptions): BuildResult => {
    try {
      // custom implementation returning BuildResult
    } catch (error) {
      // throw BuildFailure exception here
    }
  },
});
```

Instead of esbuild, the provided function will be invoked with the calculated build options. The custom build function can amend, change or discard any of these. However integration with CDK relies heavily on the values `outdir`/`outfile` are set to and it's usually required to use them unchanged.

Failures have to cause a `BuildFailure` exception in order to be fully handled.

#### Custom transform function

Constructs that result in starting a transformation, take a `transformFn` as optional prop. While the defined type for this function is `any`, it must implement the same signature as esbuild's `transformSync` function.

```ts
new InlineTypeScriptCode("let x: number = 1", {
  transformFn: (options: TransformOptions): TransformResult => {
    try {
      // custom implementation returning TransformResult
    } catch (error) {
      // throw TransformFailure exception here
    }
  },,
});
```

Instead of esbuild, the provided function will be invoked with the calculated transform options. The custom transform function can amend, change or discard any of these.

Failures have to cause a `TransformFailure` exception in order to be fully handled.

### Migrating to v3

The release of cdk-esbuild v3 brings compatibility with AWS CDK v2. Furthermore all deprecated properties and classes have been removed. In particular `InlineCode` classes now take `TransformerProps` as second parameter instead of transform options.

#### Upgrading

- This version requires AWS CDK v2. Follow the [official migration guide](https://docs.aws.amazon.com/cdk/latest/guide/work-with-cdk-v2.html) to upgrade.
- Update the package dependency to v3: `npm install --save @mrgrain/cdk-esbuild@^3.0.0`
- `esbuild` is installed as an optional dependency. If your setup does not automatically install optional dependencies, make sure to add it as an explicit dependency.
- Any use of `InlineCode` variations has to be updated. Previously the second parameter was either of type `TransformerProps` or `TransformOptions`. Now it must be `TransformerProps`.\
  If the passed value is of type `TransformOptions`, turn it into the correct type like this:

  ```ts
  const oldOptions: TransformOptions = {...}

  new InlineTypeScriptCode('// inline code', {
    transformOptions: oldOptions
  });
  ```

## Versioning

This package follows [Semantic Versioning](https://semver.org/), with the exception of upgrades to `esbuild`. These will be released as **minor versions** and often include breaking changes from `esbuild`.

### Npm Tags

Some users prefer to use tags over version ranges. The following stable tags are available for use:

- `cdk-v1`, `cdk-v2` are provided for the latest release compatible with each version of the AWS CDK.

- `latest` is the most recent stable release.

These tags also exist, but usage is strongly not recommended:

- `unstable`, `next` are used for pre-release of the current and next major version respectively.

- ~~`cdk-1.x.x`~~ tags have been deprecated in favour of `cdk-v1`. Use that one instead.

## Roadmap & Contributions

[The project's roadmap is available on GitHub.](https://github.com/mrgrain/cdk-esbuild/projects/1) Please submit any feature requests as issues to the repository.

All contributions are welcome, no matter if they are for already planned or completely new features.

## Library authors

Building a library consumed by other packages that relies on `cdk-esbuild` might require you to set `buildOptions.absWorkingDir`. The easiest way to do this, is to resolve based on the directory name of the calling file, and traverse the tree upwards to the root of your library package (that's where `package.json` and `tsconfig.json` are):

```ts
// file: project/src/index.ts
const props = {
  buildOptions: {
    absWorkingDir: path.resolve(__dirname, ".."), // now: /user/project
  },
};
```

This will dynamically resolve to the correct path, wherever the package is installed.

Please open an issue if you encounter any difficulties.
