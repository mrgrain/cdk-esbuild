# API Reference <a name="API Reference"></a>


## Structs <a name="Structs"></a>

### AssetProps <a name="@mrgrain/cdk-esbuild.AssetProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { AssetProps } from '@mrgrain/cdk-esbuild'

const assetProps: AssetProps = { ... }
```

##### `buildOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.AssetProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.BuildOptions`](#@mrgrain/cdk-esbuild.BuildOptions)

Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.

`buildOptions.outdir: string` \
The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
*Cannot be used together with `outfile`*.
- `buildOptions.outfile: string` \
Relative path to a file inside the CDK asset output directory. \
For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
*Cannot be used with multiple entryPoints or together with `outdir`.*
- `buildOptions.absWorkingDir: string` \
Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).

> https://esbuild.github.io/api/#build-api

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.AssetProps.property.copyDir"></a>

```typescript
public readonly copyDir: string;
```

- *Type:* `string`

Copy additional files to the output directory, before the build runs.

Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

---

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.AssetProps.property.entryPoints"></a>

```typescript
public readonly entryPoints: string | string[] | {[ key: string ]: string};
```

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

A relative path or list or map of relative paths to the entry points of your code from the root of the project.

E.g. `src/index.ts`.

---

##### `assetHash`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.AssetProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* `string`

A hash of this asset, which is available at construction time.

As this is a plain string, it can be used in construct IDs in order to enforce creation of a new resource when the content hash has changed.

Defaults to a hash of all files in the resulting bundle.

---

### BuildOptions <a name="@mrgrain/cdk-esbuild.BuildOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { BuildOptions } from '@mrgrain/cdk-esbuild'

const buildOptions: BuildOptions = { ... }
```

##### `absWorkingDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.absWorkingDir"></a>

```typescript
public readonly absWorkingDir: string;
```

- *Type:* `string`

---

##### `allowOverwrite`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.allowOverwrite"></a>

```typescript
public readonly allowOverwrite: boolean;
```

- *Type:* `boolean`

---

##### `assetNames`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.assetNames"></a>

```typescript
public readonly assetNames: string;
```

- *Type:* `string`

---

##### `banner`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.banner"></a>

```typescript
public readonly banner: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

---

##### `bundle`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.bundle"></a>

```typescript
public readonly bundle: boolean;
```

- *Type:* `boolean`

---

##### `charset`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.charset"></a>

```typescript
public readonly charset: string;
```

- *Type:* `string`

---

##### `chunkNames`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.chunkNames"></a>

```typescript
public readonly chunkNames: string;
```

- *Type:* `string`

---

##### `color`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.color"></a>

```typescript
public readonly color: boolean;
```

- *Type:* `boolean`

---

##### `conditions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.conditions"></a>

```typescript
public readonly conditions: string[];
```

- *Type:* `string`[]

---

##### `define`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.define"></a>

```typescript
public readonly define: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

---

##### `entryNames`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.entryNames"></a>

```typescript
public readonly entryNames: string;
```

- *Type:* `string`

---

##### `external`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.external"></a>

```typescript
public readonly external: string[];
```

- *Type:* `string`[]

---

##### `footer`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.footer"></a>

```typescript
public readonly footer: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

---

##### `format`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.format"></a>

```typescript
public readonly format: string;
```

- *Type:* `string`

---

##### `globalName`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.globalName"></a>

```typescript
public readonly globalName: string;
```

- *Type:* `string`

---

##### `ignoreAnnotations`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.ignoreAnnotations"></a>

```typescript
public readonly ignoreAnnotations: boolean;
```

- *Type:* `boolean`

---

##### `incremental`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.incremental"></a>

```typescript
public readonly incremental: boolean;
```

- *Type:* `boolean`

---

##### `inject`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.inject"></a>

```typescript
public readonly inject: string[];
```

- *Type:* `string`[]

---

##### `jsx`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.jsx"></a>

```typescript
public readonly jsx: string;
```

- *Type:* `string`

---

