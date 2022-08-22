import esbuild from "esbuild";
import { cache } from "esbuild-plugin-cache";
import time from "esbuild-plugin-time";

const options = JSON.parse(process.argv.slice(2, 3));

await esbuild
  .build({
    ...options,
    plugins: [time(), cache({ directory: ".cache" })],
  })
  .catch(() => process.exit(1));
