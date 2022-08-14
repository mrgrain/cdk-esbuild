import { analyzeMetafileSync, buildSync, transformSync, version } from './esbuild-types';

export function esbuild(modulePath: string = 'esbuild'): {
  buildSync: typeof buildSync;
  transformSync: typeof transformSync;
  analyzeMetafileSync: typeof analyzeMetafileSync;
  version: typeof version;
} {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require(modulePath);
}

export function wrapWithEsbuildBinaryPath<T extends CallableFunction>(fn: T, esbuildBinaryPath?: string) {
  if (!esbuildBinaryPath) {
    return fn;
  }

  return (...args: unknown[]) => {
    const originalEsbuildBinaryPath = process.env.ESBUILD_BINARY_PATH;
    if (esbuildBinaryPath) {
      process.env.ESBUILD_BINARY_PATH = esbuildBinaryPath;
    }

    const result = fn(...args);

    /**
     * only reset `ESBUILD_BINARY_PATH` if it was explicitly set via the construct props
     * since `esbuild` itself sometimes sets it (eg. when running in yarn 2 plug&play)
     */
    if (esbuildBinaryPath) {
      process.env.ESBUILD_BINARY_PATH = originalEsbuildBinaryPath;
    }

    return result;
  };
}

export function detectEsbuildModulePath(esbuildBinaryPath?: string) {
  return esbuildBinaryPath || process.env.CDK_ESBUILD_MODULE_PATH || 'esbuild';
}
