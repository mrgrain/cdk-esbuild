import { BundlingOptions, DockerImage, ILocalBundling } from "@aws-cdk/core";
import { BuildOptions, buildSync } from "esbuild";
import { join } from "path";
import { esbuildVersion, findUp } from "./util";

export class LocalBundler implements ILocalBundling {
  public constructor(public readonly options: BuildOptions) {}

  tryBundle(outputDir: string, _options: BundlingOptions): boolean {
    try {
      const outdir = join(
        ...([outputDir, this.options.outdir].filter(Boolean) as string[])
      );
      buildSync({
        ...this.options,
        outdir,
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

const getEsbuildVersion = (): string => {
  return (
    esbuildVersion(findUp("package-lock.json"), null) ??
    esbuildVersion(findUp("package.json"), null) ??
    esbuildVersion()
  );
};

export class DockerBundler implements BundlingOptions {
  public get image(): DockerImage {
    return DockerImage.fromBuild(join(__dirname, "..", "esbuild"), {
      buildArgs: {
        version: getEsbuildVersion(),
      },
    });
  }

  public get command(): string[] {
    return [JSON.stringify(this.options)];
  }

  public readonly workingDirectory = "/asset-input";

  public readonly options: BuildOptions;

  public constructor(options: BuildOptions) {
    const outdir = ["/asset-output", options.outdir].filter(Boolean).join("/");

    this.options = {
      ...options,
      outdir,
    };
  }
}
