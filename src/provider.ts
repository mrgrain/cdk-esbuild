import { DefaultTokenResolver, StringConcat, Token, Tokenization } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BuildOptions, TransformOptions } from './esbuild-types';
import { Esbuild, EsbuildSource } from './private/esbuild-source';

export { EsbuildSource } from './private/esbuild-source';

/**
 * Provides an implementation of the esbuild Build API
 */
export interface IBuildProvider {
  /**
   * A method implementing the code build.
   *
   * During synth time, the method will receive all computed `BuildOptions` from the bundler.
   *
   * It MUST implement any output options to integrate correctly and MAY use any other options.
   * On failure, it SHOULD print any warnings & errors to stderr and throw a `BuildFailure` to inform the bundler.
   *
   * @throws `esbuild.BuildFailure`
   */
  buildSync(options: BuildOptions): void;
}

/**
 * Provides an implementation of the esbuild Transform API
 */
export interface ITransformProvider {
  /**
   * A method implementing the inline code transformation.
   *
   * During synth time, the method will receive the inline code and all computed `TransformOptions` from the bundler.
   *
   * MUST return the transformed code as a string to integrate correctly.
   * It MAY use these options to do so.
   * On failure, it SHOULD print any warnings & errors to stderr and throw a `TransformFailure` to inform the bundler.
   *
   * @throws `esbuild.TransformFailure`
   */
  transformSync(input: string, options?: TransformOptions): string;
}

/**
 * Configure the default EsbuildProvider
 */
export interface EsbuildProviderProps {
  /**
   * Path to the binary used by esbuild.
   *
   * This is the same as setting the ESBUILD_BINARY_PATH environment variable.
   *
   * @stability stable
   */
  readonly esbuildBinaryPath?: string;

  /**
   * Absolute path to the esbuild module JS file.
   *
   * E.g. "/home/user/.npm/node_modules/esbuild/lib/main.js"
   *
   * If not set, the module path will be determined in the following order:
   *
   * - Use a path from the `CDK_ESBUILD_MODULE_PATH` environment variable
   * - In TypeScript, fallback to the default Node.js package resolution mechanism
   * - All other languages (Python, Go, .NET, Java) use an automatic "best effort" resolution mechanism. \
   *   The exact algorithm of this mechanism is considered an implementation detail and should not be relied on.
   *   If `esbuild` cannot be found, it might be installed dynamically to a temporary location.
   *   To opt-out of this behavior, set either `esbuildModulePath` or `CDK_ESBUILD_MODULE_PATH` env variable.
   *
   * Use the static methods on `EsbuildSource` to customize the default behavior.
   *
   * @stability stable
   * @default - `CDK_ESBUILD_MODULE_PATH` or package resolution (see above)
   */
  readonly esbuildModulePath?: string;
}

/**
 * Default esbuild implementation calling esbuild's JavaScript API.
 */
export class EsbuildProvider implements IBuildProvider, ITransformProvider {
  private readonly esbuildBinaryPath?: string;
  private readonly esbuildModulePath?: string;

  public constructor(private readonly scope?: Construct, props: EsbuildProviderProps = {}) {
    this.esbuildBinaryPath = props.esbuildBinaryPath;
    this.esbuildModulePath = props.esbuildModulePath;
  }

  public buildSync(options: BuildOptions): void {
    const esbuild = this.require(this.esbuildModulePath);
    const buildFn = this.withEsbuildBinaryPath(esbuild.buildSync, this.esbuildBinaryPath);

    buildFn(options);
  }

  public transformSync(input: string, options?: TransformOptions): string {
    const esbuild = this.require(this.esbuildModulePath);
    const transformFn = this.withEsbuildBinaryPath(esbuild.transformSync, this.esbuildBinaryPath);

    return transformFn(input, options).code;
  }

  /**
   * Invoke a function with a specific `process.env.ESBUILD_BINARY_PATH`
   * and restore the env var afterwards.
   */
  private withEsbuildBinaryPath<T extends CallableFunction>(fn: T, esbuildBinaryPath?: string) {
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

  /**
   * Load the esbuild module according to defined rules.
   */
  private require(path?: string): IBuildProvider & ITransformProvider {
    const module = path || process.env.CDK_ESBUILD_MODULE_PATH || EsbuildSource.default || Esbuild.name;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(this.resolve(module));
  }

  /**
   * Resolve a token without context
   */
  private resolve(token: string): string {
    if (!Token.isUnresolved(token)) {
      return token;
    }

    return Tokenization.resolve(token, {
      scope: this.scope ?? new Construct(undefined as any, ''),
      resolver: new DefaultTokenResolver(new StringConcat()),
    });
  }
}
