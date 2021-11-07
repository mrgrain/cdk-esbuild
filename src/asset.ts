import { isAbsolute } from 'path';
import { Asset as S3Asset } from '@aws-cdk/aws-s3-assets';
import { AssetHashType, Construct, ConstructNode } from '@aws-cdk/core';
import { EsbuildBundler, BundlerProps, EntryPoints } from './bundler';

/**
 * @internal
 */
export interface AssetBaseProps extends BundlerProps {
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

export interface AssetProps extends AssetBaseProps {
  /**
   * A relative path or list or map of relative paths to the entry points of your code from the root of the project. E.g. `src/index.ts`.
   *
   * @stability stable
   */
  readonly entryPoints: EntryPoints;
}

type JavaScriptAssetProps = AssetProps;
type TypeScriptAssetProps = AssetProps;

/**
 * @stability stable
 */
abstract class Asset<Props extends AssetProps> extends S3Asset {
  /**
   * @stability stable
   */
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
 * Bundles the entry points and creates a CDK asset which is uploaded to the bootstrapped CDK S3 bucket during deployment.
 *
 * The asset can be used by other constructs.
 *
 * @stability stable
 */
export class JavaScriptAsset extends Asset<JavaScriptAssetProps> {}

/**
 * Bundles the entry points and creates a CDK asset which is uploaded to the bootstrapped CDK S3 bucket during deployment.
 *
 * The asset can be used by other constructs.
 *
 * @stability stable
 */
export class TypeScriptAsset extends Asset<TypeScriptAssetProps> {}