##### `jsxFactory`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.jsxFactory"></a>

```typescript
public readonly jsxFactory: string;
```

- *Type:* `string`

---

##### `jsxFragment`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.jsxFragment"></a>

```typescript
public readonly jsxFragment: string;
```

- *Type:* `string`

---

##### `keepNames`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.keepNames"></a>

```typescript
public readonly keepNames: boolean;
```

- *Type:* `boolean`

---

##### `legalComments`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.legalComments"></a>

```typescript
public readonly legalComments: string;
```

- *Type:* `string`

---

##### `loader`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.loader"></a>

```typescript
public readonly loader: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

---

##### `logLevel`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.logLevel"></a>

```typescript
public readonly logLevel: string;
```

- *Type:* `string`

---

##### `logLimit`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.logLimit"></a>

```typescript
public readonly logLimit: number;
```

- *Type:* `number`

---

##### `mainFields`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.mainFields"></a>

```typescript
public readonly mainFields: string[];
```

- *Type:* `string`[]

---

##### `metafile`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.metafile"></a>

```typescript
public readonly metafile: boolean;
```

- *Type:* `boolean`

---

##### `minify`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.minify"></a>

```typescript
public readonly minify: boolean;
```

- *Type:* `boolean`

---

##### `minifyIdentifiers`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.minifyIdentifiers"></a>

```typescript
public readonly minifyIdentifiers: boolean;
```

- *Type:* `boolean`

---

##### `minifySyntax`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.minifySyntax"></a>

```typescript
public readonly minifySyntax: boolean;
```

- *Type:* `boolean`

---

##### `minifyWhitespace`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.minifyWhitespace"></a>

```typescript
public readonly minifyWhitespace: boolean;
```

- *Type:* `boolean`

---

##### `nodePaths`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.nodePaths"></a>

```typescript
public readonly nodePaths: string[];
```

- *Type:* `string`[]

---

##### `outbase`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.outbase"></a>

```typescript
public readonly outbase: string;
```

- *Type:* `string`

---

##### `outdir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* `string`

---

##### `outExtension`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.outExtension"></a>

```typescript
public readonly outExtension: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

---

##### `outfile`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.outfile"></a>

```typescript
public readonly outfile: string;
```

- *Type:* `string`

---

##### `platform`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* `string`

---

##### `preserveSymlinks`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.preserveSymlinks"></a>

```typescript
public readonly preserveSymlinks: boolean;
```

- *Type:* `boolean`

---

##### `publicPath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.publicPath"></a>

```typescript
public readonly publicPath: string;
```

- *Type:* `string`

---

##### `pure`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.pure"></a>

```typescript
public readonly pure: string[];
```

- *Type:* `string`[]

---

##### `resolveExtensions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.resolveExtensions"></a>

```typescript
public readonly resolveExtensions: string[];
```

- *Type:* `string`[]

---

##### `sourcemap`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.sourcemap"></a>

```typescript
public readonly sourcemap: boolean | string;
```

- *Type:* `boolean` | `string`

---

##### `sourceRoot`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.sourceRoot"></a>

```typescript
public readonly sourceRoot: string;
```

- *Type:* `string`

---

##### `sourcesContent`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.sourcesContent"></a>

```typescript
public readonly sourcesContent: boolean;
```

- *Type:* `boolean`

---

##### `splitting`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.splitting"></a>

```typescript
public readonly splitting: boolean;
```

- *Type:* `boolean`

---

##### `target`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.target"></a>

```typescript
public readonly target: string | string[];
```

- *Type:* `string` | `string`[]

---

##### `treeShaking`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.treeShaking"></a>

```typescript
public readonly treeShaking: boolean;
```

- *Type:* `boolean`

---

##### `tsconfig`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.tsconfig"></a>

```typescript
public readonly tsconfig: string;
```

- *Type:* `string`

---

##### `write`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.write"></a>

```typescript
public readonly write: boolean;
```

- *Type:* `boolean`

---

