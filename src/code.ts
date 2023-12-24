import { CfnResource, Stack } from 'aws-cdk-lib';
import { ResourceBindOptions, Code, CodeConfig } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import {
  TypeScriptAssetProps,
  TypeScriptAsset,
} from './asset';
import { BundlerProps, EntryPoints } from './bundler';
import { BuildOptions } from './esbuild-types';
import { defaultPlatformProps, uniqueAssetId } from './private/utils';

export { CodeConfig } from 'aws-cdk-lib/aws-lambda';

export interface TypeScriptCodeProps extends BundlerProps {
  /**
   * A hash of this asset, which is available at construction time.
   *
   * As this is a plain string, it can be used in construct IDs in order to enforce creation of a new resource when the content hash has changed.
   *
   * Defaults to a hash of all files in the resulting bundle.
   *
   * @stability stable
   */
  readonly assetHash?: string;
}


/**
 * Represents the deployed TypeScript Code.
 *
 * @stability stable
 */
export class TypeScriptCode extends Code {
  private props: TypeScriptAssetProps;
  private asset?: TypeScriptAsset;

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
