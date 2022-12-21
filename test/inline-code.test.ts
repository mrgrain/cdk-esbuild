import { App, Stack } from 'aws-cdk-lib';
import { Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import {
  EsbuildProvider,
  InlineJavaScriptCode,
  InlineTypeScriptCode,
} from '../src';

const transformProvider = new EsbuildProvider();
const transformSyncSpy = jest.spyOn(transformProvider, 'transformSync');

describe('given the default options', () => {
  it('should target cjs and node', () => {
    const code = new InlineTypeScriptCode('let x: number = 1', {
      transformProvider,
    });
    code.bind(new Stack());

    expect(transformSyncSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        loader: 'ts',
        format: 'cjs',
        platform: 'node',
        target: expect.stringContaining('node'),
      }),
    );
  });
});

describe('given some non default options', () => {
  it('should override the default options', () => {
    const code = new InlineJavaScriptCode('var number = 1', {
      transformProvider,
      transformOptions: {
        loader: 'jsx',
        format: 'esm',
        platform: 'neutral',
        target: 'deno1',
      },
    });
    code.bind(new Stack());

    expect(transformSyncSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        loader: 'jsx',
        format: 'esm',
        platform: 'neutral',
        target: 'deno1',
      }),
    );
  });
});

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

    const stack = new Stack(new App(), 'Stack');
    const code = new InlineTypeScriptCode('let x: number = 1', {
      transformProvider,
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

    expect(transformSyncSpy).toHaveBeenCalledTimes(1);
    expect(processStdErrWriteSpy).toHaveBeenCalledWith(
      'Transforming inline code Stack/One/InlineTypeScriptCode...\n',
    );
    expect(processStdErrWriteSpy).toHaveBeenCalledWith(
      'Transforming inline code Stack/Two/InlineTypeScriptCode...\n',
    );
    processStdErrWriteSpy.mockRestore();
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

describe('with logLevel', () => {
  describe('not provided', () => {
    it('should default to "warning"', () => {
      const code = new InlineJavaScriptCode("const fruit = 'banana';", {
        transformProvider,
      });
      code.bind(new Stack());

      expect(transformSyncSpy).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
        logLevel: 'warning',
      }));
    });
  });

  describe('provided', () => {
    it('should use the provided logLevel', () => {
      const code = new InlineJavaScriptCode("const fruit = 'banana';", {
        transformProvider,
        transformOptions: {
          logLevel: 'silent',
        },
      });
      code.bind(new Stack());

      expect(transformSyncSpy).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
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
      const code = new InlineTypeScriptCode('let x: number = 1', {
        transformProvider,
      });
      code.bind(new Stack());

      expect(transformSyncSpy).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          color: derivedColor,
        }),
      );
    });

    it('should respect an explicit option', () => {
      const code = new InlineTypeScriptCode('let x: number = 1', {
        transformProvider,
        transformOptions: {
          color: false,
        },
      });
      code.bind(new Stack());

      expect(transformSyncSpy).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          color: false,
        }),
      );
    });
  });
});
