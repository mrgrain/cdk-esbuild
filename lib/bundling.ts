import { BundlingOptions } from "@aws-cdk/core";
import { BuildOptions as EsbuildBuildOptions } from "esbuild";
import { DockerBundler, LocalBundler } from "./bundlers";

export type BuildOptions = Omit<EsbuildBuildOptions, "outfile" | "outdir">;

export class Bundling extends DockerBundler implements BundlingOptions {
  public readonly local?: LocalBundler;

  public constructor(options: BuildOptions, tryLocalBundling = true) {
    super(options);

    if (tryLocalBundling) {
      this.local = new LocalBundler(options);
    }
  }
}
