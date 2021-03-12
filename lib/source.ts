import {
  DeploymentSourceContext,
  ISource,
  SourceConfig,
} from "@aws-cdk/aws-s3-deployment";
import { Construct, Stack } from "@aws-cdk/core";
import { EsbuildAssetProps, JavaScriptAsset, TypeScriptAsset } from "./asset";
import { BuildOptions } from "./bundling";

type SourceProps = Omit<EsbuildAssetProps, "entryPoints">;

type JavaScriptSourceProps = SourceProps;
type TypeScriptSourceProps = SourceProps;

abstract class Source<
  Props extends SourceProps,
  Asset extends JavaScriptAsset | TypeScriptAsset
> implements ISource {
  protected abstract AssetClass: new (
    scope: Construct,
    id: string,
    props: EsbuildAssetProps
  ) => Asset;

  protected props: EsbuildAssetProps;

  protected asset: Asset;

  /**
   *
   * @param entryPoints - Relative path to the source code from `props.projectRoot`.
   * @param props - Source properties.
   */
  constructor(entryPoints: string | string[], props: Props) {
    const defaultOptions: BuildOptions = {
      platform: "browser",
      ...(!props.buildOptions?.define
        ? {
            define: {
              "process.env.NODE_ENV": `"${
                process.env.NODE_ENV ?? "production"
              }"`,
            },
          }
        : {}),
    };

    this.props = {
      entryPoints: Array.isArray(entryPoints) ? entryPoints : [entryPoints],
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

    if (!context) {
      throw new Error(
        `To use a ${this.constructor.name}, context must be provided`
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
  protected AssetClass = JavaScriptAsset;

  constructor(
    entryPoints: string | string[],
    props: JavaScriptSourceProps = {}
  ) {
    super(entryPoints, props);
  }
}

export class TypeScriptSource extends Source<
  TypeScriptSourceProps,
  TypeScriptAsset
> {
  protected AssetClass = TypeScriptAsset;

  constructor(
    entryPoints: string | string[],
    props: TypeScriptSourceProps = {}
  ) {
    super(entryPoints, props);
  }
}
