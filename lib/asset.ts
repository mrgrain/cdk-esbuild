import { sep } from "path";
import { AssetCode } from "@aws-cdk/aws-lambda";
import { AssetOptions } from "@aws-cdk/core";
import { BuildOptions, Bundling } from "./bundling";
import { findUp, nodeMajorVersion } from "./util";

export interface EsbuildAssetOptions extends Omit<AssetOptions, "bundling"> {
  projectRoot?: string;
  forceDockerBundling?: boolean;
  buildOptions?: Omit<BuildOptions, "entryPoints">;
}

export class JavascriptAsset extends AssetCode {
  public constructor(
    entry: string,
    {
      assetHash,
      assetHashType,
      forceDockerBundling = false,
      projectRoot = findUp(`.git${sep}`) ??
        findUp("yarn.lock") ??
        findUp("package-lock.json") ??
        findUp("package.json"),
      buildOptions = {
        platform: "node",
        target: "node" + nodeMajorVersion(),
        bundle: true,
      },
    }: EsbuildAssetOptions = {}
  ) {
    if (!projectRoot) {
      throw new Error(
        "Cannot find project root. Please specify it with `projectRoot`."
      );
    }

    super(projectRoot, {
      assetHash,
      assetHashType,
      bundling: new Bundling(
        {
          ...buildOptions,
          entryPoints: [entry],
        },
        !forceDockerBundling
      ),
    });
  }
}
