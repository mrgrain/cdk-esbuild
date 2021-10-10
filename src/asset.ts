import { isAbsolute } from 'path';
import { Asset as S3Asset } from '@aws-cdk/aws-s3-assets';
import { AssetHashType, Construct, ConstructNode } from '@aws-cdk/core';
import { EsbuildOptions } from './bundlers';
import { EsbuildBundling } from './bundling';
import { BuildOptions } from './esbuild-types';

export interface EsbuildProps {
  /**
   * Relative path to a directory copied to the output BEFORE esbuild is run (i.e esbuild will overwrite existing files).
   */
  readonly copyDir?: string;

  /**
   * Options passed on to esbuild.
   */
  readonly buildOptions?: BuildOptions;

  /**
   * A hash of this asset, which is available at construction time.
   *
   * As this is a plain string, it
   * can be used in construct IDs in order to enforce creation of a new resource when the content
   * hash has changed.
   */
  readonly assetHash?: string;
}

export interface EsbuildAssetProps extends EsbuildProps {
  /**
   * Relative paths to the entrypoints of your code, e.g. `src/index.ts`
   */
  readonly entryPoints: string | string[] | Record<string, string>;
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
      copyDir,
      buildOptions: options = {},
    }: Props,
  ) {
    const entryPoints: EsbuildOptions['entryPoints'] =
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