### BundlerProps <a name="@mrgrain/cdk-esbuild.BundlerProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { BundlerProps } from '@mrgrain/cdk-esbuild'

const bundlerProps: BundlerProps = { ... }
```

##### `buildOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BundlerProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.BuildOptions`](#@mrgrain/cdk-esbuild.BuildOptions)

Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.

`buildOptions.outdir: string` \
The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
*Cannot be used together with `outfile`*.
- `buildOptions.outfile: string` \
Relative path to a file inside the CDK asset output directory. \
For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
*Cannot be used with multiple entryPoints or together with `outdir`.*
- `buildOptions.absWorkingDir: string` \
Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).

> https://esbuild.github.io/api/#build-api

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BundlerProps.property.copyDir"></a>

```typescript
public readonly copyDir: string;
```

- *Type:* `string`

Copy additional files to the output directory, before the build runs.

Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

---

### CodeConfig <a name="@mrgrain/cdk-esbuild.CodeConfig"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { CodeConfig } from '@mrgrain/cdk-esbuild'

const codeConfig: CodeConfig = { ... }
```

##### `s3Location`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.CodeConfig.property.s3Location"></a>

```typescript
public readonly s3Location: Location;
```

- *Type:* [`@aws-cdk/aws-s3.Location`](#@aws-cdk/aws-s3.Location)

The location of the code in S3.

---

### JavaScriptCodeProps <a name="@mrgrain/cdk-esbuild.JavaScriptCodeProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { JavaScriptCodeProps } from '@mrgrain/cdk-esbuild'

const javaScriptCodeProps: JavaScriptCodeProps = { ... }
```

##### `buildOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCodeProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.BuildOptions`](#@mrgrain/cdk-esbuild.BuildOptions)

Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.

`buildOptions.outdir: string` \
The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
*Cannot be used together with `outfile`*.
- `buildOptions.outfile: string` \
Relative path to a file inside the CDK asset output directory. \
For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
*Cannot be used with multiple entryPoints or together with `outdir`.*
- `buildOptions.absWorkingDir: string` \
Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).

> https://esbuild.github.io/api/#build-api

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCodeProps.property.copyDir"></a>

```typescript
public readonly copyDir: string;
```

- *Type:* `string`

Copy additional files to the output directory, before the build runs.

Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

---

##### `assetHash`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCodeProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* `string`

A hash of this asset, which is available at construction time.

As this is a plain string, it can be used in construct IDs in order to enforce creation of a new resource when the content hash has changed.

Defaults to a hash of all files in the resulting bundle.

---

### JavaScriptSourceProps <a name="@mrgrain/cdk-esbuild.JavaScriptSourceProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { JavaScriptSourceProps } from '@mrgrain/cdk-esbuild'

const javaScriptSourceProps: JavaScriptSourceProps = { ... }
```

##### `buildOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSourceProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.BuildOptions`](#@mrgrain/cdk-esbuild.BuildOptions)

Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.

`buildOptions.outdir: string` \
The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
*Cannot be used together with `outfile`*.
- `buildOptions.outfile: string` \
Relative path to a file inside the CDK asset output directory. \
For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
*Cannot be used with multiple entryPoints or together with `outdir`.*
- `buildOptions.absWorkingDir: string` \
Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).

> https://esbuild.github.io/api/#build-api

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSourceProps.property.copyDir"></a>

```typescript
public readonly copyDir: string;
```

- *Type:* `string`

Copy additional files to the output directory, before the build runs.

Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

---

##### `assetHash`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSourceProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* `string`

A hash of this asset, which is available at construction time.

As this is a plain string, it can be used in construct IDs in order to enforce creation of a new resource when the content hash has changed.

Defaults to a hash of all files in the resulting bundle.

---

### TransformOptions <a name="@mrgrain/cdk-esbuild.TransformOptions"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { TransformOptions } from '@mrgrain/cdk-esbuild'

