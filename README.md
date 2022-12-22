<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/mrgrain/cdk-esbuild/main/images/wordmark-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/mrgrain/cdk-esbuild/main/images/wordmark-light.svg">
  <img src="https://raw.githubusercontent.com/mrgrain/cdk-esbuild/main/images/wordmark-dynamic.svg" alt="cdk-esbuild">
</picture>

_CDK constructs for [esbuild](https://github.com/evanw/esbuild), an extremely fast JavaScript bundler_

[Getting started](#getting-started) |
[Documentation](#documentation) | [API Reference](#api-reference) | [FAQ](#faq)

[![View on Construct Hub](https://constructs.dev/badge?package=%40mrgrain%2Fcdk-esbuild)](https://constructs.dev/packages/@mrgrain/cdk-esbuild)

## Why?

_esbuild_ is an extremely fast bundler and minifier for Typescript and JavaScript.
This package makes _esbuild_ available to deploy AWS Lambda Functions, static websites and publish assets for use.

AWS CDK [supports _esbuild_ for AWS Lambda Functions](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html), but the implementation cannot be used with other Constructs and doesn't expose all of _esbuild_'s API.

**Production readiness**

This package is stable and ready to be used in production, as many do. However _esbuild_ has not yet released a version 1.0.0 and its API is still in active development. Please read the guide on [esbuild's production readiness](https://esbuild.github.io/faq/#production-readiness).

_Esbuild_ minor version upgrades are introduced in **minor versions** of this package and inherit breaking changes from _esbuild_.

## Getting started

Install `cdk-esbuild` for Node.js with your favorite package manager:

```sh
# npm 
npm install @mrgrain/cdk-esbuild@4
# Yarn
yarn add @mrgrain/cdk-esbuild@4
# pnpm
pnpm add @mrgrain/cdk-esbuild@4
```

For Python and Dotnet, use these commands:

```sh
# Python
pip install streamlink-serverless

# Dotnet
dotnet add package StreamlinkServerless
```

### AWS Lambda: Serverless function

> 💡 See [Lambda Function](examples/typescript/lambda) for a complete working example of a how to deploy a lambda function.

Use `TypeScriptCode` as the `code` of a [lambda function](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html#code):

```ts
const bundledCode = new TypeScriptCode("src/handler.ts");

const fn = new lambda.Function(stack, "MyFunction", {
  runtime: lambda.Runtime.NODEJS_18_X,
  handler: "index.handler",
  code: bundledCode,
});
```

### AWS S3: Static Website

> 💡 See [Static Website with React](examples/typescript/website) for a complete working example of a how to deploy a React app to S3.

Use `TypeScriptSource` as one of the `sources` of a [static website deployment](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-deployment-readme.html#roadmap):

```ts
const websiteBundle = new TypeScriptSource("src/index.tsx");

const websiteBucket = new s3.Bucket(stack, "WebsiteBucket", {
  autoDeleteObjects: true,
  publicReadAccess: true,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  websiteIndexDocument: "index.html",
});

new s3deploy.BucketDeployment(stack, "DeployWebsite", {
  destinationBucket: websiteBucket,
  sources: [websiteBundle],
});
```

### Amazon CloudWatch Synthetics: Canary monitoring

> 💡 See [Monitored Website](examples/typescript/website) for a complete working example of a deployed and monitored website.

Synthetics runs a canary to produce traffic to an application for monitoring purposes. Use `TypeScriptCode` as the `code` of a Canary test:

> ℹ️ This feature depends on the `@aws-cdk/aws-synthetics-alpha` package which is a developer preview. You may need to update your source code when upgrading to a newer version of this package.
>
> ```sh
> npm i @aws-cdk/aws-synthetics-alpha
> ```

```ts
const bundledCode = new TypeScriptCode("src/canary.ts", {
  buildOptions: {
    outdir: "nodejs/node_modules", // This is required by Synthetics
  },
});

const canary = new synthetics.Canary(stack, "MyCanary", {
  runtime: synthetics.Runtime.SYNTHETICS_NODEJS_PUPPETEER_3_2,
  test: synthetics.Test.custom({
    code: bundledCode,
    handler: "index.handler",
  }),
});
```

## Documentation

The package exports various different constructs for use with existing CDK features. A major guiding design principal for this package is to _extend, don't replace_. Expect constructs that you can provide as props, not complete replacements.

For use in **Lambda Functions** and **Synthetic Canaries**, the following classes implement `lambda.Code` ([reference](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Code.html)) and `synthetics.Code` ([reference](https://docs.aws.amazon.com/cdk/api/v2/docs/@aws-cdk_aws-synthetics-alpha.Code.html)):

- `TypeScriptCode` & `JavaScriptCode`

Inline code is only supported by **Lambda**:

- `InlineTypeScriptCode` & `InlineJavaScriptCode`

For use with **S3 bucket deployments**, classes implementing `s3deploy.ISource` ([reference](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-deployment-readme.html)):

- `TypeScriptSource` & `JavaScriptSource`

> _Code and Source constructs seamlessly plug-in to other high-level CDK constructs. They share the same set of parameters, props and build options._

The following classes power the other features. You normally won't have to use them, but they are there if you need them:

- `TypeScriptAsset` & `JavaScriptAsset` implements `s3.Asset` ([reference](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3_assets.Asset.html)) \
  creates an asset uploaded to S3 which can be referenced by other constructs

- `EsbuildBundler` implements `core.BundlingOptions` ([reference](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.BundlingOptions.html)) \
  provides an interface for a _esbuild_ bundler wherever needed

- `EsbuildProvider` implements `IBuildProvider` and `ITransformProvider` \
  provides the default _esbuild_ API implementation and can be replaced with a custom implementation

### [API Reference](API.md)

Auto-generated reference for Classes and Structs. This information is also available as part of your IDE's code completion.

### Python and Dotnet

Because _esbuild_ requires a platform and architecture specific binary, it currently has to be installed using npm (or any other Node.js package manager).

When `cdk-esbuild` is used with Python or Dotnet, it will automatically detect a local or global installation of the _esbuild_ npm package - or fallback to dynamically installing a copy into a temporary location.
The exact algorithm of this mechanism must be treated as an implementation detail and should not be relied on.
It can however be configured to a certain extent.
See the examples below for more details.

While this "best effort" approach makes it easy to get started, it is not always desirable.
For example in environments with limited network access or when guaranteed repeatability of builds is a concern.
You have several options to opt-out of this behavior:

- **Recommended** - Install _esbuild_ as a local package\
  The recommended approach is to manage an additional Node.js project in the root of your AWS CDK project.
  _esbuild_ should then be added to the `package.json` file and it is your responsibility to ensure the required setup steps are run in every environment (development machines & CI/CD systems).
  The _esbuild_ package will then be detected automatically.
- Install _esbuild_ as a global package\
  Instead of installing the package in a local project, it can also be installed globally with `npm install -g esbuild` or a similar command.
  The _esbuild_ package will be detected automatically from the global installation.
  This approach might be preferred if a build container is prepared ahead of time, thus avoiding repeated package installation.
- Set `CDK_ESBUILD_MODULE_PATH` env variable\
  If an installed _esbuild_ module cannot be reliably detected by the algorithm, you can provide the absolute path to the module as an environment variable.
  This approach has the advantage that the location of the module can be different on different systems.
  While it can be combined with either installation approach, it is usually used with a global installation of the _esbuild_ package.
- Set `esbuildModulePath` prop\
  Similar to setting the module path via env variable, it can also be passed as the `esbuildModulePath` prop to a `EsbuildProvider`:

  ```ts
  new EsbuildProvider({
    esbuildModulePath: '/home/user/node_modules/esbuild/lib/main.js'
  });
  ```

- Override the default implementation provider\
  Using the previous approach, but setting it for every usage:

  ```ts
  const customModule = new EsbuildProvider({
    esbuildModulePath: '/home/user/node_modules/esbuild/lib/main.js'
  });
  EsbuildProvider.overrideDefaultProvider(customModule);
  ```

The `esbuildModulePath` can be provided as a known, absolute or relative path.
When using the programmatic interface, this package additionally offers some helper methods to influence to fine-tune to automatic detection algorithm:

```ts
// This will force installation to a temporary location
new EsbuildProvider({
  esbuildModulePath: EsbuildSource.install()
});
```

Please see the [`EsbuildSource`](API.md#esbuildsource) reference for a list of available methods.

### Customizing the Esbuild API

This package uses the _esbuild_ JavaScript API. For most use cases the default configuration will be suitable.

In some cases it might be useful to configure _esbuild_ differently or even provide a completely custom implementation.
Common examples for this are:

- To use a pre-installed version of _esbuild_ with Python and Dotnet
- If features not supported by the synchronous API are required, e.g. support for plugins
- If the default version constraints for _esbuild_ are not suitable
- To use a version of esbuild that is installed by any other means than `npm`, including Docker

For these scenarios, this package offers customization options and an interface to provide a custom implementation:

```ts
declare const myCustomBuildProvider: IBuildProvider;

new TypeScriptCode("src/handler.ts", {
  buildProvider: myCustomBuildProvider,
});


declare const myCustomTransformProvider: ITransformProvider;

new InlineTypeScriptCode("let x: number = 1", {
  transformProvider: myCustomTransformProvider,
});
```

#### Esbuild binary path

It is possible to override the binary used by _esbuild_ by setting a property on `EsbuildProvider`.
This is the same as setting the `ESBUILD_BINARY_PATH` environment variable.
Defining the `esbuildBinaryPath` prop takes precedence.

```ts
const buildProvider = new EsbuildProvider({
  esbuildBinaryPath: "path/to/esbuild/binary",
});

// This will use a different esbuild binary
new TypeScriptCode("src/handler.ts", { buildProvider });
```

#### Esbuild module path

The Node.js module discovery algorithm will normally be used to find the _esbuild_ package.
It can be useful to use specify a different module path, for example if a globally installed package should be used instead of a local version.

```ts
const buildProvider = new EsbuildProvider({
  esbuildModulePath: "/home/user/node_modules/esbuild/lib/main.js",
});

// This will use a different esbuild module
new TypeScriptCode("src/handler.ts", { buildProvider });
```

Alternatively supported by setting the `CDK_ESBUILD_MODULE_PATH` environment variable, which will apply to all uses.
Defining the `esbuildModulePath` prop takes precedence.

#### Custom Build and Transform API implementations

> 💡 See [Using esbuild with plugins](examples/typescript/esbuild-with-plugins) for a complete working example of a custom Build API implementation.

A custom implementation can be provided by implementing `IBuildProvider` or `ITransformProvider`:

```ts
class CustomEsbuild implements IBuildProvider, ITransformProvider {
    buildSync(options: BuildOptions): void {
      // custom implementation goes here
    }
  
    transformSync(code: string, options?: TransformOptions): string {
      // custom implementation goes here, return transformed code
      return 'transformed code';
    }
}

// These will use the custom implementation
new TypeScriptCode("src/handler.ts", {
  buildProvider: new CustomEsbuild(),
});
new InlineTypeScriptCode("let x: number = 1", {
  transformProvider: new CustomEsbuild(),
});
```

Instead of _esbuild_, the custom methods will be invoked with all computed options.
The custom implementation can amend, change or discard any of these.
However with `IBuildProvider` the integration with CDK relies heavily on the `outdir`/`outfile` values and it's usually required to use them unchanged.
`ITransformProvider` must return the transformed code as a string.

Failures and warnings should be printed to stderr and thrown as the respective _esbuild_ error.

#### Overriding the default implementation providers

It is also possible to change the default Esbuild API implementation for all usages of this package.
You can change the default for both APIs or set a different implementation for each of them.

```ts
const myCustomEsbuildProvider = new MyCustomEsbuildProvider();

EsbuildProvider.overrideDefaultProvider(myCustomEsbuildProvider);
EsbuildProvider.overrideDefaultBuildProvider(myCustomEsbuildProvider);
EsbuildProvider.overrideDefaultTransformationProvider(myCustomEsbuildProvider);

// This will use the custom provider without the need to define it as a prop
new TypeScriptCode("src/handler.ts");
```

### Roadmap & Contributions

[The project's roadmap is available on GitHub.](https://github.com/users/mrgrain/projects/1/views/7) Please submit feature requests as issues to the repository.

All contributions are welcome, no matter if they are for already planned or completely new features.

## FAQ

### How do I upgrade from `@mrgrain/cdk-esbuild` v3?

Please refer to the [v4 release notes](https://github.com/mrgrain/cdk-esbuild/releases/tag/v4.0.0) for a list of backwards incompatible changes and respective upgrade instructions.

### [TS/JS] Why am I getting the error `Cannot find module 'esbuild'`?

This package depends on _esbuild_ as an optional dependencies. If optional dependencies are not installed automatically on your system (e.g. when using npm v4-6), install _esbuild_ explicitly:

```console
npm install esbuild
```

### [TS/JS] How can I use a different version of _esbuild_?

Use the [override](https://docs.npmjs.com/cli/v9/configuring-npm/package-json?v=true#overrides) instructions for your package manager to force a specific version, for example:

```json
{
  "overrides": {
    "esbuild": "0.14.7"
  }
}
```

Build and Transform interfaces are relatively stable across _esbuild_ versions.
However if any incompatibilities occur, `buildOptions` / `transformOptions` can be cast to `any`:

```ts
const bundledCode = new TypeScriptCode("src/handler.ts", {
  buildOptions: {
    unsupportedOption: "value"
  } as any,
});
```

### [Python/Dotnet] How can I use a different version of _esbuild_?

Install the desired version of _esbuild_ locally or globally [as described in the documentation above](#python-and-dotnet).

Build and Transform interfaces are relatively stable across _esbuild_ versions.
However if any incompatibilities occur, use the appropriate language features to cast any incompatible `buildOptions` / `transformOptions` to the correct types.

### Can I use this package in my published AWS CDK Construct?

It is possible to use `cdk-esbuild` in a published AWS CDK Construct library, but not recommended. Always prefer to ship a compiled `.js` file or even bundle a zip archive in your package. For AWS Lambda Functions, [projen provides an excellent solution](https://projen.io/awscdk.html#aws-lambda-functions).

If you do end up consuming `cdk-esbuild`, you will have to set `buildOptions.absWorkingDir`. The easiest way to do this, is to resolve the path based on the directory name of the calling file:

```js
// file: node_modules/construct-library/src/index.ts
const props = {
  buildOptions: {
    absWorkingDir: path.resolve(__dirname, ".."),
    // now: /user/local-app/node_modules/construct-library
  },
};
```

This will dynamically resolve to the correct path, wherever the package is installed. Please open an issue if you encounter any difficulties.

### Can I use this package with AWS CDK v1?

Yes, the `2.x.x` line of `cdk-esbuild` is compatible with AWS CDK v1. You can find the [documentation for it on the v2 branch](https://github.com/mrgrain/cdk-esbuild/tree/v2).

However, in line with AWS CDK v2, this version release now only receives security updates and critical bug fixes and support will fully end on June 1, 2023.
