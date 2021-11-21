import { InlineCode } from '@aws-cdk/aws-lambda';
import { TransformOptions, Loader, TransformFailure } from './esbuild-types';
import { transformSync } from './esbuild-wrapper';
import { printBuildMessages } from './formatMessages';

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
   * @default esbuild.transformSync
   */
  readonly transformFn?: any;
}

abstract class BaseInlineCode extends InlineCode {
  public constructor(
    code: string,
    props: TransformerProps,
  ) {

    const { transformFn = transformSync, transformOptions = {} } = props;

    try {
      const transformedCode = transformFn(code, {
        ...transformOptions,
      });
      printBuildMessages(transformedCode, { prefix: 'Transform ' });

      super(transformedCode.code);
    } catch (error) {
      printBuildMessages(error as TransformFailure, { prefix: 'Transform ' });

      throw new Error('Failed to transform InlineCode');
    }
  }
}

function instanceOfTransformerProps(object: any): object is TransformerProps {
  return 'transformOptions' in object || 'transformFn' in object;
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
