# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### TypeScriptAsset <a name="TypeScriptAsset" id="@mrgrain/cdk-esbuild.TypeScriptAsset"></a>

Bundles the entry points and creates a CDK asset which is uploaded to the bootstrapped CDK S3 bucket during deployment.

The asset can be used by other constructs.

#### Initializers <a name="Initializers" id="@mrgrain/cdk-esbuild.TypeScriptAsset.Initializer"></a>

```typescript
import { TypeScriptAsset } from '@mrgrain/cdk-esbuild'

new TypeScriptAsset(scope: Construct, id: string, props: TypeScriptAssetProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.Initializer.parameter.props">props</a></code> | <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAssetProps">TypeScriptAssetProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@mrgrain/cdk-esbuild.TypeScriptAsset.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@mrgrain/cdk-esbuild.TypeScriptAsset.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@mrgrain/cdk-esbuild.TypeScriptAsset.Initializer.parameter.props"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.TypeScriptAssetProps">TypeScriptAssetProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.addResourceMetadata">addResourceMetadata</a></code> | Adds CloudFormation template metadata to the specified resource with information that indicates which resource property is mapped to this local asset. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.grantRead">grantRead</a></code> | Grants read permissions to the principal on the assets bucket. |

---

##### `toString` <a name="toString" id="@mrgrain/cdk-esbuild.TypeScriptAsset.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@mrgrain/cdk-esbuild.TypeScriptAsset.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@mrgrain/cdk-esbuild.TypeScriptAsset.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `addResourceMetadata` <a name="addResourceMetadata" id="@mrgrain/cdk-esbuild.TypeScriptAsset.addResourceMetadata"></a>

```typescript
public addResourceMetadata(resource: CfnResource, resourceProperty: string): void
```

Adds CloudFormation template metadata to the specified resource with information that indicates which resource property is mapped to this local asset.

This can be used by tools such as SAM CLI to provide local
experience such as local invocation and debugging of Lambda functions.

Asset metadata will only be included if the stack is synthesized with the
"aws:cdk:enable-asset-metadata" context key defined, which is the default
behavior when synthesizing via the CDK Toolkit.

> [https://github.com/aws/aws-cdk/issues/1432](https://github.com/aws/aws-cdk/issues/1432)

###### `resource`<sup>Required</sup> <a name="resource" id="@mrgrain/cdk-esbuild.TypeScriptAsset.addResourceMetadata.parameter.resource"></a>

- *Type:* aws-cdk-lib.CfnResource

The CloudFormation resource which is using this asset [disable-awslint:ref-via-interface].

---

###### `resourceProperty`<sup>Required</sup> <a name="resourceProperty" id="@mrgrain/cdk-esbuild.TypeScriptAsset.addResourceMetadata.parameter.resourceProperty"></a>

- *Type:* string

The property name where this asset is referenced (e.g. "Code" for AWS::Lambda::Function).

---

##### `grantRead` <a name="grantRead" id="@mrgrain/cdk-esbuild.TypeScriptAsset.grantRead"></a>

```typescript
public grantRead(grantee: IGrantable): void
```

Grants read permissions to the principal on the assets bucket.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@mrgrain/cdk-esbuild.TypeScriptAsset.grantRead.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@mrgrain/cdk-esbuild.TypeScriptAsset.isConstruct"></a>

```typescript
import { TypeScriptAsset } from '@mrgrain/cdk-esbuild'

TypeScriptAsset.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@mrgrain/cdk-esbuild.TypeScriptAsset.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.property.assetHash">assetHash</a></code> | <code>string</code> | A hash of this asset, which is available at construction time. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.property.assetPath">assetPath</a></code> | <code>string</code> | The path to the asset, relative to the current Cloud Assembly. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket in which this asset resides. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.property.httpUrl">httpUrl</a></code> | <code>string</code> | Attribute which represents the S3 HTTP URL of this asset. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.property.isFile">isFile</a></code> | <code>boolean</code> | Indicates if this asset is a single file. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.property.isZipArchive">isZipArchive</a></code> | <code>boolean</code> | Indicates if this asset is a zip archive. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.property.s3BucketName">s3BucketName</a></code> | <code>string</code> | Attribute that represents the name of the bucket this asset exists in. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.property.s3ObjectKey">s3ObjectKey</a></code> | <code>string</code> | Attribute which represents the S3 object key of this asset. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAsset.property.s3ObjectUrl">s3ObjectUrl</a></code> | <code>string</code> | Attribute which represents the S3 URL of this asset. |

---

##### `node`<sup>Required</sup> <a name="node" id="@mrgrain/cdk-esbuild.TypeScriptAsset.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `assetHash`<sup>Required</sup> <a name="assetHash" id="@mrgrain/cdk-esbuild.TypeScriptAsset.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* string

A hash of this asset, which is available at construction time.

As this is a plain string, it
can be used in construct IDs in order to enforce creation of a new resource when the content
hash has changed.

---

##### `assetPath`<sup>Required</sup> <a name="assetPath" id="@mrgrain/cdk-esbuild.TypeScriptAsset.property.assetPath"></a>

```typescript
public readonly assetPath: string;
```

- *Type:* string

The path to the asset, relative to the current Cloud Assembly.

If asset staging is disabled, this will just be the original path.
If asset staging is enabled it will be the staged path.

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="@mrgrain/cdk-esbuild.TypeScriptAsset.property.bucket"></a>

```typescript
public readonly bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket in which this asset resides.

---

##### `httpUrl`<sup>Required</sup> <a name="httpUrl" id="@mrgrain/cdk-esbuild.TypeScriptAsset.property.httpUrl"></a>

```typescript
public readonly httpUrl: string;
```

- *Type:* string

Attribute which represents the S3 HTTP URL of this asset.

For example, `https://s3.us-west-1.amazonaws.com/bucket/key`

---

##### `isFile`<sup>Required</sup> <a name="isFile" id="@mrgrain/cdk-esbuild.TypeScriptAsset.property.isFile"></a>

```typescript
public readonly isFile: boolean;
```

- *Type:* boolean

Indicates if this asset is a single file.

Allows constructs to ensure that the
correct file type was used.

---

##### `isZipArchive`<sup>Required</sup> <a name="isZipArchive" id="@mrgrain/cdk-esbuild.TypeScriptAsset.property.isZipArchive"></a>

```typescript
public readonly isZipArchive: boolean;
```

- *Type:* boolean

Indicates if this asset is a zip archive.

Allows constructs to ensure that the
correct file type was used.

---

##### `s3BucketName`<sup>Required</sup> <a name="s3BucketName" id="@mrgrain/cdk-esbuild.TypeScriptAsset.property.s3BucketName"></a>

```typescript
public readonly s3BucketName: string;
```

- *Type:* string

Attribute that represents the name of the bucket this asset exists in.

---

##### `s3ObjectKey`<sup>Required</sup> <a name="s3ObjectKey" id="@mrgrain/cdk-esbuild.TypeScriptAsset.property.s3ObjectKey"></a>

```typescript
public readonly s3ObjectKey: string;
```

- *Type:* string

Attribute which represents the S3 object key of this asset.

---

##### `s3ObjectUrl`<sup>Required</sup> <a name="s3ObjectUrl" id="@mrgrain/cdk-esbuild.TypeScriptAsset.property.s3ObjectUrl"></a>

```typescript
public readonly s3ObjectUrl: string;
```

- *Type:* string

Attribute which represents the S3 URL of this asset.

For example, `s3://bucket/key`

---


## Structs <a name="Structs" id="Structs"></a>

### BuildOptions <a name="BuildOptions" id="@mrgrain/cdk-esbuild.BuildOptions"></a>

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.BuildOptions.Initializer"></a>

```typescript
import { BuildOptions } from '@mrgrain/cdk-esbuild'

const buildOptions: BuildOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.absPaths">absPaths</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#abs-paths. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.absWorkingDir">absWorkingDir</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#working-directory. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.alias">alias</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#alias. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.allowOverwrite">allowOverwrite</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#allow-overwrite. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.assetNames">assetNames</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#asset-names. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.banner">banner</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#banner. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.bundle">bundle</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#bundle. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.charset">charset</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#charset. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.chunkNames">chunkNames</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#chunk-names. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.color">color</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#color. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.conditions">conditions</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#conditions. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.define">define</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#define. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.drop">drop</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#drop. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.dropLabels">dropLabels</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#drop-labels. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.entryNames">entryNames</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#entry-names. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.external">external</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#external. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.footer">footer</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#footer. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.format">format</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#format. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.globalName">globalName</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#global-name. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.ignoreAnnotations">ignoreAnnotations</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#ignore-annotations. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.inject">inject</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#inject. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.jsx">jsx</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.jsxDev">jsxDev</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#jsx-development. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.jsxFactory">jsxFactory</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx-factory. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.jsxFragment">jsxFragment</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx-fragment. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.jsxImportSource">jsxImportSource</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx-import-source. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.jsxSideEffects">jsxSideEffects</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#jsx-side-effects. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.keepNames">keepNames</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#keep-names. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.legalComments">legalComments</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#legal-comments. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.lineLimit">lineLimit</a></code> | <code>number</code> | Documentation: https://esbuild.github.io/api/#line-limit. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.loader">loader</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#loader. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.logLevel">logLevel</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#log-level. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.logLimit">logLimit</a></code> | <code>number</code> | Documentation: https://esbuild.github.io/api/#log-limit. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.logOverride">logOverride</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#log-override. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.mainFields">mainFields</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#main-fields. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.mangleCache">mangleCache</a></code> | <code>{[ key: string ]: string \| boolean}</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.mangleProps">mangleProps</a></code> | <code>any</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.mangleQuoted">mangleQuoted</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.metafile">metafile</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#metafile. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.minify">minify</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.minifyIdentifiers">minifyIdentifiers</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.minifySyntax">minifySyntax</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.minifyWhitespace">minifyWhitespace</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.nodePaths">nodePaths</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#node-paths. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.outbase">outbase</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#outbase. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.outdir">outdir</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#outdir. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.outExtension">outExtension</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#out-extension. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.outfile">outfile</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#outfile. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.packages">packages</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#packages. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.platform">platform</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#platform. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.preserveSymlinks">preserveSymlinks</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#preserve-symlinks. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.publicPath">publicPath</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#public-path. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.pure">pure</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#pure. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.reserveProps">reserveProps</a></code> | <code>any</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.resolveExtensions">resolveExtensions</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#resolve-extensions. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.sourcemap">sourcemap</a></code> | <code>boolean \| string</code> | Documentation: https://esbuild.github.io/api/#sourcemap. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.sourceRoot">sourceRoot</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#source-root. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.sourcesContent">sourcesContent</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#sources-content. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.splitting">splitting</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#splitting. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.supported">supported</a></code> | <code>{[ key: string ]: boolean}</code> | Documentation: https://esbuild.github.io/api/#supported. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.target">target</a></code> | <code>string \| string[]</code> | Documentation: https://esbuild.github.io/api/#target. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.treeShaking">treeShaking</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#tree-shaking. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.tsconfig">tsconfig</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#tsconfig. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.tsconfigRaw">tsconfigRaw</a></code> | <code>string \| <a href="#@mrgrain/cdk-esbuild.TsconfigRaw">TsconfigRaw</a></code> | Documentation: https://esbuild.github.io/api/#tsconfig-raw. |
| <code><a href="#@mrgrain/cdk-esbuild.BuildOptions.property.write">write</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#write. |

---

##### `absPaths`<sup>Optional</sup> <a name="absPaths" id="@mrgrain/cdk-esbuild.BuildOptions.property.absPaths"></a>

```typescript
public readonly absPaths: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#abs-paths.

---

##### `absWorkingDir`<sup>Optional</sup> <a name="absWorkingDir" id="@mrgrain/cdk-esbuild.BuildOptions.property.absWorkingDir"></a>

```typescript
public readonly absWorkingDir: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#working-directory.

---

##### `alias`<sup>Optional</sup> <a name="alias" id="@mrgrain/cdk-esbuild.BuildOptions.property.alias"></a>

```typescript
public readonly alias: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#alias.

---

##### `allowOverwrite`<sup>Optional</sup> <a name="allowOverwrite" id="@mrgrain/cdk-esbuild.BuildOptions.property.allowOverwrite"></a>

```typescript
public readonly allowOverwrite: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#allow-overwrite.

---

##### `assetNames`<sup>Optional</sup> <a name="assetNames" id="@mrgrain/cdk-esbuild.BuildOptions.property.assetNames"></a>

```typescript
public readonly assetNames: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#asset-names.

---

##### `banner`<sup>Optional</sup> <a name="banner" id="@mrgrain/cdk-esbuild.BuildOptions.property.banner"></a>

```typescript
public readonly banner: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#banner.

---

##### `bundle`<sup>Optional</sup> <a name="bundle" id="@mrgrain/cdk-esbuild.BuildOptions.property.bundle"></a>

```typescript
public readonly bundle: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#bundle.

---

##### `charset`<sup>Optional</sup> <a name="charset" id="@mrgrain/cdk-esbuild.BuildOptions.property.charset"></a>

```typescript
public readonly charset: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#charset.

---

##### `chunkNames`<sup>Optional</sup> <a name="chunkNames" id="@mrgrain/cdk-esbuild.BuildOptions.property.chunkNames"></a>

```typescript
public readonly chunkNames: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#chunk-names.

---

##### `color`<sup>Optional</sup> <a name="color" id="@mrgrain/cdk-esbuild.BuildOptions.property.color"></a>

```typescript
public readonly color: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#color.

---

##### `conditions`<sup>Optional</sup> <a name="conditions" id="@mrgrain/cdk-esbuild.BuildOptions.property.conditions"></a>

```typescript
public readonly conditions: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#conditions.

---

##### `define`<sup>Optional</sup> <a name="define" id="@mrgrain/cdk-esbuild.BuildOptions.property.define"></a>

```typescript
public readonly define: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#define.

---

##### `drop`<sup>Optional</sup> <a name="drop" id="@mrgrain/cdk-esbuild.BuildOptions.property.drop"></a>

```typescript
public readonly drop: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#drop.

---

##### `dropLabels`<sup>Optional</sup> <a name="dropLabels" id="@mrgrain/cdk-esbuild.BuildOptions.property.dropLabels"></a>

```typescript
public readonly dropLabels: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#drop-labels.

---

##### `entryNames`<sup>Optional</sup> <a name="entryNames" id="@mrgrain/cdk-esbuild.BuildOptions.property.entryNames"></a>

```typescript
public readonly entryNames: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#entry-names.

---

##### `external`<sup>Optional</sup> <a name="external" id="@mrgrain/cdk-esbuild.BuildOptions.property.external"></a>

```typescript
public readonly external: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#external.

---

##### `footer`<sup>Optional</sup> <a name="footer" id="@mrgrain/cdk-esbuild.BuildOptions.property.footer"></a>

```typescript
public readonly footer: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#footer.

---

##### `format`<sup>Optional</sup> <a name="format" id="@mrgrain/cdk-esbuild.BuildOptions.property.format"></a>

```typescript
public readonly format: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#format.

---

##### `globalName`<sup>Optional</sup> <a name="globalName" id="@mrgrain/cdk-esbuild.BuildOptions.property.globalName"></a>

```typescript
public readonly globalName: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#global-name.

---

##### `ignoreAnnotations`<sup>Optional</sup> <a name="ignoreAnnotations" id="@mrgrain/cdk-esbuild.BuildOptions.property.ignoreAnnotations"></a>

```typescript
public readonly ignoreAnnotations: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#ignore-annotations.

---

##### `inject`<sup>Optional</sup> <a name="inject" id="@mrgrain/cdk-esbuild.BuildOptions.property.inject"></a>

```typescript
public readonly inject: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#inject.

---

##### `jsx`<sup>Optional</sup> <a name="jsx" id="@mrgrain/cdk-esbuild.BuildOptions.property.jsx"></a>

```typescript
public readonly jsx: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx.

---

##### `jsxDev`<sup>Optional</sup> <a name="jsxDev" id="@mrgrain/cdk-esbuild.BuildOptions.property.jsxDev"></a>

```typescript
public readonly jsxDev: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#jsx-development.

---

##### `jsxFactory`<sup>Optional</sup> <a name="jsxFactory" id="@mrgrain/cdk-esbuild.BuildOptions.property.jsxFactory"></a>

```typescript
public readonly jsxFactory: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx-factory.

---

##### `jsxFragment`<sup>Optional</sup> <a name="jsxFragment" id="@mrgrain/cdk-esbuild.BuildOptions.property.jsxFragment"></a>

```typescript
public readonly jsxFragment: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx-fragment.

---

##### `jsxImportSource`<sup>Optional</sup> <a name="jsxImportSource" id="@mrgrain/cdk-esbuild.BuildOptions.property.jsxImportSource"></a>

