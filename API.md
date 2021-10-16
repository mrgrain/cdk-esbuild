# API Reference <a name="API Reference"></a>


## Structs <a name="Structs"></a>

### AssetBaseProps <a name="@mrgrain/cdk-esbuild.AssetBaseProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { AssetBaseProps } from '@mrgrain/cdk-esbuild'

const assetBaseProps: AssetBaseProps = { ... }
```

##### `buildOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.AssetBaseProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* [`@mrgrain/cdk-esbuild.BuildOptions`](#@mrgrain/cdk-esbuild.BuildOptions)

Options passed on to esbuild.

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.AssetBaseProps.property.copyDir"></a>

```typescript
public readonly copyDir: string;
```

- *Type:* `string`

Relative path to a directory copied to the output BEFORE esbuild is run (i.e esbuild will overwrite existing files).

---

##### `assetHash`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.AssetBaseProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* `string`

A hash of this asset, which is available at construction time.

As this is a plain string, it
can be used in construct IDs in order to enforce creation of a new resource when the content
hash has changed.

---

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

Options passed on to esbuild.

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.AssetProps.property.copyDir"></a>

```typescript
public readonly copyDir: string;
```

- *Type:* `string`

Relative path to a directory copied to the output BEFORE esbuild is run (i.e esbuild will overwrite existing files).

---

##### `assetHash`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.AssetProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* `string`

A hash of this asset, which is available at construction time.

As this is a plain string, it
can be used in construct IDs in order to enforce creation of a new resource when the content
hash has changed.

---

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.AssetProps.property.entryPoints"></a>

```typescript
public readonly entryPoints: string | string[] | {[ key: string ]: string};
```

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

Relative paths to the entrypoints of your code, e.g. `src/index.ts`.

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

Options passed on to esbuild.

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.BundlerProps.property.copyDir"></a>

```typescript
public readonly copyDir: string;
```

- *Type:* `string`

Relative path to a directory copied to the output BEFORE esbuild is run (i.e esbuild will overwrite existing files).

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

Options passed on to esbuild.

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCodeProps.property.copyDir"></a>

```typescript
public readonly copyDir: string;
```

- *Type:* `string`

Relative path to a directory copied to the output BEFORE esbuild is run (i.e esbuild will overwrite existing files).

---

##### `assetHash`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCodeProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* `string`

A hash of this asset, which is available at construction time.

As this is a plain string, it
can be used in construct IDs in order to enforce creation of a new resource when the content
hash has changed.

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

Options passed on to esbuild.

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSourceProps.property.copyDir"></a>

```typescript
public readonly copyDir: string;
```

- *Type:* `string`

Relative path to a directory copied to the output BEFORE esbuild is run (i.e esbuild will overwrite existing files).

---

##### `assetHash`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptSourceProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* `string`

A hash of this asset, which is available at construction time.

As this is a plain string, it
can be used in construct IDs in order to enforce creation of a new resource when the content
hash has changed.

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

Options passed on to esbuild.

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.copyDir"></a>

```typescript
public readonly copyDir: string;
```

- *Type:* `string`

Relative path to a directory copied to the output BEFORE esbuild is run (i.e esbuild will overwrite existing files).

---

##### `assetHash`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* `string`

A hash of this asset, which is available at construction time.

As this is a plain string, it
can be used in construct IDs in order to enforce creation of a new resource when the content
hash has changed.

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

Options passed on to esbuild.

---

##### `copyDir`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.copyDir"></a>

```typescript
public readonly copyDir: string;
```

- *Type:* `string`

Relative path to a directory copied to the output BEFORE esbuild is run (i.e esbuild will overwrite existing files).

---

##### `assetHash`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* `string`

A hash of this asset, which is available at construction time.

As this is a plain string, it
can be used in construct IDs in order to enforce creation of a new resource when the content
hash has changed.

---

## Classes <a name="Classes"></a>

### EsbuildBundler <a name="@mrgrain/cdk-esbuild.EsbuildBundler"></a>

#### Initializers <a name="@mrgrain/cdk-esbuild.EsbuildBundler.Initializer"></a>

```typescript
import { EsbuildBundler } from '@mrgrain/cdk-esbuild'

new EsbuildBundler(entryPoints: string | string[] | {[ key: string ]: string}, props: BundlerProps)
```

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.parameter.entryPoints"></a>

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

Relative paths to the entrypoints of your code, e.g. `src/index.ts`.

---

##### `props`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.BundlerProps`](#@mrgrain/cdk-esbuild.BundlerProps)

---



#### Properties <a name="Properties"></a>

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.property.entryPoints"></a>

```typescript
public readonly entryPoints: string | string[] | {[ key: string ]: string};
```

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

Relative paths to the entrypoints of your code, e.g. `src/index.ts`.

---

##### `image`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.property.image"></a>

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

---

##### `props`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.EsbuildBundler.property.props"></a>

```typescript
public readonly props: BundlerProps;
```

- *Type:* [`@mrgrain/cdk-esbuild.BundlerProps`](#@mrgrain/cdk-esbuild.BundlerProps)

---


### InlineJavaScriptCode <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode"></a>

#### Initializers <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode.Initializer"></a>

```typescript
import { InlineJavaScriptCode } from '@mrgrain/cdk-esbuild'

new InlineJavaScriptCode(code: string, transformOptions?: TransformOptions)
```

##### `code`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode.parameter.code"></a>

- *Type:* `string`

---

##### `transformOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.InlineJavaScriptCode.parameter.transformOptions"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TransformOptions`](#@mrgrain/cdk-esbuild.TransformOptions)

---





### InlineJsxCode <a name="@mrgrain/cdk-esbuild.InlineJsxCode"></a>

#### Initializers <a name="@mrgrain/cdk-esbuild.InlineJsxCode.Initializer"></a>

```typescript
import { InlineJsxCode } from '@mrgrain/cdk-esbuild'

new InlineJsxCode(code: string, transformOptions?: TransformOptions)
```

##### `code`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineJsxCode.parameter.code"></a>

- *Type:* `string`

---

##### `transformOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.InlineJsxCode.parameter.transformOptions"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TransformOptions`](#@mrgrain/cdk-esbuild.TransformOptions)

---





### InlineTsxCode <a name="@mrgrain/cdk-esbuild.InlineTsxCode"></a>

#### Initializers <a name="@mrgrain/cdk-esbuild.InlineTsxCode.Initializer"></a>

```typescript
import { InlineTsxCode } from '@mrgrain/cdk-esbuild'

new InlineTsxCode(code: string, transformOptions?: TransformOptions)
```

##### `code`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineTsxCode.parameter.code"></a>

- *Type:* `string`

---

##### `transformOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.InlineTsxCode.parameter.transformOptions"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TransformOptions`](#@mrgrain/cdk-esbuild.TransformOptions)

---





### InlineTypeScriptCode <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode"></a>

#### Initializers <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode.Initializer"></a>

```typescript
import { InlineTypeScriptCode } from '@mrgrain/cdk-esbuild'

new InlineTypeScriptCode(code: string, transformOptions?: TransformOptions)
```

##### `code`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode.parameter.code"></a>

- *Type:* `string`

---

##### `transformOptions`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.InlineTypeScriptCode.parameter.transformOptions"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TransformOptions`](#@mrgrain/cdk-esbuild.TransformOptions)

---





### JavaScriptAsset <a name="@mrgrain/cdk-esbuild.JavaScriptAsset"></a>

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

#### Initializers <a name="@mrgrain/cdk-esbuild.JavaScriptCode.Initializer"></a>

```typescript
import { JavaScriptCode } from '@mrgrain/cdk-esbuild'

new JavaScriptCode(entryPoints: string | string[] | {[ key: string ]: string}, props?: JavaScriptCodeProps)
```

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCode.parameter.entryPoints"></a>

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCode.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.JavaScriptCodeProps`](#@mrgrain/cdk-esbuild.JavaScriptCodeProps)

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

##### `assetClass`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCode.property.assetClass"></a>

```typescript
public readonly assetClass: JavaScriptAsset;
```

- *Type:* [`@mrgrain/cdk-esbuild.JavaScriptAsset`](#@mrgrain/cdk-esbuild.JavaScriptAsset)

---

##### `isInline`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.JavaScriptCode.property.isInline"></a>

```typescript
public readonly isInline: boolean;
```

- *Type:* `boolean`

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

#### Initializers <a name="@mrgrain/cdk-esbuild.TypeScriptCode.Initializer"></a>

```typescript
import { TypeScriptCode } from '@mrgrain/cdk-esbuild'

new TypeScriptCode(entryPoints: string | string[] | {[ key: string ]: string}, props?: TypeScriptCodeProps)
```

##### `entryPoints`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCode.parameter.entryPoints"></a>

- *Type:* `string` | `string`[] | {[ key: string ]: `string`}

---

##### `props`<sup>Optional</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCode.parameter.props"></a>

- *Type:* [`@mrgrain/cdk-esbuild.TypeScriptCodeProps`](#@mrgrain/cdk-esbuild.TypeScriptCodeProps)

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

##### `assetClass`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCode.property.assetClass"></a>

```typescript
public readonly assetClass: TypeScriptAsset;
```

- *Type:* [`@mrgrain/cdk-esbuild.TypeScriptAsset`](#@mrgrain/cdk-esbuild.TypeScriptAsset)

---

##### `isInline`<sup>Required</sup> <a name="@mrgrain/cdk-esbuild.TypeScriptCode.property.isInline"></a>

```typescript
public readonly isInline: boolean;
```

- *Type:* `boolean`

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



