import { ResourceBindOptions } from '@aws-cdk/aws-lambda';
import { Location } from '@aws-cdk/aws-s3';
import { CfnResource, Construct, Stack } from '@aws-cdk/core';
import {
  AssetBaseProps,
  AssetProps,
  JavaScriptAsset as JSAsset,
  TypeScriptAsset as TSAsset,
} from './asset';
import { EntryPoints } from './bundler';
import { BuildOptions } from './esbuild-types';

function nodeMajorVersion(): number {
  return parseInt(process.versions.node.split('.')[0], 10);
}

export interface CodeConfig {
  /**
   * The location of the code in S3.
   *
   * @stability stable
   */
  readonly s3Location: Location;
}

export interface JavaScriptCodeProps extends AssetBaseProps {};
export interface TypeScriptCodeProps extends AssetBaseProps {};

abstract class Code<
  Props extends JavaScriptCodeProps | TypeScriptCodeProps,
  Asset extends JSAsset | TSAsset
> {
  protected abstract readonly assetClass: new (
    scope: Construct,
    id: string,
    props: AssetProps
  ) => Asset;

  protected props: AssetProps;

  protected asset!: Asset;

  /**
   * Determines whether this Code is inline code or not.
   *
   * @deprecated this value is ignored since inline is now determined based on the the inlineCode field of CodeConfig returned from bind().
   */
  public isInline: boolean = false;

  /**
   *
   * @param entryPoints - Relative path to the asset code. Use `props.buildOptions.absWorkingDir` if an absolute path is required.
   * @param props - Asset properties.
   */
  constructor(public readonly entryPoints: EntryPoints, props: Props) {
    const defaultOptions: Partial<BuildOptions> = {
      ...(!props.buildOptions?.platform ||
      props.buildOptions?.platform === 'node'
        ? { platform: 'node', target: 'node' + nodeMajorVersion() }
        : {}),
    };

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
export class JavaScriptCode extends Code<JavaScriptCodeProps, JSAsset> {
  protected readonly assetClass = JSAsset;

  constructor(
    /**
     * A relative path or list or map of relative paths to the entry points of your code from the root of the project.
     * E.g. `src/index.ts`.
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
export class TypeScriptCode extends Code<TypeScriptCodeProps, TSAsset> {
  protected readonly assetClass = TSAsset;

  constructor(
    /**
     * A relative path or list or map of relative paths to the entry points of your code from the root of the project.
     * E.g. `src/index.ts`.
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
