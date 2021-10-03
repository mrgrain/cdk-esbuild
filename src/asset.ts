import { isAbsolute } from 'path';
import { Asset as S3Asset } from '@aws-cdk/aws-s3-assets';
import { AssetHashType, Construct, ConstructNode, IAsset } from '@aws-cdk/core';
import { BuildOptions, BundlerPriority } from './bundlers';
import { EsbuildBundling } from './bundling';
export interface EsbuildAssetProps extends Partial<IAsset> {
  /**
   * Relative paths to the entrypoints of your code, e.g. `src/index.ts`
   */
  entryPoints: string | string[] | Record<string, string>;

  /**
   * Relative path to a directory copied to the output BEFORE esbuild is run (i.e esbuild will overwrite existing files).
   */
  copyDir?: string;

  /**
   * Priority order of available bundlers. Defaults to attempt local first, then docker.
   *
   * @default BundlerPriority.AttemptLocal
   */
  bundlerPriority?: BundlerPriority;

  /**
   * Options passed on to esbuild.
   */
  buildOptions?: Omit<BuildOptions, 'entryPoints'>;
}

export type JavaScriptAssetProps = EsbuildAssetProps;
export type TypeScriptAssetProps = EsbuildAssetProps;

abstract class Asset<Props extends EsbuildAssetProps> extends S3Asset {
  public constructor(
    scope: Construct,
    id: string,
    {
      entryPoints: propEntryPoints,
      assetHash,
      bundlerPriority = BundlerPriority.AttemptLocal,
      copyDir,
      buildOptions: options = {},
    }: Props,
  ) {
    const entryPoints: BuildOptions['entryPoints'] =
      typeof propEntryPoints === 'string' ? [propEntryPoints] : propEntryPoints;

    const name = scope.node.path + ConstructNode.PATH_SEP + id;

    Object.values(entryPoints).forEach((entryPoint: string) => {
      if (isAbsolute(entryPoint)) {
        throw new Error(
          `${name}: Entry points must be a relative path. If you need to define an absolute path, please use \`buildOptions.absWorkingDir\` accordingly.`,
        );
      }
    });

    const absWorkingDir = options.absWorkingDir ?? process.cwd();

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
          priority: bundlerPriority,
          copyDir,
        },
      ),
    });
  }
}

/**
 * @experimental
 */
export class JavaScriptAsset extends Asset<JavaScriptAssetProps> {}

/**
 * @experimental
 */
export class TypeScriptAsset extends Asset<TypeScriptAssetProps> {}
