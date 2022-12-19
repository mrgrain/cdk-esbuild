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
