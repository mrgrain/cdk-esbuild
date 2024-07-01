import { IConstruct } from 'constructs';
import { BuildOptions, Platform, TransformOptions } from '../esbuild-types';

export function isEsbuildError(error: unknown): boolean {
  return !!error
  && typeof error == 'object'
  && error != null
  && 'errors' in error
  && 'warnings' in error;
}

export function nodeMajorVersion(): number {
  return parseInt(process.versions.node.split('.')[0], 10);
}

export function defaultPlatformProps(options?: BuildOptions | TransformOptions): {
  platform?: Platform;
  target?: string | string[];
  packages?: any;
} {
  if (!options?.platform || options?.platform === 'node') {
    return {
      platform: 'node',
      target: 'node' + nodeMajorVersion(),

      // Breaking change in esbuild v0.22.0 that is likely not desireable for this user base
      // @see https://github.com/evanw/esbuild/commit/196dcad1954cdd462cd41ca6bd93ca528b15c0f8
      packages: 'bundle',
    };
  }

  return {};
}

const assetIds = new WeakMap<IConstruct, number>();
export const uniqueAssetId = (scope: IConstruct, name: string) => {
  const nextId = (assetIds.get(scope) ?? 0) + 1;
  assetIds.set(scope, nextId);

  // Only one asset per scope, skip the id
  if (nextId === 1) {
    return name;
  }

  return `${name}${nextId}`;
};
