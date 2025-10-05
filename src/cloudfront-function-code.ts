import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { FunctionCode } from 'aws-cdk-lib/aws-cloudfront';
import { EsbuildBundler } from './bundler';
import { BuildOptions } from './esbuild-types';
import { TransformerProps } from './inline-code';
import { EsbuildProvider, IBuildProvider, ProviderTransformOptions } from './provider';

/**
 * CloudFront Functions JavaScript runtime environment version.
 *
 * @stability stable
 */
export class CloudFrontFunctionRuntime {
  public readonly value: string;

  /**
   * cloudfront-js-1.0 - limited ES6 support, no const/let, no async/await
   */
  public static readonly JS_1_0 = new CloudFrontFunctionRuntime('cloudfront-js-1.0');

  /**
   * cloudfront-js-2.0 - enhanced ES6 support, const/let and async/await supported
   */
  public static readonly JS_2_0 = new CloudFrontFunctionRuntime('cloudfront-js-2.0');

  private constructor(value: string) {
    this.value = value;
  }
}

/**
 * Properties for CloudFront Function TypeScript code.
 *
 * @stability stable
 */
export interface CloudFrontFunctionCodeProps {
  /**
   * CloudFront Functions JavaScript runtime environment version to build for.
   *
   * @default CloudFrontFunctionRuntime.JS_1_0
   */
  readonly runtime?: CloudFrontFunctionRuntime;

  /**
   * Build options passed on to esbuild. Please refer to the esbuild Build API docs for details.
   *
   * * `buildOptions.outdir: string`
   * The actual path for the output directory is defined by CDK. However setting this option allows to write files into a subdirectory. \
   * For example `{ outdir: 'js' }` will create an asset with a single directory called `js`, which contains all built files. This approach can be useful for static website deployments, where JavaScript code should be placed into a subdirectory. \
   * *Cannot be used together with `outfile`*.
   * * `buildOptions.outfile: string`
   * Relative path to a file inside the CDK asset output directory.
   * For example `{ outfile: 'js/index.js' }` will create an asset with a single directory called `js`, which contains a single file `index.js`. This can be useful to rename the entry point. \
   * *Cannot be used with multiple entryPoints or together with `outdir`.*
   * * `buildOptions.absWorkingDir: string`
   * Absolute path to the [esbuild working directory](https://esbuild.github.io/api/#working-directory) and defaults to the [current working directory](https://en.wikipedia.org/wiki/Working_directory). \
   * If paths cannot be found, a good starting point is to look at the concatenation of `absWorkingDir + entryPoint`. It must always be a valid absolute path pointing to the entry point. When needed, the probably easiest way to set absWorkingDir is to use a combination of `resolve` and `__dirname` (see "Library authors" section in the documentation).
   *
   * @see https://esbuild.github.io/api/#build-api
   * @stability stable
   */
  readonly buildOptions?: BuildOptions;

  /**
   * The esbuild Build API implementation to be used.
   *
   * Configure the default `EsbuildProvider` for more options or
   * provide a custom `IBuildProvider` as an escape hatch.
   *
   * @stability stable
   *
   * @default new EsbuildProvider()
   */
  readonly buildProvider?: IBuildProvider;
}
/**
 * Properties for CloudFront Function inline code.
 *
 * @stability stable
 */
export interface CloudFrontFunctionInlineCodeProps extends TransformerProps {
  /**
   * CloudFront Functions JavaScript runtime environment version to build for.
   *
   * @default CloudFrontFunctionRuntime.JS_1_0
   */
  readonly runtime?: CloudFrontFunctionRuntime;
}


/**
 * TypeScript code for CloudFront Functions.
 *
 * @stability stable
 */
export class CloudFrontTypeScriptCode {
  /**
   * Create CloudFront Function code from a TypeScript file.
   */
  static fromFile(entryPoint: string, props: CloudFrontFunctionCodeProps = {}): FunctionCode {
    return new EsbuildFunctionCode(entryPoint, props);
  }

  /**
   * Create CloudFront Function code from inline TypeScript code.
   */
  static fromInline(code: string, props: CloudFrontFunctionInlineCodeProps = {}): FunctionCode {
    return new InlineEsbuildFunctionCode(code, props);
  }
}

/**
 * @internal
 */
class EsbuildFunctionCode extends FunctionCode {
  private readonly bundler: EsbuildBundler;
  private readonly entryPoint: string;
  private bundledCode?: string;