```typescript
public readonly jsxImportSource: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx-import-source.

---

##### `jsxSideEffects`<sup>Optional</sup> <a name="jsxSideEffects" id="@mrgrain/cdk-esbuild.BuildOptions.property.jsxSideEffects"></a>

```typescript
public readonly jsxSideEffects: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#jsx-side-effects.

---

##### `keepNames`<sup>Optional</sup> <a name="keepNames" id="@mrgrain/cdk-esbuild.BuildOptions.property.keepNames"></a>

```typescript
public readonly keepNames: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#keep-names.

---

##### `legalComments`<sup>Optional</sup> <a name="legalComments" id="@mrgrain/cdk-esbuild.BuildOptions.property.legalComments"></a>

```typescript
public readonly legalComments: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#legal-comments.

---

##### `lineLimit`<sup>Optional</sup> <a name="lineLimit" id="@mrgrain/cdk-esbuild.BuildOptions.property.lineLimit"></a>

```typescript
public readonly lineLimit: number;
```

- *Type:* number

Documentation: https://esbuild.github.io/api/#line-limit.

---

##### `loader`<sup>Optional</sup> <a name="loader" id="@mrgrain/cdk-esbuild.BuildOptions.property.loader"></a>

```typescript
public readonly loader: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#loader.

---

##### `logLevel`<sup>Optional</sup> <a name="logLevel" id="@mrgrain/cdk-esbuild.BuildOptions.property.logLevel"></a>

```typescript
public readonly logLevel: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#log-level.

---

##### `logLimit`<sup>Optional</sup> <a name="logLimit" id="@mrgrain/cdk-esbuild.BuildOptions.property.logLimit"></a>

```typescript
public readonly logLimit: number;
```

- *Type:* number

Documentation: https://esbuild.github.io/api/#log-limit.

---

##### `logOverride`<sup>Optional</sup> <a name="logOverride" id="@mrgrain/cdk-esbuild.BuildOptions.property.logOverride"></a>

```typescript
public readonly logOverride: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#log-override.

---

##### `mainFields`<sup>Optional</sup> <a name="mainFields" id="@mrgrain/cdk-esbuild.BuildOptions.property.mainFields"></a>

```typescript
public readonly mainFields: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#main-fields.

---

##### `mangleCache`<sup>Optional</sup> <a name="mangleCache" id="@mrgrain/cdk-esbuild.BuildOptions.property.mangleCache"></a>

```typescript
public readonly mangleCache: {[ key: string ]: string | boolean};
```

- *Type:* {[ key: string ]: string | boolean}

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `mangleProps`<sup>Optional</sup> <a name="mangleProps" id="@mrgrain/cdk-esbuild.BuildOptions.property.mangleProps"></a>

```typescript
public readonly mangleProps: any;
```

- *Type:* any

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `mangleQuoted`<sup>Optional</sup> <a name="mangleQuoted" id="@mrgrain/cdk-esbuild.BuildOptions.property.mangleQuoted"></a>

```typescript
public readonly mangleQuoted: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `metafile`<sup>Optional</sup> <a name="metafile" id="@mrgrain/cdk-esbuild.BuildOptions.property.metafile"></a>

```typescript
public readonly metafile: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#metafile.

---

##### `minify`<sup>Optional</sup> <a name="minify" id="@mrgrain/cdk-esbuild.BuildOptions.property.minify"></a>

```typescript
public readonly minify: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifyIdentifiers`<sup>Optional</sup> <a name="minifyIdentifiers" id="@mrgrain/cdk-esbuild.BuildOptions.property.minifyIdentifiers"></a>

```typescript
public readonly minifyIdentifiers: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifySyntax`<sup>Optional</sup> <a name="minifySyntax" id="@mrgrain/cdk-esbuild.BuildOptions.property.minifySyntax"></a>

```typescript
public readonly minifySyntax: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifyWhitespace`<sup>Optional</sup> <a name="minifyWhitespace" id="@mrgrain/cdk-esbuild.BuildOptions.property.minifyWhitespace"></a>

```typescript
public readonly minifyWhitespace: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `nodePaths`<sup>Optional</sup> <a name="nodePaths" id="@mrgrain/cdk-esbuild.BuildOptions.property.nodePaths"></a>

```typescript
public readonly nodePaths: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#node-paths.

---

##### `outbase`<sup>Optional</sup> <a name="outbase" id="@mrgrain/cdk-esbuild.BuildOptions.property.outbase"></a>

```typescript
public readonly outbase: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#outbase.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@mrgrain/cdk-esbuild.BuildOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#outdir.

---

##### `outExtension`<sup>Optional</sup> <a name="outExtension" id="@mrgrain/cdk-esbuild.BuildOptions.property.outExtension"></a>

```typescript
public readonly outExtension: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#out-extension.

---

##### `outfile`<sup>Optional</sup> <a name="outfile" id="@mrgrain/cdk-esbuild.BuildOptions.property.outfile"></a>

```typescript
public readonly outfile: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#outfile.

---

##### `packages`<sup>Optional</sup> <a name="packages" id="@mrgrain/cdk-esbuild.BuildOptions.property.packages"></a>

```typescript
public readonly packages: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#packages.

---

##### `platform`<sup>Optional</sup> <a name="platform" id="@mrgrain/cdk-esbuild.BuildOptions.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#platform.

---

##### `preserveSymlinks`<sup>Optional</sup> <a name="preserveSymlinks" id="@mrgrain/cdk-esbuild.BuildOptions.property.preserveSymlinks"></a>

```typescript
public readonly preserveSymlinks: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#preserve-symlinks.

---

##### `publicPath`<sup>Optional</sup> <a name="publicPath" id="@mrgrain/cdk-esbuild.BuildOptions.property.publicPath"></a>

```typescript
public readonly publicPath: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#public-path.

---

##### `pure`<sup>Optional</sup> <a name="pure" id="@mrgrain/cdk-esbuild.BuildOptions.property.pure"></a>

```typescript
public readonly pure: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#pure.

---

##### `reserveProps`<sup>Optional</sup> <a name="reserveProps" id="@mrgrain/cdk-esbuild.BuildOptions.property.reserveProps"></a>

```typescript
public readonly reserveProps: any;
```

- *Type:* any

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `resolveExtensions`<sup>Optional</sup> <a name="resolveExtensions" id="@mrgrain/cdk-esbuild.BuildOptions.property.resolveExtensions"></a>

```typescript
public readonly resolveExtensions: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#resolve-extensions.

---

##### `sourcemap`<sup>Optional</sup> <a name="sourcemap" id="@mrgrain/cdk-esbuild.BuildOptions.property.sourcemap"></a>

```typescript
public readonly sourcemap: boolean | string;
```

- *Type:* boolean | string

Documentation: https://esbuild.github.io/api/#sourcemap.

---

##### `sourceRoot`<sup>Optional</sup> <a name="sourceRoot" id="@mrgrain/cdk-esbuild.BuildOptions.property.sourceRoot"></a>

```typescript
public readonly sourceRoot: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#source-root.

---

##### `sourcesContent`<sup>Optional</sup> <a name="sourcesContent" id="@mrgrain/cdk-esbuild.BuildOptions.property.sourcesContent"></a>

```typescript
public readonly sourcesContent: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#sources-content.

---

##### `splitting`<sup>Optional</sup> <a name="splitting" id="@mrgrain/cdk-esbuild.BuildOptions.property.splitting"></a>

```typescript
public readonly splitting: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#splitting.

---

##### `supported`<sup>Optional</sup> <a name="supported" id="@mrgrain/cdk-esbuild.BuildOptions.property.supported"></a>

```typescript
public readonly supported: {[ key: string ]: boolean};
```

- *Type:* {[ key: string ]: boolean}

Documentation: https://esbuild.github.io/api/#supported.

---

##### `target`<sup>Optional</sup> <a name="target" id="@mrgrain/cdk-esbuild.BuildOptions.property.target"></a>

```typescript
public readonly target: string | string[];
```

- *Type:* string | string[]

Documentation: https://esbuild.github.io/api/#target.

---

##### `treeShaking`<sup>Optional</sup> <a name="treeShaking" id="@mrgrain/cdk-esbuild.BuildOptions.property.treeShaking"></a>

```typescript
public readonly treeShaking: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#tree-shaking.

---

##### `tsconfig`<sup>Optional</sup> <a name="tsconfig" id="@mrgrain/cdk-esbuild.BuildOptions.property.tsconfig"></a>

```typescript
public readonly tsconfig: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#tsconfig.

---

##### `tsconfigRaw`<sup>Optional</sup> <a name="tsconfigRaw" id="@mrgrain/cdk-esbuild.BuildOptions.property.tsconfigRaw"></a>

```typescript
public readonly tsconfigRaw: string | TsconfigRaw;
```

- *Type:* string | <a href="#@mrgrain/cdk-esbuild.TsconfigRaw">TsconfigRaw</a>

Documentation: https://esbuild.github.io/api/#tsconfig-raw.

---

##### `write`<sup>Optional</sup> <a name="write" id="@mrgrain/cdk-esbuild.BuildOptions.property.write"></a>

```typescript
public readonly write: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#write.

---

### BundlerProps <a name="BundlerProps" id="@mrgrain/cdk-esbuild.BundlerProps"></a>

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.BundlerProps.Initializer"></a>

```typescript
import { BundlerProps } from '@mrgrain/cdk-esbuild'

const bundlerProps: BundlerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.BundlerProps.property.buildOptions">buildOptions</a></code> | <code><a href="#@mrgrain/cdk-esbuild.BuildOptions">BuildOptions</a></code> | Build options passed on to esbuild. Please refer to the esbuild Build API docs for details. |
| <code><a href="#@mrgrain/cdk-esbuild.BundlerProps.property.buildProvider">buildProvider</a></code> | <code><a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a></code> | The esbuild Build API implementation to be used. |
| <code><a href="#@mrgrain/cdk-esbuild.BundlerProps.property.copyDir">copyDir</a></code> | <code>string \| string[] \| {[ key: string ]: string \| string[]}</code> | Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs. |

---

##### `buildOptions`<sup>Optional</sup> <a name="buildOptions" id="@mrgrain/cdk-esbuild.BundlerProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.BuildOptions">BuildOptions</a>

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

> [https://esbuild.github.io/api/#build-api](https://esbuild.github.io/api/#build-api)

---

##### `buildProvider`<sup>Optional</sup> <a name="buildProvider" id="@mrgrain/cdk-esbuild.BundlerProps.property.buildProvider"></a>

```typescript
public readonly buildProvider: IBuildProvider;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a>
- *Default:* new EsbuildProvider()

The esbuild Build API implementation to be used.

Configure the default `EsbuildProvider` for more options or
provide a custom `IBuildProvider` as an escape hatch.

---

##### `copyDir`<sup>Optional</sup> <a name="copyDir" id="@mrgrain/cdk-esbuild.BundlerProps.property.copyDir"></a>

```typescript
public readonly copyDir: string | string[] | {[ key: string ]: string | string[]};
```

- *Type:* string | string[] | {[ key: string ]: string | string[]}

Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

* When provided with a `string` or `array`, all files are copied to the root of asset staging directory.
* When given a `map`, the key indicates the destination relative to the asset staging directory and the value is a list of all sources to be copied.

Therefore the following values for `copyDir` are all equivalent:
```
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

### CloudFrontFunctionCodeProps <a name="CloudFrontFunctionCodeProps" id="@mrgrain/cdk-esbuild.CloudFrontFunctionCodeProps"></a>

Properties for CloudFront Function TypeScript code.

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.CloudFrontFunctionCodeProps.Initializer"></a>

```typescript
import { CloudFrontFunctionCodeProps } from '@mrgrain/cdk-esbuild'

const cloudFrontFunctionCodeProps: CloudFrontFunctionCodeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionCodeProps.property.buildOptions">buildOptions</a></code> | <code><a href="#@mrgrain/cdk-esbuild.BuildOptions">BuildOptions</a></code> | Build options passed on to esbuild. Please refer to the esbuild Build API docs for details. |
| <code><a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionCodeProps.property.buildProvider">buildProvider</a></code> | <code><a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a></code> | The esbuild Build API implementation to be used. |
| <code><a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionCodeProps.property.runtime">runtime</a></code> | <code><a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime">CloudFrontFunctionRuntime</a></code> | CloudFront Functions JavaScript runtime environment version to build for. |

---

##### `buildOptions`<sup>Optional</sup> <a name="buildOptions" id="@mrgrain/cdk-esbuild.CloudFrontFunctionCodeProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.BuildOptions">BuildOptions</a>

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

