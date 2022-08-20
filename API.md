# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### EsbuildAsset <a name="@mrgrain/cdk-esbuild.EsbuildAsset"></a>

Represents a generic esbuild asset.

You should always use `TypeScriptAsset` or `JavaScriptAsset`.

#### Initializers <a name="@mrgrain/cdk-esbuild.EsbuildAsset.Initializer"></a>

```typescript
import { EsbuildAsset } from '@mrgrain/cdk-esbuild'

new EsbuildAsset(scope: Construct, id: string, props: AssetProps)
```

##### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildAsset.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildAsset.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildAsset.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.AssetProps`](#@mrgrain/cdk-esbuild.AssetProps)

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

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptAsset.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptAsset.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.AssetProps`](#@mrgrain/cdk-esbuild.AssetProps)

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

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptAsset.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptAsset.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.AssetProps`](#@mrgrain/cdk-esbuild.AssetProps)

---





## Structs <a name="Structs"></a>

### AssetProps <a name="@mrgrain/cdk-esbuild.AssetProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { AssetProps } from '@mrgrain/cdk-esbuild'

const assetProps: AssetProps = { ... }
```

##### `buildFn`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.AssetProps.property.buildFn"></a>

```typescript
public readonly buildFn: any;
```

- *Type:* `any`
- *Default:* `esbuild.buildSync`

Escape hatch to provide the bundler with a custom build function.

The function will receive the computed options from the bundler. It can use with these options as it wishes, however `outdir`/`outfile` must be respected to integrate with CDK.
Must throw a `BuildFailure` on failure to correctly inform the bundler.

---

##### `buildOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.AssetProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.BuildOptions`](#@mrgrain/cdk-esbuild.BuildOptions)

Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.

* `buildOptions.outdir: string`
The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
*Cannot be used together with `outfile`*.
* `buildOptions.outfile: string`
Relative path to a file inside the CDK asset output directory.
For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
*Cannot be used with multiple entryPoints or together with `outdir`.*
* `buildOptions.absWorkingDir: string`
Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).

> https://esbuild.github.io/api/#build-api

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.AssetProps.property.copyDir"></a>

```typescript
public readonly copyDir: string | string[] | {[ key: string ]: string | string[]};
```

- *Type:* `string` | `string`[] | {[ key: string ]: `string` | `string`[]}

Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

* When provided with a `string` or `array`, all files are copied to the root of asset staging directory.
* When given a `map`, the key indicates the destination relative to the asset staging directory and the value is a list of all sources to be copied.

Therefore the following values for `copyDir` are all equivalent:
```ts
{ copyDir: "path/to/source" }
{ copyDir: ["path/to/source"] }
{ copyDir: { ".": "path/to/source" } }
{ copyDir: { ".": ["path/to/source"] } }
```
The destination cannot be outside of the asset staging directory.
If you are receiving the error "Cannot copy files to outside of the asset staging directory."
you are likely using `..` or an absolute path as key on the `copyDir` map.
Instead use only relative paths and avoid `..`.

---

##### `esbuildBinaryPath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.AssetProps.property.esbuildBinaryPath"></a>

```typescript
public readonly esbuildBinaryPath: string;
```

- *Type:* `string`

Path to the binary used by esbuild.

This is the same as setting the ESBUILD_BINARY_PATH environment variable.

---

##### `esbuildModulePath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.AssetProps.property.esbuildModulePath"></a>

```typescript
public readonly esbuildModulePath: string;
```

- *Type:* `string`
- *Default:* `CDK_ESBUILD_MODULE_PATH` or package resolution (see above)

Absolute path to the esbuild module JS file.

E.g. "/home/user/.npm/node_modules/esbuild/lib/main.js"

If not set, the module path will be determined in the following order:

- Use a path from the `CDK_ESBUILD_MODULE_PATH` environment variable
- In TypeScript, fallback to the default Node.js package resolution mechanism
- All other languages (Python, Go, .NET, Java) use an automatic "best effort" resolution mechanism. \
   The exact algorithm of this mechanism is considered an implementation detail and should not be relied on.
   If `esbuild` cannot be found, it might be installed dynamically to a temporary location.
   To opt-out of this behavior, set either `esbuildModulePath` or `CDK_ESBUILD_MODULE_PATH` env variable.

---

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.AssetProps.property.entryPoints"></a>

```typescript
public readonly entryPoints: string | string[] | {[ key: string ]: string};
```

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

A path or list or map of paths to the entry points of your code.

Relative paths are by default resolved from the current working directory.
To change the working directory, see `buildOptions.absWorkingDir`.

Absolute paths can be used if files are part of the working directory.

Examples:
  - `'src/index.ts'`
  - `require.resolve('./lambda')`
  - `['src/index.ts', 'src/util.ts']`
  - `{one: 'src/two.ts', two: 'src/one.ts'}`

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

Documentation: https://esbuild.github.io/api/#working-directory.

---

##### `allowOverwrite`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.allowOverwrite"></a>

```typescript
public readonly allowOverwrite: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#allow-overwrite.

---

##### `assetNames`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.assetNames"></a>

```typescript
public readonly assetNames: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#asset-names.

---

##### `banner`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.banner"></a>

```typescript
public readonly banner: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

Documentation: https://esbuild.github.io/api/#banner.

---

##### `bundle`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.bundle"></a>

```typescript
public readonly bundle: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#bundle.

---

##### `charset`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.charset"></a>

```typescript
public readonly charset: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#charset.

---

##### `chunkNames`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.chunkNames"></a>

```typescript
public readonly chunkNames: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#chunk-names.

---

##### `color`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.color"></a>

```typescript
public readonly color: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#color.

---

##### `conditions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.conditions"></a>

```typescript
public readonly conditions: string[];
```

- *Type:* `string`[]

Documentation: https://esbuild.github.io/api/#conditions.

---

##### `define`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.define"></a>

```typescript
public readonly define: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

Documentation: https://esbuild.github.io/api/#define.

---

##### `drop`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.drop"></a>

```typescript
public readonly drop: string[];
```

- *Type:* `string`[]

Documentation: https://esbuild.github.io/api/#drop.

---

##### `entryNames`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.entryNames"></a>

```typescript
public readonly entryNames: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#entry-names.

---

##### `external`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.external"></a>

```typescript
public readonly external: string[];
```

- *Type:* `string`[]

Documentation: https://esbuild.github.io/api/#external.

---

##### `footer`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.footer"></a>

```typescript
public readonly footer: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

Documentation: https://esbuild.github.io/api/#footer.

---

##### `format`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.format"></a>

```typescript
public readonly format: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#format.

---

##### `globalName`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.globalName"></a>

```typescript
public readonly globalName: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#global-name.

---

##### `ignoreAnnotations`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.ignoreAnnotations"></a>

```typescript
public readonly ignoreAnnotations: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#ignore-annotations.

---

##### `incremental`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.incremental"></a>

```typescript
public readonly incremental: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#incremental.

---

##### `inject`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.inject"></a>

```typescript
public readonly inject: string[];
```

- *Type:* `string`[]

Documentation: https://esbuild.github.io/api/#inject.

---

##### `jsx`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.jsx"></a>

```typescript
public readonly jsx: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#jsx.

---

##### `jsxDev`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.jsxDev"></a>

```typescript
public readonly jsxDev: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#jsx-development.

---

##### `jsxFactory`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.jsxFactory"></a>

```typescript
public readonly jsxFactory: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#jsx-factory.

---

##### `jsxFragment`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.jsxFragment"></a>

```typescript
public readonly jsxFragment: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#jsx-fragment.

---

##### `jsxImportSource`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.jsxImportSource"></a>

```typescript
public readonly jsxImportSource: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#jsx-import-source.

---

##### `keepNames`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.keepNames"></a>

```typescript
public readonly keepNames: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#keep-names.

---

##### `legalComments`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.legalComments"></a>

```typescript
public readonly legalComments: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#legal-comments.

---

##### `loader`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.loader"></a>

```typescript
public readonly loader: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

Documentation: https://esbuild.github.io/api/#loader.

---

##### `logLevel`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.logLevel"></a>

```typescript
public readonly logLevel: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#log-level.

---

##### `logLimit`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.logLimit"></a>

```typescript
public readonly logLimit: number;
```

- *Type:* `number`

Documentation: https://esbuild.github.io/api/#log-limit.

---

##### `logOverride`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.logOverride"></a>

```typescript
public readonly logOverride: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

Documentation: https://esbuild.github.io/api/#log-override.

---

##### `mainFields`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.mainFields"></a>

```typescript
public readonly mainFields: string[];
```

- *Type:* `string`[]

Documentation: https://esbuild.github.io/api/#main-fields.

---

##### `mangleCache`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.mangleCache"></a>

```typescript
public readonly mangleCache: {[ key: string ]: string | boolean};
```

- *Type:* {[ key: string ]: `string` | `boolean`}

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `mangleProps`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.mangleProps"></a>

```typescript
public readonly mangleProps: any;
```

- *Type:* `any`

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `mangleQuoted`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.mangleQuoted"></a>

```typescript
public readonly mangleQuoted: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `metafile`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.metafile"></a>

```typescript
public readonly metafile: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#metafile.

---

##### `minify`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.minify"></a>

```typescript
public readonly minify: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifyIdentifiers`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.minifyIdentifiers"></a>

```typescript
public readonly minifyIdentifiers: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifySyntax`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.minifySyntax"></a>

```typescript
public readonly minifySyntax: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifyWhitespace`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.minifyWhitespace"></a>

```typescript
public readonly minifyWhitespace: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#minify.

---

##### `nodePaths`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.nodePaths"></a>

```typescript
public readonly nodePaths: string[];
```

- *Type:* `string`[]

Documentation: https://esbuild.github.io/api/#node-paths.

---

##### `outbase`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.outbase"></a>

```typescript
public readonly outbase: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#outbase.

---

##### `outdir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#outdir.

---

##### `outExtension`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.outExtension"></a>

```typescript
public readonly outExtension: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

Documentation: https://esbuild.github.io/api/#out-extension.

---

##### `outfile`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.outfile"></a>

```typescript
public readonly outfile: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#outfile.

---

##### `platform`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#platform.

---

##### `preserveSymlinks`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.preserveSymlinks"></a>

```typescript
public readonly preserveSymlinks: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#preserve-symlinks.

---

##### `publicPath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.publicPath"></a>

```typescript
public readonly publicPath: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#public-path.

---

##### `pure`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.pure"></a>

```typescript
public readonly pure: string[];
```

- *Type:* `string`[]

Documentation: https://esbuild.github.io/api/#pure.

---

##### `reserveProps`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.reserveProps"></a>

```typescript
public readonly reserveProps: any;
```

- *Type:* `any`

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `resolveExtensions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.resolveExtensions"></a>

```typescript
public readonly resolveExtensions: string[];
```

- *Type:* `string`[]

Documentation: https://esbuild.github.io/api/#resolve-extensions.

---

##### `sourcemap`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.sourcemap"></a>

```typescript
public readonly sourcemap: boolean | string;
```

- *Type:* `boolean` | `string`

Documentation: https://esbuild.github.io/api/#sourcemap.

---

##### `sourceRoot`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.sourceRoot"></a>

```typescript
public readonly sourceRoot: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#source-root.

---

##### `sourcesContent`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.sourcesContent"></a>

```typescript
public readonly sourcesContent: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#sources-content.

---

##### `splitting`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.splitting"></a>

```typescript
public readonly splitting: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#splitting.

---

##### `supported`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.supported"></a>

```typescript
public readonly supported: {[ key: string ]: boolean};
```

- *Type:* {[ key: string ]: `boolean`}

Documentation: https://esbuild.github.io/api/#supported.

---

##### `target`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.target"></a>

```typescript
public readonly target: string | string[];
```

- *Type:* `string` | `string`[]

Documentation: https://esbuild.github.io/api/#target.

---

##### `treeShaking`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.treeShaking"></a>

```typescript
public readonly treeShaking: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#tree-shaking.

---

##### `tsconfig`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.tsconfig"></a>

```typescript
public readonly tsconfig: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#tsconfig.

---

##### `write`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BuildOptions.property.write"></a>

```typescript
public readonly write: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#write.

---

### BundlerProps <a name="@mrgrain/cdk-esbuild.BundlerProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { BundlerProps } from '@mrgrain/cdk-esbuild'

const bundlerProps: BundlerProps = { ... }
```

##### `buildFn`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BundlerProps.property.buildFn"></a>

```typescript
public readonly buildFn: any;
```

- *Type:* `any`
- *Default:* `esbuild.buildSync`

Escape hatch to provide the bundler with a custom build function.

The function will receive the computed options from the bundler. It can use with these options as it wishes, however `outdir`/`outfile` must be respected to integrate with CDK.
Must throw a `BuildFailure` on failure to correctly inform the bundler.

---

##### `buildOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BundlerProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.BuildOptions`](#@mrgrain/cdk-esbuild.BuildOptions)

Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.

* `buildOptions.outdir: string`
The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
*Cannot be used together with `outfile`*.
* `buildOptions.outfile: string`
Relative path to a file inside the CDK asset output directory.
For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
*Cannot be used with multiple entryPoints or together with `outdir`.*
* `buildOptions.absWorkingDir: string`
Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).

> https://esbuild.github.io/api/#build-api

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BundlerProps.property.copyDir"></a>

```typescript
public readonly copyDir: string | string[] | {[ key: string ]: string | string[]};
```

- *Type:* `string` | `string`[] | {[ key: string ]: `string` | `string`[]}

Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

* When provided with a `string` or `array`, all files are copied to the root of asset staging directory.
* When given a `map`, the key indicates the destination relative to the asset staging directory and the value is a list of all sources to be copied.

Therefore the following values for `copyDir` are all equivalent:
```ts
{ copyDir: "path/to/source" }
{ copyDir: ["path/to/source"] }
{ copyDir: { ".": "path/to/source" } }
{ copyDir: { ".": ["path/to/source"] } }
```
The destination cannot be outside of the asset staging directory.
If you are receiving the error "Cannot copy files to outside of the asset staging directory."
you are likely using `..` or an absolute path as key on the `copyDir` map.
Instead use only relative paths and avoid `..`.

---

##### `esbuildBinaryPath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BundlerProps.property.esbuildBinaryPath"></a>

```typescript
public readonly esbuildBinaryPath: string;
```

- *Type:* `string`

Path to the binary used by esbuild.

This is the same as setting the ESBUILD_BINARY_PATH environment variable.

---

##### `esbuildModulePath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BundlerProps.property.esbuildModulePath"></a>

```typescript
public readonly esbuildModulePath: string;
```

- *Type:* `string`
- *Default:* `CDK_ESBUILD_MODULE_PATH` or package resolution (see above)

Absolute path to the esbuild module JS file.

E.g. "/home/user/.npm/node_modules/esbuild/lib/main.js"

If not set, the module path will be determined in the following order:

- Use a path from the `CDK_ESBUILD_MODULE_PATH` environment variable
- In TypeScript, fallback to the default Node.js package resolution mechanism
- All other languages (Python, Go, .NET, Java) use an automatic "best effort" resolution mechanism. \
   The exact algorithm of this mechanism is considered an implementation detail and should not be relied on.
   If `esbuild` cannot be found, it might be installed dynamically to a temporary location.
   To opt-out of this behavior, set either `esbuildModulePath` or `CDK_ESBUILD_MODULE_PATH` env variable.

---

### CodeConfig <a name="@mrgrain/cdk-esbuild.CodeConfig"></a>

Result of binding `Code` into a `Function`.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { CodeConfig } from '@mrgrain/cdk-esbuild'

const codeConfig: CodeConfig = { ... }
```

##### `image`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.CodeConfig.property.image"></a>

```typescript
public readonly image: CodeImageConfig;
```

- *Type:* [`aws-cdk-lib.aws_lambda.CodeImageConfig`](#aws-cdk-lib.aws_lambda.CodeImageConfig)
- *Default:* code is not an ECR container image

Docker image configuration (mutually exclusive with `s3Location` and `inlineCode`).

---

##### `inlineCode`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.CodeConfig.property.inlineCode"></a>

```typescript
public readonly inlineCode: string;
```

- *Type:* `string`
- *Default:* code is not inline code

Inline code (mutually exclusive with `s3Location` and `image`).

---

##### `s3Location`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.CodeConfig.property.s3Location"></a>

```typescript
public readonly s3Location: Location;
```

- *Type:* [`aws-cdk-lib.aws_s3.Location`](#aws-cdk-lib.aws_s3.Location)
- *Default:* code is not an s3 location

The location of the code in S3 (mutually exclusive with `inlineCode` and `image`).

---

### JavaScriptCodeProps <a name="@mrgrain/cdk-esbuild.JavaScriptCodeProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { JavaScriptCodeProps } from '@mrgrain/cdk-esbuild'

const javaScriptCodeProps: JavaScriptCodeProps = { ... }
```

##### `buildFn`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCodeProps.property.buildFn"></a>

```typescript
public readonly buildFn: any;
```

- *Type:* `any`
- *Default:* `esbuild.buildSync`

Escape hatch to provide the bundler with a custom build function.

The function will receive the computed options from the bundler. It can use with these options as it wishes, however `outdir`/`outfile` must be respected to integrate with CDK.
Must throw a `BuildFailure` on failure to correctly inform the bundler.

---

##### `buildOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCodeProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.BuildOptions`](#@mrgrain/cdk-esbuild.BuildOptions)

Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.

* `buildOptions.outdir: string`
The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
*Cannot be used together with `outfile`*.
* `buildOptions.outfile: string`
Relative path to a file inside the CDK asset output directory.
For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
*Cannot be used with multiple entryPoints or together with `outdir`.*
* `buildOptions.absWorkingDir: string`
Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).