  constructor(entryPoint: string, props: CloudFrontFunctionCodeProps) {
    super();

    const runtimeVersion = props.runtime ?? CloudFrontFunctionRuntime.JS_1_0;

    const buildOptions: BuildOptions = {
      // defaults
      bundle: true,
      // custom
      ...props.buildOptions,
      // forced
      outfile: 'handler.js',
      format: 'esm',
      target: 'es5',
      platform: 'neutral',
      treeShaking: false, // required because `export` keywords are not allowed in the final code
      external: ['cloudfront', ...(props.buildOptions?.external ?? [])],
      ...minifyOptions(props.buildOptions?.minify),
      supported: {
        ...props.buildOptions?.supported,
        ...getSupportedFeatures(runtimeVersion),
      },
    };

    this.entryPoint = entryPoint;
    this.bundler = new EsbuildBundler(entryPoint, {
      ...props,
      buildOptions,
    });
  }

  render(): string {
    if (!this.bundledCode) {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cf-function-'));

      try {
        const success = this.bundler.local.tryBundle(tempDir, this.bundler);
        if (!success) {
          throw new Error('Failed to bundle CloudFront Function code');
        }
        this.bundledCode = fs.readFileSync(path.join(tempDir, 'handler.js'), 'utf8');
        validateCloudFrontFunctionCode(this.bundledCode, this.entryPoint);
      } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }
    return this.bundledCode!;
  }
}

/**
 * @internal
 */
class InlineEsbuildFunctionCode extends FunctionCode {
  private readonly code: string;
  private readonly props: CloudFrontFunctionInlineCodeProps;
  private bundledCode?: string;

  constructor(code: string, props: CloudFrontFunctionInlineCodeProps) {
    super();
    this.code = code;
    this.props = props;
  }

  render(): string {
    if (!this.bundledCode) {
      const provider = this.props.transformProvider ?? EsbuildProvider.defaultTransformationProvider();
      const runtimeVersion = this.props.runtime ?? CloudFrontFunctionRuntime.JS_1_0;

      const transformOptions: ProviderTransformOptions = {
        // defaults
        // custom
        ...this.props.transformOptions,
        // forced
        format: 'esm',
        target: 'es5',
        platform: 'neutral',
        treeShaking: false, // required because `export` keywords are not allowed in the final code
        ...minifyOptions(this.props.transformOptions?.minify),
        supported: {
          ...this.props.transformOptions?.supported,
          ...getSupportedFeatures(runtimeVersion),
        },
      };

      this.bundledCode = provider.transformSync(this.code, transformOptions);
      validateCloudFrontFunctionCode(this.bundledCode, '<inline code>');
    }
    return this.bundledCode!;
  }
}

/**
 * Get minify options.
 *
 * Defaults to false to match esbuild's default behavior and maintain consistency
 * with other constructs in this package (TypeScriptCode, etc.).
 */
function minifyOptions(minify: boolean = false) {
  if (!minify) {
    return {
      minify: false,
      minifyWhitespace: false,
      minifySyntax: false,
      minifyIdentifiers: false,
    };
  }

  return {
    minify: false,
    minifyWhitespace: true,
    minifySyntax: true,
    minifyIdentifiers: false,
  };
}


/**
 * Get supported features for CloudFront Functions runtime version.
 */
function getSupportedFeatures(runtimeVersion: CloudFrontFunctionRuntime) {
  const isV2 = runtimeVersion.value === CloudFrontFunctionRuntime.JS_2_0.value;

  return {
    'const-and-let': isV2,
    'exponent-operator': true,
    'template-literal': true,
    'arrow': true,
    'rest-argument': true,
    'regexp-named-capture-groups': true,
    'async-await': isV2,
  };
}

/**
 * Validates CloudFront Function code meets requirements.
 * @throws Error if code contains export statements
 */        
function validateCloudFrontFunctionCode(code: string, filePath?: string): void {
  // Check for export statements (not allowed in CloudFront Functions runtime)
  // Match: export { ... }, export{...}, export function, export const, export default, etc.
  // This pattern matches the word "export" followed by either whitespace or a punctuation character
  // to avoid false positives in comments or strings (which are preserved differently by esbuild)
  const exportPattern = /\bexport\s*[{(]|\bexport\s+(function|const|let|var|default|class|async)/;
  if (exportPattern.test(code)) {
    const fileInfo = filePath ? ` in \`${filePath}\`` : '';
    throw new Error(
      `CloudFront Function code${fileInfo} contains export statements which are not allowed in the CloudFront Functions runtime. ` +
      'Remove \`export\` keywords from your handler function. ' +
      'See: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/writing-function-code.html',
    );
  }
}
