import {
  BundlingDockerImage,
  BundlingOptions,
  ILocalBundling,
} from "@aws-cdk/core";
import { BuildOptions, buildSync } from "esbuild";
import { join } from "path";
import { esbuildVersion, findUp } from "./util";

export class LocalBundler implements ILocalBundling {
  public constructor(public readonly options: BuildOptions) {}

  tryBundle(outputDir: string, _options: BundlingOptions): boolean {
    try {
      buildSync({
        ...this.options,
        outdir: outputDir,
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
    (esbuildVersion(findUp("package-lock.json"), null)) ??
    (esbuildVersion(findUp("package.json"), null)) ??
    esbuildVersion()
  );
};

export class DockerBundler implements BundlingOptions {
  public get image(): BundlingDockerImage {
    return BundlingDockerImage.fromAsset(join(__dirname, "..", "esbuild"), {
      buildArgs: {
        version: getEsbuildVersion(),
      },
    });
  }

  public get command(): string[] {
    return [JSON.stringify(this.options)];
  }

  public readonly workingDirectory = "/asset-input";

  protected options: BuildOptions;

  public constructor(options: BuildOptions) {
    this.options = {
      ...options,
      outdir: "/asset-output",
    };
  }
}
