import { execFileSync } from 'child_process';
import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join, resolve } from 'path';
import { Lazy } from 'aws-cdk-lib';

export interface DynamicPackageProps {
  /**
   * If the package is installed, install into this directory
   *
   * @default - a temporary directory
   */
  readonly installPath?: string;

  /**
   * Additional paths to search for an existing package installation
   *
   * @default - a temporary directory
   */
  readonly searchPaths?: string[];
}

export class DynamicPackage {
  public readonly name: string;

  public readonly version?: string;

  public readonly installPath: string;

  public readonly searchPaths: string[];

  public get spec(): string {
    if (!this.version) {
      return this.name;
    }

    return `${this.name}@${this.version}`;
  }

  public constructor(
    /**
     * Name of the npm package
     * Version to install, or version constraint
     *
     * @default - no version constraint, install the latest version
     */
    packageSpec: string,
    props: DynamicPackageProps = {},
  ) {
    const { name, version } = this.parsePackageSpec(packageSpec);

    this.name = name;
    this.version = version;
    this.installPath =
      props.installPath ||
      mkdtempSync(join(tmpdir(), `cdk-dynamic-${this.spec}-`));
    this.searchPaths = props.searchPaths || [];
  }

  protected tryResolve(paths?: string[]): string | undefined {
    try {
      return require.resolve(this.name, paths ? { paths } : undefined);
    } catch (_) {
      return;
    }
  }

  public auto() {
    return this.tryResolve() || this.findInPaths() || this.install();
  }

  public nodeJs() {
    return this.name;
  }

  public findIn(paths: string[]) {
    return this.tryResolve([...paths].filter(Boolean) as string[]);
  }

  public findInPaths() {
    return (
      this.findInSearchPaths() ||
      this.findInLocalPaths() ||
      this.findInGlobalPaths()
    );
  }

  public findInSearchPaths() {
    return this.findIn(this.searchPaths);
  }

  public findInLocalPaths() {
    this.findIn([process.cwd(), process.env.PWD].filter(Boolean) as string[]);
  }

  public findInGlobalPaths() {
    return this.findIn([
      process.execPath,
      resolve(process.execPath, '../..'),
      resolve(process.execPath, '../../lib'),
      resolve(process.execPath, '../../node_modules'),
      resolve(process.execPath, '../../lib/node_modules'),
    ]);
  }

  private static installedPackagePath = new Map();
  public install() {
    return Lazy.string({
      produce: () => {
        if (!DynamicPackage.installedPackagePath.has(this.spec)) {
          const args = [
            'install',
            this.spec,
            '--no-save',
            '--prefix',
            this.installPath,
          ];

          DynamicPackage.log(`Dynamically installing ${this.spec} into "${this.installPath}"...`, 'info');
          execFileSync('npm', args);

          DynamicPackage.installedPackagePath.set(
            this.spec,
            require.resolve(this.name, {
              paths: [this.installPath],
            }),
          );
        }

        return DynamicPackage.installedPackagePath.get(this.spec);
      },
    });
  }

  protected static log(message: string, _level: string = 'info') {
    process.stderr.write(`⬥ ${message}\n`);
  }

  private parsePackageSpec(spec: string) {
    const hasScope = spec.startsWith('@');
    if (hasScope) {
      spec = spec.substring(1);
    }
    const [module, ...version] = spec.split('@');
    const name = hasScope ? `@${module}` : module;
    if (version.length == 0) {
      return { name };
    }

    return { name, version: version?.join('@') };
  }
}
