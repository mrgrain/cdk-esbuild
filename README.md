# cdk-esbuild

_CDK constructs for [esbuild](https://github.com/evanw/esbuild), an extremely fast JavaScript bundler_

[Getting started](#getting-started) | [Upgrading from 1.x](#upgrading-from-1x) |
[Documentation](#documentation) | [API Reference](./API.md) | [Versioning](#versioning)

## Why?

_esbuild_ is an extremely fast bundler and minifier for Typescript and JavaScript.
This package makes _esbuild_ available to deploy lambda functions, static websites or to publish build artefacts (assets) for further use.

AWS CDK [supports _esbuild_ with Lambda Functions](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html). However the implementation cannot be used with any other Constructs and doesn't expose all of _esbuild_'s build interface.

This package is running _esbuild_ directly in Node.js and bypasses Docker which the AWS CDK implementation uses. The approach is quicker and easier to use for Node.js users, but incompatible with other languages.

**⚠️ Regarding stability**

This package is generally stable. However _esbuild_ is still on major version zero, which you should consider. Please check their guide on [production readiness](https://esbuild.github.io/faq/#production-readiness).

Notably upgrades of the _esbuild_ version requirement will be introduced in **minor versions** of this package and will inherit breaking changes from _esbuild_.

## Getting started

Install `cdk-esbuild`:

```
npm install @mrgrain/cdk-esbuild
```

If _peer_ and _optional dependencies_ are not installed automatically (e.g. when using npm v4-6), please use this command to install all of them:

```
npm install @mrgrain/cdk-esbuild esbuild @aws-cdk/core @aws-cdk/aws-lambda @aws-cdk/aws-s3-assets @aws-cdk/aws-s3-deployment @aws-cdk/aws-synthetics
```

### AWS Lambda: Serverless function

> 💡 See [Lambda Function](examples/lambda) for a complete working example of a how to deploy a lambda function.

Use `TypeScriptCode` as the `code` of a [lambda function](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Function.html#code):

```ts
import * as lambda from "@aws-cdk/aws-lambda";
import { TypeScriptCode } from "@mrgrain/cdk-esbuild";

const bundledCode = new TypeScriptCode("src/index.ts");

const fn = new lambda.Function(stack, "MyFunction", {
  runtime: lambda.Runtime.NODEJS_14_X,
  handler: "index.handler",
  code: bundledCode,
});
```

### AWS S3: Static Website

> 💡 See [Static Website with React](examples/website) for a complete working example of a how to deploy a React app to S3.

Use `TypeScriptSource` as one of the `sources` of a [static website deployment](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-deployment-readme.html#roadmap):

```ts
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
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

```ts
import * as synthetics from "@aws-cdk/aws-synthetics";
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

# Documentation

The package exports various different constructs for use with existing CDK features. A major guiding design principal for this package is to _extend, don't replace_. Expect constructs that you can provide as props, not complete replacements.

For use in **Lambda Functions** and **Synthetic Canaries**, the following classes implement `lambda.Code` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Code.html)) and `synthetics.Code` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-synthetics.Code.html)):

- `TypeScriptCode` & `JavaScriptCode`

Inline code is only supported by **Lambda**:

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

## [API Reference](./API.md)

Auto-generated reference for all classes and structs. This information is also available within the code completion of your IDE.

## Upgrading from 1.x

tbd

## Versioning

This package _mostly_ follows [Semantic Versioning](https://semver.org/), with the exception of upgrades to `esbuild`. These will be released as **minor versions** and often include breaking changes from `esbuild`.

Although great care is taken to avoid this, all features marked as `@unstable` may change with minor versions. Please note that the unstable flag is applied to all new or experimental features and internal classes.

## Future releases

### AWS CDK v2

The monolithic version 2 of CDK (aka Mono-CDK) is on the horizon. A new major release of this package will be marked alongside CDK. Support for AWS CDK v1.x.x will be continued, however no new features will be added.

### Stable esbuild

Once `esbuild` has reached a stable version 1.0, a new major version will be released for _all_ breaking changes, including updates to minimum (peer) dependencies.
