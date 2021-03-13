import { BundlingOptions } from "@aws-cdk/core";
import { join, resolve } from "path";
import {
  BuildOptions,
  BundlerProps,
  DockerBundler,
  LocalBundler,
} from "./bundlers";
import { esbuildVersion, getAbsolutePath } from "./util";

interface BundlingProps extends BundlerProps {
  /**
   * Use local bundling over Docker bundling.
   *
   * @default true
   */
  localBundling?: boolean;
}

const getEsbuildVersion = (projectRoot: string): string => {
  return (
    esbuildVersion(join(projectRoot, "package-lock.json"), null) ??
    esbuildVersion(join(projectRoot, "package.json"), null) ??
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
      this.local = new LocalBundler(
        {
          ...buildOptions,
          entryPoints: this.options.entryPoints.map((entryPoint: string) =>
            getAbsolutePath(absWorkingDir, entryPoint)
          ),
        },
        {
          copyDir: copyDir
            ? getAbsolutePath(absWorkingDir, copyDir)
            : undefined,
        }
      );
    }
  }
}
