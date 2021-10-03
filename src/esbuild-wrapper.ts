/* eslint-disable import/no-extraneous-dependencies */

function esbuild() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require('esbuild');
}

export const buildSync = esbuild().buildSync;
export const formatMessagesSync = esbuild().formatMessagesSync;
export const transformSync = esbuild().transformSync;
