import { DefaultTokenResolver, StringConcat, Token, Tokenization } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BuildOptions, TransformOptions } from './esbuild-types';
import { Esbuild, EsbuildSource } from './private/esbuild-source';

export { EsbuildSource } from './private/esbuild-source';


export interface ProviderBuildOptions extends BuildOptions {
  /** Documentation: https://esbuild.github.io/api/#entry-points */
  readonly entryPoints?: string[] | Record<string, string>;
}

export interface ProviderTransformOptions extends TransformOptions {}


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
  buildSync(options: ProviderBuildOptions): void;
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
  transformSync(input: string, options?: ProviderTransformOptions): string;
}

/**
 * Provides an implementation of the esbuild Build & Transform API
 */
export interface IEsbuildProvider extends IBuildProvider, ITransformProvider {}

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
   * @default - `CDK_ESBUILD_MODULE_PATH` or package resolution (see description)
   */
  readonly esbuildModulePath?: string;
}

/**
 * Default esbuild implementation calling esbuild's JavaScript API.
 */
export class EsbuildProvider implements IBuildProvider, ITransformProvider {
  private static _fallbackProvider = new EsbuildProvider();
  private static _buildProvider: IBuildProvider;
  private static _transformationProvider: ITransformProvider;

  /**
   * Set the default implementation for both Build and Transformation API
   */
  public static overrideDefaultProvider(provider: IEsbuildProvider) {
    this.overrideDefaultBuildProvider(provider);
    this.overrideDefaultTransformationProvider(provider);
  }

  /**
   * Set the default implementation for the Build API
   */
  public static overrideDefaultBuildProvider(provider: IBuildProvider) {
    this._buildProvider = provider;
  }

  /**
   * Get the default implementation for the Build API
   */
  public static defaultBuildProvider(): IBuildProvider {
    return this._buildProvider ?? this._fallbackProvider;
  }

  /**
   * Set the default implementation for the Transformation API
   */
  public static overrideDefaultTransformationProvider(provider: ITransformProvider) {
    this._transformationProvider = provider;
  }

  /**
   * Get the default implementation for the Transformation API
   */
  public static defaultTransformationProvider(): ITransformProvider {
    return this._transformationProvider ?? this._fallbackProvider;
  }

  private readonly esbuildBinaryPath?: string;
  private readonly esbuildModulePath?: string;

  public constructor(props: EsbuildProviderProps = {}) {
    this.esbuildBinaryPath = props.esbuildBinaryPath;
    this.esbuildModulePath = props.esbuildModulePath;
  }

  public buildSync(options: ProviderBuildOptions): void {
    const esbuild = this.require(this.esbuildModulePath);
    const buildFn = this.withEsbuildBinaryPath(esbuild.buildSync, this.esbuildBinaryPath);

    buildFn(options);
  }

  public transformSync(input: string, options?: ProviderTransformOptions): string {
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
    const module = path || process.env.CDK_ESBUILD_MODULE_PATH || EsbuildSource.platformDefault() || Esbuild.name;

    return this._require(this.resolve(module));
  }

  /**
   * Wrapper for require
   */
  private _require(path: string): IBuildProvider & ITransformProvider {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(path);
  }

  /**
   * Resolve a token without context
   */
  private resolve(token: string): string {
    if (!Token.isUnresolved(token)) {
      return token;
    }

    return Tokenization.resolve(token, {
      scope: new Construct(undefined as any, ''),
      resolver: new DefaultTokenResolver(new StringConcat()),
    });
  }
}
