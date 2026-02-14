import { Construct } from 'constructs';
import { BundlerProps } from './bundler';
import { TypeScriptCode, TypeScriptCodeProps } from './code';

/**
 * Properties for TypeScriptCodeCollection
 * 
 * @stability stable
 */
export interface TypeScriptCodeCollectionProps extends BundlerProps {
  /**
   * Entry points to bundle as a collection
   * Key: logical function name
   * Value: input file path
   * 
   * @example
   * {
   *   'api': './src/api.ts',
   *   'auth': './src/auth.ts'
   * }
   * 
   * @stability stable
   */
  readonly entryPoints: Record<string, string>;

  /**
   * A hash of the assets, available at construction time
   * 
   * @stability stable
   */
  readonly assetHash?: string;
}

/**
 * TypeScript/JavaScript code collection bundled with esbuild
 * 
 * Bundles multiple Lambda function entry points, each as separate TypeScriptCode instances.
 * This allows building multiple functions while sharing the same build configuration.
 * 
 * @example
 * ```typescript
 * const codeCollection = new TypeScriptCodeCollection(this, 'MultiLambda', {
 *   entryPoints: {
 *     'api': './src/api.ts',
 *     'auth': './src/auth.ts'
 *   },
 *   buildOptions: {
 *     minify: true
 *   }
 * });
 * 
 * new lambda.Function(this, 'ApiFunc', {
 *   runtime: lambda.Runtime.NODEJS_18_X,
 *   handler: 'api.handler',
 *   code: codeCollection.getCode('api'),
 * });
 * ```
 * 
 * @stability stable
 */
export class TypeScriptCodeCollection extends Construct {
  private readonly codes: { [name: string]: TypeScriptCode } = {};

  constructor(scope: Construct, id: string, props: TypeScriptCodeCollectionProps) {
    super(scope, id);

    const { entryPoints, assetHash, ...buildOptions } = props;

    // Create individual TypeScriptCode instances for each entry point
    Object.entries(entryPoints).forEach(([name, entryPoint]) => {
      const codeProps: TypeScriptCodeProps = {
        ...buildOptions,
        assetHash,
      };

      this.codes[name] = new TypeScriptCode(entryPoint, codeProps);
    });
  }

  /**
   * Get the bundled TypeScript code for a specific function
   * 
   * @param functionName The logical function name (key from entryPoints)
   * @returns TypeScriptCode instance that can be used with Lambda.Function
   * 
   * @stability stable
   */
  public getCode(functionName: string): TypeScriptCode {
    const code = this.codes[functionName];
    if (!code) {
      throw new Error(`No entry point found for function: ${functionName}`);
    }
    return code;
  }

  /**
   * Get all bundled code instances
   * 
   * @returns Object with function names as keys and TypeScriptCode instances as values
   * 
   * @stability stable
   */
  public getAllCodes(): { [name: string]: TypeScriptCode } {
    return { ...this.codes };
  }
}