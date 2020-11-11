import { isAbsolute } from "path";
import { AssetCode } from "@aws-cdk/aws-lambda";
import { AssetHashType, IAsset } from "@aws-cdk/core";
import { BuildOptions, Bundling } from "./bundling";
import { findProjectRoot, nodeMajorVersion } from "./util";

function defaultBuildOptions(options: BuildOptions = {}): BuildOptions {
  return {
    ...(!options.platform || options.platform === "node"
      ? { platform: "node", target: "node" + nodeMajorVersion() }
      : {}),
    bundle: true,
    ...options,
  };
}

export interface EsbuildAssetProps extends Partial<IAsset> {
  /**
   * The root path for the code asset. If not set, will attempt to guess the root path.
   *
   * Uses the following algorithm to detect the project root path:
   *
   * 1. In the current working directory, look for `yarn.lock`
   * 2. Return path if found, traverse up if not, continue if at root
   * 3. Go to 1) and repeat for the following files/directories in order:
   *    - `package-lock.json`
   *    - `package.json`
   *    - `.git/`
   *
   * @default - findProjectRoot()
   * @throws - When unset and path cannot be determined.
   */
  projectRoot?: string;

  /**
   * Force the asset to use Docker bundling (and skip local bundling).
   */
  forceDockerBundling?: boolean;

  /**
   * Options passed on to esbuild.
   */
  buildOptions?: Omit<BuildOptions, "entryPoints">;
}

export class JavaScriptAsset extends AssetCode {
  /**
   *
   * @param entry - Relative path to the asset code from `props.projectRoot`.
   * @param props - Asset properties.
   */
  constructor(entry: string, props: EsbuildAssetProps = {}) {
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
    } = props;

    if (!projectRoot) {
      throw new Error(
        `${
          new.target.name
        }: Cannot find project root. Please specify it with \`props.projectRoot\`.`
      );
    }

    const buildOptions = defaultBuildOptions(props.buildOptions);

    super(projectRoot, {
      assetHash,
      assetHashType: AssetHashType.OUTPUT,
      bundling: new Bundling(
        projectRoot,
        entry,
        buildOptions,
        !forceDockerBundling
      ),
    });
  }
}

export class TypeScriptAsset extends JavaScriptAsset {}
