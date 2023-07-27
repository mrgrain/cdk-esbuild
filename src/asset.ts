import { isAbsolute, relative } from 'path';
import { AssetHashType } from 'aws-cdk-lib';
import { Asset as S3Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Construct, Node } from 'constructs';
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
   * A path or list or map of paths to the entry points of your code.
   *
   * Relative paths are by default resolved from the current working directory.
   * To change the working directory, see `buildOptions.absWorkingDir`.
   *
   * Absolute paths can be used if files are part of the working directory.
   *
   * Examples:
   *  - `'src/index.ts'`
   *  - `require.resolve('./lambda')`
   *  - `['src/index.ts', 'src/util.ts']`
   *  - `{one: 'src/two.ts', two: 'src/one.ts'}`
   *
   * @stability stable
   */
  readonly entryPoints: EntryPoints;
}

type JavaScriptAssetProps = AssetProps;
type TypeScriptAssetProps = AssetProps;

/**
 * Represents a generic esbuild asset.
 *
 * You should always use `TypeScriptAsset` or `JavaScriptAsset`.
 *
 * @stability experimental
 */
class EsbuildAsset<Props extends AssetProps> extends S3Asset {
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
      buildOptions: options = {},
    } = props;
    const entryPoints: string[] | Record<string, string> =
      typeof props.entryPoints === 'string' ? [props.entryPoints] : props.entryPoints;

    const name = scope.node.path + Node.PATH_SEP + id;

    const absWorkingDir = options.absWorkingDir ?? process.cwd();

    const forceRelativeEntrypointPath = (entryPoint: string): string => {
      if (!isAbsolute(entryPoint)) {
        return entryPoint;
      }

      const relativeEntryPoint = relative(absWorkingDir, entryPoint);
      if (relativeEntryPoint.startsWith('..') || isAbsolute(relativeEntryPoint)) {
        throw new Error(
          `${name}: Entry points must be part of the working directory. See \`buildOptions.absWorkingDir\` to set a working directory different to the current one.`,
        );
      }

      return relativeEntryPoint;
    };

    const relativeEntryPoints =
      Array.isArray(entryPoints) ?
        entryPoints.map(forceRelativeEntrypointPath) :
        Object.fromEntries(
          Object.entries(entryPoints)
            .map(([out, entryPoint]) => ([out, forceRelativeEntrypointPath(entryPoint)]),
            ),
        );


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
        relativeEntryPoints,
        {
          ...props,
          buildOptions,
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
export class JavaScriptAsset extends EsbuildAsset<JavaScriptAssetProps> {}

/**
 * Bundles the entry points and creates a CDK asset which is uploaded to the bootstrapped CDK S3 bucket during deployment.
 *
 * The asset can be used by other constructs.
 *
 * @stability stable
 */
export class TypeScriptAsset extends EsbuildAsset<TypeScriptAssetProps> {}
