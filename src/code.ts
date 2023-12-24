import { CfnResource, Stack } from 'aws-cdk-lib';
import { ResourceBindOptions, Code, CodeConfig } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import {
  EsbuildAsset,
  AssetBaseProps,
  AssetProps,
  JavaScriptAsset as JSAsset,
  TypeScriptAsset as TSAsset,
} from './asset';
import { EntryPoints } from './bundler';
import { BuildOptions } from './esbuild-types';
import { defaultPlatformProps, uniqueAssetId } from './private/utils';

export { CodeConfig } from 'aws-cdk-lib/aws-lambda';
export interface JavaScriptCodeProps extends AssetBaseProps {};
export interface TypeScriptCodeProps extends AssetBaseProps {};

/**
 * Represents a generic esbuild code bundle.
 *
 * You should always use `TypeScriptCode` or `JavaScriptCode`.
 *
 * @stability experimental
 */
export class EsbuildCode<
  Props extends JavaScriptCodeProps | TypeScriptCodeProps,
> extends Code {
  protected getAsset(scope: Construct): EsbuildAsset<AssetProps> {
    return new EsbuildAsset(
      scope,
      uniqueAssetId(scope, this.constructor.name),
      this.props,
    );
  }

  protected props: AssetProps;

  protected asset!: EsbuildAsset<AssetProps>;

  /**
   * Determines whether this Code is inline code or not.
   *
   * @deprecated this value is ignored since inline is now determined based on the the inlineCode field of CodeConfig returned from bind().
   */
  public isInline: boolean = false;

  constructor(
    /**
     * A path or list or map of paths to the entry points of your code.
     *
     * Relative paths are by default resolved from the current working directory.
     * To change the working directory, see `buildOptions.absWorkingDir`.
     *
     * Absolute paths can be used if files are part of the working directory.
     *
     * Examples:
     *  - `'src/index.ts'`
     *  - `require.resolve('./lambda')`
     *  - `['src/index.ts', 'src/util.ts']`
     *  - `{one: 'src/two.ts', two: 'src/one.ts'}`
     *
     * @stability stable
     */
    readonly entryPoints: EntryPoints,

    /**
     * Props to change the behavior of the bundler.
     *
     * Default values for `props.buildOptions`:
     * - `bundle=true`
     * - `platform=node`
     * - `target=nodeX` with X being the major node version running locally
     *
     * @stability stable
     */
    props: Props,
  ) {
    super();

    const defaultOptions: Partial<BuildOptions> = defaultPlatformProps(props.buildOptions);

    this.props = {
      ...props,
      entryPoints,
      buildOptions: {
        ...defaultOptions,
        ...props.buildOptions,
      },
    };
  }

  bind(scope: Construct): CodeConfig {
    // If the same AssetCode is used multiple times, retain only the first instantiation.
    if (!this.asset) {
      this.asset = this.getAsset(scope);
    } else if (Stack.of(this.asset) !== Stack.of(scope)) {
      throw new Error(
        `Asset is already associated with another stack '${
          Stack.of(this.asset).stackName
        }'. ` + 'Create a new Asset instance for every stack.',
      );
    }

    return {
      s3Location: {
        bucketName: this.asset.s3BucketName,
        objectKey: this.asset.s3ObjectKey,
      },
    };
  }

  /**
   * Called after the CFN function resource has been created to allow the code class to bind to it.
   *
   * Specifically it's required to allow assets to add
   * metadata for tooling like SAM CLI to be able to find their origins.
   *
   * @stability stable
   */
  bindToResource(resource: CfnResource, options?: ResourceBindOptions) {
    if (!this.asset) {
      throw new Error('bindToResource() must be called after bind()');
    }
    const resourceProperty = options?.resourceProperty || this.constructor.name;
    // https://github.com/aws/aws-cdk/issues/1432
    this.asset.addResourceMetadata(resource, resourceProperty);
  }
}

/**
 * Represents the deployed JavaScript Code.
 *
 * @stability stable
 */
export class JavaScriptCode extends EsbuildCode<JavaScriptCodeProps> {
  protected getAsset(scope: Construct): EsbuildAsset<AssetProps> {
    return new JSAsset(
      scope,
      uniqueAssetId(scope, this.constructor.name),
      this.props,
    );
  }

  constructor(
    /**
     * A path or list or map of paths to the entry points of your code.
     *
     * Relative paths are by default resolved from the current working directory.
     * To change the working directory, see `buildOptions.absWorkingDir`.
     *
     * Absolute paths can be used if files are part of the working directory.
     *
     * Examples:
     *  - `'src/index.ts'`
     *  - `require.resolve('./lambda')`
     *  - `['src/index.ts', 'src/util.ts']`
     *  - `{one: 'src/two.ts', two: 'src/one.ts'}`
     *
     * @stability stable
     */
    entryPoints: EntryPoints,

    /**
     * Props to change the behavior of the bundler.
     *
     * Default values for `props.buildOptions`:
     * - `bundle=true`
     * - `platform=node`
     * - `target=nodeX` with X being the major node version running locally
     *
     * @stability stable
     */
    props: JavaScriptCodeProps = {},
  ) {
    super(entryPoints, props);
  }
}

/**
 * Represents the deployed TypeScript Code.
 *
 * @stability stable
 */
export class TypeScriptCode extends EsbuildCode<TypeScriptCodeProps> {
  protected getAsset(scope: Construct): EsbuildAsset<AssetProps> {
    return new TSAsset(
      scope,
      uniqueAssetId(scope, this.constructor.name),
      this.props,
    );
  }

  constructor(
    /**
     * A path or list or map of paths to the entry points of your code.
     *
     * Relative paths are by default resolved from the current working directory.
     * To change the working directory, see `buildOptions.absWorkingDir`.
     *
     * Absolute paths can be used if files are part of the working directory.
     *
     * Examples:
     *  - `'src/index.ts'`
     *  - `require.resolve('./lambda')`
     *  - `['src/index.ts', 'src/util.ts']`
     *  - `{one: 'src/two.ts', two: 'src/one.ts'}`
     *
     * @stability stable
     */
    entryPoints: EntryPoints,

    /**
     * Props to change the behavior of the bundler.
     *
     * Default values for `props.buildOptions`:
     * - `bundle=true`
     * - `platform=node`
     * - `target=nodeX` with X being the major node version running locally
     *
     * @stability stable
     */
    props: TypeScriptCodeProps = {},
  ) {
    super(entryPoints, props);
  }
}
