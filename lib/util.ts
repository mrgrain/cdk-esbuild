import { existsSync, readFileSync } from "fs";
import { dirname, join, normalize, parse, resolve, sep } from "path";

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
 * Determine project root directory for Node.js applications.
 */
export function findProjectRoot(
  directory: string = process.cwd()
): string | undefined {
  return (
    findUp("yarn.lock", directory) ??
    findUp("package-lock.json", directory) ??
    findUp("package.json", directory) ??
    findUp(`.git${sep}`, directory)
  );
}

/**
 * Returns the version of esbuild installation
 */
export function esbuildVersion<T>(
  packageJsonPath: string,
  defaultVersion: string | T = "*"
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

/**
 * Returns the absolute version of a local path for a given base.
 */
export function getAbsolutePath(base: string, local: string) {
  return normalize(resolve(base, local));
}
