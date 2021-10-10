import {
  ResourceBindOptions,
} from '@aws-cdk/aws-lambda';
import { CfnResource, Construct, Stack } from '@aws-cdk/core';
import {
  EsbuildAssetProps,
  EsbuildProps,
  JavaScriptAsset as JSAsset,
  TypeScriptAsset as TSAsset,
} from './asset';
import { EsbuildOptions } from './bundlers';

function nodeMajorVersion(): number {
  return parseInt(process.versions.node.split('.')[0], 10);
}

export interface Location {
  readonly bucketName: string;
  readonly objectKey: string;
}
export interface CodeConfig {
  readonly s3Location?: Location;
  readonly inlineCode?: string;
}

type JavaScriptCodeProps = EsbuildProps;
type TypeScriptCodeProps = EsbuildProps;

abstract class Code<
  Props extends EsbuildProps,
  Asset extends JSAsset | TSAsset,
> {
  protected readonly abstract assetClass: new (
    scope: Construct,
    id: string,
    props: EsbuildAssetProps,
  ) => Asset;

  protected props: EsbuildAssetProps;

  protected asset!: Asset;

  public isInline: false = false;

  /**
   *
   * @param entryPoints - Relative path to the asset code. Use `props.buildOptions.absWorkingDir` if an absolute path is required.
   * @param props - Asset properties.
   */
  constructor(entryPoints: EsbuildAssetProps['entryPoints'], props: Props) {
    const defaultOptions: Partial<EsbuildOptions> = {
      ...(!props.buildOptions?.platform ||
          props.buildOptions?.platform === 'node'
        ? { platform: 'node', target: 'node' + nodeMajorVersion() }
        : {}),
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

  bind(
    scope: Construct,
  ): CodeConfig {
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

  bindToResource(resource: CfnResource, options?: ResourceBindOptions) {
    if (!this.asset) {
      throw new Error('bindToResource() must be called after bind()');
    }
    const resourceProperty = options?.resourceProperty || this.constructor.name;
    // https://github.com/aws/aws-cdk/issues/1432
    this.asset.addResourceMetadata(resource, resourceProperty);
  }
}

export class JavaScriptCode extends Code<JavaScriptCodeProps, JSAsset> {
  assetClass = JSAsset;

  constructor(
    entryPoints: EsbuildAssetProps['entryPoints'],
    props: JavaScriptCodeProps = {},
  ) {
    super(entryPoints, props);
  }
}
export class TypeScriptCode extends Code<TypeScriptCodeProps, TSAsset> {
  assetClass = TSAsset;

  constructor(
    entryPoints: EsbuildAssetProps['entryPoints'],
    props: TypeScriptCodeProps = {},
  ) {
    super(entryPoints, props);
  }
}
