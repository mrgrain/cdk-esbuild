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
 * @experimental
 */
export class InlineJavaScriptCode extends BaseInlineCode {
  public constructor(code: string, transformOptions?: TransformOptions) {
    super(code, 'js', transformOptions);
  }
}

/**
 * @experimental
 */
export class InlineJsxCode extends BaseInlineCode {
  public constructor(code: string, transformOptions?: TransformOptions) {
    super(code, 'jsx', transformOptions);
  }
}

/**
 * @experimental
 */
export class InlineTypeScriptCode extends BaseInlineCode {
  public constructor(code: string, transformOptions?: TransformOptions) {
    super(code, 'ts', transformOptions);
  }
}

/**
 * @experimental
 */
export class InlineTsxCode extends BaseInlineCode {
  public constructor(code: string, transformOptions?: TransformOptions) {
    super(code, 'tsx', transformOptions);
  }
}
