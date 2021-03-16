import { Asset as S3Asset } from "@aws-cdk/aws-s3-assets";
import { AssetHashType, Construct, ConstructNode, IAsset } from "@aws-cdk/core";
import { isAbsolute } from "path";
import { BuildOptions } from "./bundlers";
import { EsbuildBundling } from "./bundling";
export interface EsbuildAssetProps extends Partial<IAsset> {
  /**
   * Relative paths to the entrypoints of your code, e.g. `src/index.ts`
   */
  entryPoints: string[];

  /**
   * The root path for the code asset. If not set, will attempt to guess the root path.
   *
   * DEPRECATED! Will be removed in upcoming version.
   *
   * `buildOptions.absWorkingDir` will take priority, then `projectRoot`, then the current working directory.
   *  The previously used detection algorithm as been removed.
   *
   * @default `process.cwd()`
   *
   * @deprecated use `buildOptions.absWorkingDir` instead
   */
  projectRoot?: string;

  /**
   * Relative path to a directory copied to the output BEFORE esbuild is run (i.e esbuild will overwrite existing files).
   *
   * @experimental Likely to change once esbuild supports this natively
   */
  copyDir?: string;

  /**
   * Force the asset to use Docker bundling (and skip local bundling).
   */
  forceDockerBundling?: boolean;

  /**
   * Options passed on to esbuild.
   */
  buildOptions?: Omit<BuildOptions, "entryPoints">;
}

export type JavaScriptAssetProps = EsbuildAssetProps;
export type TypeScriptAssetProps = EsbuildAssetProps;

abstract class Asset<Props extends EsbuildAssetProps> extends S3Asset {
  public constructor(
    scope: Construct,
    id: string,
    {
      entryPoints,
      projectRoot,
      assetHash,
      forceDockerBundling = false,
      copyDir,
      buildOptions: options = {},
    }: Props
  ) {
    const name = scope.node.path + ConstructNode.PATH_SEP + id;

    entryPoints.forEach((entryPoint: string) => {
      if (isAbsolute(entryPoint)) {
        throw new Error(
          `${name}: Entrypoints must be a relative path. If you need to define an absolute path, please use \`buildOptions.absWorkingDir\` accordingly.`
        );
      }
    });

    const absWorkingDir = options.absWorkingDir ?? projectRoot ?? process.cwd();

    const buildOptions = {
      bundle: true,
      ...options,
      absWorkingDir,
    };

    super(scope, id, {
      path: absWorkingDir,
      assetHash,
      assetHashType: assetHash ? AssetHashType.CUSTOM : AssetHashType.OUTPUT,
      bundling: new EsbuildBundling(
        {
          ...buildOptions,
          entryPoints,
        },
        {
          localBundling: !forceDockerBundling,
          copyDir,
        }
      ),
    });
  }
}

export class JavaScriptAsset extends Asset<JavaScriptAssetProps> {}
export class TypeScriptAsset extends Asset<TypeScriptAssetProps> {}