> https://esbuild.github.io/api/#build-api

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCodeProps.property.copyDir"></a>

```typescript
public readonly copyDir: string | string[] | {[ key: string ]: string | string[]};
```

- *Type:* `string` | `string`[] | {[ key: string ]: `string` | `string`[]}

Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

* When provided with a `string` or `array`, all files are copied to the root of asset staging directory.
* When given a `map`, the key indicates the destination relative to the asset staging directory and the value is a list of all sources to be copied.

Therefore the following values for `copyDir` are all equivalent:
```ts
{ copyDir: "path/to/source" }
{ copyDir: ["path/to/source"] }
{ copyDir: { ".": "path/to/source" } }
{ copyDir: { ".": ["path/to/source"] } }
```
The destination cannot be outside of the asset staging directory.
If you are receiving the error "Cannot copy files to outside of the asset staging directory."
you are likely using `..` or an absolute path as key on the `copyDir` map.
Instead use only relative paths and avoid `..`.

---

##### `esbuildBinaryPath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCodeProps.property.esbuildBinaryPath"></a>

```typescript
public readonly esbuildBinaryPath: string;
```

- *Type:* `string`

Path to the binary used by esbuild.

This is the same as setting the ESBUILD_BINARY_PATH environment variable.

---

##### `esbuildModulePath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCodeProps.property.esbuildModulePath"></a>

