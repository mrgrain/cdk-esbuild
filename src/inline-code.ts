import { Lazy, Stack } from 'aws-cdk-lib';
import { CodeConfig, InlineCode } from 'aws-cdk-lib/aws-lambda';
import { Construct, Node } from 'constructs';
import { EsbuildProvider } from './esbuild-provider';
import { TransformOptions, Loader } from './esbuild-types';
import { errorHasCode } from './utils';

/**
 * @stability experimental
 */
export interface TransformerProps {
  /**
   * Transform options passed on to esbuild. Please refer to the esbuild Transform API docs for details.
   *
   * @see https://esbuild.github.io/api/#transform-api
   * @stability stable
   */
  readonly transformOptions?: TransformOptions;

  /**
   * Escape hatch to provide the bundler with a custom transform function.
   * The function will receive the computed options from the bundler. It can use with these options as it wishes, however a TransformResult must be returned to integrate with CDK.
   * Must throw a `TransformFailure` on failure to correctly inform the bundler.
   *
   * @stability experimental
   * @type esbuild.transformSync
   * @returns esbuild.TransformResult
   * @throws esbuild.TransformFailure
   * @default `esbuild.transformSync`
   */
  readonly transformFn?: any;

  /**
   * Path to the binary used by esbuild.
   *
   * This is the same as setting the ESBUILD_BINARY_PATH environment variable.
   *
   * @stability experimental
   */
  readonly esbuildBinaryPath?: string;

  /**
   * Absolute path to the esbuild module JS file.
   *
   * @example "/home/user/.npm/node_modules/esbuild/lib/main.js"
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
   * @stability experimental
   * @default - `CDK_ESBUILD_MODULE_PATH` or package resolution (see above)
   */
  readonly esbuildModulePath?: string;
}

abstract class BaseInlineCode extends InlineCode {
  public readonly isInline = true;
  private readonly inlineCode: string;

  public constructor(
    code: string,
    props: TransformerProps,
  ) {
    super(code);

    this.inlineCode = Lazy.string({
      produce: () => {
        try {
          const transformFn = props.transformFn ?? EsbuildProvider.require(props.esbuildModulePath).transformSync;
          const transformSync = EsbuildProvider.withEsbuildBinaryPath(transformFn, props.esbuildBinaryPath);

          const transformedCode = transformSync(code, {
            color: process.env.NO_COLOR ? Boolean(process.env.NO_COLOR) : undefined,
            logLevel: 'warning',
            ...(props.transformOptions || {}),
          });

          return transformedCode.code;
        } catch (error) {
          if (errorHasCode(error, 'MODULE_NOT_FOUND')) {
            throw error;
          }
          throw new Error(`Failed to transform ${this.constructor.name}`);
        }
      },
    });
  }

  public bind(scope: Construct): CodeConfig {
    const name = scope.node.path + Node.PATH_SEP + this.constructor.name;
    process.stderr.write(`Transforming inline code ${name}...\n`);

    return {
      inlineCode: Stack.of(scope).resolve(this.inlineCode),
    };
  }
}

function instanceOfTransformerProps(object: any): object is TransformerProps {
  return [
    'transformOptions',
    'transformFn',
    'esbuildBinaryPath',
    'esbuildModulePath',
  ].reduce(
    (isTransformerProps: boolean, propToCheck: string): boolean =>
      (isTransformerProps || (propToCheck in object)),
    false,
  );
}

function transformerProps(loader: Loader, props?: TransformerProps | TransformOptions): TransformerProps {
  if (!props) {
    return { transformOptions: { loader } };
  }

  if (!instanceOfTransformerProps(props) ) {
    return { transformOptions: { loader, ...props } };
  }

  return {
    ...props,
    transformOptions: {
      loader,
      ...props.transformOptions,
    },
  };
}


/**
 * An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.
 *
 * @stability experimental
 */
export class InlineJavaScriptCode extends BaseInlineCode {
  public constructor(
    /**
     * The inline code to be transformed.
     *
     * @stability experimental
     */
    code: string,
    /**
     * Support for `TransformOptions` is deprecated. Please provide `TransformerProps`!
     *
     * Props to change the behaviour of the transformer.
     *
     * Default values for `props.transformOptions`:
     * - `loader='js'`
     *
     * @see https://esbuild.github.io/api/#transform-api
     * @stability experimental
     */
    props?: TransformerProps | TransformOptions,
  ) {

    super(code, transformerProps('js', props));
  }
}

/**
 * An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.
 *
 * @stability experimental
 */
export class InlineJsxCode extends BaseInlineCode {
  public constructor(
    /**
     * The inline code to be transformed.
     *
     * @stability experimental
     */
    code: string,
    /**
     * Support for `TransformOptions` is deprecated. Please provide `TransformerProps`!
     *
     * Props to change the behaviour of the transformer.
     *
     * Default values for `transformOptions`:
     * - `loader='jsx'`
     *
     * @see https://esbuild.github.io/api/#transform-api
     * @stability experimental
     */
    props?: TransformerProps | TransformOptions,
  ) {
    super(code, transformerProps('jsx', props));
  }
}

/**
 * An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.
 *
 * @stability experimental
 */
export class InlineTypeScriptCode extends BaseInlineCode {
  public constructor(
    /**
     * The inline code to be transformed.
     *
     * @stability experimental
     */
    code: string,
    /**
     * Support for `TransformOptions` is deprecated. Please provide `TransformerProps`!
     *
     * Props to change the behaviour of the transformer.
     *
     * Default values for `transformOptions`:
     * - `loader='ts'`
     *
     * @see https://esbuild.github.io/api/#transform-api
     * @stability experimental
     */
    props?: TransformerProps | TransformOptions,
  ) {
    super(code, transformerProps('ts', props));
  }
}

/**
 * An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.
 *
 * @stability experimental
 */
export class InlineTsxCode extends BaseInlineCode {
  public constructor(
    /**
     * The inline code to be transformed.
     *
     * @stability experimental
     */
    code: string,
    /**
     * Support for `TransformOptions` is deprecated. Please provide `TransformerProps`!
     *
     * Props to change the behaviour of the transformer.
     *
     * Default values for `transformOptions`:
     * - `loader='tsx'`
     *
     * @see https://esbuild.github.io/api/#transform-api
     * @stability experimental
     */
    props?: TransformerProps | TransformOptions,
  ) {
    super(code, transformerProps('tsx', props));
  }
}
