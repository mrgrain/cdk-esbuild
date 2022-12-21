import { Lazy, Stack } from 'aws-cdk-lib';
import { CodeConfig, InlineCode } from 'aws-cdk-lib/aws-lambda';
import { Construct, Node } from 'constructs';
import { TransformOptions, Loader } from './esbuild-types';
import { defaultPlatformProps, isEsbuildError } from './private/utils';
import { EsbuildProvider, ITransformProvider } from './provider';

/**
 * @stability stable
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
   * The esbuild Transform API implementation to be used.
   *
   * Configure the default `EsbuildProvider` for more options or
   * provide a custom `ITransformProvider` as an escape hatch.
   *
   * @stability stable
   *
   * @default new DefaultEsbuildProvider()
   */
  readonly transformProvider?: ITransformProvider;
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
          const provider = props.transformProvider ?? new EsbuildProvider();

          const transformedCode = provider.transformSync(code, {
            color: process.env.NO_COLOR ? Boolean(process.env.NO_COLOR) : undefined,
            logLevel: 'warning',
            ...(props.transformOptions || {}),
          });

          return transformedCode;
        } catch (error) {
          if (isEsbuildError(error)) {
            throw new Error(`Esbuild failed to transform ${this.constructor.name}`);
          }
          throw error;
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

function transformerProps(loader: Loader, props: TransformerProps = {}): TransformerProps {
  return {
    ...props,
    transformOptions: {
      loader,
      format: 'cjs',
      ...defaultPlatformProps(props.transformOptions),
      ...props.transformOptions,
    },
  };
}

/**
 * An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.
 *
 * @stability stable
 */
export class InlineJavaScriptCode extends BaseInlineCode {
  public constructor(
    /**
     * The inline code to be transformed.
     *
     * @stability stable
     */
    code: string,
    /**
     * Props to change the behavior of the transformer.
     *
     * Default values for `props.transformOptions`:
     * - `loader='js'`
     * - `platform=node`
     * - `target=nodeX` with X being the major node version running locally
     *
     * @see https://esbuild.github.io/api/#transform-api
     * @stability stable
     */
    props?: TransformerProps,
  ) {
    super(code, transformerProps('js', props));
  }
}


/**
 * An implementation of `lambda.InlineCode` using the esbuild Transform API. Inline function code is limited to 4 KiB after transformation.
 *
 * @stability stable
 */
export class InlineTypeScriptCode extends BaseInlineCode {
  public constructor(
    /**
     * The inline code to be transformed.
     *
     * @stability stable
     */
    code: string,
    /**
     * Props to change the behavior of the transformer.
     *
     * Default values for `transformOptions`:
     * - `loader='ts'`
     * - `platform=node`
     * - `target=nodeX` with X being the major node version running locally
     *
     * @see https://esbuild.github.io/api/#transform-api
     * @stability stable
     */
    props?: TransformerProps,
  ) {
    super(code, transformerProps('ts', props));
  }
}