> [https://esbuild.github.io/api/#build-api](https://esbuild.github.io/api/#build-api)

---

##### `buildProvider`<sup>Optional</sup> <a name="buildProvider" id="@mrgrain/cdk-esbuild.CloudFrontFunctionCodeProps.property.buildProvider"></a>

```typescript
public readonly buildProvider: IBuildProvider;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a>
- *Default:* new EsbuildProvider()

The esbuild Build API implementation to be used.

Configure the default `EsbuildProvider` for more options or
provide a custom `IBuildProvider` as an escape hatch.

---

##### `runtime`<sup>Optional</sup> <a name="runtime" id="@mrgrain/cdk-esbuild.CloudFrontFunctionCodeProps.property.runtime"></a>

```typescript
public readonly runtime: CloudFrontFunctionRuntime;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime">CloudFrontFunctionRuntime</a>
- *Default:* CloudFrontFunctionRuntime.JS_1_0

CloudFront Functions JavaScript runtime environment version to build for.

---

### CloudFrontFunctionInlineCodeProps <a name="CloudFrontFunctionInlineCodeProps" id="@mrgrain/cdk-esbuild.CloudFrontFunctionInlineCodeProps"></a>

Properties for CloudFront Function inline code.

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.CloudFrontFunctionInlineCodeProps.Initializer"></a>

```typescript
import { CloudFrontFunctionInlineCodeProps } from '@mrgrain/cdk-esbuild'

const cloudFrontFunctionInlineCodeProps: CloudFrontFunctionInlineCodeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionInlineCodeProps.property.transformOptions">transformOptions</a></code> | <code><a href="#@mrgrain/cdk-esbuild.TransformOptions">TransformOptions</a></code> | Transform options passed on to esbuild. |
| <code><a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionInlineCodeProps.property.transformProvider">transformProvider</a></code> | <code><a href="#@mrgrain/cdk-esbuild.ITransformProvider">ITransformProvider</a></code> | The esbuild Transform API implementation to be used. |
| <code><a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionInlineCodeProps.property.runtime">runtime</a></code> | <code><a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime">CloudFrontFunctionRuntime</a></code> | CloudFront Functions JavaScript runtime environment version to build for. |

---

##### `transformOptions`<sup>Optional</sup> <a name="transformOptions" id="@mrgrain/cdk-esbuild.CloudFrontFunctionInlineCodeProps.property.transformOptions"></a>

```typescript
public readonly transformOptions: TransformOptions;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.TransformOptions">TransformOptions</a>

Transform options passed on to esbuild.

Please refer to the esbuild Transform API docs for details.

> [https://esbuild.github.io/api/#transform-api](https://esbuild.github.io/api/#transform-api)

---

##### `transformProvider`<sup>Optional</sup> <a name="transformProvider" id="@mrgrain/cdk-esbuild.CloudFrontFunctionInlineCodeProps.property.transformProvider"></a>

```typescript
public readonly transformProvider: ITransformProvider;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.ITransformProvider">ITransformProvider</a>
- *Default:* new DefaultEsbuildProvider()

The esbuild Transform API implementation to be used.

Configure the default `EsbuildProvider` for more options or
provide a custom `ITransformProvider` as an escape hatch.

---

##### `runtime`<sup>Optional</sup> <a name="runtime" id="@mrgrain/cdk-esbuild.CloudFrontFunctionInlineCodeProps.property.runtime"></a>

```typescript
public readonly runtime: CloudFrontFunctionRuntime;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime">CloudFrontFunctionRuntime</a>
- *Default:* CloudFrontFunctionRuntime.JS_1_0

CloudFront Functions JavaScript runtime environment version to build for.

---

### CodeConfig <a name="CodeConfig" id="@mrgrain/cdk-esbuild.CodeConfig"></a>

Result of binding `Code` into a `Function`.

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.CodeConfig.Initializer"></a>

```typescript
import { CodeConfig } from '@mrgrain/cdk-esbuild'

const codeConfig: CodeConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.CodeConfig.property.image">image</a></code> | <code>aws-cdk-lib.aws_lambda.CodeImageConfig</code> | Docker image configuration (mutually exclusive with `s3Location` and `inlineCode`). |
| <code><a href="#@mrgrain/cdk-esbuild.CodeConfig.property.inlineCode">inlineCode</a></code> | <code>string</code> | Inline code (mutually exclusive with `s3Location` and `image`). |
| <code><a href="#@mrgrain/cdk-esbuild.CodeConfig.property.s3Location">s3Location</a></code> | <code>aws-cdk-lib.aws_s3.Location</code> | The location of the code in S3 (mutually exclusive with `inlineCode` and `image`). |

---

##### `image`<sup>Optional</sup> <a name="image" id="@mrgrain/cdk-esbuild.CodeConfig.property.image"></a>

```typescript
public readonly image: CodeImageConfig;
```

- *Type:* aws-cdk-lib.aws_lambda.CodeImageConfig
- *Default:* code is not an ECR container image

Docker image configuration (mutually exclusive with `s3Location` and `inlineCode`).

---

##### `inlineCode`<sup>Optional</sup> <a name="inlineCode" id="@mrgrain/cdk-esbuild.CodeConfig.property.inlineCode"></a>

```typescript
public readonly inlineCode: string;
```

- *Type:* string
- *Default:* code is not inline code

Inline code (mutually exclusive with `s3Location` and `image`).

---

##### `s3Location`<sup>Optional</sup> <a name="s3Location" id="@mrgrain/cdk-esbuild.CodeConfig.property.s3Location"></a>

```typescript
public readonly s3Location: Location;
```

- *Type:* aws-cdk-lib.aws_s3.Location
- *Default:* code is not an s3 location

The location of the code in S3 (mutually exclusive with `inlineCode` and `image`).

---

### CompilerOptions <a name="CompilerOptions" id="@mrgrain/cdk-esbuild.CompilerOptions"></a>

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.CompilerOptions.Initializer"></a>

```typescript
import { CompilerOptions } from '@mrgrain/cdk-esbuild'

const compilerOptions: CompilerOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.alwaysStrict">alwaysStrict</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.baseUrl">baseUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.experimentalDecorators">experimentalDecorators</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.importsNotUsedAsValues">importsNotUsedAsValues</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.jsx">jsx</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.jsxFactory">jsxFactory</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.jsxFragmentFactory">jsxFragmentFactory</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.jsxImportSource">jsxImportSource</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.paths">paths</a></code> | <code>{[ key: string ]: string[]}</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.preserveValueImports">preserveValueImports</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.strict">strict</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.target">target</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.useDefineForClassFields">useDefineForClassFields</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions.property.verbatimModuleSyntax">verbatimModuleSyntax</a></code> | <code>boolean</code> | *No description.* |

---

##### `alwaysStrict`<sup>Optional</sup> <a name="alwaysStrict" id="@mrgrain/cdk-esbuild.CompilerOptions.property.alwaysStrict"></a>

```typescript
public readonly alwaysStrict: boolean;
```

- *Type:* boolean

---

##### `baseUrl`<sup>Optional</sup> <a name="baseUrl" id="@mrgrain/cdk-esbuild.CompilerOptions.property.baseUrl"></a>

```typescript
public readonly baseUrl: string;
```

- *Type:* string

---

##### `experimentalDecorators`<sup>Optional</sup> <a name="experimentalDecorators" id="@mrgrain/cdk-esbuild.CompilerOptions.property.experimentalDecorators"></a>

```typescript
public readonly experimentalDecorators: boolean;
```

- *Type:* boolean

---

##### `importsNotUsedAsValues`<sup>Optional</sup> <a name="importsNotUsedAsValues" id="@mrgrain/cdk-esbuild.CompilerOptions.property.importsNotUsedAsValues"></a>

```typescript
public readonly importsNotUsedAsValues: string;
```

- *Type:* string

---

##### `jsx`<sup>Optional</sup> <a name="jsx" id="@mrgrain/cdk-esbuild.CompilerOptions.property.jsx"></a>

```typescript
public readonly jsx: string;
```

- *Type:* string

---

##### `jsxFactory`<sup>Optional</sup> <a name="jsxFactory" id="@mrgrain/cdk-esbuild.CompilerOptions.property.jsxFactory"></a>

```typescript
public readonly jsxFactory: string;
```

- *Type:* string

---

##### `jsxFragmentFactory`<sup>Optional</sup> <a name="jsxFragmentFactory" id="@mrgrain/cdk-esbuild.CompilerOptions.property.jsxFragmentFactory"></a>

```typescript
public readonly jsxFragmentFactory: string;
```

- *Type:* string

---

##### `jsxImportSource`<sup>Optional</sup> <a name="jsxImportSource" id="@mrgrain/cdk-esbuild.CompilerOptions.property.jsxImportSource"></a>

```typescript
public readonly jsxImportSource: string;
```

- *Type:* string

---

##### `paths`<sup>Optional</sup> <a name="paths" id="@mrgrain/cdk-esbuild.CompilerOptions.property.paths"></a>

```typescript
public readonly paths: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

---

##### `preserveValueImports`<sup>Optional</sup> <a name="preserveValueImports" id="@mrgrain/cdk-esbuild.CompilerOptions.property.preserveValueImports"></a>

```typescript
public readonly preserveValueImports: boolean;
```

- *Type:* boolean

---

##### `strict`<sup>Optional</sup> <a name="strict" id="@mrgrain/cdk-esbuild.CompilerOptions.property.strict"></a>

```typescript
public readonly strict: boolean;
```

- *Type:* boolean

---

##### `target`<sup>Optional</sup> <a name="target" id="@mrgrain/cdk-esbuild.CompilerOptions.property.target"></a>

```typescript
public readonly target: string;
```

- *Type:* string

---

##### `useDefineForClassFields`<sup>Optional</sup> <a name="useDefineForClassFields" id="@mrgrain/cdk-esbuild.CompilerOptions.property.useDefineForClassFields"></a>

```typescript
public readonly useDefineForClassFields: boolean;
```

- *Type:* boolean

---

##### `verbatimModuleSyntax`<sup>Optional</sup> <a name="verbatimModuleSyntax" id="@mrgrain/cdk-esbuild.CompilerOptions.property.verbatimModuleSyntax"></a>

```typescript
public readonly verbatimModuleSyntax: boolean;
```

- *Type:* boolean

---

### EsbuildProviderProps <a name="EsbuildProviderProps" id="@mrgrain/cdk-esbuild.EsbuildProviderProps"></a>

Configure the default EsbuildProvider.

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.EsbuildProviderProps.Initializer"></a>

```typescript
import { EsbuildProviderProps } from '@mrgrain/cdk-esbuild'

const esbuildProviderProps: EsbuildProviderProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildProviderProps.property.esbuildBinaryPath">esbuildBinaryPath</a></code> | <code>string</code> | Path to the binary used by esbuild. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildProviderProps.property.esbuildModulePath">esbuildModulePath</a></code> | <code>string</code> | Absolute path to the esbuild module JS file. |

---

##### `esbuildBinaryPath`<sup>Optional</sup> <a name="esbuildBinaryPath" id="@mrgrain/cdk-esbuild.EsbuildProviderProps.property.esbuildBinaryPath"></a>

```typescript
public readonly esbuildBinaryPath: string;
```

- *Type:* string

Path to the binary used by esbuild.

This is the same as setting the ESBUILD_BINARY_PATH environment variable.

---

##### `esbuildModulePath`<sup>Optional</sup> <a name="esbuildModulePath" id="@mrgrain/cdk-esbuild.EsbuildProviderProps.property.esbuildModulePath"></a>

```typescript
public readonly esbuildModulePath: string;
```

- *Type:* string
- *Default:* `CDK_ESBUILD_MODULE_PATH` or package resolution (see description)

Absolute path to the esbuild module JS file.

E.g. "/home/user/.npm/node_modules/esbuild/lib/main.js"

If not set, the module path will be determined in the following order:

- Use a path from the `CDK_ESBUILD_MODULE_PATH` environment variable
- In TypeScript, fallback to the default Node.js package resolution mechanism
- All other languages (Python, Go, .NET, Java) use an automatic "best effort" resolution mechanism. \
  The exact algorithm of this mechanism is considered an implementation detail and should not be relied on.
  If `esbuild` cannot be found, it might be installed dynamically to a temporary location.
  To opt-out of this behavior, set either `esbuildModulePath` or `CDK_ESBUILD_MODULE_PATH` env variable.

Use the static methods on `EsbuildSource` to customize the default behavior.

---

### ProviderBuildOptions <a name="ProviderBuildOptions" id="@mrgrain/cdk-esbuild.ProviderBuildOptions"></a>

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.Initializer"></a>

```typescript
import { ProviderBuildOptions } from '@mrgrain/cdk-esbuild'

const providerBuildOptions: ProviderBuildOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.absPaths">absPaths</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#abs-paths. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.absWorkingDir">absWorkingDir</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#working-directory. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.alias">alias</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#alias. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.allowOverwrite">allowOverwrite</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#allow-overwrite. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.assetNames">assetNames</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#asset-names. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.banner">banner</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#banner. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.bundle">bundle</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#bundle. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.charset">charset</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#charset. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.chunkNames">chunkNames</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#chunk-names. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.color">color</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#color. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.conditions">conditions</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#conditions. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.define">define</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#define. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.drop">drop</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#drop. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.dropLabels">dropLabels</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#drop-labels. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.entryNames">entryNames</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#entry-names. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.external">external</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#external. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.footer">footer</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#footer. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.format">format</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#format. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.globalName">globalName</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#global-name. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.ignoreAnnotations">ignoreAnnotations</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#ignore-annotations. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.inject">inject</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#inject. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.jsx">jsx</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.jsxDev">jsxDev</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#jsx-development. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.jsxFactory">jsxFactory</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx-factory. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.jsxFragment">jsxFragment</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx-fragment. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.jsxImportSource">jsxImportSource</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx-import-source. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.jsxSideEffects">jsxSideEffects</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#jsx-side-effects. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.keepNames">keepNames</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#keep-names. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.legalComments">legalComments</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#legal-comments. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.lineLimit">lineLimit</a></code> | <code>number</code> | Documentation: https://esbuild.github.io/api/#line-limit. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.loader">loader</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#loader. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.logLevel">logLevel</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#log-level. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.logLimit">logLimit</a></code> | <code>number</code> | Documentation: https://esbuild.github.io/api/#log-limit. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.logOverride">logOverride</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#log-override. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.mainFields">mainFields</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#main-fields. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.mangleCache">mangleCache</a></code> | <code>{[ key: string ]: string \| boolean}</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.mangleProps">mangleProps</a></code> | <code>any</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.mangleQuoted">mangleQuoted</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.metafile">metafile</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#metafile. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.minify">minify</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.minifyIdentifiers">minifyIdentifiers</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.minifySyntax">minifySyntax</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.minifyWhitespace">minifyWhitespace</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.nodePaths">nodePaths</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#node-paths. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.outbase">outbase</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#outbase. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.outdir">outdir</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#outdir. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.outExtension">outExtension</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#out-extension. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.outfile">outfile</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#outfile. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.packages">packages</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#packages. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.platform">platform</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#platform. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.preserveSymlinks">preserveSymlinks</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#preserve-symlinks. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.publicPath">publicPath</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#public-path. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.pure">pure</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#pure. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.reserveProps">reserveProps</a></code> | <code>any</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.resolveExtensions">resolveExtensions</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#resolve-extensions. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.sourcemap">sourcemap</a></code> | <code>boolean \| string</code> | Documentation: https://esbuild.github.io/api/#sourcemap. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.sourceRoot">sourceRoot</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#source-root. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.sourcesContent">sourcesContent</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#sources-content. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.splitting">splitting</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#splitting. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.supported">supported</a></code> | <code>{[ key: string ]: boolean}</code> | Documentation: https://esbuild.github.io/api/#supported. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.target">target</a></code> | <code>string \| string[]</code> | Documentation: https://esbuild.github.io/api/#target. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.treeShaking">treeShaking</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#tree-shaking. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.tsconfig">tsconfig</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#tsconfig. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.tsconfigRaw">tsconfigRaw</a></code> | <code>string \| <a href="#@mrgrain/cdk-esbuild.TsconfigRaw">TsconfigRaw</a></code> | Documentation: https://esbuild.github.io/api/#tsconfig-raw. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.write">write</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#write. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions.property.entryPoints">entryPoints</a></code> | <code>string[] \| {[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#entry-points. |

---

##### `absPaths`<sup>Optional</sup> <a name="absPaths" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.absPaths"></a>

```typescript
public readonly absPaths: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#abs-paths.

---

##### `absWorkingDir`<sup>Optional</sup> <a name="absWorkingDir" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.absWorkingDir"></a>

```typescript
public readonly absWorkingDir: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#working-directory.

---

##### `alias`<sup>Optional</sup> <a name="alias" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.alias"></a>

```typescript
public readonly alias: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#alias.

---

##### `allowOverwrite`<sup>Optional</sup> <a name="allowOverwrite" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.allowOverwrite"></a>

```typescript
public readonly allowOverwrite: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#allow-overwrite.

---

##### `assetNames`<sup>Optional</sup> <a name="assetNames" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.assetNames"></a>

```typescript
public readonly assetNames: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#asset-names.

---

##### `banner`<sup>Optional</sup> <a name="banner" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.banner"></a>

```typescript
public readonly banner: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#banner.

---

##### `bundle`<sup>Optional</sup> <a name="bundle" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.bundle"></a>

```typescript
public readonly bundle: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#bundle.

---

##### `charset`<sup>Optional</sup> <a name="charset" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.charset"></a>

```typescript
public readonly charset: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#charset.

---

##### `chunkNames`<sup>Optional</sup> <a name="chunkNames" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.chunkNames"></a>

```typescript
public readonly chunkNames: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#chunk-names.

---

##### `color`<sup>Optional</sup> <a name="color" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.color"></a>

```typescript
public readonly color: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#color.

---

##### `conditions`<sup>Optional</sup> <a name="conditions" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.conditions"></a>

```typescript
public readonly conditions: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#conditions.

---

##### `define`<sup>Optional</sup> <a name="define" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.define"></a>

```typescript
public readonly define: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#define.

---

##### `drop`<sup>Optional</sup> <a name="drop" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.drop"></a>

```typescript
public readonly drop: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#drop.

---

##### `dropLabels`<sup>Optional</sup> <a name="dropLabels" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.dropLabels"></a>

```typescript
public readonly dropLabels: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#drop-labels.

---

##### `entryNames`<sup>Optional</sup> <a name="entryNames" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.entryNames"></a>

```typescript
public readonly entryNames: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#entry-names.

---

##### `external`<sup>Optional</sup> <a name="external" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.external"></a>

```typescript
public readonly external: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#external.

---

##### `footer`<sup>Optional</sup> <a name="footer" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.footer"></a>

```typescript
public readonly footer: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#footer.

---

##### `format`<sup>Optional</sup> <a name="format" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.format"></a>

```typescript
public readonly format: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#format.

---

##### `globalName`<sup>Optional</sup> <a name="globalName" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.globalName"></a>

```typescript
public readonly globalName: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#global-name.

---

##### `ignoreAnnotations`<sup>Optional</sup> <a name="ignoreAnnotations" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.ignoreAnnotations"></a>

```typescript
public readonly ignoreAnnotations: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#ignore-annotations.

---

##### `inject`<sup>Optional</sup> <a name="inject" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.inject"></a>

```typescript
public readonly inject: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#inject.

---

##### `jsx`<sup>Optional</sup> <a name="jsx" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.jsx"></a>

```typescript
public readonly jsx: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx.

---

##### `jsxDev`<sup>Optional</sup> <a name="jsxDev" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.jsxDev"></a>

```typescript
public readonly jsxDev: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#jsx-development.

---

##### `jsxFactory`<sup>Optional</sup> <a name="jsxFactory" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.jsxFactory"></a>

```typescript
public readonly jsxFactory: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx-factory.

---

##### `jsxFragment`<sup>Optional</sup> <a name="jsxFragment" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.jsxFragment"></a>

```typescript
public readonly jsxFragment: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx-fragment.

---

##### `jsxImportSource`<sup>Optional</sup> <a name="jsxImportSource" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.jsxImportSource"></a>

```typescript
public readonly jsxImportSource: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx-import-source.

---

##### `jsxSideEffects`<sup>Optional</sup> <a name="jsxSideEffects" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.jsxSideEffects"></a>

```typescript
public readonly jsxSideEffects: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#jsx-side-effects.

---

##### `keepNames`<sup>Optional</sup> <a name="keepNames" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.keepNames"></a>

```typescript
public readonly keepNames: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#keep-names.

---

##### `legalComments`<sup>Optional</sup> <a name="legalComments" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.legalComments"></a>

```typescript
public readonly legalComments: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#legal-comments.

---

##### `lineLimit`<sup>Optional</sup> <a name="lineLimit" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.lineLimit"></a>

```typescript
public readonly lineLimit: number;
```

- *Type:* number

Documentation: https://esbuild.github.io/api/#line-limit.

---

##### `loader`<sup>Optional</sup> <a name="loader" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.loader"></a>

```typescript
public readonly loader: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#loader.

---

##### `logLevel`<sup>Optional</sup> <a name="logLevel" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.logLevel"></a>

```typescript
public readonly logLevel: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#log-level.

---

##### `logLimit`<sup>Optional</sup> <a name="logLimit" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.logLimit"></a>

```typescript
public readonly logLimit: number;
```

- *Type:* number

Documentation: https://esbuild.github.io/api/#log-limit.

---

##### `logOverride`<sup>Optional</sup> <a name="logOverride" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.logOverride"></a>

```typescript
public readonly logOverride: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#log-override.

---

##### `mainFields`<sup>Optional</sup> <a name="mainFields" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.mainFields"></a>

```typescript
public readonly mainFields: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#main-fields.

---

##### `mangleCache`<sup>Optional</sup> <a name="mangleCache" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.mangleCache"></a>

```typescript
public readonly mangleCache: {[ key: string ]: string | boolean};
```

- *Type:* {[ key: string ]: string | boolean}

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `mangleProps`<sup>Optional</sup> <a name="mangleProps" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.mangleProps"></a>

```typescript
public readonly mangleProps: any;
```

- *Type:* any

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `mangleQuoted`<sup>Optional</sup> <a name="mangleQuoted" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.mangleQuoted"></a>

```typescript
public readonly mangleQuoted: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `metafile`<sup>Optional</sup> <a name="metafile" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.metafile"></a>

```typescript
public readonly metafile: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#metafile.

---

##### `minify`<sup>Optional</sup> <a name="minify" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.minify"></a>

```typescript
public readonly minify: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifyIdentifiers`<sup>Optional</sup> <a name="minifyIdentifiers" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.minifyIdentifiers"></a>

```typescript
public readonly minifyIdentifiers: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifySyntax`<sup>Optional</sup> <a name="minifySyntax" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.minifySyntax"></a>

```typescript
public readonly minifySyntax: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifyWhitespace`<sup>Optional</sup> <a name="minifyWhitespace" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.minifyWhitespace"></a>

```typescript
public readonly minifyWhitespace: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `nodePaths`<sup>Optional</sup> <a name="nodePaths" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.nodePaths"></a>

```typescript
public readonly nodePaths: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#node-paths.

---

##### `outbase`<sup>Optional</sup> <a name="outbase" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.outbase"></a>

```typescript
public readonly outbase: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#outbase.

---

##### `outdir`<sup>Optional</sup> <a name="outdir" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#outdir.

---

##### `outExtension`<sup>Optional</sup> <a name="outExtension" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.outExtension"></a>

```typescript
public readonly outExtension: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#out-extension.

---

##### `outfile`<sup>Optional</sup> <a name="outfile" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.outfile"></a>

```typescript
public readonly outfile: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#outfile.

---

##### `packages`<sup>Optional</sup> <a name="packages" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.packages"></a>

```typescript
public readonly packages: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#packages.

---

##### `platform`<sup>Optional</sup> <a name="platform" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#platform.

---

##### `preserveSymlinks`<sup>Optional</sup> <a name="preserveSymlinks" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.preserveSymlinks"></a>

```typescript
public readonly preserveSymlinks: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#preserve-symlinks.

---

##### `publicPath`<sup>Optional</sup> <a name="publicPath" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.publicPath"></a>

```typescript
public readonly publicPath: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#public-path.

---

##### `pure`<sup>Optional</sup> <a name="pure" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.pure"></a>

```typescript
public readonly pure: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#pure.

---

##### `reserveProps`<sup>Optional</sup> <a name="reserveProps" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.reserveProps"></a>

```typescript
public readonly reserveProps: any;
```

- *Type:* any

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `resolveExtensions`<sup>Optional</sup> <a name="resolveExtensions" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.resolveExtensions"></a>

```typescript
public readonly resolveExtensions: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#resolve-extensions.

---

##### `sourcemap`<sup>Optional</sup> <a name="sourcemap" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.sourcemap"></a>

```typescript
public readonly sourcemap: boolean | string;
```

- *Type:* boolean | string

Documentation: https://esbuild.github.io/api/#sourcemap.

---

##### `sourceRoot`<sup>Optional</sup> <a name="sourceRoot" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.sourceRoot"></a>

```typescript
public readonly sourceRoot: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#source-root.

---

##### `sourcesContent`<sup>Optional</sup> <a name="sourcesContent" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.sourcesContent"></a>

```typescript
public readonly sourcesContent: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#sources-content.

---

##### `splitting`<sup>Optional</sup> <a name="splitting" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.splitting"></a>

```typescript
public readonly splitting: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#splitting.

---

##### `supported`<sup>Optional</sup> <a name="supported" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.supported"></a>

```typescript
public readonly supported: {[ key: string ]: boolean};
```

- *Type:* {[ key: string ]: boolean}

Documentation: https://esbuild.github.io/api/#supported.

---

##### `target`<sup>Optional</sup> <a name="target" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.target"></a>

```typescript
public readonly target: string | string[];
```

- *Type:* string | string[]

Documentation: https://esbuild.github.io/api/#target.

---

##### `treeShaking`<sup>Optional</sup> <a name="treeShaking" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.treeShaking"></a>

```typescript
public readonly treeShaking: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#tree-shaking.

---

##### `tsconfig`<sup>Optional</sup> <a name="tsconfig" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.tsconfig"></a>

```typescript
public readonly tsconfig: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#tsconfig.

---

##### `tsconfigRaw`<sup>Optional</sup> <a name="tsconfigRaw" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.tsconfigRaw"></a>

```typescript
public readonly tsconfigRaw: string | TsconfigRaw;
```

- *Type:* string | <a href="#@mrgrain/cdk-esbuild.TsconfigRaw">TsconfigRaw</a>

Documentation: https://esbuild.github.io/api/#tsconfig-raw.

---

##### `write`<sup>Optional</sup> <a name="write" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.write"></a>

```typescript
public readonly write: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#write.

---

##### `entryPoints`<sup>Optional</sup> <a name="entryPoints" id="@mrgrain/cdk-esbuild.ProviderBuildOptions.property.entryPoints"></a>

```typescript
public readonly entryPoints: string[] | {[ key: string ]: string};
```

- *Type:* string[] | {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#entry-points.

---

### ProviderTransformOptions <a name="ProviderTransformOptions" id="@mrgrain/cdk-esbuild.ProviderTransformOptions"></a>

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.Initializer"></a>

```typescript
import { ProviderTransformOptions } from '@mrgrain/cdk-esbuild'

const providerTransformOptions: ProviderTransformOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.absPaths">absPaths</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#abs-paths. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.banner">banner</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#banner. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.charset">charset</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#charset. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.color">color</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#color. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.define">define</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#define. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.drop">drop</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#drop. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.dropLabels">dropLabels</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#drop-labels. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.footer">footer</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#footer. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.format">format</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#format. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.globalName">globalName</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#global-name. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.ignoreAnnotations">ignoreAnnotations</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#ignore-annotations. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.jsx">jsx</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.jsxDev">jsxDev</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#jsx-development. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.jsxFactory">jsxFactory</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx-factory. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.jsxFragment">jsxFragment</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx-fragment. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.jsxImportSource">jsxImportSource</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx-import-source. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.jsxSideEffects">jsxSideEffects</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#jsx-side-effects. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.keepNames">keepNames</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#keep-names. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.legalComments">legalComments</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#legal-comments. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.lineLimit">lineLimit</a></code> | <code>number</code> | Documentation: https://esbuild.github.io/api/#line-limit. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.loader">loader</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#loader. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.logLevel">logLevel</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#log-level. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.logLimit">logLimit</a></code> | <code>number</code> | Documentation: https://esbuild.github.io/api/#log-limit. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.logOverride">logOverride</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#log-override. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.mangleCache">mangleCache</a></code> | <code>{[ key: string ]: string \| boolean}</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.mangleProps">mangleProps</a></code> | <code>any</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.mangleQuoted">mangleQuoted</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.minify">minify</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.minifyIdentifiers">minifyIdentifiers</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.minifySyntax">minifySyntax</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.minifyWhitespace">minifyWhitespace</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.platform">platform</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#platform. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.pure">pure</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#pure. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.reserveProps">reserveProps</a></code> | <code>any</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.sourcefile">sourcefile</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#sourcefile. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.sourcemap">sourcemap</a></code> | <code>boolean \| string</code> | Documentation: https://esbuild.github.io/api/#sourcemap. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.sourceRoot">sourceRoot</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#source-root. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.sourcesContent">sourcesContent</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#sources-content. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.supported">supported</a></code> | <code>{[ key: string ]: boolean}</code> | Documentation: https://esbuild.github.io/api/#supported. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.target">target</a></code> | <code>string \| string[]</code> | Documentation: https://esbuild.github.io/api/#target. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.treeShaking">treeShaking</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#tree-shaking. |
| <code><a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions.property.tsconfigRaw">tsconfigRaw</a></code> | <code>string \| <a href="#@mrgrain/cdk-esbuild.TsconfigRaw">TsconfigRaw</a></code> | Documentation: https://esbuild.github.io/api/#tsconfig-raw. |

---

##### `absPaths`<sup>Optional</sup> <a name="absPaths" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.absPaths"></a>

```typescript
public readonly absPaths: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#abs-paths.

---

##### `banner`<sup>Optional</sup> <a name="banner" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.banner"></a>

```typescript
public readonly banner: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#banner.

---

##### `charset`<sup>Optional</sup> <a name="charset" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.charset"></a>

```typescript
public readonly charset: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#charset.

---

##### `color`<sup>Optional</sup> <a name="color" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.color"></a>

```typescript
public readonly color: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#color.

---

##### `define`<sup>Optional</sup> <a name="define" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.define"></a>

```typescript
public readonly define: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#define.

---

##### `drop`<sup>Optional</sup> <a name="drop" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.drop"></a>

```typescript
public readonly drop: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#drop.

---

##### `dropLabels`<sup>Optional</sup> <a name="dropLabels" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.dropLabels"></a>

```typescript
public readonly dropLabels: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#drop-labels.

---

##### `footer`<sup>Optional</sup> <a name="footer" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.footer"></a>

```typescript
public readonly footer: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#footer.

---

##### `format`<sup>Optional</sup> <a name="format" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.format"></a>

```typescript
public readonly format: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#format.

---

##### `globalName`<sup>Optional</sup> <a name="globalName" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.globalName"></a>

```typescript
public readonly globalName: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#global-name.

---

##### `ignoreAnnotations`<sup>Optional</sup> <a name="ignoreAnnotations" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.ignoreAnnotations"></a>

```typescript
public readonly ignoreAnnotations: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#ignore-annotations.

---

##### `jsx`<sup>Optional</sup> <a name="jsx" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.jsx"></a>

```typescript
public readonly jsx: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx.

---

##### `jsxDev`<sup>Optional</sup> <a name="jsxDev" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.jsxDev"></a>

```typescript
public readonly jsxDev: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#jsx-development.

---

##### `jsxFactory`<sup>Optional</sup> <a name="jsxFactory" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.jsxFactory"></a>

```typescript
public readonly jsxFactory: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx-factory.

---

##### `jsxFragment`<sup>Optional</sup> <a name="jsxFragment" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.jsxFragment"></a>

```typescript
public readonly jsxFragment: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx-fragment.

---

##### `jsxImportSource`<sup>Optional</sup> <a name="jsxImportSource" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.jsxImportSource"></a>

```typescript
public readonly jsxImportSource: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx-import-source.

---

##### `jsxSideEffects`<sup>Optional</sup> <a name="jsxSideEffects" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.jsxSideEffects"></a>

```typescript
public readonly jsxSideEffects: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#jsx-side-effects.

---

##### `keepNames`<sup>Optional</sup> <a name="keepNames" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.keepNames"></a>

```typescript
public readonly keepNames: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#keep-names.

---

##### `legalComments`<sup>Optional</sup> <a name="legalComments" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.legalComments"></a>

```typescript
public readonly legalComments: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#legal-comments.

---

##### `lineLimit`<sup>Optional</sup> <a name="lineLimit" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.lineLimit"></a>

```typescript
public readonly lineLimit: number;
```

- *Type:* number

Documentation: https://esbuild.github.io/api/#line-limit.

---

##### `loader`<sup>Optional</sup> <a name="loader" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.loader"></a>

```typescript
public readonly loader: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#loader.

---

##### `logLevel`<sup>Optional</sup> <a name="logLevel" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.logLevel"></a>

```typescript
public readonly logLevel: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#log-level.

---

##### `logLimit`<sup>Optional</sup> <a name="logLimit" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.logLimit"></a>

```typescript
public readonly logLimit: number;
```

- *Type:* number

Documentation: https://esbuild.github.io/api/#log-limit.

---

##### `logOverride`<sup>Optional</sup> <a name="logOverride" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.logOverride"></a>

```typescript
public readonly logOverride: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#log-override.

---

##### `mangleCache`<sup>Optional</sup> <a name="mangleCache" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.mangleCache"></a>

```typescript
public readonly mangleCache: {[ key: string ]: string | boolean};
```

- *Type:* {[ key: string ]: string | boolean}

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `mangleProps`<sup>Optional</sup> <a name="mangleProps" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.mangleProps"></a>

```typescript
public readonly mangleProps: any;
```

- *Type:* any

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `mangleQuoted`<sup>Optional</sup> <a name="mangleQuoted" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.mangleQuoted"></a>

```typescript
public readonly mangleQuoted: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `minify`<sup>Optional</sup> <a name="minify" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.minify"></a>

```typescript
public readonly minify: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifyIdentifiers`<sup>Optional</sup> <a name="minifyIdentifiers" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.minifyIdentifiers"></a>

```typescript
public readonly minifyIdentifiers: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifySyntax`<sup>Optional</sup> <a name="minifySyntax" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.minifySyntax"></a>

```typescript
public readonly minifySyntax: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifyWhitespace`<sup>Optional</sup> <a name="minifyWhitespace" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.minifyWhitespace"></a>

```typescript
public readonly minifyWhitespace: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `platform`<sup>Optional</sup> <a name="platform" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#platform.

---

##### `pure`<sup>Optional</sup> <a name="pure" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.pure"></a>

```typescript
public readonly pure: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#pure.

---

##### `reserveProps`<sup>Optional</sup> <a name="reserveProps" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.reserveProps"></a>

```typescript
public readonly reserveProps: any;
```

- *Type:* any

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `sourcefile`<sup>Optional</sup> <a name="sourcefile" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.sourcefile"></a>

```typescript
public readonly sourcefile: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#sourcefile.

---

##### `sourcemap`<sup>Optional</sup> <a name="sourcemap" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.sourcemap"></a>

```typescript
public readonly sourcemap: boolean | string;
```

- *Type:* boolean | string

Documentation: https://esbuild.github.io/api/#sourcemap.

---

##### `sourceRoot`<sup>Optional</sup> <a name="sourceRoot" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.sourceRoot"></a>

```typescript
public readonly sourceRoot: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#source-root.

---

##### `sourcesContent`<sup>Optional</sup> <a name="sourcesContent" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.sourcesContent"></a>

```typescript
public readonly sourcesContent: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#sources-content.

---

##### `supported`<sup>Optional</sup> <a name="supported" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.supported"></a>

```typescript
public readonly supported: {[ key: string ]: boolean};
```

- *Type:* {[ key: string ]: boolean}

Documentation: https://esbuild.github.io/api/#supported.

---

##### `target`<sup>Optional</sup> <a name="target" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.target"></a>

```typescript
public readonly target: string | string[];
```

- *Type:* string | string[]

Documentation: https://esbuild.github.io/api/#target.

---

##### `treeShaking`<sup>Optional</sup> <a name="treeShaking" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.treeShaking"></a>

```typescript
public readonly treeShaking: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#tree-shaking.

---

##### `tsconfigRaw`<sup>Optional</sup> <a name="tsconfigRaw" id="@mrgrain/cdk-esbuild.ProviderTransformOptions.property.tsconfigRaw"></a>

```typescript
public readonly tsconfigRaw: string | TsconfigRaw;
```

- *Type:* string | <a href="#@mrgrain/cdk-esbuild.TsconfigRaw">TsconfigRaw</a>

Documentation: https://esbuild.github.io/api/#tsconfig-raw.

---

### TransformerProps <a name="TransformerProps" id="@mrgrain/cdk-esbuild.TransformerProps"></a>

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.TransformerProps.Initializer"></a>

```typescript
import { TransformerProps } from '@mrgrain/cdk-esbuild'

const transformerProps: TransformerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TransformerProps.property.transformOptions">transformOptions</a></code> | <code><a href="#@mrgrain/cdk-esbuild.TransformOptions">TransformOptions</a></code> | Transform options passed on to esbuild. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformerProps.property.transformProvider">transformProvider</a></code> | <code><a href="#@mrgrain/cdk-esbuild.ITransformProvider">ITransformProvider</a></code> | The esbuild Transform API implementation to be used. |

---

##### `transformOptions`<sup>Optional</sup> <a name="transformOptions" id="@mrgrain/cdk-esbuild.TransformerProps.property.transformOptions"></a>

```typescript
public readonly transformOptions: TransformOptions;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.TransformOptions">TransformOptions</a>

Transform options passed on to esbuild.

Please refer to the esbuild Transform API docs for details.

> [https://esbuild.github.io/api/#transform-api](https://esbuild.github.io/api/#transform-api)

---

##### `transformProvider`<sup>Optional</sup> <a name="transformProvider" id="@mrgrain/cdk-esbuild.TransformerProps.property.transformProvider"></a>

```typescript
public readonly transformProvider: ITransformProvider;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.ITransformProvider">ITransformProvider</a>
- *Default:* new DefaultEsbuildProvider()

The esbuild Transform API implementation to be used.

Configure the default `EsbuildProvider` for more options or
provide a custom `ITransformProvider` as an escape hatch.

---

### TransformOptions <a name="TransformOptions" id="@mrgrain/cdk-esbuild.TransformOptions"></a>

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.TransformOptions.Initializer"></a>

```typescript
import { TransformOptions } from '@mrgrain/cdk-esbuild'

const transformOptions: TransformOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.absPaths">absPaths</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#abs-paths. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.banner">banner</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#banner. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.charset">charset</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#charset. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.color">color</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#color. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.define">define</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#define. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.drop">drop</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#drop. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.dropLabels">dropLabels</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#drop-labels. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.footer">footer</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#footer. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.format">format</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#format. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.globalName">globalName</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#global-name. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.ignoreAnnotations">ignoreAnnotations</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#ignore-annotations. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.jsx">jsx</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.jsxDev">jsxDev</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#jsx-development. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.jsxFactory">jsxFactory</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx-factory. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.jsxFragment">jsxFragment</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx-fragment. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.jsxImportSource">jsxImportSource</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#jsx-import-source. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.jsxSideEffects">jsxSideEffects</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#jsx-side-effects. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.keepNames">keepNames</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#keep-names. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.legalComments">legalComments</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#legal-comments. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.lineLimit">lineLimit</a></code> | <code>number</code> | Documentation: https://esbuild.github.io/api/#line-limit. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.loader">loader</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#loader. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.logLevel">logLevel</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#log-level. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.logLimit">logLimit</a></code> | <code>number</code> | Documentation: https://esbuild.github.io/api/#log-limit. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.logOverride">logOverride</a></code> | <code>{[ key: string ]: string}</code> | Documentation: https://esbuild.github.io/api/#log-override. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.mangleCache">mangleCache</a></code> | <code>{[ key: string ]: string \| boolean}</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.mangleProps">mangleProps</a></code> | <code>any</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.mangleQuoted">mangleQuoted</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.minify">minify</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.minifyIdentifiers">minifyIdentifiers</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.minifySyntax">minifySyntax</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.minifyWhitespace">minifyWhitespace</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#minify. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.platform">platform</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#platform. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.pure">pure</a></code> | <code>string[]</code> | Documentation: https://esbuild.github.io/api/#pure. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.reserveProps">reserveProps</a></code> | <code>any</code> | Documentation: https://esbuild.github.io/api/#mangle-props. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.sourcefile">sourcefile</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#sourcefile. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.sourcemap">sourcemap</a></code> | <code>boolean \| string</code> | Documentation: https://esbuild.github.io/api/#sourcemap. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.sourceRoot">sourceRoot</a></code> | <code>string</code> | Documentation: https://esbuild.github.io/api/#source-root. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.sourcesContent">sourcesContent</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#sources-content. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.supported">supported</a></code> | <code>{[ key: string ]: boolean}</code> | Documentation: https://esbuild.github.io/api/#supported. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.target">target</a></code> | <code>string \| string[]</code> | Documentation: https://esbuild.github.io/api/#target. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.treeShaking">treeShaking</a></code> | <code>boolean</code> | Documentation: https://esbuild.github.io/api/#tree-shaking. |
| <code><a href="#@mrgrain/cdk-esbuild.TransformOptions.property.tsconfigRaw">tsconfigRaw</a></code> | <code>string \| <a href="#@mrgrain/cdk-esbuild.TsconfigRaw">TsconfigRaw</a></code> | Documentation: https://esbuild.github.io/api/#tsconfig-raw. |

---

##### `absPaths`<sup>Optional</sup> <a name="absPaths" id="@mrgrain/cdk-esbuild.TransformOptions.property.absPaths"></a>

```typescript
public readonly absPaths: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#abs-paths.

---

##### `banner`<sup>Optional</sup> <a name="banner" id="@mrgrain/cdk-esbuild.TransformOptions.property.banner"></a>

```typescript
public readonly banner: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#banner.

---

##### `charset`<sup>Optional</sup> <a name="charset" id="@mrgrain/cdk-esbuild.TransformOptions.property.charset"></a>

```typescript
public readonly charset: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#charset.

---

##### `color`<sup>Optional</sup> <a name="color" id="@mrgrain/cdk-esbuild.TransformOptions.property.color"></a>

```typescript
public readonly color: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#color.

---

##### `define`<sup>Optional</sup> <a name="define" id="@mrgrain/cdk-esbuild.TransformOptions.property.define"></a>

```typescript
public readonly define: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#define.

---

##### `drop`<sup>Optional</sup> <a name="drop" id="@mrgrain/cdk-esbuild.TransformOptions.property.drop"></a>

```typescript
public readonly drop: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#drop.

---

##### `dropLabels`<sup>Optional</sup> <a name="dropLabels" id="@mrgrain/cdk-esbuild.TransformOptions.property.dropLabels"></a>

```typescript
public readonly dropLabels: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#drop-labels.

---

##### `footer`<sup>Optional</sup> <a name="footer" id="@mrgrain/cdk-esbuild.TransformOptions.property.footer"></a>

```typescript
public readonly footer: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#footer.

---

##### `format`<sup>Optional</sup> <a name="format" id="@mrgrain/cdk-esbuild.TransformOptions.property.format"></a>

```typescript
public readonly format: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#format.

---

##### `globalName`<sup>Optional</sup> <a name="globalName" id="@mrgrain/cdk-esbuild.TransformOptions.property.globalName"></a>

```typescript
public readonly globalName: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#global-name.

---

##### `ignoreAnnotations`<sup>Optional</sup> <a name="ignoreAnnotations" id="@mrgrain/cdk-esbuild.TransformOptions.property.ignoreAnnotations"></a>

```typescript
public readonly ignoreAnnotations: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#ignore-annotations.

---

##### `jsx`<sup>Optional</sup> <a name="jsx" id="@mrgrain/cdk-esbuild.TransformOptions.property.jsx"></a>

```typescript
public readonly jsx: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx.

---

##### `jsxDev`<sup>Optional</sup> <a name="jsxDev" id="@mrgrain/cdk-esbuild.TransformOptions.property.jsxDev"></a>

```typescript
public readonly jsxDev: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#jsx-development.

---

##### `jsxFactory`<sup>Optional</sup> <a name="jsxFactory" id="@mrgrain/cdk-esbuild.TransformOptions.property.jsxFactory"></a>

```typescript
public readonly jsxFactory: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx-factory.

---

##### `jsxFragment`<sup>Optional</sup> <a name="jsxFragment" id="@mrgrain/cdk-esbuild.TransformOptions.property.jsxFragment"></a>

```typescript
public readonly jsxFragment: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx-fragment.

---

##### `jsxImportSource`<sup>Optional</sup> <a name="jsxImportSource" id="@mrgrain/cdk-esbuild.TransformOptions.property.jsxImportSource"></a>

```typescript
public readonly jsxImportSource: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#jsx-import-source.

---

##### `jsxSideEffects`<sup>Optional</sup> <a name="jsxSideEffects" id="@mrgrain/cdk-esbuild.TransformOptions.property.jsxSideEffects"></a>

```typescript
public readonly jsxSideEffects: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#jsx-side-effects.

---

##### `keepNames`<sup>Optional</sup> <a name="keepNames" id="@mrgrain/cdk-esbuild.TransformOptions.property.keepNames"></a>

```typescript
public readonly keepNames: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#keep-names.

---

##### `legalComments`<sup>Optional</sup> <a name="legalComments" id="@mrgrain/cdk-esbuild.TransformOptions.property.legalComments"></a>

```typescript
public readonly legalComments: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#legal-comments.

---

##### `lineLimit`<sup>Optional</sup> <a name="lineLimit" id="@mrgrain/cdk-esbuild.TransformOptions.property.lineLimit"></a>

```typescript
public readonly lineLimit: number;
```

- *Type:* number

Documentation: https://esbuild.github.io/api/#line-limit.

---

##### `loader`<sup>Optional</sup> <a name="loader" id="@mrgrain/cdk-esbuild.TransformOptions.property.loader"></a>

```typescript
public readonly loader: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#loader.

---

##### `logLevel`<sup>Optional</sup> <a name="logLevel" id="@mrgrain/cdk-esbuild.TransformOptions.property.logLevel"></a>

```typescript
public readonly logLevel: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#log-level.

---

##### `logLimit`<sup>Optional</sup> <a name="logLimit" id="@mrgrain/cdk-esbuild.TransformOptions.property.logLimit"></a>

```typescript
public readonly logLimit: number;
```

- *Type:* number

Documentation: https://esbuild.github.io/api/#log-limit.

---

##### `logOverride`<sup>Optional</sup> <a name="logOverride" id="@mrgrain/cdk-esbuild.TransformOptions.property.logOverride"></a>

```typescript
public readonly logOverride: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Documentation: https://esbuild.github.io/api/#log-override.

---

##### `mangleCache`<sup>Optional</sup> <a name="mangleCache" id="@mrgrain/cdk-esbuild.TransformOptions.property.mangleCache"></a>

```typescript
public readonly mangleCache: {[ key: string ]: string | boolean};
```

- *Type:* {[ key: string ]: string | boolean}

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `mangleProps`<sup>Optional</sup> <a name="mangleProps" id="@mrgrain/cdk-esbuild.TransformOptions.property.mangleProps"></a>

```typescript
public readonly mangleProps: any;
```

- *Type:* any

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `mangleQuoted`<sup>Optional</sup> <a name="mangleQuoted" id="@mrgrain/cdk-esbuild.TransformOptions.property.mangleQuoted"></a>

```typescript
public readonly mangleQuoted: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `minify`<sup>Optional</sup> <a name="minify" id="@mrgrain/cdk-esbuild.TransformOptions.property.minify"></a>

```typescript
public readonly minify: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifyIdentifiers`<sup>Optional</sup> <a name="minifyIdentifiers" id="@mrgrain/cdk-esbuild.TransformOptions.property.minifyIdentifiers"></a>

```typescript
public readonly minifyIdentifiers: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifySyntax`<sup>Optional</sup> <a name="minifySyntax" id="@mrgrain/cdk-esbuild.TransformOptions.property.minifySyntax"></a>

```typescript
public readonly minifySyntax: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `minifyWhitespace`<sup>Optional</sup> <a name="minifyWhitespace" id="@mrgrain/cdk-esbuild.TransformOptions.property.minifyWhitespace"></a>

```typescript
public readonly minifyWhitespace: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#minify.

---

##### `platform`<sup>Optional</sup> <a name="platform" id="@mrgrain/cdk-esbuild.TransformOptions.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#platform.

---

##### `pure`<sup>Optional</sup> <a name="pure" id="@mrgrain/cdk-esbuild.TransformOptions.property.pure"></a>

```typescript
public readonly pure: string[];
```

- *Type:* string[]

Documentation: https://esbuild.github.io/api/#pure.

---

##### `reserveProps`<sup>Optional</sup> <a name="reserveProps" id="@mrgrain/cdk-esbuild.TransformOptions.property.reserveProps"></a>

```typescript
public readonly reserveProps: any;
```

- *Type:* any

Documentation: https://esbuild.github.io/api/#mangle-props.

---

##### `sourcefile`<sup>Optional</sup> <a name="sourcefile" id="@mrgrain/cdk-esbuild.TransformOptions.property.sourcefile"></a>

```typescript
public readonly sourcefile: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#sourcefile.

---

##### `sourcemap`<sup>Optional</sup> <a name="sourcemap" id="@mrgrain/cdk-esbuild.TransformOptions.property.sourcemap"></a>

```typescript
public readonly sourcemap: boolean | string;
```

- *Type:* boolean | string

Documentation: https://esbuild.github.io/api/#sourcemap.

---

##### `sourceRoot`<sup>Optional</sup> <a name="sourceRoot" id="@mrgrain/cdk-esbuild.TransformOptions.property.sourceRoot"></a>

```typescript
public readonly sourceRoot: string;
```

- *Type:* string

Documentation: https://esbuild.github.io/api/#source-root.

---

##### `sourcesContent`<sup>Optional</sup> <a name="sourcesContent" id="@mrgrain/cdk-esbuild.TransformOptions.property.sourcesContent"></a>

```typescript
public readonly sourcesContent: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#sources-content.

---

##### `supported`<sup>Optional</sup> <a name="supported" id="@mrgrain/cdk-esbuild.TransformOptions.property.supported"></a>

```typescript
public readonly supported: {[ key: string ]: boolean};
```

- *Type:* {[ key: string ]: boolean}

Documentation: https://esbuild.github.io/api/#supported.

---

##### `target`<sup>Optional</sup> <a name="target" id="@mrgrain/cdk-esbuild.TransformOptions.property.target"></a>

```typescript
public readonly target: string | string[];
```

- *Type:* string | string[]

Documentation: https://esbuild.github.io/api/#target.

---

##### `treeShaking`<sup>Optional</sup> <a name="treeShaking" id="@mrgrain/cdk-esbuild.TransformOptions.property.treeShaking"></a>

```typescript
public readonly treeShaking: boolean;
```

- *Type:* boolean

Documentation: https://esbuild.github.io/api/#tree-shaking.

---

##### `tsconfigRaw`<sup>Optional</sup> <a name="tsconfigRaw" id="@mrgrain/cdk-esbuild.TransformOptions.property.tsconfigRaw"></a>

```typescript
public readonly tsconfigRaw: string | TsconfigRaw;
```

- *Type:* string | <a href="#@mrgrain/cdk-esbuild.TsconfigRaw">TsconfigRaw</a>

Documentation: https://esbuild.github.io/api/#tsconfig-raw.

---

### TsconfigRaw <a name="TsconfigRaw" id="@mrgrain/cdk-esbuild.TsconfigRaw"></a>

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.TsconfigRaw.Initializer"></a>

```typescript
import { TsconfigRaw } from '@mrgrain/cdk-esbuild'

const tsconfigRaw: TsconfigRaw = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TsconfigRaw.property.compilerOptions">compilerOptions</a></code> | <code><a href="#@mrgrain/cdk-esbuild.CompilerOptions">CompilerOptions</a></code> | *No description.* |

---

##### `compilerOptions`<sup>Optional</sup> <a name="compilerOptions" id="@mrgrain/cdk-esbuild.TsconfigRaw.property.compilerOptions"></a>

```typescript
public readonly compilerOptions: CompilerOptions;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.CompilerOptions">CompilerOptions</a>

---

### TypeScriptAssetProps <a name="TypeScriptAssetProps" id="@mrgrain/cdk-esbuild.TypeScriptAssetProps"></a>

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.TypeScriptAssetProps.Initializer"></a>

```typescript
import { TypeScriptAssetProps } from '@mrgrain/cdk-esbuild'

const typeScriptAssetProps: TypeScriptAssetProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAssetProps.property.buildOptions">buildOptions</a></code> | <code><a href="#@mrgrain/cdk-esbuild.BuildOptions">BuildOptions</a></code> | Build options passed on to esbuild. Please refer to the esbuild Build API docs for details. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAssetProps.property.buildProvider">buildProvider</a></code> | <code><a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a></code> | The esbuild Build API implementation to be used. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAssetProps.property.copyDir">copyDir</a></code> | <code>string \| string[] \| {[ key: string ]: string \| string[]}</code> | Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAssetProps.property.assetHash">assetHash</a></code> | <code>string</code> | A hash of this asset, which is available at construction time. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptAssetProps.property.entryPoints">entryPoints</a></code> | <code>string \| string[] \| {[ key: string ]: string}</code> | A path or list or map of paths to the entry points of your code. |

---

##### `buildOptions`<sup>Optional</sup> <a name="buildOptions" id="@mrgrain/cdk-esbuild.TypeScriptAssetProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.BuildOptions">BuildOptions</a>

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

> [https://esbuild.github.io/api/#build-api](https://esbuild.github.io/api/#build-api)

---

##### `buildProvider`<sup>Optional</sup> <a name="buildProvider" id="@mrgrain/cdk-esbuild.TypeScriptAssetProps.property.buildProvider"></a>

```typescript
public readonly buildProvider: IBuildProvider;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a>
- *Default:* new EsbuildProvider()

The esbuild Build API implementation to be used.

Configure the default `EsbuildProvider` for more options or
provide a custom `IBuildProvider` as an escape hatch.

---

##### `copyDir`<sup>Optional</sup> <a name="copyDir" id="@mrgrain/cdk-esbuild.TypeScriptAssetProps.property.copyDir"></a>

```typescript
public readonly copyDir: string | string[] | {[ key: string ]: string | string[]};
```

- *Type:* string | string[] | {[ key: string ]: string | string[]}

Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

* When provided with a `string` or `array`, all files are copied to the root of asset staging directory.
* When given a `map`, the key indicates the destination relative to the asset staging directory and the value is a list of all sources to be copied.

Therefore the following values for `copyDir` are all equivalent:
```
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

##### `assetHash`<sup>Optional</sup> <a name="assetHash" id="@mrgrain/cdk-esbuild.TypeScriptAssetProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* string

A hash of this asset, which is available at construction time.

As this is a plain string, it can be used in construct IDs in order to enforce creation of a new resource when the content hash has changed.

Defaults to a hash of all files in the resulting bundle.

---

##### `entryPoints`<sup>Required</sup> <a name="entryPoints" id="@mrgrain/cdk-esbuild.TypeScriptAssetProps.property.entryPoints"></a>

```typescript
public readonly entryPoints: string | string[] | {[ key: string ]: string};
```

- *Type:* string | string[] | {[ key: string ]: string}

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

### TypeScriptCodeProps <a name="TypeScriptCodeProps" id="@mrgrain/cdk-esbuild.TypeScriptCodeProps"></a>

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.TypeScriptCodeProps.Initializer"></a>

```typescript
import { TypeScriptCodeProps } from '@mrgrain/cdk-esbuild'

const typeScriptCodeProps: TypeScriptCodeProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.buildOptions">buildOptions</a></code> | <code><a href="#@mrgrain/cdk-esbuild.BuildOptions">BuildOptions</a></code> | Build options passed on to esbuild. Please refer to the esbuild Build API docs for details. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.buildProvider">buildProvider</a></code> | <code><a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a></code> | The esbuild Build API implementation to be used. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.copyDir">copyDir</a></code> | <code>string \| string[] \| {[ key: string ]: string \| string[]}</code> | Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.assetHash">assetHash</a></code> | <code>string</code> | A hash of this asset, which is available at construction time. |

---

##### `buildOptions`<sup>Optional</sup> <a name="buildOptions" id="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.BuildOptions">BuildOptions</a>

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

> [https://esbuild.github.io/api/#build-api](https://esbuild.github.io/api/#build-api)

---

##### `buildProvider`<sup>Optional</sup> <a name="buildProvider" id="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.buildProvider"></a>

```typescript
public readonly buildProvider: IBuildProvider;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a>
- *Default:* new EsbuildProvider()

The esbuild Build API implementation to be used.

Configure the default `EsbuildProvider` for more options or
provide a custom `IBuildProvider` as an escape hatch.

---

##### `copyDir`<sup>Optional</sup> <a name="copyDir" id="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.copyDir"></a>

```typescript
public readonly copyDir: string | string[] | {[ key: string ]: string | string[]};
```

- *Type:* string | string[] | {[ key: string ]: string | string[]}

Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

* When provided with a `string` or `array`, all files are copied to the root of asset staging directory.
* When given a `map`, the key indicates the destination relative to the asset staging directory and the value is a list of all sources to be copied.

Therefore the following values for `copyDir` are all equivalent:
```
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

##### `assetHash`<sup>Optional</sup> <a name="assetHash" id="@mrgrain/cdk-esbuild.TypeScriptCodeProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* string

A hash of this asset, which is available at construction time.

As this is a plain string, it can be used in construct IDs in order to enforce creation of a new resource when the content hash has changed.

Defaults to a hash of all files in the resulting bundle.

---

### TypeScriptSourceProps <a name="TypeScriptSourceProps" id="@mrgrain/cdk-esbuild.TypeScriptSourceProps"></a>

#### Initializer <a name="Initializer" id="@mrgrain/cdk-esbuild.TypeScriptSourceProps.Initializer"></a>

```typescript
import { TypeScriptSourceProps } from '@mrgrain/cdk-esbuild'

const typeScriptSourceProps: TypeScriptSourceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.buildOptions">buildOptions</a></code> | <code><a href="#@mrgrain/cdk-esbuild.BuildOptions">BuildOptions</a></code> | Build options passed on to esbuild. Please refer to the esbuild Build API docs for details. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.buildProvider">buildProvider</a></code> | <code><a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a></code> | The esbuild Build API implementation to be used. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.copyDir">copyDir</a></code> | <code>string \| string[] \| {[ key: string ]: string \| string[]}</code> | Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.assetHash">assetHash</a></code> | <code>string</code> | A hash of this asset, which is available at construction time. |

---

##### `buildOptions`<sup>Optional</sup> <a name="buildOptions" id="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.buildOptions"></a>

```typescript
public readonly buildOptions: BuildOptions;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.BuildOptions">BuildOptions</a>

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

> [https://esbuild.github.io/api/#build-api](https://esbuild.github.io/api/#build-api)

---

##### `buildProvider`<sup>Optional</sup> <a name="buildProvider" id="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.buildProvider"></a>

```typescript
public readonly buildProvider: IBuildProvider;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a>
- *Default:* new EsbuildProvider()

The esbuild Build API implementation to be used.

Configure the default `EsbuildProvider` for more options or
provide a custom `IBuildProvider` as an escape hatch.

---

##### `copyDir`<sup>Optional</sup> <a name="copyDir" id="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.copyDir"></a>

```typescript
public readonly copyDir: string | string[] | {[ key: string ]: string | string[]};
```

- *Type:* string | string[] | {[ key: string ]: string | string[]}

Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs. Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.

* When provided with a `string` or `array`, all files are copied to the root of asset staging directory.
* When given a `map`, the key indicates the destination relative to the asset staging directory and the value is a list of all sources to be copied.

Therefore the following values for `copyDir` are all equivalent:
```
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

##### `assetHash`<sup>Optional</sup> <a name="assetHash" id="@mrgrain/cdk-esbuild.TypeScriptSourceProps.property.assetHash"></a>

```typescript
public readonly assetHash: string;
```

- *Type:* string

A hash of this asset, which is available at construction time.

As this is a plain string, it can be used in construct IDs in order to enforce creation of a new resource when the content hash has changed.

Defaults to a hash of all files in the resulting bundle.

---

## Classes <a name="Classes" id="Classes"></a>

### CloudFrontFunctionRuntime <a name="CloudFrontFunctionRuntime" id="@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime"></a>

CloudFront Functions JavaScript runtime environment version.



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime.property.value">value</a></code> | <code>string</code> | *No description.* |

---

##### `value`<sup>Required</sup> <a name="value" id="@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime.property.JS_1_0">JS_1_0</a></code> | <code><a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime">CloudFrontFunctionRuntime</a></code> | cloudfront-js-1.0 - limited ES6 support, no const/let, no async/await. |
| <code><a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime.property.JS_2_0">JS_2_0</a></code> | <code><a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime">CloudFrontFunctionRuntime</a></code> | cloudfront-js-2.0 - enhanced ES6 support, const/let and async/await supported. |

---

##### `JS_1_0`<sup>Required</sup> <a name="JS_1_0" id="@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime.property.JS_1_0"></a>

```typescript
public readonly JS_1_0: CloudFrontFunctionRuntime;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime">CloudFrontFunctionRuntime</a>

cloudfront-js-1.0 - limited ES6 support, no const/let, no async/await.

---

##### `JS_2_0`<sup>Required</sup> <a name="JS_2_0" id="@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime.property.JS_2_0"></a>

```typescript
public readonly JS_2_0: CloudFrontFunctionRuntime;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionRuntime">CloudFrontFunctionRuntime</a>

cloudfront-js-2.0 - enhanced ES6 support, const/let and async/await supported.

---

### CloudFrontTypeScriptCode <a name="CloudFrontTypeScriptCode" id="@mrgrain/cdk-esbuild.CloudFrontTypeScriptCode"></a>

TypeScript code for CloudFront Functions.

#### Initializers <a name="Initializers" id="@mrgrain/cdk-esbuild.CloudFrontTypeScriptCode.Initializer"></a>

```typescript
import { CloudFrontTypeScriptCode } from '@mrgrain/cdk-esbuild'

new CloudFrontTypeScriptCode()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.CloudFrontTypeScriptCode.fromFile">fromFile</a></code> | Create CloudFront Function code from a TypeScript file. |
| <code><a href="#@mrgrain/cdk-esbuild.CloudFrontTypeScriptCode.fromInline">fromInline</a></code> | Create CloudFront Function code from inline TypeScript code. |

---

##### `fromFile` <a name="fromFile" id="@mrgrain/cdk-esbuild.CloudFrontTypeScriptCode.fromFile"></a>

```typescript
import { CloudFrontTypeScriptCode } from '@mrgrain/cdk-esbuild'

CloudFrontTypeScriptCode.fromFile(entryPoint: string, props?: CloudFrontFunctionCodeProps)
```

Create CloudFront Function code from a TypeScript file.

###### `entryPoint`<sup>Required</sup> <a name="entryPoint" id="@mrgrain/cdk-esbuild.CloudFrontTypeScriptCode.fromFile.parameter.entryPoint"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.CloudFrontTypeScriptCode.fromFile.parameter.props"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionCodeProps">CloudFrontFunctionCodeProps</a>

---

##### `fromInline` <a name="fromInline" id="@mrgrain/cdk-esbuild.CloudFrontTypeScriptCode.fromInline"></a>

```typescript
import { CloudFrontTypeScriptCode } from '@mrgrain/cdk-esbuild'

CloudFrontTypeScriptCode.fromInline(code: string, props?: CloudFrontFunctionInlineCodeProps)
```

Create CloudFront Function code from inline TypeScript code.

###### `code`<sup>Required</sup> <a name="code" id="@mrgrain/cdk-esbuild.CloudFrontTypeScriptCode.fromInline.parameter.code"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.CloudFrontTypeScriptCode.fromInline.parameter.props"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.CloudFrontFunctionInlineCodeProps">CloudFrontFunctionInlineCodeProps</a>

---



### EsbuildBundler <a name="EsbuildBundler" id="@mrgrain/cdk-esbuild.EsbuildBundler"></a>

Low-level construct that can be used where `BundlingOptions` are required.

This class directly interfaces with esbuild and provides almost no configuration safeguards.

#### Initializers <a name="Initializers" id="@mrgrain/cdk-esbuild.EsbuildBundler.Initializer"></a>

```typescript
import { EsbuildBundler } from '@mrgrain/cdk-esbuild'

new EsbuildBundler(entryPoints: string | string[] | {[ key: string ]: string}, props: BundlerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildBundler.Initializer.parameter.entryPoints">entryPoints</a></code> | <code>string \| string[] \| {[ key: string ]: string}</code> | A path or list or map of paths to the entry points of your code. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildBundler.Initializer.parameter.props">props</a></code> | <code><a href="#@mrgrain/cdk-esbuild.BundlerProps">BundlerProps</a></code> | Props to change the behavior of the bundler. |

---

##### `entryPoints`<sup>Required</sup> <a name="entryPoints" id="@mrgrain/cdk-esbuild.EsbuildBundler.Initializer.parameter.entryPoints"></a>

- *Type:* string | string[] | {[ key: string ]: string}

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

##### `props`<sup>Required</sup> <a name="props" id="@mrgrain/cdk-esbuild.EsbuildBundler.Initializer.parameter.props"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.BundlerProps">BundlerProps</a>

Props to change the behavior of the bundler.

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildBundler.property.entryPoints">entryPoints</a></code> | <code>string \| string[] \| {[ key: string ]: string}</code> | A path or list or map of paths to the entry points of your code. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildBundler.property.image">image</a></code> | <code>aws-cdk-lib.DockerImage</code> | *No description.* |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildBundler.property.local">local</a></code> | <code>aws-cdk-lib.ILocalBundling</code> | Implementation of `ILocalBundling` interface, responsible for calling esbuild functions. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildBundler.property.props">props</a></code> | <code><a href="#@mrgrain/cdk-esbuild.BundlerProps">BundlerProps</a></code> | Props to change the behavior of the bundler. |

---

##### `entryPoints`<sup>Required</sup> <a name="entryPoints" id="@mrgrain/cdk-esbuild.EsbuildBundler.property.entryPoints"></a>

```typescript
public readonly entryPoints: string | string[] | {[ key: string ]: string};
```

- *Type:* string | string[] | {[ key: string ]: string}

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

##### ~~`image`~~<sup>Required</sup> <a name="image" id="@mrgrain/cdk-esbuild.EsbuildBundler.property.image"></a>

- *Deprecated:* This value is ignored since the bundler is always using a locally installed version of esbuild. However the property is required to comply with the `BundlingOptions` interface.

```typescript
public readonly image: DockerImage;
```

- *Type:* aws-cdk-lib.DockerImage

---

##### `local`<sup>Required</sup> <a name="local" id="@mrgrain/cdk-esbuild.EsbuildBundler.property.local"></a>

```typescript
public readonly local: ILocalBundling;
```

- *Type:* aws-cdk-lib.ILocalBundling

Implementation of `ILocalBundling` interface, responsible for calling esbuild functions.

---

##### `props`<sup>Required</sup> <a name="props" id="@mrgrain/cdk-esbuild.EsbuildBundler.property.props"></a>

```typescript
public readonly props: BundlerProps;
```

- *Type:* <a href="#@mrgrain/cdk-esbuild.BundlerProps">BundlerProps</a>

Props to change the behavior of the bundler.

---


### EsbuildProvider <a name="EsbuildProvider" id="@mrgrain/cdk-esbuild.EsbuildProvider"></a>

- *Implements:* <a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a>, <a href="#@mrgrain/cdk-esbuild.ITransformProvider">ITransformProvider</a>

Default esbuild implementation calling esbuild's JavaScript API.

#### Initializers <a name="Initializers" id="@mrgrain/cdk-esbuild.EsbuildProvider.Initializer"></a>

```typescript
import { EsbuildProvider } from '@mrgrain/cdk-esbuild'

new EsbuildProvider(props?: EsbuildProviderProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildProvider.Initializer.parameter.props">props</a></code> | <code><a href="#@mrgrain/cdk-esbuild.EsbuildProviderProps">EsbuildProviderProps</a></code> | *No description.* |

---

##### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.EsbuildProvider.Initializer.parameter.props"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.EsbuildProviderProps">EsbuildProviderProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildProvider.buildSync">buildSync</a></code> | A method implementing the code build. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildProvider.transformSync">transformSync</a></code> | A method implementing the inline code transformation. |

---

##### `buildSync` <a name="buildSync" id="@mrgrain/cdk-esbuild.EsbuildProvider.buildSync"></a>

```typescript
public buildSync(options: ProviderBuildOptions): void
```

A method implementing the code build.

During synth time, the method will receive all computed `BuildOptions` from the bundler.

It MUST implement any output options to integrate correctly and MAY use any other options.
On failure, it SHOULD print any warnings & errors to stderr and throw a `BuildFailure` to inform the bundler.

###### `options`<sup>Required</sup> <a name="options" id="@mrgrain/cdk-esbuild.EsbuildProvider.buildSync.parameter.options"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions">ProviderBuildOptions</a>

---

##### `transformSync` <a name="transformSync" id="@mrgrain/cdk-esbuild.EsbuildProvider.transformSync"></a>

```typescript
public transformSync(input: string, options?: ProviderTransformOptions): string
```

A method implementing the inline code transformation.

During synth time, the method will receive the inline code and all computed `TransformOptions` from the bundler.

MUST return the transformed code as a string to integrate correctly.
It MAY use these options to do so.
On failure, it SHOULD print any warnings & errors to stderr and throw a `TransformFailure` to inform the bundler.

###### `input`<sup>Required</sup> <a name="input" id="@mrgrain/cdk-esbuild.EsbuildProvider.transformSync.parameter.input"></a>

- *Type:* string

---

###### `options`<sup>Optional</sup> <a name="options" id="@mrgrain/cdk-esbuild.EsbuildProvider.transformSync.parameter.options"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions">ProviderTransformOptions</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildProvider.defaultBuildProvider">defaultBuildProvider</a></code> | Get the default implementation for the Build API. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildProvider.defaultTransformationProvider">defaultTransformationProvider</a></code> | Get the default implementation for the Transformation API. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildProvider.overrideDefaultBuildProvider">overrideDefaultBuildProvider</a></code> | Set the default implementation for the Build API. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildProvider.overrideDefaultProvider">overrideDefaultProvider</a></code> | Set the default implementation for both Build and Transformation API. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildProvider.overrideDefaultTransformationProvider">overrideDefaultTransformationProvider</a></code> | Set the default implementation for the Transformation API. |

---

##### `defaultBuildProvider` <a name="defaultBuildProvider" id="@mrgrain/cdk-esbuild.EsbuildProvider.defaultBuildProvider"></a>

```typescript
import { EsbuildProvider } from '@mrgrain/cdk-esbuild'

EsbuildProvider.defaultBuildProvider()
```

Get the default implementation for the Build API.

##### `defaultTransformationProvider` <a name="defaultTransformationProvider" id="@mrgrain/cdk-esbuild.EsbuildProvider.defaultTransformationProvider"></a>

```typescript
import { EsbuildProvider } from '@mrgrain/cdk-esbuild'

EsbuildProvider.defaultTransformationProvider()
```

Get the default implementation for the Transformation API.

##### `overrideDefaultBuildProvider` <a name="overrideDefaultBuildProvider" id="@mrgrain/cdk-esbuild.EsbuildProvider.overrideDefaultBuildProvider"></a>

```typescript
import { EsbuildProvider } from '@mrgrain/cdk-esbuild'

EsbuildProvider.overrideDefaultBuildProvider(provider: IBuildProvider)
```

Set the default implementation for the Build API.

###### `provider`<sup>Required</sup> <a name="provider" id="@mrgrain/cdk-esbuild.EsbuildProvider.overrideDefaultBuildProvider.parameter.provider"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a>

---

##### `overrideDefaultProvider` <a name="overrideDefaultProvider" id="@mrgrain/cdk-esbuild.EsbuildProvider.overrideDefaultProvider"></a>

```typescript
import { EsbuildProvider } from '@mrgrain/cdk-esbuild'

EsbuildProvider.overrideDefaultProvider(provider: IEsbuildProvider)
```

Set the default implementation for both Build and Transformation API.

###### `provider`<sup>Required</sup> <a name="provider" id="@mrgrain/cdk-esbuild.EsbuildProvider.overrideDefaultProvider.parameter.provider"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.IEsbuildProvider">IEsbuildProvider</a>

---

##### `overrideDefaultTransformationProvider` <a name="overrideDefaultTransformationProvider" id="@mrgrain/cdk-esbuild.EsbuildProvider.overrideDefaultTransformationProvider"></a>

```typescript
import { EsbuildProvider } from '@mrgrain/cdk-esbuild'

EsbuildProvider.overrideDefaultTransformationProvider(provider: ITransformProvider)
```

Set the default implementation for the Transformation API.

###### `provider`<sup>Required</sup> <a name="provider" id="@mrgrain/cdk-esbuild.EsbuildProvider.overrideDefaultTransformationProvider.parameter.provider"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.ITransformProvider">ITransformProvider</a>

---



### EsbuildSource <a name="EsbuildSource" id="@mrgrain/cdk-esbuild.EsbuildSource"></a>


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildSource.anywhere">anywhere</a></code> | Try to find the module in most common paths. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildSource.auto">auto</a></code> | First try to find to module, then install it to a temporary location. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildSource.globalPaths">globalPaths</a></code> | Try to find the module in common global installation paths. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildSource.install">install</a></code> | Install the module to a temporary location. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildSource.nodeJs">nodeJs</a></code> | Require module by name, do not attempt to find it anywhere else. |
| <code><a href="#@mrgrain/cdk-esbuild.EsbuildSource.platformDefault">platformDefault</a></code> | `EsbuildSource.nodeJs()` for NodeJs, `EsbuildSource.auto()` for all other languages. |

---

##### `anywhere` <a name="anywhere" id="@mrgrain/cdk-esbuild.EsbuildSource.anywhere"></a>

```typescript
import { EsbuildSource } from '@mrgrain/cdk-esbuild'

EsbuildSource.anywhere()
```

Try to find the module in most common paths.

##### `auto` <a name="auto" id="@mrgrain/cdk-esbuild.EsbuildSource.auto"></a>

```typescript
import { EsbuildSource } from '@mrgrain/cdk-esbuild'

EsbuildSource.auto()
```

First try to find to module, then install it to a temporary location.

##### `globalPaths` <a name="globalPaths" id="@mrgrain/cdk-esbuild.EsbuildSource.globalPaths"></a>

```typescript
import { EsbuildSource } from '@mrgrain/cdk-esbuild'

EsbuildSource.globalPaths()
```

Try to find the module in common global installation paths.

##### `install` <a name="install" id="@mrgrain/cdk-esbuild.EsbuildSource.install"></a>

```typescript
import { EsbuildSource } from '@mrgrain/cdk-esbuild'

EsbuildSource.install()
```

Install the module to a temporary location.

##### `nodeJs` <a name="nodeJs" id="@mrgrain/cdk-esbuild.EsbuildSource.nodeJs"></a>

```typescript
import { EsbuildSource } from '@mrgrain/cdk-esbuild'

EsbuildSource.nodeJs()
```

Require module by name, do not attempt to find it anywhere else.

##### `platformDefault` <a name="platformDefault" id="@mrgrain/cdk-esbuild.EsbuildSource.platformDefault"></a>

```typescript
import { EsbuildSource } from '@mrgrain/cdk-esbuild'

EsbuildSource.platformDefault()
```

`EsbuildSource.nodeJs()` for NodeJs, `EsbuildSource.auto()` for all other languages.



### InlineJavaScriptCode <a name="InlineJavaScriptCode" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode"></a>

An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.

#### Initializers <a name="Initializers" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.Initializer"></a>

```typescript
import { InlineJavaScriptCode } from '@mrgrain/cdk-esbuild'

new InlineJavaScriptCode(code: string, props?: TransformerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.InlineJavaScriptCode.Initializer.parameter.code">code</a></code> | <code>string</code> | The inline code to be transformed. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineJavaScriptCode.Initializer.parameter.props">props</a></code> | <code><a href="#@mrgrain/cdk-esbuild.TransformerProps">TransformerProps</a></code> | Props to change the behavior of the transformer. |

---

##### `code`<sup>Required</sup> <a name="code" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.Initializer.parameter.code"></a>

- *Type:* string

The inline code to be transformed.

---

##### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.Initializer.parameter.props"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.TransformerProps">TransformerProps</a>

Props to change the behavior of the transformer.

Default values for `props.transformOptions`:
- `loader='js'`
- `platform=node`
- `target=nodeX` with X being the major node version running locally

> [https://esbuild.github.io/api/#transform-api](https://esbuild.github.io/api/#transform-api)

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.InlineJavaScriptCode.bind">bind</a></code> | Called when the lambda or layer is initialized to allow this object to bind to the stack, add resources and have fun. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineJavaScriptCode.bindToResource">bindToResource</a></code> | Called after the CFN function resource has been created to allow the code class to bind to it. |

---

##### `bind` <a name="bind" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.bind"></a>

```typescript
public bind(scope: Construct): CodeConfig
```

Called when the lambda or layer is initialized to allow this object to bind to the stack, add resources and have fun.

###### `scope`<sup>Required</sup> <a name="scope" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.bind.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `bindToResource` <a name="bindToResource" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.bindToResource"></a>

```typescript
public bindToResource(_resource: CfnResource, _options?: ResourceBindOptions): void
```

Called after the CFN function resource has been created to allow the code class to bind to it.

Specifically it's required to allow assets to add
metadata for tooling like SAM CLI to be able to find their origins.

###### `_resource`<sup>Required</sup> <a name="_resource" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.bindToResource.parameter._resource"></a>

- *Type:* aws-cdk-lib.CfnResource

---

###### `_options`<sup>Optional</sup> <a name="_options" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.bindToResource.parameter._options"></a>

- *Type:* aws-cdk-lib.aws_lambda.ResourceBindOptions

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromAsset">fromAsset</a></code> | Loads the function code from a local disk path. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromAssetImage">fromAssetImage</a></code> | Create an ECR image from the specified asset and bind it as the Lambda code. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromBucket">fromBucket</a></code> | Lambda handler code as an S3 object. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromCfnParameters">fromCfnParameters</a></code> | Creates a new Lambda source defined using CloudFormation parameters. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromDockerBuild">fromDockerBuild</a></code> | Loads the function code from an asset created by a Docker build. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromEcrImage">fromEcrImage</a></code> | Use an existing ECR image as the Lambda code. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromInline">fromInline</a></code> | Inline code for Lambda handler. |

---

##### `fromAsset` <a name="fromAsset" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromAsset"></a>

```typescript
import { InlineJavaScriptCode } from '@mrgrain/cdk-esbuild'

InlineJavaScriptCode.fromAsset(path: string, options?: AssetOptions)
```

Loads the function code from a local disk path.

###### `path`<sup>Required</sup> <a name="path" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromAsset.parameter.path"></a>

- *Type:* string

Either a directory with the Lambda code bundle or a .zip file.

---

###### `options`<sup>Optional</sup> <a name="options" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromAsset.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_s3_assets.AssetOptions

---

##### `fromAssetImage` <a name="fromAssetImage" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromAssetImage"></a>

```typescript
import { InlineJavaScriptCode } from '@mrgrain/cdk-esbuild'

InlineJavaScriptCode.fromAssetImage(directory: string, props?: AssetImageCodeProps)
```

Create an ECR image from the specified asset and bind it as the Lambda code.

###### `directory`<sup>Required</sup> <a name="directory" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromAssetImage.parameter.directory"></a>

- *Type:* string

the directory from which the asset must be created.

---

###### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromAssetImage.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_lambda.AssetImageCodeProps

properties to further configure the selected image.

---

##### `fromBucket` <a name="fromBucket" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromBucket"></a>

```typescript
import { InlineJavaScriptCode } from '@mrgrain/cdk-esbuild'

InlineJavaScriptCode.fromBucket(bucket: IBucket, key: string, objectVersion?: string)
```

Lambda handler code as an S3 object.

###### `bucket`<sup>Required</sup> <a name="bucket" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromBucket.parameter.bucket"></a>

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket.

---

###### `key`<sup>Required</sup> <a name="key" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromBucket.parameter.key"></a>

- *Type:* string

The object key.

---

###### `objectVersion`<sup>Optional</sup> <a name="objectVersion" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromBucket.parameter.objectVersion"></a>

- *Type:* string

Optional S3 object version.

---

##### `fromCfnParameters` <a name="fromCfnParameters" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromCfnParameters"></a>

```typescript
import { InlineJavaScriptCode } from '@mrgrain/cdk-esbuild'

InlineJavaScriptCode.fromCfnParameters(props?: CfnParametersCodeProps)
```

Creates a new Lambda source defined using CloudFormation parameters.

###### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromCfnParameters.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_lambda.CfnParametersCodeProps

optional construction properties of {@link CfnParametersCode}.

---

##### `fromDockerBuild` <a name="fromDockerBuild" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromDockerBuild"></a>

```typescript
import { InlineJavaScriptCode } from '@mrgrain/cdk-esbuild'

InlineJavaScriptCode.fromDockerBuild(path: string, options?: DockerBuildAssetOptions)
```

Loads the function code from an asset created by a Docker build.

By default, the asset is expected to be located at `/asset` in the
image.

###### `path`<sup>Required</sup> <a name="path" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromDockerBuild.parameter.path"></a>

- *Type:* string

The path to the directory containing the Docker file.

---

###### `options`<sup>Optional</sup> <a name="options" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromDockerBuild.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.DockerBuildAssetOptions

Docker build options.

---

##### `fromEcrImage` <a name="fromEcrImage" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromEcrImage"></a>

```typescript
import { InlineJavaScriptCode } from '@mrgrain/cdk-esbuild'

InlineJavaScriptCode.fromEcrImage(repository: IRepository, props?: EcrImageCodeProps)
```

Use an existing ECR image as the Lambda code.

###### `repository`<sup>Required</sup> <a name="repository" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromEcrImage.parameter.repository"></a>

- *Type:* aws-cdk-lib.aws_ecr.IRepository

the ECR repository that the image is in.

---

###### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromEcrImage.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_lambda.EcrImageCodeProps

properties to further configure the selected image.

---

##### `fromInline` <a name="fromInline" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromInline"></a>

```typescript
import { InlineJavaScriptCode } from '@mrgrain/cdk-esbuild'

InlineJavaScriptCode.fromInline(code: string)
```

Inline code for Lambda handler.

###### `code`<sup>Required</sup> <a name="code" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.fromInline.parameter.code"></a>

- *Type:* string

The actual handler code (limited to 4KiB).

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.InlineJavaScriptCode.property.isInline">isInline</a></code> | <code>boolean</code> | *No description.* |

---

##### `isInline`<sup>Required</sup> <a name="isInline" id="@mrgrain/cdk-esbuild.InlineJavaScriptCode.property.isInline"></a>

```typescript
public readonly isInline: boolean;
```

- *Type:* boolean

---


### InlineTypeScriptCode <a name="InlineTypeScriptCode" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode"></a>

An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.

#### Initializers <a name="Initializers" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.Initializer"></a>

```typescript
import { InlineTypeScriptCode } from '@mrgrain/cdk-esbuild'

new InlineTypeScriptCode(code: string, props?: TransformerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.InlineTypeScriptCode.Initializer.parameter.code">code</a></code> | <code>string</code> | The inline code to be transformed. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineTypeScriptCode.Initializer.parameter.props">props</a></code> | <code><a href="#@mrgrain/cdk-esbuild.TransformerProps">TransformerProps</a></code> | Props to change the behavior of the transformer. |

---

##### `code`<sup>Required</sup> <a name="code" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.Initializer.parameter.code"></a>

- *Type:* string

The inline code to be transformed.

---

##### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.Initializer.parameter.props"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.TransformerProps">TransformerProps</a>

Props to change the behavior of the transformer.

Default values for `transformOptions`:
- `loader='ts'`
- `platform=node`
- `target=nodeX` with X being the major node version running locally

> [https://esbuild.github.io/api/#transform-api](https://esbuild.github.io/api/#transform-api)

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.InlineTypeScriptCode.bind">bind</a></code> | Called when the lambda or layer is initialized to allow this object to bind to the stack, add resources and have fun. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineTypeScriptCode.bindToResource">bindToResource</a></code> | Called after the CFN function resource has been created to allow the code class to bind to it. |

---

##### `bind` <a name="bind" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.bind"></a>

```typescript
public bind(scope: Construct): CodeConfig
```

Called when the lambda or layer is initialized to allow this object to bind to the stack, add resources and have fun.

###### `scope`<sup>Required</sup> <a name="scope" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.bind.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `bindToResource` <a name="bindToResource" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.bindToResource"></a>

```typescript
public bindToResource(_resource: CfnResource, _options?: ResourceBindOptions): void
```

Called after the CFN function resource has been created to allow the code class to bind to it.

Specifically it's required to allow assets to add
metadata for tooling like SAM CLI to be able to find their origins.

###### `_resource`<sup>Required</sup> <a name="_resource" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.bindToResource.parameter._resource"></a>

- *Type:* aws-cdk-lib.CfnResource

---

###### `_options`<sup>Optional</sup> <a name="_options" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.bindToResource.parameter._options"></a>

- *Type:* aws-cdk-lib.aws_lambda.ResourceBindOptions

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromAsset">fromAsset</a></code> | Loads the function code from a local disk path. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromAssetImage">fromAssetImage</a></code> | Create an ECR image from the specified asset and bind it as the Lambda code. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromBucket">fromBucket</a></code> | Lambda handler code as an S3 object. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromCfnParameters">fromCfnParameters</a></code> | Creates a new Lambda source defined using CloudFormation parameters. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromDockerBuild">fromDockerBuild</a></code> | Loads the function code from an asset created by a Docker build. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromEcrImage">fromEcrImage</a></code> | Use an existing ECR image as the Lambda code. |
| <code><a href="#@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromInline">fromInline</a></code> | Inline code for Lambda handler. |

---

##### `fromAsset` <a name="fromAsset" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromAsset"></a>

```typescript
import { InlineTypeScriptCode } from '@mrgrain/cdk-esbuild'

InlineTypeScriptCode.fromAsset(path: string, options?: AssetOptions)
```

Loads the function code from a local disk path.

###### `path`<sup>Required</sup> <a name="path" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromAsset.parameter.path"></a>

- *Type:* string

Either a directory with the Lambda code bundle or a .zip file.

---

###### `options`<sup>Optional</sup> <a name="options" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromAsset.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_s3_assets.AssetOptions

---

##### `fromAssetImage` <a name="fromAssetImage" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromAssetImage"></a>

```typescript
import { InlineTypeScriptCode } from '@mrgrain/cdk-esbuild'

InlineTypeScriptCode.fromAssetImage(directory: string, props?: AssetImageCodeProps)
```

Create an ECR image from the specified asset and bind it as the Lambda code.

###### `directory`<sup>Required</sup> <a name="directory" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromAssetImage.parameter.directory"></a>

- *Type:* string

the directory from which the asset must be created.

---

###### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromAssetImage.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_lambda.AssetImageCodeProps

properties to further configure the selected image.

---

##### `fromBucket` <a name="fromBucket" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromBucket"></a>

```typescript
import { InlineTypeScriptCode } from '@mrgrain/cdk-esbuild'

InlineTypeScriptCode.fromBucket(bucket: IBucket, key: string, objectVersion?: string)
```

Lambda handler code as an S3 object.

###### `bucket`<sup>Required</sup> <a name="bucket" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromBucket.parameter.bucket"></a>

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket.

---

###### `key`<sup>Required</sup> <a name="key" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromBucket.parameter.key"></a>

- *Type:* string

The object key.

---

###### `objectVersion`<sup>Optional</sup> <a name="objectVersion" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromBucket.parameter.objectVersion"></a>

- *Type:* string

Optional S3 object version.

---

##### `fromCfnParameters` <a name="fromCfnParameters" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromCfnParameters"></a>

```typescript
import { InlineTypeScriptCode } from '@mrgrain/cdk-esbuild'

InlineTypeScriptCode.fromCfnParameters(props?: CfnParametersCodeProps)
```

Creates a new Lambda source defined using CloudFormation parameters.

###### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromCfnParameters.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_lambda.CfnParametersCodeProps

optional construction properties of {@link CfnParametersCode}.

---

##### `fromDockerBuild` <a name="fromDockerBuild" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromDockerBuild"></a>

```typescript
import { InlineTypeScriptCode } from '@mrgrain/cdk-esbuild'

InlineTypeScriptCode.fromDockerBuild(path: string, options?: DockerBuildAssetOptions)
```

Loads the function code from an asset created by a Docker build.

By default, the asset is expected to be located at `/asset` in the
image.

###### `path`<sup>Required</sup> <a name="path" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromDockerBuild.parameter.path"></a>

- *Type:* string

The path to the directory containing the Docker file.

---

###### `options`<sup>Optional</sup> <a name="options" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromDockerBuild.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.DockerBuildAssetOptions

Docker build options.

---

##### `fromEcrImage` <a name="fromEcrImage" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromEcrImage"></a>

```typescript
import { InlineTypeScriptCode } from '@mrgrain/cdk-esbuild'

InlineTypeScriptCode.fromEcrImage(repository: IRepository, props?: EcrImageCodeProps)
```

Use an existing ECR image as the Lambda code.

###### `repository`<sup>Required</sup> <a name="repository" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromEcrImage.parameter.repository"></a>

- *Type:* aws-cdk-lib.aws_ecr.IRepository

the ECR repository that the image is in.

---

###### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromEcrImage.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_lambda.EcrImageCodeProps

properties to further configure the selected image.

---

##### `fromInline` <a name="fromInline" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromInline"></a>

```typescript
import { InlineTypeScriptCode } from '@mrgrain/cdk-esbuild'

InlineTypeScriptCode.fromInline(code: string)
```

Inline code for Lambda handler.

###### `code`<sup>Required</sup> <a name="code" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.fromInline.parameter.code"></a>

- *Type:* string

The actual handler code (limited to 4KiB).

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.InlineTypeScriptCode.property.isInline">isInline</a></code> | <code>boolean</code> | *No description.* |

---

##### `isInline`<sup>Required</sup> <a name="isInline" id="@mrgrain/cdk-esbuild.InlineTypeScriptCode.property.isInline"></a>

```typescript
public readonly isInline: boolean;
```

- *Type:* boolean

---


### TypeScriptCode <a name="TypeScriptCode" id="@mrgrain/cdk-esbuild.TypeScriptCode"></a>

Represents the deployed TypeScript Code.

#### Initializers <a name="Initializers" id="@mrgrain/cdk-esbuild.TypeScriptCode.Initializer"></a>

```typescript
import { TypeScriptCode } from '@mrgrain/cdk-esbuild'

new TypeScriptCode(entryPoints: string | string[] | {[ key: string ]: string}, props?: TypeScriptCodeProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCode.Initializer.parameter.entryPoints">entryPoints</a></code> | <code>string \| string[] \| {[ key: string ]: string}</code> | A path or list or map of paths to the entry points of your code. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCode.Initializer.parameter.props">props</a></code> | <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCodeProps">TypeScriptCodeProps</a></code> | Props to change the behavior of the bundler. |

---

##### `entryPoints`<sup>Required</sup> <a name="entryPoints" id="@mrgrain/cdk-esbuild.TypeScriptCode.Initializer.parameter.entryPoints"></a>

- *Type:* string | string[] | {[ key: string ]: string}

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

##### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.TypeScriptCode.Initializer.parameter.props"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.TypeScriptCodeProps">TypeScriptCodeProps</a>

Props to change the behavior of the bundler.

Default values for `props.buildOptions`:
- `bundle=true`
- `platform=node`
- `target=nodeX` with X being the major node version running locally

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCode.bind">bind</a></code> | Called when the lambda or layer is initialized to allow this object to bind to the stack, add resources and have fun. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCode.bindToResource">bindToResource</a></code> | Called after the CFN function resource has been created to allow the code class to bind to it. |

---

##### `bind` <a name="bind" id="@mrgrain/cdk-esbuild.TypeScriptCode.bind"></a>

```typescript
public bind(scope: Construct): CodeConfig
```

Called when the lambda or layer is initialized to allow this object to bind to the stack, add resources and have fun.

###### `scope`<sup>Required</sup> <a name="scope" id="@mrgrain/cdk-esbuild.TypeScriptCode.bind.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `bindToResource` <a name="bindToResource" id="@mrgrain/cdk-esbuild.TypeScriptCode.bindToResource"></a>

```typescript
public bindToResource(resource: CfnResource, options?: ResourceBindOptions): void
```

Called after the CFN function resource has been created to allow the code class to bind to it.

Specifically it's required to allow assets to add
metadata for tooling like SAM CLI to be able to find their origins.

###### `resource`<sup>Required</sup> <a name="resource" id="@mrgrain/cdk-esbuild.TypeScriptCode.bindToResource.parameter.resource"></a>

- *Type:* aws-cdk-lib.CfnResource

---

###### `options`<sup>Optional</sup> <a name="options" id="@mrgrain/cdk-esbuild.TypeScriptCode.bindToResource.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.ResourceBindOptions

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCode.fromAsset">fromAsset</a></code> | Loads the function code from a local disk path. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCode.fromAssetImage">fromAssetImage</a></code> | Create an ECR image from the specified asset and bind it as the Lambda code. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCode.fromBucket">fromBucket</a></code> | Lambda handler code as an S3 object. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCode.fromCfnParameters">fromCfnParameters</a></code> | Creates a new Lambda source defined using CloudFormation parameters. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCode.fromDockerBuild">fromDockerBuild</a></code> | Loads the function code from an asset created by a Docker build. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCode.fromEcrImage">fromEcrImage</a></code> | Use an existing ECR image as the Lambda code. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCode.fromInline">fromInline</a></code> | Inline code for Lambda handler. |

---

##### `fromAsset` <a name="fromAsset" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromAsset"></a>

```typescript
import { TypeScriptCode } from '@mrgrain/cdk-esbuild'

TypeScriptCode.fromAsset(path: string, options?: AssetOptions)
```

Loads the function code from a local disk path.

###### `path`<sup>Required</sup> <a name="path" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromAsset.parameter.path"></a>

- *Type:* string

Either a directory with the Lambda code bundle or a .zip file.

---

###### `options`<sup>Optional</sup> <a name="options" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromAsset.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_s3_assets.AssetOptions

---

##### `fromAssetImage` <a name="fromAssetImage" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromAssetImage"></a>

```typescript
import { TypeScriptCode } from '@mrgrain/cdk-esbuild'

TypeScriptCode.fromAssetImage(directory: string, props?: AssetImageCodeProps)
```

Create an ECR image from the specified asset and bind it as the Lambda code.

###### `directory`<sup>Required</sup> <a name="directory" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromAssetImage.parameter.directory"></a>

- *Type:* string

the directory from which the asset must be created.

---

###### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromAssetImage.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_lambda.AssetImageCodeProps

properties to further configure the selected image.

---

##### `fromBucket` <a name="fromBucket" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromBucket"></a>

```typescript
import { TypeScriptCode } from '@mrgrain/cdk-esbuild'

TypeScriptCode.fromBucket(bucket: IBucket, key: string, objectVersion?: string)
```

Lambda handler code as an S3 object.

###### `bucket`<sup>Required</sup> <a name="bucket" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromBucket.parameter.bucket"></a>

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket.

---

###### `key`<sup>Required</sup> <a name="key" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromBucket.parameter.key"></a>

- *Type:* string

The object key.

---

###### `objectVersion`<sup>Optional</sup> <a name="objectVersion" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromBucket.parameter.objectVersion"></a>

- *Type:* string

Optional S3 object version.

---

##### `fromCfnParameters` <a name="fromCfnParameters" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromCfnParameters"></a>

```typescript
import { TypeScriptCode } from '@mrgrain/cdk-esbuild'

TypeScriptCode.fromCfnParameters(props?: CfnParametersCodeProps)
```

Creates a new Lambda source defined using CloudFormation parameters.

###### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromCfnParameters.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_lambda.CfnParametersCodeProps

optional construction properties of {@link CfnParametersCode}.

---

##### `fromDockerBuild` <a name="fromDockerBuild" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromDockerBuild"></a>

```typescript
import { TypeScriptCode } from '@mrgrain/cdk-esbuild'

TypeScriptCode.fromDockerBuild(path: string, options?: DockerBuildAssetOptions)
```

Loads the function code from an asset created by a Docker build.

By default, the asset is expected to be located at `/asset` in the
image.

###### `path`<sup>Required</sup> <a name="path" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromDockerBuild.parameter.path"></a>

- *Type:* string

The path to the directory containing the Docker file.

---

###### `options`<sup>Optional</sup> <a name="options" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromDockerBuild.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_lambda.DockerBuildAssetOptions

Docker build options.

---

##### `fromEcrImage` <a name="fromEcrImage" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromEcrImage"></a>

```typescript
import { TypeScriptCode } from '@mrgrain/cdk-esbuild'

TypeScriptCode.fromEcrImage(repository: IRepository, props?: EcrImageCodeProps)
```

Use an existing ECR image as the Lambda code.

###### `repository`<sup>Required</sup> <a name="repository" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromEcrImage.parameter.repository"></a>

- *Type:* aws-cdk-lib.aws_ecr.IRepository

the ECR repository that the image is in.

---

###### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromEcrImage.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_lambda.EcrImageCodeProps

properties to further configure the selected image.

---

##### `fromInline` <a name="fromInline" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromInline"></a>

```typescript
import { TypeScriptCode } from '@mrgrain/cdk-esbuild'

TypeScriptCode.fromInline(code: string)
```

Inline code for Lambda handler.

###### `code`<sup>Required</sup> <a name="code" id="@mrgrain/cdk-esbuild.TypeScriptCode.fromInline.parameter.code"></a>

- *Type:* string

The actual handler code (limited to 4KiB).

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptCode.property.isInline">isInline</a></code> | <code>boolean</code> | Determines whether this Code is inline code or not. |

---

##### ~~`isInline`~~<sup>Required</sup> <a name="isInline" id="@mrgrain/cdk-esbuild.TypeScriptCode.property.isInline"></a>

- *Deprecated:* this value is ignored since inline is now determined based on the the inlineCode field of CodeConfig returned from bind().

```typescript
public readonly isInline: boolean;
```

- *Type:* boolean

Determines whether this Code is inline code or not.

---


### TypeScriptSource <a name="TypeScriptSource" id="@mrgrain/cdk-esbuild.TypeScriptSource"></a>

- *Implements:* aws-cdk-lib.aws_s3_deployment.ISource

#### Initializers <a name="Initializers" id="@mrgrain/cdk-esbuild.TypeScriptSource.Initializer"></a>

```typescript
import { TypeScriptSource } from '@mrgrain/cdk-esbuild'

new TypeScriptSource(entryPoints: string | string[] | {[ key: string ]: string}, props?: TypeScriptSourceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptSource.Initializer.parameter.entryPoints">entryPoints</a></code> | <code>string \| string[] \| {[ key: string ]: string}</code> | A path or list or map of paths to the entry points of your code. |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptSource.Initializer.parameter.props">props</a></code> | <code><a href="#@mrgrain/cdk-esbuild.TypeScriptSourceProps">TypeScriptSourceProps</a></code> | Props to change the behavior of the bundler. |

---

##### `entryPoints`<sup>Required</sup> <a name="entryPoints" id="@mrgrain/cdk-esbuild.TypeScriptSource.Initializer.parameter.entryPoints"></a>

- *Type:* string | string[] | {[ key: string ]: string}

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

##### `props`<sup>Optional</sup> <a name="props" id="@mrgrain/cdk-esbuild.TypeScriptSource.Initializer.parameter.props"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.TypeScriptSourceProps">TypeScriptSourceProps</a>

Props to change the behavior of the bundler.

Default values for `props.buildOptions`:
- `bundle=true`
- `platform=browser`

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.TypeScriptSource.bind">bind</a></code> | Binds the source to a bucket deployment. |

---

##### `bind` <a name="bind" id="@mrgrain/cdk-esbuild.TypeScriptSource.bind"></a>

```typescript
public bind(scope: Construct, context?: DeploymentSourceContext): SourceConfig
```

Binds the source to a bucket deployment.

###### `scope`<sup>Required</sup> <a name="scope" id="@mrgrain/cdk-esbuild.TypeScriptSource.bind.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `context`<sup>Optional</sup> <a name="context" id="@mrgrain/cdk-esbuild.TypeScriptSource.bind.parameter.context"></a>

- *Type:* aws-cdk-lib.aws_s3_deployment.DeploymentSourceContext

---




## Protocols <a name="Protocols" id="Protocols"></a>

### IBuildProvider <a name="IBuildProvider" id="@mrgrain/cdk-esbuild.IBuildProvider"></a>

- *Implemented By:* <a href="#@mrgrain/cdk-esbuild.EsbuildProvider">EsbuildProvider</a>, <a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a>, <a href="#@mrgrain/cdk-esbuild.IEsbuildProvider">IEsbuildProvider</a>

Provides an implementation of the esbuild Build API.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.IBuildProvider.buildSync">buildSync</a></code> | A method implementing the code build. |

---

##### `buildSync` <a name="buildSync" id="@mrgrain/cdk-esbuild.IBuildProvider.buildSync"></a>

```typescript
public buildSync(options: ProviderBuildOptions): void
```

A method implementing the code build.

During synth time, the method will receive all computed `BuildOptions` from the bundler.

It MUST implement any output options to integrate correctly and MAY use any other options.
On failure, it SHOULD print any warnings & errors to stderr and throw a `BuildFailure` to inform the bundler.

###### `options`<sup>Required</sup> <a name="options" id="@mrgrain/cdk-esbuild.IBuildProvider.buildSync.parameter.options"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.ProviderBuildOptions">ProviderBuildOptions</a>

---


### IEsbuildProvider <a name="IEsbuildProvider" id="@mrgrain/cdk-esbuild.IEsbuildProvider"></a>

- *Extends:* <a href="#@mrgrain/cdk-esbuild.IBuildProvider">IBuildProvider</a>, <a href="#@mrgrain/cdk-esbuild.ITransformProvider">ITransformProvider</a>

- *Implemented By:* <a href="#@mrgrain/cdk-esbuild.IEsbuildProvider">IEsbuildProvider</a>

Provides an implementation of the esbuild Build & Transform API.



### ITransformProvider <a name="ITransformProvider" id="@mrgrain/cdk-esbuild.ITransformProvider"></a>

- *Implemented By:* <a href="#@mrgrain/cdk-esbuild.EsbuildProvider">EsbuildProvider</a>, <a href="#@mrgrain/cdk-esbuild.IEsbuildProvider">IEsbuildProvider</a>, <a href="#@mrgrain/cdk-esbuild.ITransformProvider">ITransformProvider</a>

Provides an implementation of the esbuild Transform API.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@mrgrain/cdk-esbuild.ITransformProvider.transformSync">transformSync</a></code> | A method implementing the inline code transformation. |

---

##### `transformSync` <a name="transformSync" id="@mrgrain/cdk-esbuild.ITransformProvider.transformSync"></a>

```typescript
public transformSync(input: string, options?: ProviderTransformOptions): string
```

A method implementing the inline code transformation.

During synth time, the method will receive the inline code and all computed `TransformOptions` from the bundler.

MUST return the transformed code as a string to integrate correctly.
It MAY use these options to do so.
On failure, it SHOULD print any warnings & errors to stderr and throw a `TransformFailure` to inform the bundler.

###### `input`<sup>Required</sup> <a name="input" id="@mrgrain/cdk-esbuild.ITransformProvider.transformSync.parameter.input"></a>

- *Type:* string

---

###### `options`<sup>Optional</sup> <a name="options" id="@mrgrain/cdk-esbuild.ITransformProvider.transformSync.parameter.options"></a>

- *Type:* <a href="#@mrgrain/cdk-esbuild.ProviderTransformOptions">ProviderTransformOptions</a>

---


