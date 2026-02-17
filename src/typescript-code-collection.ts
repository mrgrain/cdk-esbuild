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
   * Entry points to bundle as a collection.
   *
   * Key: logical function name (used to retrieve the code later).
   * Value: path to the entry point file.
   *
   * @stability stable
   */
  readonly entryPoints: Record<string, string>;

  /**
   * A hash of this asset, which is available at construction time.
   *
   * As this is a plain string, it can be used in construct IDs in order to enforce creation of a new resource when the content hash has changed.
   *
   * Defaults to a hash of all files in the resulting bundle.
   *
   * @stability stable
   */
  readonly assetHash?: string;
}

/**
 * Manages multiple Lambda function entry points that share the same build configuration.
 *
 * Creates a {@link TypeScriptCode} asset for each entry point, allowing related
 * functions to be organized with common build options. This is primarily a
 * convenience construct for managing multiple Lambda functions that share
 * the same esbuild configuration.
 *
 * @stability stable
 */
export class TypeScriptCodeCollection extends Construct {
  private readonly codes: { [name: string]: TypeScriptCode } = {};

  constructor(scope: Construct, id: string, props: TypeScriptCodeCollectionProps) {
    super(scope, id);

    const { entryPoints, assetHash, ...bundlerProps } = props;

    // Create individual TypeScriptCode instances for each entry point
    Object.entries(entryPoints).forEach(([name, entryPoint]) => {
      const codeProps: TypeScriptCodeProps = {
        ...bundlerProps,
        assetHash,
      };

      this.codes[name] = new TypeScriptCode(entryPoint, codeProps);
    });
  }

  /**
   * Get the bundled TypeScript code for a specific function.
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
   * Get the names of all functions in this collection.
   *
   * @returns Array of function names (keys from entryPoints)
   *
   * @stability stable
   */
  public getFunctionNames(): string[] {
    return Object.keys(this.codes);
  }

  /**
   * Get all bundled code instances.
   *
   * @returns Object with function names as keys and TypeScriptCode instances as values
   *
   * @stability stable
   */
  public getAllCodes(): { [name: string]: TypeScriptCode } {
    return { ...this.codes };
  }
}