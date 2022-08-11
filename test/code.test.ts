import { resolve } from 'path';
import {
  Canary,
  Runtime as SyntheticsRuntime,
  Test,
} from '@aws-cdk/aws-synthetics-alpha';
import { Stack } from 'aws-cdk-lib';
import { Function, Runtime as LambdaRuntime } from 'aws-cdk-lib/aws-lambda';
import { mocked } from 'jest-mock';
import { JavaScriptCode, TypeScriptCode } from '../src/code';
import { BuildOptions } from '../src/esbuild-types';
import * as provider from '../src/esbuild-wrapper';

const esbuildSpy = jest.spyOn(provider, 'esbuild');
const buildSync = provider.esbuild().buildSync;

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
        const customBuild = jest.fn(buildSync);

        expect(() => {
          const stack = new Stack();

          // require.resolve() will return an absolute path
          const code = new TypeScriptCode(require.resolve('./fixtures/handlers/ts-handler'), {
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

describe('given a custom esbuildBinaryPath', () => {
  it('should set the ESBUILD_BINARY_PATH env variable', () => {
    const mockLogger = jest.fn();
    const customBuild = (options: BuildOptions) => {
      mockLogger(process.env.ESBUILD_BINARY_PATH);
      return buildSync(options);
    };

    expect(() => {
      const stack = new Stack();

      const code = new TypeScriptCode('fixtures/handlers/ts-handler.ts', {
        buildOptions: { absWorkingDir: resolve(__dirname) },
        buildFn: customBuild,
        esbuildBinaryPath: 'dummy-binary',
      });

      new Function(stack, 'MyFunction', {
        runtime: LambdaRuntime.NODEJS_14_X,
        handler: 'index.handler',
        code,
      });
    }).not.toThrow();

    expect(mockLogger).toHaveBeenCalledTimes(1);
    expect(mockLogger).toHaveBeenCalledWith('dummy-binary');
  });
});

describe('with an esbuild module path from', () => {
  let stack: Stack;
  beforeEach(() => {
    esbuildSpy.mockClear();
    stack = new Stack();
  });
  afterAll(() => {
    esbuildSpy.mockRestore();
  });

  describe('the default', () => {
    it('should call the esbuild provider with "esbuild"', () => {
      const code = new TypeScriptCode('fixtures/handlers/ts-handler.ts', {
        buildOptions: { absWorkingDir: resolve(__dirname) },
      });

      new Function(stack, 'MyFunction', {
        runtime: LambdaRuntime.NODEJS_14_X,
        handler: 'index.handler',
        code,
      });

      expect(esbuildSpy).toHaveBeenCalledTimes(1);
      expect(esbuildSpy).toHaveBeenCalledWith('esbuild');
    });
  });

  describe('`esbuildModulePath` prop', () => {
    it('should use the path from the prop', () => {
      const code = new TypeScriptCode('fixtures/handlers/ts-handler.ts', {
        buildOptions: { absWorkingDir: resolve(__dirname) },
        esbuildModulePath: '../node_modules/esbuild',
      });

      new Function(stack, 'MyFunction', {
        runtime: LambdaRuntime.NODEJS_14_X,
        handler: 'index.handler',
        code,
      });

      expect(esbuildSpy).toHaveBeenCalledTimes(1);
      expect(esbuildSpy).toHaveBeenCalledWith('../node_modules/esbuild');
    });
  });

  describe('`CDK_ESBUILD_MODULE_PATH` env var', () => {
    beforeEach(() => {
      process.env.CDK_ESBUILD_MODULE_PATH = '../node_modules/esbuild';
    });
    afterEach(() => {
      delete process.env.CDK_ESBUILD_MODULE_PATH;
    });

    it('should use the path from the env var', () => {
      const code = new TypeScriptCode('fixtures/handlers/ts-handler.ts', {
        buildOptions: { absWorkingDir: resolve(__dirname) },
      });

      new Function(stack, 'MyFunction', {
        runtime: LambdaRuntime.NODEJS_14_X,
        handler: 'index.handler',
        code,
      });

      expect(esbuildSpy).toHaveBeenCalledTimes(1);
      expect(esbuildSpy).toHaveBeenCalledWith('../node_modules/esbuild');
    });

    describe('and `esbuildModulePath` prop', () => {
      it('should prefer the path from prop', () => {
        const code = new TypeScriptCode('fixtures/handlers/ts-handler.ts', {
          buildOptions: { absWorkingDir: resolve(__dirname) },
          esbuildModulePath: '../test/../node_modules/esbuild',
        });

        new Function(stack, 'MyFunction', {
          runtime: LambdaRuntime.NODEJS_14_X,
          handler: 'index.handler',
          code,
        });

        expect(esbuildSpy).toHaveBeenCalledTimes(1);
        expect(esbuildSpy).toHaveBeenCalledWith('../test/../node_modules/esbuild');
      });
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