```typescript
public readonly esbuildModulePath: string;
```

- *Type:* `string`
- *Default:* `CDK_ESBUILD_MODULE_PATH` or package resolution (see above)

Absolute path to the esbuild module JS file.

E.g. "/home/user/.npm/node_modules/esbuild/lib/main.js"

If not set, the module path will be determined in the following order:

- Use a path from the `CDK_ESBUILD_MODULE_PATH` environment variable
- In TypeScript, fallback to the default Node.js package resolution mechanism
- All other languages (Python, Go, .NET, Java) use an automatic "best effort" resolution mechanism. \
   The exact algorithm of this mechanism is considered an implementation detail and should not be relied on.
   If `esbuild` cannot be found, it might be installed dynamically to a temporary location.
   To opt-out of this behavior, set either `esbuildModulePath` or `CDK_ESBUILD_MODULE_PATH` env variable.

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

##### `buildFn`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSourceProps.property.buildFn"></a>

```typescript
public readonly buildFn: any;
```

- *Type:* `any`
- *Default:* `esbuild.buildSync`

Escape hatch to provide the bundler with a custom build function.

The function will receive the computed options from the bundler. It can use with these options as it wishes, however `outdir`/`outfile` must be respected to integrate with CDK.
Must throw a `BuildFailure` on failure to correctly inform the bundler.

