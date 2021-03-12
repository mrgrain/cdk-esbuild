import { Asset as S3Asset } from "@aws-cdk/aws-s3-assets";
import { AssetHashType, Construct, ConstructNode, IAsset } from "@aws-cdk/core";
import { isAbsolute } from "path";
import { BuildOptions, EsbuildBundling } from "./bundling";
import { findProjectRoot } from "./util";
export interface EsbuildAssetProps extends Partial<IAsset> {
  /**
   * Relative paths to the entrypoints of your code, e.g. `src/index.ts`
   */
  entryPoints: string[];

  /**
   * The root path for the code asset. If not set, will attempt to guess the root path.
   *
   * Uses the following algorithm to detect the project root path:
   *
   * 1. From the entrypoint, look for `yarn.lock`
   * 2. Return path if found, traverse up if not, continue if at root
   * 3. Go to 1) and repeat for the following files/directories in order:
   *    - `package-lock.json`
   *    - `package.json`
   *    - `.git/`
   *
   * @default - findProjectRoot(entrypoint)
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

export type JavaScriptAssetProps = EsbuildAssetProps;
export type TypeScriptAssetProps = EsbuildAssetProps;

abstract class Asset<Props extends EsbuildAssetProps> extends S3Asset {
  public constructor(scope: Construct, id: string, props: Props) {
    const name = scope.node.path + ConstructNode.PATH_SEP + id;

    props.entryPoints.forEach((entryPoint: string) => {
      if (isAbsolute(entryPoint)) {
        throw new Error(
          `${name}: Entrypoints must be a relative path. If you need to define an absolute path, please use \`props.projectRoot\` accordingly.`
        );
      }
    });

    const {
      entryPoints,
      assetHash,
      forceDockerBundling = false,
      projectRoot = findProjectRoot(),
      buildOptions: options = {},
    } = props;

    if (!projectRoot) {
      throw new Error(
        `${name}: Cannot find project root. Please specify with \`props.projectRoot\`.`
      );
    }

    const buildOptions = {
      bundle: true,
      ...options,
    };

    super(scope, id, {
      path: projectRoot,
      assetHash,
      assetHashType: assetHash ? AssetHashType.CUSTOM : AssetHashType.OUTPUT,
      bundling: new EsbuildBundling(
        projectRoot,
        entryPoints,
        buildOptions,
        !forceDockerBundling
      ),
    });
  }
}

export class JavaScriptAsset extends Asset<JavaScriptAssetProps> {}
export class TypeScriptAsset extends Asset<TypeScriptAssetProps> {}
