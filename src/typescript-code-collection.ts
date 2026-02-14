import { AssetCode, AssetCodeProps } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { ProviderBuildOptions } from './provider';
import { TypeScriptCode } from './typescript-code';

export interface TypeScriptCodeCollectionProps extends Omit<AssetCodeProps, 'path'> {
  /**
   * Entry points to bundle as a collection
   * Key: output file name (without extension)
   * Value: input file path
   */
  readonly entryPoints: Record<string, string>;

  /**
   * Build options to pass to esbuild
   */
  readonly buildOptions?: Omit<ProviderBuildOptions, 'entryPoints' | 'outdir'>;
}

/**
 * TypeScript/JavaScript code collection bundled with esbuild
 * 
 * Bundles multiple Lambda function entry points in a single esbuild invocation.
 * This is more efficient than creating individual TypeScriptCode instances when
 * functions share the same build configuration.
 */
export class TypeScriptCodeCollection extends Construct {
  private readonly codeAssets: Map<string, TypeScriptCode>;

  constructor(scope: Construct, id: string, props: TypeScriptCodeCollectionProps) {
    super(scope, id);

    this.codeAssets = new Map();

    Object.entries(props.entryPoints).forEach(([name, entryPoint]) => {
      const code = new TypeScriptCode(this, `Code-${name}`, entryPoint, props.buildOptions);
      this.codeAssets.set(name, code);
    });
  }

  /**
   * Get the bundled code asset for a specific function
   */
  public getCode(functionName: string): AssetCode {
    const code = this.codeAssets.get(functionName);
    if (!code) {
      throw new Error(`No entry point found for function: ${functionName}`);
    }
    return code.asset;
  }

  /**
   * Get all bundled code assets
   */
  public getAllCodes(): Map<string, AssetCode> {
    const result = new Map<string, AssetCode>();
    this.codeAssets.forEach((code, name) => {
      result.set(name, code.asset);
    });
    return result;
  }
}