---

##### `buildOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSourceProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.BuildOptions`](#@mrgrain/cdk-esbuild.BuildOptions)

Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.

* `buildOptions.outdir: string`
The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
*Cannot be used together with `outfile`*.
* `buildOptions.outfile: string`
Relative path to a file inside the CDK asset output directory.
For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
*Cannot be used with multiple entryPoints or together with `outdir`.*
* `buildOptions.absWorkingDir: string`
Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).

> https://esbuild.github.io/api/#build-api

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSourceProps.property.copyDir"></a>

```typescript
public readonly copyDir: string | string[] | {[ key: string ]: string | string[]};
```

- *Type:* `string` | `string`[] | {[ key: string ]: `string` | `string`[]}

Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

* When provided with a `string` or `array`, all files are copied to the root of asset staging directory.
* When given a `map`, the key indicates the destination relative to the asset staging directory and the value is a list of all sources to be copied.

Therefore the following values for `copyDir` are all equivalent:
```ts
{ copyDir: "path/to/source" }
{ copyDir: ["path/to/source"] }
{ copyDir: { ".": "path/to/source" } }
{ copyDir: { ".": ["path/to/source"] } }
```
The destination cannot be outside of the asset staging directory.
If you are receiving the error "Cannot copy files to outside of the asset staging directory."
you are likely using `..` or an absolute path as key on the `copyDir` map.
Instead use only relative paths and avoid `..`.

---

##### `esbuildBinaryPath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSourceProps.property.esbuildBinaryPath"></a>

```typescript
public readonly esbuildBinaryPath: string;
```

- *Type:* `string`

Path to the binary used by esbuild.

This is the same as setting the ESBUILD_BINARY_PATH environment variable.

---

##### `esbuildModulePath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSourceProps.property.esbuildModulePath"></a>

```typescript
public readonly esbuildModulePath: string;
```

- *Type:* `string`
- *Default:* `CDK_ESBUILD_MODULE_PATH` or package resolution (see above)

Absolute path to the esbuild module JS file.

E.g. "/home/user/.npm/node_modules/esbuild/lib/main.js"

If not set, the module path will be determined in the following order:

- Use a path from the `CDK_ESBUILD_MODULE_PATH` environment variable
- In TypeScript, fallback to the default Node.js package resolution mechanism
- All other languages (Python, Go, .NET, Java) use an automatic "best effort" resolution mechanism. \
   The exact algorithm of this mechanism is considered an implementation detail and should not be relied on.
   If `esbuild` cannot be found, it might be installed dynamically to a temporary location.
   To opt-out of this behavior, set either `esbuildModulePath` or `CDK_ESBUILD_MODULE_PATH` env variable.

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

### TransformerProps <a name="@mrgrain/cdk-esbuild.TransformerProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { TransformerProps } from '@mrgrain/cdk-esbuild'

const transformerProps: TransformerProps = { ... }
```

##### `esbuildBinaryPath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformerProps.property.esbuildBinaryPath"></a>

```typescript
public readonly esbuildBinaryPath: string;
```

- *Type:* `string`

Path to the binary used by esbuild.

This is the same as setting the ESBUILD_BINARY_PATH environment variable.

---

##### `esbuildModulePath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformerProps.property.esbuildModulePath"></a>

```typescript
public readonly esbuildModulePath: string;
```

- *Type:* `string`
- *Default:* `CDK_ESBUILD_MODULE_PATH` or package resolution (see above)

Absolute path to the esbuild module JS file.

E.g. "/home/user/.npm/node_modules/esbuild/lib/main.js"

If not set, the module path will be determined in the following order:

- Use a path from the `CDK_ESBUILD_MODULE_PATH` environment variable
- In TypeScript, fallback to the default Node.js package resolution mechanism
- All other languages (Python, Go, .NET, Java) use an automatic "best effort" resolution mechanism. \
   The exact algorithm of this mechanism is considered an implementation detail and should not be relied on.
   If `esbuild` cannot be found, it might be installed dynamically to a temporary location.
   To opt-out of this behavior, set either `esbuildModulePath` or `CDK_ESBUILD_MODULE_PATH` env variable.

---

##### `transformFn`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformerProps.property.transformFn"></a>

```typescript
public readonly transformFn: any;
```

- *Type:* `any`
- *Default:* `esbuild.transformSync`

Escape hatch to provide the bundler with a custom transform function.

The function will receive the computed options from the bundler. It can use with these options as it wishes, however a TransformResult must be returned to integrate with CDK.
Must throw a `TransformFailure` on failure to correctly inform the bundler.

---

##### `transformOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformerProps.property.transformOptions"></a>

