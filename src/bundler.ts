import { mkdirSync } from 'fs';
import { join, normalize, relative, resolve, posix, isAbsolute } from 'path';
import {
  BundlingOptions,
  DockerImage,
  FileSystem,
  ILocalBundling,
} from 'aws-cdk-lib';
import { BuildFailure, BuildOptions, BuildResult } from './esbuild-types';
import { buildSync } from './esbuild-wrapper';
import { printBuildMessages } from './formatMessages';

/**
 * A relative path or list or map of relative paths to the entry points of your code from the root of the project. E.g. `src/index.ts`.
 *
 * @stability stable
 */
export type EntryPoints = string | string[] | Record<string, string>;

/**
 * @stability stable
 */
export interface BundlerProps {
  /**
   * Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.
   *
   * * `buildOptions.outdir: string`
   * The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
   * For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
   * *Cannot be used together with `outfile`*.
   * * `buildOptions.outfile: string`
   * Relative path to a file inside the CDK asset output directory.
   * For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
   * *Cannot be used with multiple entryPoints or together with `outdir`.*
   * * `buildOptions.absWorkingDir: string`
   * Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
   * If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).
   *
   * @see https://esbuild.github.io/api/#build-api
   * @stability stable
   */
  readonly buildOptions?: BuildOptions;

  /**
   * Copy additional files to the code [asset staging directory](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.AssetStaging.html#absolutestagedpath), before the build runs.
   * Files copied like this will be overwritten by esbuild if they share the same name as any of the outputs.
   *
   * * When provided with a `string` or `array`, all files are copied to the root of asset staging directory.
   * * When given a `map`, the key indicates the destination relative to the asset staging directory and the value is a list of all sources to be copied.
   *
   * Therefore the following values for `copyDir` are all equivalent:
   * ```ts
   * { copyDir: "path/to/source" }
   * { copyDir: ["path/to/source"] }
   * { copyDir: { ".": "path/to/source" } }
   * { copyDir: { ".": ["path/to/source"] } }
   * ```
   * The destination cannot be outside of the asset staging directory.
   * If you are receiving the error "Cannot copy files to outside of the asset staging directory."
   * you are likely using `..` or an absolute path as key on the `copyDir` map.
   * Instead use only relative paths and avoid `..`.
   *
   * @stability stable
   */
  readonly copyDir?: string | string[] | Record<string, string | string []>;


  /**
   * Escape hatch to provide the bundler with a custom build function.
   * The function will receive the computed options from the bundler. It can use with these options as it wishes, however `outdir`/`outfile` must be respected to integrate with CDK.
   * Must throw a `BuildFailure` on failure to correctly inform the bundler.
   *
   * @stability experimental
   * @type esbuild.buildSync
   * @returns esbuild.BuildResult
   * @throws esbuild.BuildFailure
   * @default esbuild.buildSync
   */
  readonly buildFn?: any;

  /**
   * Path to the binary used by esbuild.
   *
   * This is the same as setting the ESBUILD_BINARY_PATH environment variable.
   *
   * @stability experimental
   */
  readonly esbuildBinaryPath?: string;
}

/**
 * Low-level construct that can be used where `BundlingOptions` are required.
 * This class directly interfaces with esbuild and provides almost no configuration safeguards.
 *
 * @stability experimental
 */
export class EsbuildBundler {
  /**
   * Implementation of `ILocalBundling` interface, responsible for calling esbuild functions.
   *
   * @stability experimental
   */
  public readonly local: ILocalBundling;

  /**
   * @deprecated This value is ignored since the bundler is always using a locally installed version of esbuild. However the property is required to comply with the `BundlingOptions` interface.
   *
   * @stability deprecated
   */
  public readonly image = DockerImage.fromRegistry('scratch');

  /**
   * @stability experimental
   */
  public constructor(
    /**
     * A relative path or list or map of relative paths to the entry points of your code from the root of the project.
     * E.g. `src/index.ts`.
     *
     * @stability experimental
     */
    public readonly entryPoints: EntryPoints,

    /**
     * Props to change the behaviour of the bundler.
     *
     * @stability experimental
     */
    public readonly props: BundlerProps,
  ) {
    if (props?.buildOptions?.outfile && props?.buildOptions?.outdir) {
      throw new Error('Cannot use both "outfile" and "outdir"');
    }

    const { buildFn = buildSync } = this.props;

    this.local = {
      tryBundle: (outputDir: string, _options: BundlingOptions): boolean => {

        if (this.props.copyDir) {
          const copyDir = this.getCopyDirList(this.props.copyDir);

          copyDir.forEach(([dest, src]) => {
            const srcDir = resolve(
              this.props?.buildOptions?.absWorkingDir ?? process.cwd(),
              src,
            );
            const destDir = resolve(outputDir, dest) ;

            const destToOutput = relative(outputDir, destDir);
            if (destToOutput.startsWith('..') || isAbsolute(destToOutput)) {
              throw new Error('Cannot copy files to outside of the asset staging directory. See docs for details.');
            }

            mkdirSync(destDir, { recursive: true });
            FileSystem.copyDirectory(srcDir, destDir);
          });
        }

        const originalEsbuildBinaryPath = process.env.ESBUILD_BINARY_PATH;
        if (this.props.esbuildBinaryPath) {
          process.env.ESBUILD_BINARY_PATH = this.props.esbuildBinaryPath;
        }

        try {
          const buildResult: BuildResult = buildFn({
            entryPoints,
            ...(this.props?.buildOptions || {}),
            ...this.getOutputOptions(outputDir, { normalize, join }),
          });

          printBuildMessages(buildResult, { prefix: 'Build ' });
        } catch (error) {
          printBuildMessages(error as BuildFailure, { prefix: 'Build ' });
        }

        process.env.ESBUILD_BINARY_PATH = originalEsbuildBinaryPath;

        return true;
      },
    };
  }

  private getCopyDirList(copyDir: BundlerProps['copyDir']): Array<[string, string]> {
    // Nothing to copy
    if (!copyDir) {
      return [];
    }

    // List of strings
    if (Array.isArray(copyDir)) {
      return copyDir.map((src: string) => ['.', src]);
    }

    // A map
    if (
      typeof copyDir === 'object' &&
      !Array.isArray(copyDir) &&
      copyDir !== null
    ) {
      return Object
        .entries(copyDir)
        .flatMap(([dest, sources]) => {
          if (Array.isArray(sources)) {
            return sources.map((src) => [dest, src]) as Array<[string, string]>;
          }

          return [[dest, sources]];
        });
    }

    // A single string
    return [['.', copyDir as string]];
  }

  private getOutputOptions(
    cdkOutputDir: string,
    path: Pick<typeof posix, 'normalize' | 'join'> = posix,
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
