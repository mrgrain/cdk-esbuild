import { isAbsolute, relative } from 'path';
import { AssetHashType, Stage } from 'aws-cdk-lib';
import { Asset as S3Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Construct, Node } from 'constructs';
import { EsbuildBundler, EntryPoints } from './bundler';
import { AssetCache, CachedAssetBundler } from './cached-bundler';
import { TypeScriptCodeProps } from './code';
import { timer } from './private/timer';


export interface TypeScriptAssetProps extends TypeScriptCodeProps {
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


/**
 * Bundles the entry points and creates a CDK asset which is uploaded to the bootstrapped CDK S3 bucket during deployment.
 *
 * The asset can be used by other constructs.
 *
 * @stability stable
 */
export class TypeScriptAsset extends S3Asset {
  /**
   * @stability stable
   */
  public constructor(
    scope: Construct,
    id: string,
    props: TypeScriptAssetProps,
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

    // Check if we can reuse a cached bundle
    const t = timer('cache freshness check');
    const cache = AssetCache.for(scope, id);
    const isCached = cache?.isFresh(absWorkingDir) ? cache : undefined;
    t.stop(isCached ? 'fresh' : 'stale');
    const bundler = isCached
      ? new CachedAssetBundler(isCached, name)
      : new EsbuildBundler(relativeEntryPoints, { ...props, buildOptions });

    super(scope, id, {
      path: absWorkingDir,
      assetHash,
      assetHashType: assetHash ? AssetHashType.CUSTOM : AssetHashType.OUTPUT,
      bundling: bundler,
    });

    if (bundler.inputFiles) {
      const data = { assetHash: this.assetHash, inputs: bundler.inputFiles };
      this.node.addMetadata('@mrgrain/cdk-esbuild:v5', data);

      const stage = Stage.of(this);
      if (stage) {
        (stage as any)._assemblyBuilder.addArtifact(`${this.node.path}.bundle`, {
          type: '@mrgrain/cdk-esbuild:v5' as any,
          properties: data,
        });
      }
    }
  }
}