```typescript
public readonly transformOptions: TransformOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.TransformOptions`](#@mrgrain/cdk-esbuild.TransformOptions)

Transform options passed on to esbuild.

Please refer to the esbuild Transform API docs for details.

> https://esbuild.github.io/api/#transform-api

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

Documentation: https://esbuild.github.io/api/#charset.

---

##### `color`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.color"></a>

```typescript
public readonly color: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#color.

---

##### `define`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.define"></a>

```typescript
public readonly define: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

Documentation: https://esbuild.github.io/api/#define.

---

##### `drop`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.drop"></a>

```typescript
public readonly drop: string[];
```

- *Type:* `string`[]

Documentation: https://esbuild.github.io/api/#drop.

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

Documentation: https://esbuild.github.io/api/#format.

---

##### `globalName`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.globalName"></a>

```typescript
public readonly globalName: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#global-name.

---

##### `ignoreAnnotations`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.ignoreAnnotations"></a>

```typescript
public readonly ignoreAnnotations: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#ignore-annotations.

---

##### `jsx`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.jsx"></a>

```typescript
public readonly jsx: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#jsx.

---

##### `jsxDev`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.jsxDev"></a>

```typescript
public readonly jsxDev: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#jsx-development.

---

##### `jsxFactory`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.jsxFactory"></a>

```typescript
public readonly jsxFactory: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#jsx-factory.

---

##### `jsxFragment`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.jsxFragment"></a>

```typescript
public readonly jsxFragment: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#jsx-fragment.

---

##### `jsxImportSource`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.jsxImportSource"></a>

```typescript
public readonly jsxImportSource: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#jsx-import-source.

---

##### `keepNames`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.keepNames"></a>

```typescript
public readonly keepNames: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#keep-names.

---

##### `legalComments`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.legalComments"></a>

```typescript
public readonly legalComments: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#legal-comments.

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

Documentation: https://esbuild.github.io/api/#log-level.

---

##### `logLimit`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.logLimit"></a>

```typescript
public readonly logLimit: number;
```

- *Type:* `number`

Documentation: https://esbuild.github.io/api/#log-limit.

---

##### `logOverride`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.logOverride"></a>

```typescript
public readonly logOverride: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

Documentation: https://esbuild.github.io/api/#log-override.

---

##### `mangleCache`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.mangleCache"></a>

```typescript
public readonly mangleCache: {[ key: string ]: string | boolean};
```

- *Type:* {[ key: string ]: `string` | `boolean`}

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `mangleProps`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.mangleProps"></a>

```typescript
public readonly mangleProps: any;
```

- *Type:* `any`

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `mangleQuoted`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.mangleQuoted"></a>

```typescript
public readonly mangleQuoted: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `minify`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.minify"></a>

```typescript
public readonly minify: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifyIdentifiers`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.minifyIdentifiers"></a>

```typescript
public readonly minifyIdentifiers: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifySyntax`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.minifySyntax"></a>

```typescript
public readonly minifySyntax: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifyWhitespace`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.minifyWhitespace"></a>

```typescript
public readonly minifyWhitespace: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#minify.

---

##### `platform`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#platform.

---

##### `pure`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.pure"></a>

```typescript
public readonly pure: string[];
```

- *Type:* `string`[]

Documentation: https://esbuild.github.io/api/#pure.

---

##### `reserveProps`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.reserveProps"></a>

```typescript
public readonly reserveProps: any;
```

- *Type:* `any`

Documentation: https://esbuild.github.io/api/#mangle-props.

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

Documentation: https://esbuild.github.io/api/#sourcemap.

---

##### `sourceRoot`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.sourceRoot"></a>

```typescript
public readonly sourceRoot: string;
```

- *Type:* `string`

Documentation: https://esbuild.github.io/api/#source-root.

---

##### `sourcesContent`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.sourcesContent"></a>

```typescript
public readonly sourcesContent: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#sources-content.

---

##### `supported`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.supported"></a>

```typescript
public readonly supported: {[ key: string ]: boolean};
```

- *Type:* {[ key: string ]: `boolean`}

Documentation: https://esbuild.github.io/api/#supported.

---

##### `target`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.target"></a>

```typescript
public readonly target: string | string[];
```

- *Type:* `string` | `string`[]

Documentation: https://esbuild.github.io/api/#target.

---

##### `treeShaking`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TransformOptions.property.treeShaking"></a>

```typescript
public readonly treeShaking: boolean;
```

- *Type:* `boolean`

Documentation: https://esbuild.github.io/api/#tree-shaking.

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

##### `buildFn`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.buildFn"></a>

```typescript
public readonly buildFn: any;
```

- *Type:* `any`
- *Default:* `esbuild.buildSync`

Escape hatch to provide the bundler with a custom build function.

The function will receive the computed options from the bundler. It can use with these options as it wishes, however `outdir`/`outfile` must be respected to integrate with CDK.
Must throw a `BuildFailure` on failure to correctly inform the bundler.

---

##### `buildOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.BuildOptions`](#@mrgrain/cdk-esbuild.BuildOptions)

Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.

* `buildOptions.outdir: string`
The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
*Cannot be used together with `outfile`*.
* `buildOptions.outfile: string`
Relative path to a file inside the CDK asset output directory.
For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
*Cannot be used with multiple entryPoints or together with `outdir`.*
* `buildOptions.absWorkingDir: string`
Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).

> https://esbuild.github.io/api/#build-api

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.copyDir"></a>

```typescript
public readonly copyDir: string | string[] | {[ key: string ]: string | string[]};
```

- *Type:* `string` | `string`[] | {[ key: string ]: `string` | `string`[]}

Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

* When provided with a `string` or `array`, all files are copied to the root of asset staging directory.
* When given a `map`, the key indicates the destination relative to the asset staging directory and the value is a list of all sources to be copied.

Therefore the following values for `copyDir` are all equivalent:
```ts
{ copyDir: "path/to/source" }
{ copyDir: ["path/to/source"] }
{ copyDir: { ".": "path/to/source" } }
{ copyDir: { ".": ["path/to/source"] } }
```
The destination cannot be outside of the asset staging directory.
If you are receiving the error "Cannot copy files to outside of the asset staging directory."
you are likely using `..` or an absolute path as key on the `copyDir` map.
Instead use only relative paths and avoid `..`.

---

##### `esbuildBinaryPath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.esbuildBinaryPath"></a>

```typescript
public readonly esbuildBinaryPath: string;
```

- *Type:* `string`

Path to the binary used by esbuild.

This is the same as setting the ESBUILD_BINARY_PATH environment variable.

---

##### `esbuildModulePath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.esbuildModulePath"></a>

```typescript
public readonly esbuildModulePath: string;
```

- *Type:* `string`
- *Default:* `CDK_ESBUILD_MODULE_PATH` or package resolution (see above)

Absolute path to the esbuild module JS file.

E.g. "/home/user/.npm/node_modules/esbuild/lib/main.js"

If not set, the module path will be determined in the following order:

- Use a path from the `CDK_ESBUILD_MODULE_PATH` environment variable
- In TypeScript, fallback to the default Node.js package resolution mechanism
- All other languages (Python, Go, .NET, Java) use an automatic "best effort" resolution mechanism. \
   The exact algorithm of this mechanism is considered an implementation detail and should not be relied on.
   If `esbuild` cannot be found, it might be installed dynamically to a temporary location.
   To opt-out of this behavior, set either `esbuildModulePath` or `CDK_ESBUILD_MODULE_PATH` env variable.

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

##### `buildFn`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.buildFn"></a>

```typescript
public readonly buildFn: any;
```

- *Type:* `any`
- *Default:* `esbuild.buildSync`

Escape hatch to provide the bundler with a custom build function.

The function will receive the computed options from the bundler. It can use with these options as it wishes, however `outdir`/`outfile` must be respected to integrate with CDK.
Must throw a `BuildFailure` on failure to correctly inform the bundler.

---

##### `buildOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.BuildOptions`](#@mrgrain/cdk-esbuild.BuildOptions)

Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.

* `buildOptions.outdir: string`
The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
*Cannot be used together with `outfile`*.
* `buildOptions.outfile: string`
Relative path to a file inside the CDK asset output directory.
For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
*Cannot be used with multiple entryPoints or together with `outdir`.*
* `buildOptions.absWorkingDir: string`
Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).

