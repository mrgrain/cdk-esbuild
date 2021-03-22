import {
  BundlingOptions,
  DockerImage,
  FileSystem,
  ILocalBundling,
} from "@aws-cdk/core";
import { buildSync, BuildOptions as EsbuildOptions } from "esbuild";
import { join, normalize, resolve, posix, PlatformPath } from "path";

type MarkRequired<T, RK extends keyof T> = Exclude<T, RK> &
  Required<Pick<T, RK>>;

export type BuildOptions = MarkRequired<EsbuildOptions, "entryPoints">;

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
}

function getOutputOptions(
  cdkOutputDir: string,
  outfile?: string,
  outdir?: string,
  path: Pick<PlatformPath, "normalize" | "join"> = posix
) {
  if (outfile) {
    return {
      outdir: undefined,
      outfile: path.normalize(
        path.join(...([cdkOutputDir, outfile].filter(Boolean) as string[]))
      ),
    };
  }

  return {
    outdir: posix.normalize(
      posix.join(...([cdkOutputDir, outdir].filter(Boolean) as string[]))
    ),
    outfile: undefined,
  };
}

export class LocalBundler implements ILocalBundling {
  public constructor(
    public readonly buildOptions: BuildOptions,
    public readonly props: BundlerProps = {}
  ) {}

  tryBundle(outputDir: string, _options: BundlingOptions): boolean {
    try {
      if (this.props.copyDir) {
        FileSystem.copyDirectory(this.props.copyDir, outputDir);
      }

      buildSync({
        ...this.buildOptions,
        ...getOutputOptions(
          outputDir,
          this.buildOptions.outfile,
          this.buildOptions.outdir,
          { normalize, join }
        ),
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export class DockerBundler implements BundlingOptions {
  public get image(): DockerImage {
    return DockerImage.fromBuild(resolve(__dirname, "..", "esbuild"), {
      buildArgs: {
        version: this.props.esbuildVersion ?? "*",
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

  public readonly workingDirectory = "/asset-input";

  public readonly outputDirectory = "/asset-output";

  public readonly buildOptions: BuildOptions;

  public constructor(
    buildOptions: BuildOptions,
    public readonly props: BundlerProps = {}
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
        posix
      ),
      absWorkingDir: this.workingDirectory,
    };
  }
}
