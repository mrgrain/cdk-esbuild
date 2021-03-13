import {
  BundlingOptions,
  DockerImage,
  FileSystem,
  ILocalBundling,
} from "@aws-cdk/core";
import { buildSync, BuildOptions as EsbuildOptions } from "esbuild";
import { join, resolve } from "path";
import { esbuildVersion, findUp } from "./util";

export type BuildOptions = Omit<EsbuildOptions, "outfile" | "entryPoints"> &
  Required<Pick<EsbuildOptions, "entryPoints">>;

export interface BundlerProps {
  copyDir?: string;

  esbuildVersion?: string;
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

      const bundleOutdir = join(
        ...([outputDir, this.buildOptions.outdir].filter(Boolean) as string[])
      );

      buildSync({
        ...this.buildOptions,
        outdir: bundleOutdir,
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
        options: this.options,
      }),
    ];
  }

  public readonly workingDirectory = "/asset-input";

  public readonly outputDirectory = "/asset-output";

  public readonly options: BuildOptions;

  public constructor(
    options: BuildOptions,
    public readonly props: BundlerProps = {}
  ) {
    const outdir = [this.outputDirectory, options.outdir]
      .filter(Boolean)
      .join("/");

    this.options = {
      ...options,
      absWorkingDir: this.workingDirectory,
      outdir,
    };
  }
}
