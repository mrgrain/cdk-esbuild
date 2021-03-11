import {
  Code as LambdaCode,
  CodeConfig,
  ResourceBindOptions,
} from "@aws-cdk/aws-lambda";
import { CfnResource, Construct, Stack } from "@aws-cdk/core";
import { BuildOptions } from "./bundling";
import { nodeMajorVersion } from "./util";
import {
  EsbuildAssetProps,
  JavaScriptAsset as JSAsset,
  TypeScriptAsset as TSAsset,
} from "./asset";

function mergeWithDefaultBuildOptions(
  options: BuildOptions = {}
): BuildOptions {
  return {
    ...(!options.platform || options.platform === "node"
      ? { platform: "node", target: "node" + nodeMajorVersion() }
      : {}),
    bundle: true,
    ...options,
  };
}

type CodeProps = Omit<EsbuildAssetProps, "entrypoint">;

type JavaScriptCodeProps = CodeProps;
type TypeScriptCodeProps = CodeProps;

abstract class Code<
  Props extends CodeProps,
  Asset extends JSAsset | TSAsset
> extends LambdaCode {
  protected abstract AssetClass: new (
    scope: Construct,
    id: string,
    props: EsbuildAssetProps
  ) => Asset;

  protected props: EsbuildAssetProps;

  protected asset: Asset;

  public isInline: false;

  /**
   *
   * @param entrypoint - Relative path to the asset code from `props.projectRoot`.
   * @param props - Asset properties.
   */
  constructor(entrypoint: string, props: Props) {
    super();

    const defaultOptions: BuildOptions = {
      ...(!props.buildOptions?.platform ||
      props.buildOptions?.platform === "node"
        ? { platform: "node", target: "node" + nodeMajorVersion() }
        : {}),
    };

    this.props = {
      entrypoint,
      ...props,
      buildOptions: {
        ...defaultOptions,
        ...props.buildOptions,
      },
    };
  }

  bind(scope: Construct): CodeConfig {
    // If the same AssetCode is used multiple times, retain only the first instantiation.
    if (!this.asset) {
      this.asset = new this.AssetClass(
        scope,
        this.constructor.name,
        this.props
      );
    } else if (Stack.of(this.asset) !== Stack.of(scope)) {
      throw new Error(
        `Asset is already associated with another stack '${
          Stack.of(this.asset).stackName
        }'. ` + "Create a new Asset instance for every stack."
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
      throw new Error("bindToResource() must be called after bind()");
    }
    const resourceProperty = options?.resourceProperty || this.constructor.name;
    // https://github.com/aws/aws-cdk/issues/1432
    this.asset.addResourceMetadata(resource, resourceProperty);
  }
}

export class JavaScriptCode extends Code<JavaScriptCodeProps, JSAsset> {
  protected AssetClass = JSAsset;

  constructor(entrypoint: string, props: JavaScriptCodeProps = {}) {
    super(entrypoint, props);
  }
}
export class TypeScriptCode extends Code<TypeScriptCodeProps, TSAsset> {
  protected AssetClass = TSAsset;

  constructor(entrypoint: string, props: TypeScriptCodeProps = {}) {
    super(entrypoint, props);
  }
}

/**
 * @deprecated
 * @use JavaScriptCode
 * */
export class JavaScriptAsset extends JavaScriptCode {}

/**
 * @deprecated
 * @use TypeScriptCode
 * */
export class TypeScriptAsset extends TypeScriptCode {}