const transformOptions: TransformOptions = { ... }
```

##### `banner`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.banner"></a>

```typescript
public readonly banner: string;
```

- *Type:* `string`

---

##### `charset`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.charset"></a>

```typescript
public readonly charset: string;
```

- *Type:* `string`

---

##### `color`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.color"></a>

```typescript
public readonly color: boolean;
```

- *Type:* `boolean`

---

##### `define`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.define"></a>

```typescript
public readonly define: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

---

##### `footer`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.footer"></a>

```typescript
public readonly footer: string;
```

- *Type:* `string`

---

##### `format`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.format"></a>

```typescript
public readonly format: string;
```

- *Type:* `string`

---

##### `globalName`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.globalName"></a>

```typescript
public readonly globalName: string;
```

- *Type:* `string`

---

##### `ignoreAnnotations`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.ignoreAnnotations"></a>

```typescript
public readonly ignoreAnnotations: boolean;
```

- *Type:* `boolean`

---

##### `jsx`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.jsx"></a>

```typescript
public readonly jsx: string;
```

- *Type:* `string`

---

##### `jsxFactory`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.jsxFactory"></a>

```typescript
public readonly jsxFactory: string;
```

- *Type:* `string`

---

##### `jsxFragment`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.jsxFragment"></a>

```typescript
public readonly jsxFragment: string;
```

- *Type:* `string`

---

##### `keepNames`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.keepNames"></a>

```typescript
public readonly keepNames: boolean;
```

- *Type:* `boolean`

---

##### `legalComments`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.legalComments"></a>

```typescript
public readonly legalComments: string;
```

- *Type:* `string`

---

##### `loader`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.loader"></a>

```typescript
public readonly loader: string;
```

- *Type:* `string`

---

##### `logLevel`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.logLevel"></a>

```typescript
public readonly logLevel: string;
```

- *Type:* `string`

---

##### `logLimit`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.logLimit"></a>

```typescript
public readonly logLimit: number;
```

- *Type:* `number`

---

##### `minify`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.minify"></a>

```typescript
public readonly minify: boolean;
```

- *Type:* `boolean`

---

##### `minifyIdentifiers`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.minifyIdentifiers"></a>

```typescript
public readonly minifyIdentifiers: boolean;
```

- *Type:* `boolean`

---

##### `minifySyntax`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.minifySyntax"></a>

```typescript
public readonly minifySyntax: boolean;
```

- *Type:* `boolean`

---

##### `minifyWhitespace`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.minifyWhitespace"></a>

```typescript
public readonly minifyWhitespace: boolean;
```

- *Type:* `boolean`

---

##### `pure`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.pure"></a>

```typescript
public readonly pure: string[];
```

- *Type:* `string`[]

---

##### `sourcefile`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.sourcefile"></a>

```typescript
public readonly sourcefile: string;
```

- *Type:* `string`

---

##### `sourcemap`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.sourcemap"></a>

```typescript
public readonly sourcemap: boolean | string;
```

- *Type:* `boolean` | `string`

---

##### `sourceRoot`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.sourceRoot"></a>

```typescript
public readonly sourceRoot: string;
```

- *Type:* `string`

---

##### `sourcesContent`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.sourcesContent"></a>

```typescript
public readonly sourcesContent: boolean;
```

- *Type:* `boolean`

---

##### `target`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.target"></a>

```typescript
public readonly target: string | string[];
```

- *Type:* `string` | `string`[]

---

##### `treeShaking`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.treeShaking"></a>

```typescript
public readonly treeShaking: boolean;
```

- *Type:* `boolean`

---

##### `tsconfigRaw`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.tsconfigRaw"></a>

```typescript
public readonly tsconfigRaw: string;
```

- *Type:* `string`

---

### TypeScriptCodeProps <a name="@mrgrain/cdk-esbuild.TypeScriptCodeProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { TypeScriptCodeProps } from '@mrgrain/cdk-esbuild'

