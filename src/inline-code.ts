import { InlineCode } from '@aws-cdk/aws-lambda';
import { TransformOptions, Loader, BuildFailure } from './esbuild-types';
import { transformSync } from './esbuild-wrapper';
import { printBuildMessages } from './formatMessages';

abstract class BaseInlineCode extends InlineCode {
  public constructor(
    code: string,
    loader: Loader,
    transformOptions: TransformOptions = {},
  ) {
    try {
      const transformedCode = transformSync(code, {
        loader,
        ...transformOptions,
      });
      printBuildMessages(transformedCode, { prefix: 'Transform ' });

      super(transformedCode.code);
    } catch (error) {
      printBuildMessages(error as BuildFailure, { prefix: 'Transform ' });

      throw new Error('Failed to transform InlineCode');
    }
  }
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
     * Transform options passed on to esbuild.
     *
     * Please refer to the esbuild Transform API docs for details. \
     * Default values for `transformOptions`:
     * - `loader='js'`
     *
     * @see https://esbuild.github.io/api/#transform-api
     * @stability experimental
     */
    transformOptions?: TransformOptions,
  ) {
    super(code, 'js', transformOptions);
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
     * Transform options passed on to esbuild.
     *
     * Please refer to the esbuild Transform API docs for details. \
     * Default values for `transformOptions`:
     * - `loader='jsx'`
     *
     * @see https://esbuild.github.io/api/#transform-api
     * @stability experimental
     */
    transformOptions?: TransformOptions,
  ) {
    super(code, 'jsx', transformOptions);
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
     * Transform options passed on to esbuild.
     *
     * Please refer to the esbuild Transform API docs for details. \
     * Default values for `transformOptions`:
     * - `loader='ts'`
     *
     * @see https://esbuild.github.io/api/#transform-api
     * @stability experimental
     */
    transformOptions?: TransformOptions,
  ) {
    super(code, 'ts', transformOptions);
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
     * Transform options passed on to esbuild.
     *
     * Please refer to the esbuild Transform API docs for details. \
     * Default values for `transformOptions`:
     * - `loader='tsx'`
     *
     * @see https://esbuild.github.io/api/#transform-api
     * @stability experimental
     */
    transformOptions?: TransformOptions,
  ) {
    super(code, 'tsx', transformOptions);
  }
}
