import { resolve } from 'path';
import {
  Canary,
  Runtime as SyntheticsRuntime,
  Test,
} from '@aws-cdk/aws-synthetics-alpha';
import { Function, Runtime as LambdaRuntime } from 'aws-cdk-lib/aws-lambda';
import { Stack } from 'aws-cdk-lib/core';
import { mocked } from 'ts-jest/utils';
import { JavaScriptCode, TypeScriptCode } from '../src/code';
import { buildSync } from '../src/esbuild-wrapper';

describe('code', () => {
  describe('entry is an absolute path', () => {
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
        /MyFunction\/JavaScriptCode: Entry points must be a relative path/,
      );
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
      const customBuild = jest.fn(buildSync);

      expect(() => {
        const stack = new Stack();

        const code = new TypeScriptCode('fixtures/handlers/ts-handler.ts', {
          buildOptions: { absWorkingDir: resolve(__dirname) },
          buildFn: customBuild,
        });

        new Function(stack, 'MyFunction', {
          runtime: LambdaRuntime.NODEJS_14_X,
          handler: 'index.handler',
          code,
        });
      }).not.toThrow();

      expect(mocked(customBuild)).toHaveBeenCalledWith(
        expect.objectContaining({
          entryPoints: ['fixtures/handlers/ts-handler.ts'],
        }),
      );
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
