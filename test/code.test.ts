import { resolve } from 'path';
import {
  Canary,
  Runtime as SyntheticsRuntime,
  Test,
} from '@aws-cdk/aws-synthetics-alpha';
import { Stack } from 'aws-cdk-lib';
import { Function, Runtime as LambdaRuntime } from 'aws-cdk-lib/aws-lambda';
import { JavaScriptCode, TypeScriptCode } from '../src/code';
import { EsbuildProvider } from '../src/provider';

const buildProvider = new EsbuildProvider();
const buildSyncSpy = jest.spyOn(buildProvider, 'buildSync');

describe('code', () => {
  describe('entrypoint is an absolute path', () => {
    describe('outside of the esbuild working dir', () => {
      it('should throw an exception', () => {
        expect(() => {
          const stack = new Stack();

          const code = new JavaScriptCode('/project/index.js');

          new Function(stack, 'MyFunction', {
            runtime: LambdaRuntime.NODEJS_14_X,
            handler: 'index.handler',
            code,
          });
        }).toThrow(
          /MyFunction\/JavaScriptCode: Entry points must be part of the working directory/,
        );
      });
    });

    describe('within the esbuild working dir', () => {
      it('should be fine and rewrite the entrypoint', () => {
        expect(() => {
          const stack = new Stack();

          // require.resolve() will return an absolute path
          const code = new TypeScriptCode(require.resolve('./fixtures/handlers/ts-handler'), {
            buildProvider,
          });

          new Function(stack, 'MyFunction', {
            runtime: LambdaRuntime.NODEJS_14_X,
            handler: 'index.handler',
            code,
          });
        }).not.toThrow();

        expect(buildSyncSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            entryPoints: ['test/fixtures/handlers/ts-handler.ts'],
          }),
        );
      });
    });
  });

  describe('using a custom hash', () => {
    it('does not throw', () => {
      expect(() => {
        const stack = new Stack();

        const assetHash = 'abcdefghij1234567890';
        const code = new TypeScriptCode('fixtures/handlers/ts-handler.ts', {
          assetHash,
          buildOptions: { absWorkingDir: resolve(__dirname) },
        });

        new Function(stack, 'MyFunction', {
          runtime: LambdaRuntime.NODEJS_14_X,
          handler: 'index.handler',
          code,
        });
      }).not.toThrow();
    });
  });

  describe('JavaScriptCode can be used', () => {
    it('should not throw', () => {
      expect(() => {
        const stack = new Stack();

        const code = new JavaScriptCode('fixtures/handlers/js-handler.js', {
          buildOptions: { absWorkingDir: resolve(__dirname) },
        });

        new Function(stack, 'MyFunction', {
          runtime: LambdaRuntime.NODEJS_14_X,
          handler: 'index.handler',
          code,
        });
      }).not.toThrow();
    });
  });

  describe('Map can be used for entry points', () => {
    it('should not throw', () => {
      expect(() => {
        const stack = new Stack();

        const code = new JavaScriptCode(
          { handler: 'fixtures/handlers/js-handler.js' },
          {
            buildOptions: { absWorkingDir: resolve(__dirname) },
          },
        );

        new Function(stack, 'MyFunction', {
          runtime: LambdaRuntime.NODEJS_14_X,
          handler: 'index.handler',
          code,
        });
      }).not.toThrow();
    });
  });

  describe('Given a custom build function', () => {
    it('should call my build function', () => {
      expect(() => {
        const stack = new Stack();

        const code = new TypeScriptCode('fixtures/handlers/ts-handler.ts', {
          buildOptions: { absWorkingDir: resolve(__dirname) },
          buildProvider,
        });

        new Function(stack, 'MyFunction', {
          runtime: LambdaRuntime.NODEJS_14_X,
          handler: 'index.handler',
          code,
        });
      }).not.toThrow();

      expect(buildSyncSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          entryPoints: ['fixtures/handlers/ts-handler.ts'],
        }),
      );
    });
  });

  describe('Given an incorrect entrypoint', () => {
    it('will report build failures', () => {
      expect(() => {
        const code = new JavaScriptCode('fixtures/handlers/invalid-handler.js', {
          buildOptions: { absWorkingDir: resolve(__dirname) },
        });

        new Function(new Stack(), 'MyFunction', {
          runtime: LambdaRuntime.NODEJS_14_X,
          handler: 'index.handler',
          code,
        });
      }).toThrow('Esbuild failed to bundle fixtures/handlers/invalid-handler.js');
    });
  });
});

describe('AWS Lambda', () => {
  describe('TypeScriptCode can be used in Lambda Function', () => {
    it('should not throw', () => {
      expect(() => {
        const stack = new Stack();

        const code = new TypeScriptCode('fixtures/handlers/ts-handler.ts', {
          buildOptions: { absWorkingDir: resolve(__dirname) },
        });

        new Function(stack, 'MyFunction', {
          runtime: LambdaRuntime.NODEJS_14_X,
          handler: 'index.handler',
          code,
        });
      }).not.toThrow();
    });
  });
});

describe('Amazon CloudWatch Synthetics', () => {
  describe('TypeScriptCode can be used in Synthetics Test', () => {
    it('should not throw', () => {
      expect(() => {
        const stack = new Stack();

        const code = new TypeScriptCode('fixtures/handlers/ts-handler.ts', {
          buildOptions: { absWorkingDir: resolve(__dirname) },
        });

        const test = Test.custom({
          code,
          handler: 'index.handler',
        });

        new Canary(stack, 'MyCanary', {
          test,
          runtime: SyntheticsRuntime.SYNTHETICS_NODEJS_PUPPETEER_3_2,
        });
      }).not.toThrow();
    });
  });
});
