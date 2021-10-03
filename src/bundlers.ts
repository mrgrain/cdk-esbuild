import { join, normalize, resolve, posix, PlatformPath } from 'path';
import {
  BundlingOptions,
  DockerImage,
  FileSystem,
  ILocalBundling,
} from '@aws-cdk/core';
import { BuildOptions as EsbuildOptions, BuildFailure, BuildResult } from './esbuild-types';
import { buildSync } from './esbuild-wrapper';
import { printBuildMessages } from './formatMessages';

type MarkRequired<T, RK extends keyof T> = Exclude<T, RK> &
Required<Pick<T, RK>>;

export type BuildOptions = MarkRequired<EsbuildOptions, 'entryPoints'>;

export enum BundlerPriority {
  /**
   * Only use the Docker bundler
   */
  DockerOnly,

  /**
   * Only use the local bundler
   */
  LocalOnly,

  /**
   * Attempts to first use the local bundler, only use Docker bundler if local fails.
   */
  AttemptLocal,
}

export interface BundlerProps {
  /**
   * Relative path to a directory copied to the output before esbuild is run (i.e esbuild will overwrite existing files).
   */
  copyDir?: string;

  /**
   * Docker build only. A npm compatible version constraint.
   *
   * If not provided will attempt to read from a `package-lock.json` or `package.json` file in the `absWorkingDir`.
   * Otherwise uses the constraint provided by this package (usually ^0.x.0).
   */
  esbuildVersion?: string;

  /**
   * Priority order of available bundlers. Defaults to attempt local first, then docker.
   *
   * @default BundlerPriority.AttemptLocal
   */
  priority?: BundlerPriority;
}

function getOutputOptions(
  cdkOutputDir: string,
  outfile?: string,
  outdir?: string,
  path: Pick<PlatformPath, 'normalize' | 'join'> = posix,
) {
  if (outfile) {
    return {
      outdir: undefined,
      outfile: path.normalize(
        path.join(...([cdkOutputDir, outfile].filter(Boolean) as string[])),
      ),
    };
  }

  return {
    outdir: posix.normalize(
      posix.join(...([cdkOutputDir, outdir].filter(Boolean) as string[])),
    ),
    outfile: undefined,
  };
}

export class LocalBundler implements ILocalBundling {
  public constructor(
    public readonly buildOptions: BuildOptions,
    public readonly props: BundlerProps = {},
  ) {}

  tryBundle(outputDir: string, _options: BundlingOptions): boolean {
    try {
      if (this.props.copyDir) {
        FileSystem.copyDirectory(
          resolve(
            this.buildOptions.absWorkingDir ?? process.cwd(),
            this.props.copyDir,
          ),
          outputDir,
        );
      }

      const buildResult: BuildResult = buildSync({
        ...this.buildOptions,
        ...getOutputOptions(
          outputDir,
          this.buildOptions.outfile,
          this.buildOptions.outdir,
          { normalize, join },
        ),
      });

      printBuildMessages(buildResult, { prefix: 'Build ' });

      return true;
    } catch (error) {
      printBuildMessages(error as BuildFailure, { prefix: 'Build ' });

      return Boolean(this.props.priority === BundlerPriority.LocalOnly);
    }
  }
}

export class DockerBundler implements BundlingOptions {
  public get image(): DockerImage {
    return DockerImage.fromBuild(resolve(__dirname, '..', 'esbuild'), {
      buildArgs: {
        version: this.props.esbuildVersion ?? '*',
      },
    });
  }

  public get command(): string[] {
    return [
      JSON.stringify({
        ...this.props,
        outputDirectory: this.outputDirectory,
        options: this.buildOptions,
      }),
    ];
  }

  public readonly workingDirectory = '/asset-input';

  public readonly outputDirectory = '/asset-output';

  public readonly buildOptions: BuildOptions;

  public constructor(
    buildOptions: BuildOptions,
    public readonly props: BundlerProps = {},
  ) {
    if (buildOptions.outfile && buildOptions.outdir) {
      throw new Error('Cannot use both "outfile" and "outdir"');
    }

    this.buildOptions = {
      ...buildOptions,
      ...getOutputOptions(
        this.outputDirectory,
        buildOptions.outfile,
        buildOptions.outdir,
        posix,
      ),
      absWorkingDir: this.workingDirectory,
    };
  }
}
