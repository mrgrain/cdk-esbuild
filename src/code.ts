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
    entryPoints: EntryPoints,
    props: JavaScriptCodeProps = {},
  ) {
    super(entryPoints, props);
  }
}
export class TypeScriptCode extends Code<TypeScriptCodeProps, TSAsset> {
  assetClass = TSAsset;

  constructor(
    entryPoints: EntryPoints,
    props: TypeScriptCodeProps = {},
  ) {
    super(entryPoints, props);
  }
}
