import { createHash } from 'crypto';
import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import {
  DockerImage,
  FileSystem,
  ILocalBundling,
  Stage,
} from 'aws-cdk-lib';
import { Construct, Node } from 'constructs';
import { timer } from './private/timer';

/**
 * Cached bundle data from a previous build.
 * @internal
 */
export interface BundlingCache {
  readonly assetHash: string;
  readonly inputs: Record<string, string>;
}

/**
 * Reads and validates cached bundle state from a previous cloud assembly.
 * @internal
 */
export class AssetCache {
  private static manifestCache = new Map<string, any>();

  private static readManifest(outdir: string): any | undefined {
    if (this.manifestCache.has(outdir)) return this.manifestCache.get(outdir);
    const manifestPath = join(outdir, 'manifest.json');
    if (!existsSync(manifestPath)) return undefined;
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    this.manifestCache.set(outdir, manifest);
    return manifest;
  }

  /**
   * Attempt to load a cached bundle for the given scope and id.
   */
  static for(scope: Construct, id: string): AssetCache | undefined {
    try {
      const stage = Stage.of(scope);
      if (!stage) return undefined;

      const manifest = this.readManifest(stage.outdir);
      if (!manifest) return undefined;
      const artifactId = `${scope.node.path}${Node.PATH_SEP}${id}.bundle`;
      const artifact = manifest.artifacts?.[artifactId];

      if (artifact?.type === '@mrgrain/cdk-esbuild:v5' && artifact.properties?.assetHash && artifact.properties?.inputs) {
        return new AssetCache(stage.outdir, {
          assetHash: artifact.properties.assetHash,
          inputs: artifact.properties.inputs,
        });
      }
    } catch {
      // No previous manifest or parse error — skip cache
    }
    return undefined;
  }

  private constructor(
    public readonly outdir: string,
    public readonly bundle: BundlingCache,
  ) {}

  /**
   * Check if the cached bundle is still fresh by comparing input file hashes.
   */
  isFresh(absWorkingDir: string): boolean {
    if (process.env.CDK_DEBUG || process.env.SKIP_CACHE) return false;

    const previousOutputDir = resolve(this.outdir, `asset.${this.bundle.assetHash}`);
    if (!existsSync(previousOutputDir)) return false;

    return Object.entries(this.bundle.inputs).every(([file, hash]) => {
      try {
        return createHash('sha256').update(readFileSync(resolve(absWorkingDir, file))).digest('hex') === hash;
      } catch {
        return false;
      }
    });
  }
}

/**
 * A bundler that reuses a previous build output.
 * @internal
 */
export class CachedAssetBundler {
  public readonly local: ILocalBundling;
  public readonly image = DockerImage.fromRegistry('scratch');
  public readonly inputFiles: Record<string, string>;

  constructor(private readonly cache: AssetCache, private readonly assetPath: string) {
    this.inputFiles = cache.bundle.inputs;
    this.local = {
      tryBundle: (outputDir: string): boolean => {
        const t = timer('cached bundling');
        process.stderr.write(`Reusing cached asset ${this.assetPath}...\n`);
        const previousOutputDir = resolve(this.cache.outdir, `asset.${this.cache.bundle.assetHash}`);
        if (resolve(previousOutputDir) !== resolve(outputDir)) {
          FileSystem.copyDirectory(previousOutputDir, outputDir);
        }
        t.stop();
        return true;
      },
    };
  }
}
