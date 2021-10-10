import { join, normalize, resolve, posix, PlatformPath } from 'path';
import {
  BundlingOptions,
  FileSystem,
  ILocalBundling,
} from '@aws-cdk/core';
import { BuildOptions, BuildFailure, BuildResult } from './esbuild-types';
import { buildSync } from './esbuild-wrapper';
import { printBuildMessages } from './formatMessages';

export interface EsbuildOptions extends BuildOptions {
  readonly entryPoints: string[] | Record<string, string>;
}

export interface EsbuildBundlingProps {
  /**
   * Relative path to a directory copied to the output before esbuild is run (i.e esbuild will overwrite existing files).
   */
  readonly copyDir?: string;
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
    public readonly buildOptions: EsbuildOptions,
    public readonly props: EsbuildBundlingProps = {},
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
    } catch (error) {
      printBuildMessages(error as BuildFailure, { prefix: 'Build ' });
    }

    return true;
  }
}