import { Stack } from 'aws-cdk-lib';
import {
  DeploymentSourceContext,
  ISource,
  SourceConfig,
} from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { AssetBaseProps, AssetProps, JavaScriptAsset, TypeScriptAsset } from './asset';
import { EntryPoints } from './bundler';
import { BuildOptions } from './esbuild-types';

export interface JavaScriptSourceProps extends AssetBaseProps{};
export interface TypeScriptSourceProps extends AssetBaseProps{};

abstract class Source<
  Props extends JavaScriptSourceProps | TypeScriptSourceProps,
  Asset extends JavaScriptAsset | TypeScriptAsset,
> implements ISource {
  protected readonly abstract assetClass: new (
    scope: Construct,
    id: string,
    props: AssetProps,
  ) => Asset;

  protected props: AssetProps;

  protected asset!: Asset;

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
     * - `platform=browser`
     *
     * @stability stable
     */
    props: Props,
  ) {
    const defaultOptions: Partial<BuildOptions> = {
      platform: 'browser',
    };

    this.props = {
      entryPoints,
      ...props,
      buildOptions: {
        ...defaultOptions,
        ...props.buildOptions,
      },
    };
  }

  bind(scope: Construct, context?: DeploymentSourceContext): SourceConfig {
    // If the same AssetCode is used multiple times, retain only the first instantiation.
    if (!this.asset) {
      this.asset = new this.assetClass(
        scope,
        this.constructor.name,
        this.props,
      );
    } else if (Stack.of(this.asset) !== Stack.of(scope)) {
      throw new Error(
        `Asset is already associated with another stack '${
          Stack.of(this.asset).stackName
        }'. ` + 'Create a new Asset instance for every stack.',
      );
    }

    if (!context) {
      throw new Error(
        `To use a ${this.constructor.name}, context must be provided`,
      );
    }

    // we give permissions on all files in the bucket since we don't want to
    // accidentally revoke permission on old versions when deploying a new
    // version (for example, when using Lambda traffic shifting).
    this.asset.bucket.grantRead(context.handlerRole);

    return {
      bucket: this.asset.bucket,
      zipObjectKey: this.asset.s3ObjectKey,
    };
  }
}

export class JavaScriptSource extends Source<
JavaScriptSourceProps,
JavaScriptAsset
> {
  assetClass = JavaScriptAsset;

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
      * - `platform=browser`
      *
      * @stability stable
      */
    props: JavaScriptSourceProps = {},
  ) {
    super(entryPoints, props);
  }
}

export class TypeScriptSource extends Source<
TypeScriptSourceProps,
TypeScriptAsset
> {
  assetClass = TypeScriptAsset;

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
     * - `platform=browser`
     *
     * @stability stable
     */
    props: TypeScriptSourceProps = {},
  ) {
    super(entryPoints, props);
  }
}