const typeScriptCodeProps: TypeScriptCodeProps = { ... }
```

##### `buildOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.BuildOptions`](#@mrgrain/cdk-esbuild.BuildOptions)

Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.

`buildOptions.outdir: string` \
The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
*Cannot be used together with `outfile`*.
- `buildOptions.outfile: string` \
Relative path to a file inside the CDK asset output directory. \
For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
*Cannot be used with multiple entryPoints or together with `outdir`.*
- `buildOptions.absWorkingDir: string` \
Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).

> https://esbuild.github.io/api/#build-api

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.copyDir"></a>

```typescript
public readonly copyDir: string;
```

- *Type:* `string`

Copy additional files to the output directory, before the build runs.

Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

---

##### `assetHash`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* `string`

A hash of this asset, which is available at construction time.

As this is a plain string, it can be used in construct IDs in order to enforce creation of a new resource when the content hash has changed.

Defaults to a hash of all files in the resulting bundle.

---

### TypeScriptSourceProps <a name="@mrgrain/cdk-esbuild.TypeScriptSourceProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { TypeScriptSourceProps } from '@mrgrain/cdk-esbuild'

const typeScriptSourceProps: TypeScriptSourceProps = { ... }
```

##### `buildOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.BuildOptions`](#@mrgrain/cdk-esbuild.BuildOptions)

Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.

`buildOptions.outdir: string` \
The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
*Cannot be used together with `outfile`*.
- `buildOptions.outfile: string` \
Relative path to a file inside the CDK asset output directory. \
For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
*Cannot be used with multiple entryPoints or together with `outdir`.*
- `buildOptions.absWorkingDir: string` \
Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).

> https://esbuild.github.io/api/#build-api

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.copyDir"></a>

```typescript
public readonly copyDir: string;
```

- *Type:* `string`

Copy additional files to the output directory, before the build runs.

Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

---

##### `assetHash`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* `string`

A hash of this asset, which is available at construction time.

As this is a plain string, it can be used in construct IDs in order to enforce creation of a new resource when the content hash has changed.

Defaults to a hash of all files in the resulting bundle.

---

## Classes <a name="Classes"></a>

### EsbuildBundler <a name="@mrgrain/cdk-esbuild.EsbuildBundler"></a>

Low-level construct that can be used where `BundlingOptions` are required.

This class directly interfaces with esbuild and provides almost no configuration safeguards.

#### Initializers <a name="@mrgrain/cdk-esbuild.EsbuildBundler.Initializer"></a>

```typescript
import { EsbuildBundler } from '@mrgrain/cdk-esbuild'

new EsbuildBundler(entryPoints: string | string[] | {[ key: string ]: string}, props: BundlerProps)
```

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.parameter.entryPoints"></a>

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

A relative path or list or map of relative paths to the entry points of your code from the root of the project.

E.g. `src/index.ts`.

---

##### `props`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.BundlerProps`](#@mrgrain/cdk-esbuild.BundlerProps)

Props to change the behaviour of the bundler.

---



#### Properties <a name="Properties"></a>

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.property.entryPoints"></a>

```typescript
public readonly entryPoints: string | string[] | {[ key: string ]: string};
```

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

A relative path or list or map of relative paths to the entry points of your code from the root of the project.

E.g. `src/index.ts`.

---

##### ~~`image`~~<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.property.image"></a>

- *Deprecated:* This value is ignored since the bundler is always using a locally installed version of esbuild. However the property is required to comply with the `BundlingOptions` interface.

```typescript
public readonly image: DockerImage;
```