> https://esbuild.github.io/api/#build-api

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.copyDir"></a>

```typescript
public readonly copyDir: string | string[] | {[ key: string ]: string | string[]};
```

- *Type:* `string` | `string`[] | {[ key: string ]: `string` | `string`[]}

Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

* When provided with a `string` or `array`, all files are copied to the root of asset staging directory.
* When given a `map`, the key indicates the destination relative to the asset staging directory and the value is a list of all sources to be copied.

Therefore the following values for `copyDir` are all equivalent:
```ts
{ copyDir: "path/to/source" }
{ copyDir: ["path/to/source"] }
{ copyDir: { ".": "path/to/source" } }
{ copyDir: { ".": ["path/to/source"] } }
```
The destination cannot be outside of the asset staging directory.
If you are receiving the error "Cannot copy files to outside of the asset staging directory."
you are likely using `..` or an absolute path as key on the `copyDir` map.
Instead use only relative paths and avoid `..`.

---

##### `esbuildBinaryPath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.esbuildBinaryPath"></a>

```typescript
public readonly esbuildBinaryPath: string;
```

- *Type:* `string`

Path to the binary used by esbuild.

This is the same as setting the ESBUILD_BINARY_PATH environment variable.

---

##### `esbuildModulePath`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.esbuildModulePath"></a>

```typescript
public readonly esbuildModulePath: string;
```

- *Type:* `string`
- *Default:* `CDK_ESBUILD_MODULE_PATH` or package resolution (see above)

Absolute path to the esbuild module JS file.

E.g. "/home/user/.npm/node_modules/esbuild/lib/main.js"

If not set, the module path will be determined in the following order:

- Use a path from the `CDK_ESBUILD_MODULE_PATH` environment variable
- In TypeScript, fallback to the default Node.js package resolution mechanism
- All other languages (Python, Go, .NET, Java) use an automatic "best effort" resolution mechanism. \
   The exact algorithm of this mechanism is considered an implementation detail and should not be relied on.
   If `esbuild` cannot be found, it might be installed dynamically to a temporary location.
   To opt-out of this behavior, set either `esbuildModulePath` or `CDK_ESBUILD_MODULE_PATH` env variable.

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

A path or list or map of paths to the entry points of your code.

Relative paths are by default resolved from the current working directory.
To change the working directory, see `buildOptions.absWorkingDir`.

Absolute paths can be used if files are part of the working directory.

Examples:
  - `'src/index.ts'`
  - `require.resolve('./lambda')`
  - `['src/index.ts', 'src/util.ts']`
  - `{one: 'src/two.ts', two: 'src/one.ts'}`

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

A path or list or map of paths to the entry points of your code.

Relative paths are by default resolved from the current working directory.
To change the working directory, see `buildOptions.absWorkingDir`.

Absolute paths can be used if files are part of the working directory.

Examples:
  - `'src/index.ts'`
  - `require.resolve('./lambda')`
  - `['src/index.ts', 'src/util.ts']`
  - `{one: 'src/two.ts', two: 'src/one.ts'}`

---

##### ~~`image`~~<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.property.image"></a>

- *Deprecated:* This value is ignored since the bundler is always using a locally installed version of esbuild. However the property is required to comply with the `BundlingOptions` interface.

```typescript
public readonly image: DockerImage;
```

