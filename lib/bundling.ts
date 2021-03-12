import { BundlingOptions } from "@aws-cdk/core";
import { BuildOptions as EsbuildBuildOptions } from "esbuild";
import { DockerBundler, LocalBundler } from "./bundlers";
import { getAbsolutePath } from "./util";

export type BuildOptions = Omit<EsbuildBuildOptions, "outfile">;

export class EsbuildBundling extends DockerBundler implements BundlingOptions {
  public readonly local?: LocalBundler;

  public constructor(
    projectRoot: string,
    entryPoints: string[],
    options: BuildOptions,
    tryLocalBundling = true
  ) {
    super({
      ...options,
      entryPoints,
    });

    if (tryLocalBundling) {
      this.local = new LocalBundler({
        ...options,
        entryPoints: entryPoints.map((entryPoint) =>
          getAbsolutePath(projectRoot, entryPoint)
        ),
      });
    }
  }
}
