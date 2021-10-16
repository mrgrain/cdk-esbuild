import { isAbsolute } from 'path';
import { Asset as S3Asset } from '@aws-cdk/aws-s3-assets';
import { AssetHashType, Construct, ConstructNode } from '@aws-cdk/core';
import { EsbuildBundler, BundlerProps, EntryPoints } from './bundler';

export interface AssetBaseProps extends BundlerProps {
  /**
   * A hash of this asset, which is available at construction time.
   *
   * As this is a plain string, it
   * can be used in construct IDs in order to enforce creation of a new resource when the content
   * hash has changed.
   */
  readonly assetHash?: string;
}

export interface AssetProps extends AssetBaseProps {
  /**
   * Relative paths to the entrypoints of your code, e.g. `src/index.ts`
   */
  readonly entryPoints: EntryPoints;
}

type JavaScriptAssetProps = AssetProps;
type TypeScriptAssetProps = AssetProps;

abstract class Asset<Props extends AssetProps> extends S3Asset {
  public constructor(
    scope: Construct,
    id: string,
    props: Props,
  ) {
    const {
      assetHash,
      copyDir,
      buildOptions: options = {},
    } = props;
    const entryPoints: string[] | Record<string, string> =
      typeof props.entryPoints === 'string' ? [props.entryPoints] : props.entryPoints;

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
      bundling: new EsbuildBundler(
        entryPoints,
        {
          buildOptions,
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
