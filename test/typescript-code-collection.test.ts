import { resolve } from 'path';
import { Stack } from 'aws-cdk-lib';
import { Function, Runtime as LambdaRuntime } from 'aws-cdk-lib/aws-lambda';
import { TypeScriptCodeCollection } from '../src/typescript-code-collection';
import { EsbuildProvider } from '../src/provider';

const buildProvider = new EsbuildProvider();
const buildSyncSpy = jest.spyOn(buildProvider, 'buildSync');

describe('TypeScriptCodeCollection', () => {
  describe('basic instantiation', () => {
    it('should create a collection with multiple entry points', () => {
      expect(() => {
        const stack = new Stack();

        const collection = new TypeScriptCodeCollection(stack, 'Collection', {
          entryPoints: {
            handler1: 'fixtures/handlers/ts-handler.ts',
            handler2: 'fixtures/handlers/js-handler.js',
          },
          buildOptions: { absWorkingDir: resolve(__dirname) },
        });

        new Function(stack, 'Function1', {
          runtime: LambdaRuntime.NODEJS_18_X,
          handler: 'index.handler',
          code: collection.getCode('handler1'),
        });

        new Function(stack, 'Function2', {
          runtime: LambdaRuntime.NODEJS_18_X,
          handler: 'index.handler',
          code: collection.getCode('handler2'),
        });
      }).not.toThrow();
    });

    it('should create a collection with a single entry point', () => {
      expect(() => {
        const stack = new Stack();

        const collection = new TypeScriptCodeCollection(stack, 'Collection', {
          entryPoints: {
            handler: 'fixtures/handlers/ts-handler.ts',
          },
          buildOptions: { absWorkingDir: resolve(__dirname) },
        });

        new Function(stack, 'Function1', {
          runtime: LambdaRuntime.NODEJS_18_X,
          handler: 'index.handler',
          code: collection.getCode('handler'),
        });
      }).not.toThrow();
    });
  });

  describe('getCode()', () => {
    it('should return TypeScriptCode for a valid function name', () => {
      const stack = new Stack();

      const collection = new TypeScriptCodeCollection(stack, 'Collection', {
        entryPoints: {
          handler1: 'fixtures/handlers/ts-handler.ts',
          handler2: 'fixtures/handlers/js-handler.js',
        },
        buildOptions: { absWorkingDir: resolve(__dirname) },
      });

      const code = collection.getCode('handler1');
      expect(code).toBeDefined();
    });

    it('should throw an error for non-existent function name', () => {
      const stack = new Stack();

      const collection = new TypeScriptCodeCollection(stack, 'Collection', {
        entryPoints: {
          handler1: 'fixtures/handlers/ts-handler.ts',
        },
        buildOptions: { absWorkingDir: resolve(__dirname) },
      });

      expect(() => collection.getCode('nonExistent')).toThrow(
        'No entry point found for function: nonExistent',
      );
    });
  });

  describe('getFunctionNames()', () => {
    it('should return all function names', () => {
      const stack = new Stack();

      const collection = new TypeScriptCodeCollection(stack, 'Collection', {
        entryPoints: {
          api: 'fixtures/handlers/ts-handler.ts',
          auth: 'fixtures/handlers/js-handler.js',
        },
        buildOptions: { absWorkingDir: resolve(__dirname) },
      });

      const names = collection.getFunctionNames();
      expect(names).toHaveLength(2);
      expect(names).toContain('api');
      expect(names).toContain('auth');
    });

    it('should return empty array when no entry points', () => {
      const stack = new Stack();

      const collection = new TypeScriptCodeCollection(stack, 'Collection', {
        entryPoints: {},
        buildOptions: { absWorkingDir: resolve(__dirname) },
      });

      expect(collection.getFunctionNames()).toHaveLength(0);
    });
  });

  describe('getAllCodes()', () => {
    it('should return all code instances', () => {
      const stack = new Stack();

      const collection = new TypeScriptCodeCollection(stack, 'Collection', {
        entryPoints: {
          api: 'fixtures/handlers/ts-handler.ts',
          auth: 'fixtures/handlers/js-handler.js',
        },
        buildOptions: { absWorkingDir: resolve(__dirname) },
      });

      const allCodes = collection.getAllCodes();
      expect(Object.keys(allCodes)).toHaveLength(2);
      expect(allCodes['api']).toBeDefined();
      expect(allCodes['auth']).toBeDefined();
    });

    it('should return a copy (not a reference to internal state)', () => {
      const stack = new Stack();

      const collection = new TypeScriptCodeCollection(stack, 'Collection', {
        entryPoints: {
          api: 'fixtures/handlers/ts-handler.ts',
        },
        buildOptions: { absWorkingDir: resolve(__dirname) },
      });

      const allCodes = collection.getAllCodes();
      // Modifying the returned object should not affect internal state
      delete allCodes['api'];
      expect(collection.getCode('api')).toBeDefined();
    });
  });

  describe('shared build configuration', () => {
    it('should pass build options to all code instances', () => {
      expect(() => {
        const stack = new Stack();

        const collection = new TypeScriptCodeCollection(stack, 'Collection', {
          entryPoints: {
            handler1: 'fixtures/handlers/ts-handler.ts',
            handler2: 'fixtures/handlers/js-handler.js',
          },
          buildOptions: {
            absWorkingDir: resolve(__dirname),
            minify: true,
            sourcemap: true,
          },
          buildProvider,
        });

        new Function(stack, 'Function1', {
          runtime: LambdaRuntime.NODEJS_18_X,
          handler: 'index.handler',
          code: collection.getCode('handler1'),
        });

        new Function(stack, 'Function2', {
          runtime: LambdaRuntime.NODEJS_18_X,
          handler: 'index.handler',
          code: collection.getCode('handler2'),
        });
      }).not.toThrow();

      expect(buildSyncSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          entryPoints: ['fixtures/handlers/ts-handler.ts'],
          minify: true,
          sourcemap: true,
        }),
      );

      expect(buildSyncSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          entryPoints: ['fixtures/handlers/js-handler.js'],
          minify: true,
          sourcemap: true,
        }),
      );
    });
  });

  describe('custom build provider', () => {
    it('should use the provided build provider for all entry points', () => {
      expect(() => {
        const stack = new Stack();

        const collection = new TypeScriptCodeCollection(stack, 'Collection', {
          entryPoints: {
            handler1: 'fixtures/handlers/ts-handler.ts',
          },
          buildOptions: { absWorkingDir: resolve(__dirname) },
          buildProvider,
        });

        new Function(stack, 'Function1', {
          runtime: LambdaRuntime.NODEJS_18_X,
          handler: 'index.handler',
          code: collection.getCode('handler1'),
        });
      }).not.toThrow();

      expect(buildSyncSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          entryPoints: ['fixtures/handlers/ts-handler.ts'],
        }),
      );
    });
  });

  describe('using a custom asset hash', () => {
    it('should not throw', () => {
      expect(() => {
        const stack = new Stack();

        const collection = new TypeScriptCodeCollection(stack, 'Collection', {
          entryPoints: {
            handler1: 'fixtures/handlers/ts-handler.ts',
          },
          buildOptions: { absWorkingDir: resolve(__dirname) },
          assetHash: 'customhash1234567890',
        });

        new Function(stack, 'Function1', {
          runtime: LambdaRuntime.NODEJS_18_X,
          handler: 'index.handler',
          code: collection.getCode('handler1'),
        });
      }).not.toThrow();
    });
  });

  describe('Lambda functions with collection', () => {
    it('should create separate Lambda functions from the same collection', () => {
      expect(() => {
        const stack = new Stack();

        const collection = new TypeScriptCodeCollection(stack, 'Collection', {
          entryPoints: {
            api: 'fixtures/handlers/ts-handler.ts',
            auth: 'fixtures/handlers/js-handler.js',
          },
          buildOptions: { absWorkingDir: resolve(__dirname) },
        });

        new Function(stack, 'ApiFunction', {
          runtime: LambdaRuntime.NODEJS_18_X,
          handler: 'api.handler',
          code: collection.getCode('api'),
        });

        new Function(stack, 'AuthFunction', {
          runtime: LambdaRuntime.NODEJS_18_X,
          handler: 'auth.handler',
          code: collection.getCode('auth'),
        });
      }).not.toThrow();
    });
  });

  describe('error handling', () => {
    it('should report build failures for invalid entry points', () => {
      expect(() => {
        const stack = new Stack();

        const collection = new TypeScriptCodeCollection(stack, 'Collection', {
          entryPoints: {
            invalid: 'fixtures/handlers/invalid-handler.js',
          },
          buildOptions: { absWorkingDir: resolve(__dirname) },
        });

        new Function(stack, 'Function1', {
          runtime: LambdaRuntime.NODEJS_18_X,
          handler: 'index.handler',
          code: collection.getCode('invalid'),
        });
      }).toThrow('Esbuild failed to bundle fixtures/handlers/invalid-handler.js');
    });
  });
});