- *Type:* [`@aws-cdk/core.DockerImage`](#@aws-cdk/core.DockerImage)

---

##### `local`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.property.local"></a>

```typescript
public readonly local: ILocalBundling;
```

- *Type:* [`@aws-cdk/core.ILocalBundling`](#@aws-cdk/core.ILocalBundling)

Implementation of `ILocalBundling` interface, responsible for calling esbuild functions.

---

##### `props`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.property.props"></a>

```typescript
public readonly props: BundlerProps;
```

- *Type:* [`@mrgrain/cdk-esbuild.BundlerProps`](#@mrgrain/cdk-esbuild.BundlerProps)

Props to change the behaviour of the bundler.

---


### InlineJavaScriptCode <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode"></a>

An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.

#### Initializers <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode.Initializer"></a>

```typescript
import { InlineJavaScriptCode } from '@mrgrain/cdk-esbuild'

new InlineJavaScriptCode(code: string, transformOptions?: TransformOptions)
```

##### `code`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode.parameter.code"></a>

- *Type:* `string`

The inline code to be transformed.

---

##### `transformOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode.parameter.transformOptions"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TransformOptions`](#@mrgrain/cdk-esbuild.TransformOptions)

Transform options passed on to esbuild.

Please refer to the esbuild Transform API docs for details. \
Default values for `transformOptions`:
- `loader='js'`

> https://esbuild.github.io/api/#transform-api

---





### InlineJsxCode <a name="@mrgrain/cdk-esbuild.InlineJsxCode"></a>

An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.

#### Initializers <a name="@mrgrain/cdk-esbuild.InlineJsxCode.Initializer"></a>

```typescript
import { InlineJsxCode } from '@mrgrain/cdk-esbuild'

new InlineJsxCode(code: string, transformOptions?: TransformOptions)
```

##### `code`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineJsxCode.parameter.code"></a>

- *Type:* `string`

The inline code to be transformed.

---

##### `transformOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.InlineJsxCode.parameter.transformOptions"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TransformOptions`](#@mrgrain/cdk-esbuild.TransformOptions)

Transform options passed on to esbuild.

Please refer to the esbuild Transform API docs for details. \
Default values for `transformOptions`:
- `loader='jsx'`

> https://esbuild.github.io/api/#transform-api

---





### InlineTsxCode <a name="@mrgrain/cdk-esbuild.InlineTsxCode"></a>

An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.

#### Initializers <a name="@mrgrain/cdk-esbuild.InlineTsxCode.Initializer"></a>

```typescript
import { InlineTsxCode } from '@mrgrain/cdk-esbuild'

new InlineTsxCode(code: string, transformOptions?: TransformOptions)
```

##### `code`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineTsxCode.parameter.code"></a>

- *Type:* `string`

The inline code to be transformed.

---

##### `transformOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.InlineTsxCode.parameter.transformOptions"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TransformOptions`](#@mrgrain/cdk-esbuild.TransformOptions)

Transform options passed on to esbuild.

Please refer to the esbuild Transform API docs for details. \
Default values for `transformOptions`:
- `loader='tsx'`

> https://esbuild.github.io/api/#transform-api

---





### InlineTypeScriptCode <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode"></a>

An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.

#### Initializers <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode.Initializer"></a>

```typescript
import { InlineTypeScriptCode } from '@mrgrain/cdk-esbuild'

new InlineTypeScriptCode(code: string, transformOptions?: TransformOptions)
```

##### `code`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode.parameter.code"></a>

- *Type:* `string`

The inline code to be transformed.

---

##### `transformOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode.parameter.transformOptions"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TransformOptions`](#@mrgrain/cdk-esbuild.TransformOptions)

Transform options passed on to esbuild.

Please refer to the esbuild Transform API docs for details. \
Default values for `transformOptions`:
- `loader='ts'`

> https://esbuild.github.io/api/#transform-api

---





### JavaScriptAsset <a name="@mrgrain/cdk-esbuild.JavaScriptAsset"></a>

Bundles the entry points and creates a CDK asset which is uploaded to the bootstrapped CDK S3 bucket during deployment.

The asset can be used by other constructs.

#### Initializers <a name="@mrgrain/cdk-esbuild.JavaScriptAsset.Initializer"></a>

```typescript
import { JavaScriptAsset } from '@mrgrain/cdk-esbuild'

new JavaScriptAsset(scope: Construct, id: string, props: AssetProps)
```

##### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptAsset.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptAsset.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptAsset.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.AssetProps`](#@mrgrain/cdk-esbuild.AssetProps)

---





### JavaScriptCode <a name="@mrgrain/cdk-esbuild.JavaScriptCode"></a>

Represents the deployed JavaScript Code.

#### Initializers <a name="@mrgrain/cdk-esbuild.JavaScriptCode.Initializer"></a>

```typescript
import { JavaScriptCode } from '@mrgrain/cdk-esbuild'

new JavaScriptCode(entryPoints: string | string[] | {[ key: string ]: string}, props?: JavaScriptCodeProps)
```

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCode.parameter.entryPoints"></a>

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

A relative path or list or map of relative paths to the entry points of your code from the root of the project.

E.g. `src/index.ts`.

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCode.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.JavaScriptCodeProps`](#@mrgrain/cdk-esbuild.JavaScriptCodeProps)

Props to change the behavior of the bundler.

Default values for `props.buildOptions`:
- `bundle=true`
- `platform=node`
- `target=nodeX` with X being the major node version running locally

---

#### Methods <a name="Methods"></a>

##### `bind` <a name="@mrgrain/cdk-esbuild.JavaScriptCode.bind"></a>

```typescript
public bind(scope: Construct)
```

###### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCode.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `bindToResource` <a name="@mrgrain/cdk-esbuild.JavaScriptCode.bindToResource"></a>

```typescript
public bindToResource(resource: CfnResource, options?: ResourceBindOptions)
```

###### `resource`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCode.parameter.resource"></a>

- *Type:* [`@aws-cdk/core.CfnResource`](#@aws-cdk/core.CfnResource)

---

###### `options`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCode.parameter.options"></a>

- *Type:* [`@aws-cdk/aws-lambda.ResourceBindOptions`](#@aws-cdk/aws-lambda.ResourceBindOptions)

---


#### Properties <a name="Properties"></a>

##### ~~`isInline`~~<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCode.property.isInline"></a>

- *Deprecated:* this value is ignored since inline is now determined based on the the inlineCode field of CodeConfig returned from bind().

```typescript
public readonly isInline: boolean;
```

- *Type:* `boolean`

Determines whether this Code is inline code or not.

---


### JavaScriptSource <a name="@mrgrain/cdk-esbuild.JavaScriptSource"></a>

- *Implements:* [`@aws-cdk/aws-s3-deployment.ISource`](#@aws-cdk/aws-s3-deployment.ISource)

#### Initializers <a name="@mrgrain/cdk-esbuild.JavaScriptSource.Initializer"></a>

```typescript
import { JavaScriptSource } from '@mrgrain/cdk-esbuild'

new JavaScriptSource(entryPoints: string | string[] | {[ key: string ]: string}, props?: JavaScriptSourceProps)
```

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSource.parameter.entryPoints"></a>

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSource.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.JavaScriptSourceProps`](#@mrgrain/cdk-esbuild.JavaScriptSourceProps)

---

#### Methods <a name="Methods"></a>

##### `bind` <a name="@mrgrain/cdk-esbuild.JavaScriptSource.bind"></a>

```typescript
public bind(scope: Construct, context?: DeploymentSourceContext)
```

###### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSource.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

###### `context`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSource.parameter.context"></a>

- *Type:* [`@aws-cdk/aws-s3-deployment.DeploymentSourceContext`](#@aws-cdk/aws-s3-deployment.DeploymentSourceContext)

---


#### Properties <a name="Properties"></a>

##### `assetClass`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSource.property.assetClass"></a>

```typescript
public readonly assetClass: JavaScriptAsset;
```

- *Type:* [`@mrgrain/cdk-esbuild.JavaScriptAsset`](#@mrgrain/cdk-esbuild.JavaScriptAsset)

---


### TypeScriptAsset <a name="@mrgrain/cdk-esbuild.TypeScriptAsset"></a>

Bundles the entry points and creates a CDK asset which is uploaded to the bootstrapped CDK S3 bucket during deployment.

The asset can be used by other constructs.

#### Initializers <a name="@mrgrain/cdk-esbuild.TypeScriptAsset.Initializer"></a>

```typescript
import { TypeScriptAsset } from '@mrgrain/cdk-esbuild'

new TypeScriptAsset(scope: Construct, id: string, props: AssetProps)
```

##### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptAsset.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptAsset.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptAsset.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.AssetProps`](#@mrgrain/cdk-esbuild.AssetProps)

---





### TypeScriptCode <a name="@mrgrain/cdk-esbuild.TypeScriptCode"></a>

Represents the deployed TypeScript Code.

#### Initializers <a name="@mrgrain/cdk-esbuild.TypeScriptCode.Initializer"></a>

```typescript
import { TypeScriptCode } from '@mrgrain/cdk-esbuild'

new TypeScriptCode(entryPoints: string | string[] | {[ key: string ]: string}, props?: TypeScriptCodeProps)
```

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCode.parameter.entryPoints"></a>

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

A relative path or list or map of relative paths to the entry points of your code from the root of the project.

E.g. `src/index.ts`.

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCode.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TypeScriptCodeProps`](#@mrgrain/cdk-esbuild.TypeScriptCodeProps)

Props to change the behavior of the bundler.

Default values for `props.buildOptions`:
- `bundle=true`
- `platform=node`
- `target=nodeX` with X being the major node version running locally

---

#### Methods <a name="Methods"></a>

##### `bind` <a name="@mrgrain/cdk-esbuild.TypeScriptCode.bind"></a>

```typescript
public bind(scope: Construct)
```

###### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCode.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `bindToResource` <a name="@mrgrain/cdk-esbuild.TypeScriptCode.bindToResource"></a>

```typescript
public bindToResource(resource: CfnResource, options?: ResourceBindOptions)
```

###### `resource`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCode.parameter.resource"></a>

- *Type:* [`@aws-cdk/core.CfnResource`](#@aws-cdk/core.CfnResource)

---

###### `options`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCode.parameter.options"></a>

- *Type:* [`@aws-cdk/aws-lambda.ResourceBindOptions`](#@aws-cdk/aws-lambda.ResourceBindOptions)

---


#### Properties <a name="Properties"></a>

##### ~~`isInline`~~<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCode.property.isInline"></a>

- *Deprecated:* this value is ignored since inline is now determined based on the the inlineCode field of CodeConfig returned from bind().

```typescript
public readonly isInline: boolean;
```

- *Type:* `boolean`

Determines whether this Code is inline code or not.

---


### TypeScriptSource <a name="@mrgrain/cdk-esbuild.TypeScriptSource"></a>

- *Implements:* [`@aws-cdk/aws-s3-deployment.ISource`](#@aws-cdk/aws-s3-deployment.ISource)

#### Initializers <a name="@mrgrain/cdk-esbuild.TypeScriptSource.Initializer"></a>

```typescript
import { TypeScriptSource } from '@mrgrain/cdk-esbuild'

new TypeScriptSource(entryPoints: string | string[] | {[ key: string ]: string}, props?: TypeScriptSourceProps)
```

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSource.parameter.entryPoints"></a>

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSource.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TypeScriptSourceProps`](#@mrgrain/cdk-esbuild.TypeScriptSourceProps)

---

#### Methods <a name="Methods"></a>

##### `bind` <a name="@mrgrain/cdk-esbuild.TypeScriptSource.bind"></a>

```typescript
public bind(scope: Construct, context?: DeploymentSourceContext)
```

###### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSource.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

###### `context`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSource.parameter.context"></a>

- *Type:* [`@aws-cdk/aws-s3-deployment.DeploymentSourceContext`](#@aws-cdk/aws-s3-deployment.DeploymentSourceContext)

---


#### Properties <a name="Properties"></a>

##### `assetClass`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSource.property.assetClass"></a>

```typescript
public readonly assetClass: TypeScriptAsset;
```

- *Type:* [`@mrgrain/cdk-esbuild.TypeScriptAsset`](#@mrgrain/cdk-esbuild.TypeScriptAsset)

---



