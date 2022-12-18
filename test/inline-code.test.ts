import { App, Stack } from 'aws-cdk-lib';
import { Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as esbuild from 'esbuild';
import { mocked } from 'jest-mock';
import {
  InlineJavaScriptCode,
  InlineJsxCode,
  InlineTsxCode,
  InlineTypeScriptCode,
} from '../src';
import { EsbuildProvider } from '../src/esbuild-provider';

const providerSpy = jest.spyOn(EsbuildProvider, '_require');

describe('using transformerProps', () => {
  describe('given some js code', () => {
    it('should transform the code', () => {
      const code = new InlineJavaScriptCode(
        "const banana = 'fruit' ?? 'vegetable'",
      );

      const stack = new Stack();
      const { inlineCode } = code.bind(stack);

      expect(stack.resolve(inlineCode)).toBe('const banana = "fruit";\n');
    });
  });

  describe('given some jsx code', () => {
    it('should transform the code', () => {
      const code = new InlineJsxCode(
        'const App = () => (<div>Hello World</div>)',
      );

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe(
        'const App = () => /* @__PURE__ */ React.createElement("div", null, "Hello World");\n',
      );
    });
  });

  describe('given some ts code', () => {
    it('should transform the code', () => {
      const code = new InlineTypeScriptCode('let x: number = 1');

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe('let x = 1;\n');
    });

    it('should announce the transforming step', () => {
      const processStdErrWriteSpy = jest.spyOn(process.stderr, 'write');
      const stack = new Stack(new App(), 'Stack');
      const code = new InlineTypeScriptCode('let x: number = 1');

      new Function(stack, 'MyFunction', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'index.handler',
        code,
      });

      expect(processStdErrWriteSpy).toHaveBeenCalledWith(
        'Transforming inline code Stack/MyFunction/InlineTypeScriptCode...\n',
      );
      processStdErrWriteSpy.mockRestore();
    });

    it('should not do the work twice', () => {
      const processStdErrWriteSpy = jest.spyOn(process.stderr, 'write');
      const transformFn = jest.fn(esbuild.transformSync);

      const stack = new Stack(new App(), 'Stack');
      const code = new InlineTypeScriptCode('let x: number = 1', {
        transformFn,
      });

      new Function(stack, 'One', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'index.handler',
        code,
      });

      new Function(stack, 'Two', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'index.handler',
        code,
      });

      expect(transformFn).toHaveBeenCalledTimes(1);
      expect(processStdErrWriteSpy).toHaveBeenCalledWith(
        'Transforming inline code Stack/One/InlineTypeScriptCode...\n',
      );
      expect(processStdErrWriteSpy).toHaveBeenCalledWith(
        'Transforming inline code Stack/Two/InlineTypeScriptCode...\n',
      );
      processStdErrWriteSpy.mockRestore();
    });
  });

  describe('given some tsx code', () => {
    it('should transform the code', () => {
      const code = new InlineTsxCode(
        'const App = (): JSX.Element => (<div>Hello World</div>)',
      );

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe(
        'const App = () => /* @__PURE__ */ React.createElement("div", null, "Hello World");\n',
      );
    });
  });

  describe('given some broken ts code', () => {
    it('should throws', () => {
      expect(() => {
        const code = new InlineTypeScriptCode('let : d ===== 1');
        code.bind(new Stack());
      }).toThrowError('Esbuild failed to transform InlineTypeScriptCode');
    });

    // Currently no way to capture esbuild output,
    // See https://github.com/evanw/esbuild/issues/2466
    it.skip('should display an error', () => {
      const processStdErrWriteSpy = jest.spyOn(process.stderr, 'write');

      expect(() => {
        const code = new InlineTypeScriptCode('let : d ===== 1');
        code.bind(new Stack());
      }).toThrowError('Esbuild failed to transform InlineTypeScriptCode');

      expect(processStdErrWriteSpy).toBeCalledWith(expect.stringContaining('Unexpected "=="'));

      processStdErrWriteSpy.mockRestore();
    });
  });

  describe('given a banner code', () => {
    it('should add the banner before the code', () => {
      const code = new InlineJavaScriptCode(
        "const banana = 'fruit' ?? 'vegetable'",
        {
          transformOptions: { banner: '/** BANNER */' },
        },
      );

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe('/** BANNER */\nconst banana = "fruit";\n');
    });
  });

  describe('given a custom transform function', () => {
    it('should call my transform function', () => {
      const customTransform = jest.fn().mockImplementation(() => ({
        code: 'console.log("test");',
        map: '',
        warnings: [],
      }));

      const code = new InlineTypeScriptCode('let x: number = 1', {
        transformFn: customTransform,
      });
      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe('console.log("test");');
      expect(mocked(customTransform)).toHaveBeenCalledWith(
        expect.stringContaining('let x: number = 1'),
        expect.anything(),
      );
    });
  });

  describe('given a custom esbuildBinaryPath', () => {
    it('should set the ESBUILD_BINARY_PATH env variable', () => {
      const mockLogger = jest.fn();
      const customTransform = () => {
        mockLogger(process.env.ESBUILD_BINARY_PATH);
        return {
          code: 'console.log("test");',
          map: '',
          warnings: [],
        };
      };

      const code = new InlineTypeScriptCode('let x: number = 1', {
        transformFn: customTransform,
        esbuildBinaryPath: 'dummy-binary',
      });
      code.bind(new Stack());

      expect(mockLogger).toHaveBeenCalledTimes(1);
      expect(mockLogger).toHaveBeenCalledWith('dummy-binary');
    });
  });

  describe('with an esbuild module path from', () => {
    beforeEach(() => {
      providerSpy.mockClear();
      providerSpy.mockReturnValue(esbuild);
    });
    afterAll(() => {
      providerSpy.mockRestore();
    });

    describe('the default', () => {
      it('should call the esbuild provider with "esbuild"', () => {
        const code = new InlineTypeScriptCode('let x: number = 1');
        code.bind(new Stack());

        expect(providerSpy).toHaveBeenCalledTimes(1);
        expect(providerSpy).toHaveBeenCalledWith('esbuild');
      });
    });

    describe('`esbuildModulePath` prop', () => {
      it('should use the path from the prop', () => {
        const code = new InlineTypeScriptCode('let x: number = 1', {
          esbuildModulePath: '/expected/path/from/prop',
        });
        code.bind(new Stack());

        expect(providerSpy).toHaveBeenCalledTimes(1);
        expect(providerSpy).toHaveBeenCalledWith('/expected/path/from/prop');
      });
    });

    describe('`CDK_ESBUILD_MODULE_PATH` env var', () => {
      beforeEach(() => {
        process.env.CDK_ESBUILD_MODULE_PATH = '/expected/path/from/env/var';
      });
      afterEach(() => {
        delete process.env.CDK_ESBUILD_MODULE_PATH;
      });

      it('should use the path from the env var', () => {
        const code = new InlineTypeScriptCode('let x: number = 1');
        code.bind(new Stack());

        expect(providerSpy).toHaveBeenCalledTimes(1);
        expect(providerSpy).toHaveBeenCalledWith('/expected/path/from/env/var');
      });

      describe('and `esbuildModulePath` prop', () => {
        it('should prefer the path from prop', () => {
          const code = new InlineTypeScriptCode('let x: number = 1', {
            esbuildModulePath: '/expected/path/from/prop',
          });
          code.bind(new Stack());

          expect(providerSpy).toHaveBeenCalledTimes(1);
          expect(providerSpy).toHaveBeenCalledWith('/expected/path/from/prop');
        });
      });
    });
  });

  describe('with logLevel', () => {
    describe('not provided', () => {
      it('should default to "warning"', () => {
        const transformFn = jest.fn(esbuild.transformSync);
        const code = new InlineJavaScriptCode("const fruit = 'banana';", {
          transformFn,
        });
        code.bind(new Stack());

        expect(transformFn).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
          logLevel: 'warning',
        }));
      });
    });

    describe('provided', () => {
      it('should use the provided logLevel', () => {
        const transformFn = jest.fn(esbuild.transformSync);
        const code = new InlineJavaScriptCode("const fruit = 'banana';", {
          transformFn,
          transformOptions: {
            logLevel: 'silent',
          },
        });
        code.bind(new Stack());

        expect(transformFn).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
          logLevel: 'silent',
        }));
      });
    });
  });

  describe('with process.env.NO_COLOR', () => {
    describe.each([
      ['1', true],
      ['0', true], // NO_COLOR spec says any value
      ['', undefined], // except empty string
      [undefined, undefined],
    ])('set to %j', (noColorValue, derivedColor) => {
      beforeEach(() => {
        process.env.NO_COLOR = noColorValue;
        if (noColorValue === undefined) {
          delete process.env.NO_COLOR;
        }
      });
      afterEach(() => {
        delete process.env.NO_COLOR;
      });

      it(`should set the color option to "${derivedColor}"`, () => {
        const transformFn = jest.fn(esbuild.transformSync);

        const code = new InlineTypeScriptCode('let x: number = 1', {
          transformFn,
        });
        code.bind(new Stack());

        expect(transformFn).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            color: derivedColor,
          }),
        );
      });

      it('should respect an explicit option', () => {
        const transformFn = jest.fn(esbuild.transformSync);

        const code = new InlineTypeScriptCode('let x: number = 1', {
          transformFn,
          transformOptions: {
            color: false,
          },
        });
        code.bind(new Stack());

        expect(transformFn).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            color: false,
          }),
        );
      });
    });
  });
});
