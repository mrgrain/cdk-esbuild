import { existsSync, readFileSync } from "fs";
import { dirname, join, parse, resolve } from "path";

/**
 * Returns the major version of node installation
 */
export function nodeMajorVersion(): number {
  return parseInt(process.versions.node.split(".")[0], 10);
}

/**
 * Find a file by walking up parent directories
 */
export function findUp(
  name: string,
  directory: string = process.cwd()
): string | undefined {
  const absoluteDirectory = resolve(directory);

  if (existsSync(join(directory, name))) {
    return directory;
  }

  const { root } = parse(absoluteDirectory);
  if (absoluteDirectory === root) {
    return undefined;
  }

  return findUp(name, dirname(absoluteDirectory));
}

/**
 * Returns the version of esbuild installation
 */
export function esbuildVersion<T>(
  packageJsonPath = resolve(join(__dirname, "..", "package.json")),
  defaultVersion: string | T = "*"
): string | T {
  const contents = readFileSync(packageJsonPath).toString();

  try {
    const pkg: {
      dependencies?: { esbuild?: string & { version?: string } };
    } = JSON.parse(contents);

    return pkg?.dependencies?.esbuild?.version ?? pkg?.dependencies?.esbuild ?? defaultVersion
  } catch (error) {
    return defaultVersion;
  }
}
