import { Stack } from 'aws-cdk-lib';
import {
  DeploymentSourceContext,
  ISource,
  SourceConfig,
} from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { TypeScriptAsset, TypeScriptAssetProps } from './asset';
import { EntryPoints } from './bundler';
import { TypeScriptCodeProps } from './code';
import { BuildOptions } from './esbuild-types';
import { uniqueAssetId } from './private/utils';

export interface TypeScriptSourceProps extends TypeScriptCodeProps {};

export class TypeScriptSource implements ISource {
  private props: TypeScriptAssetProps;
  private asset?: TypeScriptAsset;

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
      this.asset = new TypeScriptAsset(
        scope,
        uniqueAssetId(scope, this.constructor.name),
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
