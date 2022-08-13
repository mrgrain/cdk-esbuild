import { Stack } from 'aws-cdk-lib';
import { mocked } from 'jest-mock';
import { transformSync } from '../lib/esbuild-wrapper';
import {
  InlineJavaScriptCode,
  InlineJsxCode,
  InlineTsxCode,
  InlineTypeScriptCode,
} from '../src';

describe('using transformOptions', () => {
  describe('given a banner code', () => {
    it('should add the banner before the code', () => {
      const code = new InlineJavaScriptCode(
        "const banana = 'fruit' ?? 'vegetable'",
        {
          banner: '/** BANNER */',
        },
      );

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe('/** BANNER */\nconst banana = "fruit";\n');
    });
  });
});

describe('using transformerProps', () => {
  describe('given some js code', () => {
    it('should transform the code', () => {
      const code = new InlineJavaScriptCode(
        "const banana = 'fruit' ?? 'vegetable'",
      );

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe('const banana = "fruit";\n');
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
      }).toThrowError('Failed to transform InlineCode');
    });

    // Currently no way to capture esbuild output,
    // See https://github.com/evanw/esbuild/issues/2466
    it.skip('should display an error', () => {
      const originalConsole = console.error;
      console.error = jest.fn();

      expect(() => {
        const code = new InlineTypeScriptCode('let : d ===== 1');
        code.bind(new Stack());
      }).toThrowError('Failed to transform InlineCode');

      expect(console.error).toBeCalledWith(expect.stringContaining('Unexpected "=="'));

      console.error = originalConsole;
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

      new InlineTypeScriptCode('let x: number = 1', {
        transformFn: customTransform,
        esbuildBinaryPath: 'dummy-binary',
      });

      expect(mockLogger).toHaveBeenCalledTimes(1);
      expect(mockLogger).toHaveBeenCalledWith('dummy-binary');
    });
  });


  describe('with logLevel', () => {
    describe('not provided', () => {
      it('should default to "warning"', () => {
        const transformFn = jest.fn(transformSync);
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
        const transformFn = jest.fn(transformSync);
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
});