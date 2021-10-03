import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { BundlingOptions } from '@aws-cdk/core';
import {
  BuildOptions,
  BundlerPriority,
  BundlerProps,
  DockerBundler,
  LocalBundler,
} from './bundlers';

export { BundlerPriority } from './bundlers';

interface BundlingProps extends BundlerProps {}

const getEsbuildVersion = (workingDir: string): string => {
  function esbuildVersion<T>(
    packageJsonPath: string,
    defaultVersion: string | T = '*',
  ): string | T {
    try {
      const contents = readFileSync(packageJsonPath).toString();

      const pkg: {
        dependencies?: { esbuild?: string & { version?: string } };
      } = JSON.parse(contents);

      return (
        pkg?.dependencies?.esbuild?.version ??
        pkg?.dependencies?.esbuild ??
        defaultVersion
      );
    } catch (error) {
      return defaultVersion;
    }
  }

  return (
    esbuildVersion(join(workingDir, 'package-lock.json'), null) ??
    esbuildVersion(join(workingDir, 'package.json'), null) ??
    esbuildVersion(resolve(__dirname, '..', 'package.json'))
  );
};

/**
 * @experimental
 */
export class EsbuildBundling extends DockerBundler implements BundlingOptions {
  public readonly local?: LocalBundler;

  public constructor(
    buildOptions: BuildOptions,
    {
      priority = BundlerPriority.AttemptLocal,
      copyDir,
      esbuildVersion,
    }: BundlingProps = {},
  ) {
    const absWorkingDir = buildOptions.absWorkingDir ?? process.cwd();

    super(buildOptions, {
      copyDir,
      esbuildVersion: esbuildVersion ?? getEsbuildVersion(absWorkingDir),
    });

    if (priority !== BundlerPriority.DockerOnly) {
      this.local = new LocalBundler(buildOptions, {
        copyDir,
        priority,
      });
    }
  }
}
