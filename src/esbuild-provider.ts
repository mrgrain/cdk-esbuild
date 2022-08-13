import { DefaultTokenResolver, StringConcat, Token, Tokenization } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Esbuild, EsbuildSource } from './esbuild-source';
import { analyzeMetafileSync, buildSync, transformSync, version } from './esbuild-types';

interface Esbuild {
  buildSync: typeof buildSync;
  transformSync: typeof transformSync;
  analyzeMetafileSync: typeof analyzeMetafileSync;
  version: typeof version;
}

export class EsbuildProvider {

  private static resolve(token: string): string {
    if (!Token.isUnresolved(token)) {
      return token;
    }

    return Tokenization.resolve(token, {
      scope: new Construct(undefined as any, ''),
      resolver: new DefaultTokenResolver(new StringConcat()),
    });
  }

  public static require(path?: string): Esbuild {
    const module = path || process.env.CDK_ESBUILD_MODULE_PATH || EsbuildSource.default || Esbuild.name;

    return this._require(this.resolve(module));
  }

  public static _require(path: string): Esbuild {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(path);
  }

  public static withEsbuildBinaryPath<T extends CallableFunction>(fn: T, esbuildBinaryPath?: string) {
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
}