- *Type:* [`aws-cdk-lib.DockerImage`](#aws-cdk-lib.DockerImage)

---

##### `local`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.property.local"></a>

```typescript
public readonly local: ILocalBundling;
```

- *Type:* [`aws-cdk-lib.ILocalBundling`](#aws-cdk-lib.ILocalBundling)

Implementation of `ILocalBundling` interface, responsible for calling esbuild functions.

---

##### `props`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.property.props"></a>

```typescript
public readonly props: BundlerProps;
```

- *Type:* [`@mrgrain/cdk-esbuild.BundlerProps`](#@mrgrain/cdk-esbuild.BundlerProps)

Props to change the behaviour of the bundler.

---


### EsbuildCode <a name="@mrgrain/cdk-esbuild.EsbuildCode"></a>

Represents a generic esbuild code bundle.

You should always use `TypeScriptCode` or `JavaScriptCode`.

#### Initializers <a name="@mrgrain/cdk-esbuild.EsbuildCode.Initializer"></a>

```typescript
import { EsbuildCode } from '@mrgrain/cdk-esbuild'

new EsbuildCode(entryPoints: string | string[] | {[ key: string ]: string}, props: JavaScriptCodeProps | TypeScriptCodeProps)
```

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildCode.parameter.entryPoints"></a>

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

A path or list or map of paths to the entry points of your code.

Relative paths are by default resolved from the current working directory.
To change the working directory, see `buildOptions.absWorkingDir`.

Absolute paths can be used if files are part of the working directory.

Examples:
  - `'src/index.ts'`
  - `require.resolve('./lambda')`
  - `['src/index.ts', 'src/util.ts']`
  - `{one: 'src/two.ts', two: 'src/one.ts'}`

---

##### `props`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildCode.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.JavaScriptCodeProps`](#@mrgrain/cdk-esbuild.JavaScriptCodeProps) | [`@mrgrain/cdk-esbuild.TypeScriptCodeProps`](#@mrgrain/cdk-esbuild.TypeScriptCodeProps)

Props to change the behavior of the bundler.

Default values for `props.buildOptions`:
- `bundle=true`
- `platform=node`
- `target=nodeX` with X being the major node version running locally

---

#### Methods <a name="Methods"></a>

##### `bind` <a name="@mrgrain/cdk-esbuild.EsbuildCode.bind"></a>

```typescript
public bind(scope: Construct)
```

###### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildCode.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `bindToResource` <a name="@mrgrain/cdk-esbuild.EsbuildCode.bindToResource"></a>

```typescript
public bindToResource(resource: CfnResource, options?: ResourceBindOptions)
```

###### `resource`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildCode.parameter.resource"></a>

- *Type:* [`aws-cdk-lib.CfnResource`](#aws-cdk-lib.CfnResource)

---

###### `options`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.EsbuildCode.parameter.options"></a>

- *Type:* [`aws-cdk-lib.aws_lambda.ResourceBindOptions`](#aws-cdk-lib.aws_lambda.ResourceBindOptions)

---


#### Properties <a name="Properties"></a>

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildCode.property.entryPoints"></a>

```typescript
public readonly entryPoints: string | string[] | {[ key: string ]: string};
```

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

A path or list or map of paths to the entry points of your code.

Relative paths are by default resolved from the current working directory.
To change the working directory, see `buildOptions.absWorkingDir`.

Absolute paths can be used if files are part of the working directory.

Examples:
  - `'src/index.ts'`
  - `require.resolve('./lambda')`
  - `['src/index.ts', 'src/util.ts']`
  - `{one: 'src/two.ts', two: 'src/one.ts'}`

---

##### ~~`isInline`~~<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildCode.property.isInline"></a>

- *Deprecated:* this value is ignored since inline is now determined based on the the inlineCode field of CodeConfig returned from bind().

```typescript
public readonly isInline: boolean;
```

- *Type:* `boolean`

Determines whether this Code is inline code or not.

---


### EsbuildSource <a name="@mrgrain/cdk-esbuild.EsbuildSource"></a>

#### Initializers <a name="@mrgrain/cdk-esbuild.EsbuildSource.Initializer"></a>

```typescript
import { EsbuildSource } from '@mrgrain/cdk-esbuild'

new EsbuildSource()
```



#### Properties <a name="Properties"></a>

##### `auto`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildSource.property.auto"></a>

```typescript
public readonly auto: string;
```

- *Type:* `string`

First try to find to module, then install it to a temporary location.

---

##### `install`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildSource.property.install"></a>

```typescript
public readonly install: string;
```

- *Type:* `string`

Install the module to a temporary location.

---

##### `nodeJs`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildSource.property.nodeJs"></a>

```typescript
public readonly nodeJs: string;
```

- *Type:* `string`

Require module by name, do not attempt to find it anywhere else.

---

##### `platformDefault`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildSource.property.platformDefault"></a>

```typescript
public readonly platformDefault: string;
```

- *Type:* `string`

`EsbuildSource.nodeJs` for NodeJs, `EsbuildSource.auto` for all other languages.

---

##### `anywhere`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.EsbuildSource.property.anywhere"></a>

```typescript
public readonly anywhere: string;
```

- *Type:* `string`

Try to find the module in most common paths.

---

##### `globalPaths`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.EsbuildSource.property.globalPaths"></a>

```typescript
public readonly globalPaths: string;
```

- *Type:* `string`

Try to find the module in common global installation paths.

---

##### `default`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.EsbuildSource.property.default"></a>

```typescript
public readonly default: string;
```

- *Type:* `string`

Set the default mechanism to find the module The current default to find the module.

---


### InlineJavaScriptCode <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode"></a>

An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.

#### Initializers <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode.Initializer"></a>

```typescript
import { InlineJavaScriptCode } from '@mrgrain/cdk-esbuild'

new InlineJavaScriptCode(code: string, props?: TransformOptions | TransformerProps)
```

##### `code`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode.parameter.code"></a>

- *Type:* `string`

The inline code to be transformed.

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TransformOptions`](#@mrgrain/cdk-esbuild.TransformOptions) | [`@mrgrain/cdk-esbuild.TransformerProps`](#@mrgrain/cdk-esbuild.TransformerProps)

Support for `TransformOptions` is deprecated. Please provide `TransformerProps`!

Props to change the behaviour of the transformer.

Default values for `props.transformOptions`:
- `loader='js'`

> https://esbuild.github.io/api/#transform-api

---

#### Methods <a name="Methods"></a>

##### `bind` <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode.bind"></a>

```typescript
public bind(scope: Construct)
```

###### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---


#### Properties <a name="Properties"></a>

##### `isInline`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode.property.isInline"></a>

```typescript
public readonly isInline: boolean;
```

- *Type:* `boolean`

Determines whether this Code is inline code or not.

---


### InlineJsxCode <a name="@mrgrain/cdk-esbuild.InlineJsxCode"></a>

An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.

#### Initializers <a name="@mrgrain/cdk-esbuild.InlineJsxCode.Initializer"></a>

```typescript
import { InlineJsxCode } from '@mrgrain/cdk-esbuild'

new InlineJsxCode(code: string, props?: TransformOptions | TransformerProps)
```

##### `code`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineJsxCode.parameter.code"></a>

- *Type:* `string`

The inline code to be transformed.

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.InlineJsxCode.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TransformOptions`](#@mrgrain/cdk-esbuild.TransformOptions) | [`@mrgrain/cdk-esbuild.TransformerProps`](#@mrgrain/cdk-esbuild.TransformerProps)

Support for `TransformOptions` is deprecated. Please provide `TransformerProps`!

Props to change the behaviour of the transformer.

Default values for `transformOptions`:
- `loader='jsx'`

> https://esbuild.github.io/api/#transform-api

---

#### Methods <a name="Methods"></a>

##### `bind` <a name="@mrgrain/cdk-esbuild.InlineJsxCode.bind"></a>

```typescript
public bind(scope: Construct)
```

###### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineJsxCode.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---


#### Properties <a name="Properties"></a>

##### `isInline`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineJsxCode.property.isInline"></a>

```typescript
public readonly isInline: boolean;
```

- *Type:* `boolean`

Determines whether this Code is inline code or not.

---


### InlineTsxCode <a name="@mrgrain/cdk-esbuild.InlineTsxCode"></a>

An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.

#### Initializers <a name="@mrgrain/cdk-esbuild.InlineTsxCode.Initializer"></a>

```typescript
import { InlineTsxCode } from '@mrgrain/cdk-esbuild'

new InlineTsxCode(code: string, props?: TransformOptions | TransformerProps)
```

##### `code`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineTsxCode.parameter.code"></a>

- *Type:* `string`

The inline code to be transformed.

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.InlineTsxCode.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TransformOptions`](#@mrgrain/cdk-esbuild.TransformOptions) | [`@mrgrain/cdk-esbuild.TransformerProps`](#@mrgrain/cdk-esbuild.TransformerProps)

Support for `TransformOptions` is deprecated. Please provide `TransformerProps`!

Props to change the behaviour of the transformer.

Default values for `transformOptions`:
- `loader='tsx'`

> https://esbuild.github.io/api/#transform-api

---

#### Methods <a name="Methods"></a>

##### `bind` <a name="@mrgrain/cdk-esbuild.InlineTsxCode.bind"></a>

```typescript
public bind(scope: Construct)
```

###### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineTsxCode.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---


#### Properties <a name="Properties"></a>

##### `isInline`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineTsxCode.property.isInline"></a>

```typescript
public readonly isInline: boolean;
```

- *Type:* `boolean`

Determines whether this Code is inline code or not.

---


### InlineTypeScriptCode <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode"></a>

An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.

#### Initializers <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode.Initializer"></a>

```typescript
import { InlineTypeScriptCode } from '@mrgrain/cdk-esbuild'

new InlineTypeScriptCode(code: string, props?: TransformOptions | TransformerProps)
```

##### `code`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode.parameter.code"></a>

- *Type:* `string`

The inline code to be transformed.

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TransformOptions`](#@mrgrain/cdk-esbuild.TransformOptions) | [`@mrgrain/cdk-esbuild.TransformerProps`](#@mrgrain/cdk-esbuild.TransformerProps)

Support for `TransformOptions` is deprecated. Please provide `TransformerProps`!

Props to change the behaviour of the transformer.

Default values for `transformOptions`:
- `loader='ts'`

> https://esbuild.github.io/api/#transform-api

---

#### Methods <a name="Methods"></a>

##### `bind` <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode.bind"></a>

```typescript
public bind(scope: Construct)
```

###### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---


#### Properties <a name="Properties"></a>

##### `isInline`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode.property.isInline"></a>

```typescript
public readonly isInline: boolean;
```

- *Type:* `boolean`

Determines whether this Code is inline code or not.

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

A path or list or map of paths to the entry points of your code.

Relative paths are by default resolved from the current working directory.
To change the working directory, see `buildOptions.absWorkingDir`.

Absolute paths can be used if files are part of the working directory.

Examples:
  - `'src/index.ts'`
  - `require.resolve('./lambda')`
  - `['src/index.ts', 'src/util.ts']`
  - `{one: 'src/two.ts', two: 'src/one.ts'}`

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCode.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.JavaScriptCodeProps`](#@mrgrain/cdk-esbuild.JavaScriptCodeProps)

Props to change the behavior of the bundler.

Default values for `props.buildOptions`:
- `bundle=true`
- `platform=node`
- `target=nodeX` with X being the major node version running locally

---





### JavaScriptSource <a name="@mrgrain/cdk-esbuild.JavaScriptSource"></a>

- *Implements:* [`aws-cdk-lib.aws_s3_deployment.ISource`](#aws-cdk-lib.aws_s3_deployment.ISource)

#### Initializers <a name="@mrgrain/cdk-esbuild.JavaScriptSource.Initializer"></a>

```typescript
import { JavaScriptSource } from '@mrgrain/cdk-esbuild'

new JavaScriptSource(entryPoints: string | string[] | {[ key: string ]: string}, props?: JavaScriptSourceProps)
```

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSource.parameter.entryPoints"></a>

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

A path or list or map of paths to the entry points of your code.

Relative paths are by default resolved from the current working directory.
To change the working directory, see `buildOptions.absWorkingDir`.

Absolute paths can be used if files are part of the working directory.

Examples:
  - `'src/index.ts'`
  - `require.resolve('./lambda')`
  - `['src/index.ts', 'src/util.ts']`
  - `{one: 'src/two.ts', two: 'src/one.ts'}`

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSource.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.JavaScriptSourceProps`](#@mrgrain/cdk-esbuild.JavaScriptSourceProps)

Props to change the behavior of the bundler.

Default values for `props.buildOptions`:
- `bundle=true`
- `platform=browser`

---

#### Methods <a name="Methods"></a>

##### `bind` <a name="@mrgrain/cdk-esbuild.JavaScriptSource.bind"></a>

```typescript
public bind(scope: Construct, context?: DeploymentSourceContext)
```

###### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSource.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

###### `context`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSource.parameter.context"></a>

- *Type:* [`aws-cdk-lib.aws_s3_deployment.DeploymentSourceContext`](#aws-cdk-lib.aws_s3_deployment.DeploymentSourceContext)

---


#### Properties <a name="Properties"></a>

##### `assetClass`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSource.property.assetClass"></a>

```typescript
public readonly assetClass: JavaScriptAsset;
```

- *Type:* [`@mrgrain/cdk-esbuild.JavaScriptAsset`](#@mrgrain/cdk-esbuild.JavaScriptAsset)

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

A path or list or map of paths to the entry points of your code.

Relative paths are by default resolved from the current working directory.
To change the working directory, see `buildOptions.absWorkingDir`.

Absolute paths can be used if files are part of the working directory.

Examples:
  - `'src/index.ts'`
  - `require.resolve('./lambda')`
  - `['src/index.ts', 'src/util.ts']`
  - `{one: 'src/two.ts', two: 'src/one.ts'}`

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCode.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TypeScriptCodeProps`](#@mrgrain/cdk-esbuild.TypeScriptCodeProps)

Props to change the behavior of the bundler.

Default values for `props.buildOptions`:
- `bundle=true`
- `platform=node`
- `target=nodeX` with X being the major node version running locally

---





### TypeScriptSource <a name="@mrgrain/cdk-esbuild.TypeScriptSource"></a>

- *Implements:* [`aws-cdk-lib.aws_s3_deployment.ISource`](#aws-cdk-lib.aws_s3_deployment.ISource)

#### Initializers <a name="@mrgrain/cdk-esbuild.TypeScriptSource.Initializer"></a>

```typescript
import { TypeScriptSource } from '@mrgrain/cdk-esbuild'

new TypeScriptSource(entryPoints: string | string[] | {[ key: string ]: string}, props?: TypeScriptSourceProps)
```

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSource.parameter.entryPoints"></a>

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

A path or list or map of paths to the entry points of your code.

Relative paths are by default resolved from the current working directory.
To change the working directory, see `buildOptions.absWorkingDir`.

Absolute paths can be used if files are part of the working directory.

Examples:
  - `'src/index.ts'`
  - `require.resolve('./lambda')`
  - `['src/index.ts', 'src/util.ts']`
  - `{one: 'src/two.ts', two: 'src/one.ts'}`

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSource.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TypeScriptSourceProps`](#@mrgrain/cdk-esbuild.TypeScriptSourceProps)

Props to change the behavior of the bundler.

Default values for `props.buildOptions`:
- `bundle=true`
- `platform=browser`

---

#### Methods <a name="Methods"></a>

##### `bind` <a name="@mrgrain/cdk-esbuild.TypeScriptSource.bind"></a>

```typescript
public bind(scope: Construct, context?: DeploymentSourceContext)
```

###### `scope`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSource.parameter.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

###### `context`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSource.parameter.context"></a>

- *Type:* [`aws-cdk-lib.aws_s3_deployment.DeploymentSourceContext`](#aws-cdk-lib.aws_s3_deployment.DeploymentSourceContext)

---


#### Properties <a name="Properties"></a>

##### `assetClass`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSource.property.assetClass"></a>

```typescript
public readonly assetClass: TypeScriptAsset;
```

- *Type:* [`@mrgrain/cdk-esbuild.TypeScriptAsset`](#@mrgrain/cdk-esbuild.TypeScriptAsset)

---



