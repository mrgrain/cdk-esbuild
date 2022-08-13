/* eslint-disable import/no-extraneous-dependencies */

function esbuild() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require('esbuild');
}

export const buildSync = esbuild().buildSync;
export const transformSync = esbuild().transformSync;

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