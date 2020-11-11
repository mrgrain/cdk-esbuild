import { sep } from "path";
import { AssetCode } from "@aws-cdk/aws-lambda";
import { AssetHashType, IAsset } from "@aws-cdk/core";
import { BuildOptions, Bundling } from "./bundling";
import { findUp, nodeMajorVersion } from "./util";

export interface EsbuildAssetOptions extends Partial<IAsset> {
  projectRoot?: string;
  forceDockerBundling?: boolean;
  buildOptions?: Omit<BuildOptions, "entryPoints">;
}

export class JavaScriptAsset extends AssetCode {
  public constructor(
    entry: string,
    {
      assetHash,
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
      assetHashType: AssetHashType.OUTPUT,
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
