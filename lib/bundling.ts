import { BundlingOptions } from "@aws-cdk/core";
import { readFileSync } from "fs";
import { join, resolve } from "path";
import {
  BuildOptions,
  BundlerProps,
  DockerBundler,
  LocalBundler,
} from "./bundlers";

interface BundlingProps extends BundlerProps {
  /**
   * Use local bundling over Docker bundling.
   *
   * @default true
   */
  localBundling?: boolean;
}

const getEsbuildVersion = (workingDir: string): string => {
  function esbuildVersion<T>(
    packageJsonPath: string,
    defaultVersion: string | T = "*"
  ): string | T {
    try {
      const contents = readFileSync(packageJsonPath).toString();

      const pkg: {
        dependencies?: { esbuild?: string & { version?: string } };
      } = JSON.parse(contents);

      return (
        pkg?.dependencies?.esbuild?.version ??
        pkg?.dependencies?.esbuild ??
        defaultVersion
      );
    } catch (error) {
      return defaultVersion;
    }
  }

  return (
    esbuildVersion(join(workingDir, "package-lock.json"), null) ??
    esbuildVersion(join(workingDir, "package.json"), null) ??
    esbuildVersion(resolve(__dirname, "..", "package.json"))
  );
};

export class EsbuildBundling extends DockerBundler implements BundlingOptions {
  public readonly local?: LocalBundler;

  public constructor(
    buildOptions: BuildOptions,
    { localBundling = true, copyDir, esbuildVersion }: BundlingProps
  ) {
    const absWorkingDir = buildOptions.absWorkingDir ?? process.cwd();

    super(buildOptions, {
      copyDir,
      esbuildVersion: esbuildVersion ?? getEsbuildVersion(absWorkingDir),
    });

    if (localBundling) {
      this.local = new LocalBundler(buildOptions, {
        copyDir,
      });
    }
  }
}
