import { BundlingOptions } from "@aws-cdk/core";
import { BuildOptions as EsbuildBuildOptions } from "esbuild";
import { DockerBundler, LocalBundler } from "./bundlers";
import { getAbsolutePath } from "./util";

export type BuildOptions = Omit<EsbuildBuildOptions, "outfile" | "outdir">;

export class EsbuildBundling extends DockerBundler implements BundlingOptions {
  public readonly local?: LocalBundler;

  public constructor(
    projectRoot: string,
    entry: string,
    options: BuildOptions,
    tryLocalBundling = true
  ) {
    super({
      ...options,
      entryPoints: [entry],
    });

    if (tryLocalBundling) {
      this.local = new LocalBundler({
        ...options,
        entryPoints: [getAbsolutePath(projectRoot, entry)],
      });
    }
  }
}
