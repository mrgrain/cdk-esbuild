import { isAbsolute } from "path";
import { AssetCode } from "@aws-cdk/aws-lambda";
import { AssetHashType } from "@aws-cdk/core";
import { BuildOptions, EsbuildBundling } from "./bundling";
import { findProjectRoot, nodeMajorVersion } from "./util";
import { EsbuildAssetProps } from "./asset";

function mergeWithDefaultBuildOptions(
  options: BuildOptions = {}
): BuildOptions {
  return {
    ...(!options.platform || options.platform === "node"
      ? { platform: "node", target: "node" + nodeMajorVersion() }
      : {}),
    bundle: true,
    ...options,
  };
}

type CodeProps = Omit<EsbuildAssetProps, "entrypoint">;

export type JavaScriptAssetProps = CodeProps;
export type TypeScriptAssetProps = CodeProps;

abstract class Code<Props extends CodeProps> extends AssetCode {
  /**
   *
   * @param entry - Relative path to the asset code from `props.projectRoot`.
   * @param props - Asset properties.
   */
  constructor(entry: string, props?: Props) {
    if (isAbsolute(entry)) {
      throw new Error(
        `${
          new.target.name
        }: Entry must be a relative path. If you need to define an absolute path, set \`props.projectRoot\` accordingly.`
      );
    }

    const {
      assetHash,
      forceDockerBundling = false,
      projectRoot = findProjectRoot(),
      buildOptions: incomingBuildOptions,
    } = props || {};

    if (!projectRoot) {
      throw new Error(
        `${
          new.target.name
        }: Cannot find project root. Please specify it with \`props.projectRoot\`.`
      );
    }

    const buildOptions = mergeWithDefaultBuildOptions(incomingBuildOptions);

    super(projectRoot, {
      assetHash,
      assetHashType: assetHash ? AssetHashType.CUSTOM : AssetHashType.OUTPUT,
      bundling: new EsbuildBundling(
        projectRoot,
        entry,
        buildOptions,
        !forceDockerBundling
      ),
    });
  }
}

export class JavaScriptCode extends Code<JavaScriptAssetProps> {}
export class TypeScriptCode extends Code<TypeScriptAssetProps> {}
