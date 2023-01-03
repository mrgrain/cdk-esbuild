import { Project, TextFile } from 'projen';

export interface PipenvOptions {
  /**
   * Use a different path and name for the Pipfile
   *
   * @default "Pipfile"
   */
  pipfilePath?: string;

  /**
   * The Python version requirement
   *
   * @default "3"
   */
  pythonVersion?: string;
}

interface Package {
  name: string;
  constraint?: string;
}

interface Source {
  url: string;
  name: string;
  verifySsl?: boolean;
}

export interface SourceOptions {
  verifySsl?: boolean;
}

export class Pipenv extends TextFile {
  public readonly sources: {
    [name: string]: Source;
  } = {};

  public readonly packages: {
    [name: string]: Package;
  } = {};

  public readonly devPackages: {
    [name: string]: Package;
  } = {};

  public readonly requires: {
    [requirement: string]: string;
  } = {};

  public constructor(project: Project, options: PipenvOptions = {}) {
    super(project, options.pipfilePath ?? 'Pipfile', {
      marker: true,
      committed: true,
      readonly: true,
    });

    this.addSource('pypi', 'https://pypi.org/simple', {
      verifySsl: true,
    });

    this.requires.python_version = options.pythonVersion ?? '3';
  }

  public addSource(name: string, url: string, options: SourceOptions = {}) {
    this.sources[name] = { name, url, ...options };
  }

  public addPackage(pkg: string) {
    const [name, constraint] = pkg.split('@');
    const constraintNeedsQuotes = !constraint.startsWith('{') && !constraint.startsWith('"');
    this.packages[name] = { name, constraint: constraintNeedsQuotes ? `"${constraint}"`: constraint };
  }

  protected synthesizeContent(): string {
    const sources = Object.values(this.sources).map(source => [
      '[[source]]',
      `url = "${source.url}"`,
      source.verifySsl ? `verify_ssl = ${source.verifySsl ? 'true' : 'false'}` : undefined,
      `name = "${source.name}"`,
    ].join('\n'));

    const packages = [
      '[packages]',
      ...Object.values(this.packages)
        .map(renderPackage),
    ].join('\n');

    const devPackages = [
      '[dev-packages]',
      ...Object.values(this.devPackages)
        .map(renderPackage),
    ].join('\n');

    const requires = [
      '[requires]',
      ...Object.entries(this.requires)
        .map(([requirement, value]) => `${requirement} = "${value}"`),
    ].join('\n');

    return [
      ...(this.marker ? [`# ${this.marker}`] : []),
      ...sources,
      packages,
      devPackages,
      requires,
    ].join('\n\n') + '\n';
  }
}

function renderPackage(pkg: Package): string {
  return `"${pkg.name}" = ${pkg.constraint}`;
}
