import { join, normalize, resolve, posix, PlatformPath } from 'path';
import {
  BundlingOptions,
  DockerImage,
  FileSystem,
  ILocalBundling,
} from '@aws-cdk/core';
import { BuildFailure, BuildOptions, BuildResult } from './esbuild-types';
import { buildSync } from './esbuild-wrapper';
import { printBuildMessages } from './formatMessages';

/**
 * @experimental
 */
export type EntryPoints = string | string[] | Record<string, string>;

/**
 * @experimental
 */
export interface BundlerProps {
  /**
   * Options passed on to esbuild.
   */
  readonly buildOptions?: BuildOptions;

  /**
   * Relative path to a directory copied to the output BEFORE esbuild is run (i.e esbuild will overwrite existing files).
   */
  readonly copyDir?: string;
}

/**
 * @experimental
 */
export class EsbuildBundler {
  public readonly local: ILocalBundling;

  public readonly image = DockerImage.fromRegistry('scratch');

  public constructor(
    /**
     * Relative paths to the entrypoints of your code, e.g. `src/index.ts`
     */
    public readonly entryPoints: EntryPoints,
    public readonly props: BundlerProps,
  ) {
    if (props?.buildOptions?.outfile && props?.buildOptions?.outdir) {
      throw new Error('Cannot use both "outfile" and "outdir"');
    }

    this.local = {
      tryBundle: (outputDir: string, _options: BundlingOptions): boolean => {
        try {
          if (this.props.copyDir) {
            FileSystem.copyDirectory(
              resolve(
                this.props?.buildOptions?.absWorkingDir ?? process.cwd(),
                this.props.copyDir,
              ),
              outputDir,
            );
          }

          const buildResult: BuildResult = buildSync({
            entryPoints,
            ...(this.props?.buildOptions || {}),
            ...this.getOutputOptions(outputDir, { normalize, join }),
          });

          printBuildMessages(buildResult, { prefix: 'Build ' });
        } catch (error) {
          printBuildMessages(error as BuildFailure, { prefix: 'Build ' });
        }

        return true;
      },
    };
  }

  private getOutputOptions(
    cdkOutputDir: string,
    path: Pick<PlatformPath, 'normalize' | 'join'> = posix,
  ): BuildOptions {
    if (this.props?.buildOptions?.outfile) {
      return {
        outdir: undefined,
        outfile: path.normalize(
          path.join(
            ...([cdkOutputDir, this.props?.buildOptions?.outfile].filter(
              Boolean,
            ) as string[]),
          ),
        ),
      };
    }

    return {
      outdir: path.normalize(
        path.join(
          ...([cdkOutputDir, this.props?.buildOptions?.outdir].filter(
            Boolean,
          ) as string[]),
        ),
      ),
      outfile: undefined,
    };
  }
}
