import { DynamicPackage } from './dynamic-package';

const dynamicEsbuild = new DynamicPackage('esbuild@^0.16.0');

export const Esbuild = {
  name: dynamicEsbuild.name,
  version: dynamicEsbuild.version,
  spec: dynamicEsbuild.spec,
};

export class EsbuildSource {
  private static dynamicPackage = dynamicEsbuild;

  private constructor() {}

  /**
   * `EsbuildSource.nodeJs()` for NodeJs, `EsbuildSource.auto()` for all other languages
   */
  public static platformDefault() {
    if (Boolean(process.env.JSII_AGENT)) {
      return this.auto();
    }

    return this.nodeJs();
  }

  /**
   * Try to find the module in most common paths.
   */
  public static anywhere() {
    return this.dynamicPackage.findInPaths();
  }

  /**
   * Try to find the module in common global installation paths.
   */
  public static globalPaths() {
    return this.dynamicPackage.findInGlobalPaths();
  }

  /**
   * Require module by name, do not attempt to find it anywhere else.
   */
  public static nodeJs() {
    return this.dynamicPackage.nodeJs();
  }

  /**
   * Install the module to a temporary location.
   */
  public static install() {
    return this.dynamicPackage.install();
  }

  /**
   * First try to find to module, then install it to a temporary location.
   */
  public static auto() {
    return this.dynamicPackage.auto();
  }
}
