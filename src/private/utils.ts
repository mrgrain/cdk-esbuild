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
} {
  if (!options?.platform || options?.platform === 'node') {
    return { platform: 'node', target: 'node' + nodeMajorVersion() };
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
