import { DynamicPackage } from './dynamic-package';

const dynamicEsbuild = new DynamicPackage('esbuild@^0.17.0');

export const Esbuild = {
  name: dynamicEsbuild.name,
  version: dynamicEsbuild.version,
  spec: dynamicEsbuild.spec,
};

export class EsbuildSource {
  private static dynamicPackage = dynamicEsbuild;
  private static _default?: string;

  /**
   * Set the default mechanism to find the module
   */
  public static set default(path: string | undefined) {
    this._default = path;
  }

  /**
   * The current default to find the module
   */
  public static get default(): string | undefined {
    return this._default ?? this.platformDefault;
  }

  /**
   * `EsbuildSource.nodeJs` for NodeJs, `EsbuildSource.auto` for all other languages
   */
  public static get platformDefault() {
    if (Boolean(process.env.JSII_AGENT)) {
      return this.auto;
    }

    return this.nodeJs;
  }

  /**
   * Try to find the module in most common paths.
   */
  public static get anywhere() {
    return this.dynamicPackage.findInPaths();
  }

  /**
   * Try to find the module in common global installation paths.
   */
  public static get globalPaths() {
    return this.dynamicPackage.findInGlobalPaths();
  }

  /**
   * Require module by name, do not attempt to find it anywhere else.
   */
  public static get nodeJs() {
    return this.dynamicPackage.nodeJs();
  }

  /**
   * Install the module to a temporary location.
   */
  public static get install() {
    return this.dynamicPackage.install();
  }

  /**
   * First try to find to module, then install it to a temporary location.
   */
  public static get auto() {
    return this.dynamicPackage.auto();
  }
}
