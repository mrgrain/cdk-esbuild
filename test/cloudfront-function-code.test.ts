import { App, Stack } from 'aws-cdk-lib';
import { Function as CloudFrontFunction } from 'aws-cdk-lib/aws-cloudfront';
import { CloudFrontTypeScriptCode, CloudFrontFunctionRuntime } from '../src';

describe('CloudFrontTypeScriptCode', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
  });

  describe('fromFile', () => {
    test('creates CloudFront function with TypeScript code from file', () => {
      const code = CloudFrontTypeScriptCode.fromFile('test/fixtures/handlers/cf-handler.ts');

      const fn = new CloudFrontFunction(stack, 'TestFunction', {
        code,
      });

      expect(fn.functionName).toBeDefined();
    });

    test('applies CloudFront-specific build options', () => {
      const code = CloudFrontTypeScriptCode.fromFile('test/fixtures/handlers/cf-handler.ts', {
        buildOptions: {
          define: { 'process.env.NODE_ENV': '"production"' },
        },
      });

      const bundler = (code as any).bundler;
      const buildOptions = (bundler as any).props.buildOptions;

      expect(buildOptions.format).toBe('esm');
      expect(buildOptions.target).toBe('es5');
      expect(buildOptions.platform).toBe('neutral');
      expect(buildOptions.minify).toBe(false);
      expect(buildOptions.minifyWhitespace).toBe(true);
      expect(buildOptions.minifySyntax).toBe(true);
      expect(buildOptions.minifyIdentifiers).toBe(false);
      expect(buildOptions.bundle).toBe(true);
      expect(buildOptions.define).toEqual({ 'process.env.NODE_ENV': '"production"' });
    });

    test('renders bundled code', () => {
      const code = CloudFrontTypeScriptCode.fromFile('test/fixtures/handlers/cf-handler.ts');

      const bundledCode = code.render();
      expect(typeof bundledCode).toBe('string');
      expect(bundledCode.trim().length).toBeGreaterThan(0);
      expect(bundledCode).toContain('function');
    });

    test('warns when handler is not exported', () => {
      const emitWarningSpy = jest.spyOn(process, 'emitWarning');

      const code = CloudFrontTypeScriptCode.fromFile('test/fixtures/handlers/cf-handler-no-export.ts');
      code.render();

      expect(emitWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining('CloudFrontTypeScriptCode produced an empty file'),
        'EmptyCloudFrontTypeScriptCodeWarning',
      );
      expect(emitWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining('cf-handler-no-export.ts'),
        'EmptyCloudFrontTypeScriptCodeWarning',
      );

      emitWarningSpy.mockRestore();
    });
  });

  describe('runtime version differences', () => {
    test('V1 runtime rejects const/let', () => {
      const code = CloudFrontTypeScriptCode.fromInline('const x = 42; console.log(x);', {
        runtime: CloudFrontFunctionRuntime.JS_1_0,
      });

      expect(() => code.render()).toThrow();
    });

    test('V1 runtime rejects async/await', () => {
      const code = CloudFrontTypeScriptCode.fromInline('async function test() { await Promise.resolve(); }', {
        runtime: CloudFrontFunctionRuntime.JS_1_0,
      });

      expect(() => code.render()).toThrow();
    });

    test('V2 runtime accepts const/let', () => {
      const code = CloudFrontTypeScriptCode.fromInline('const x = 42; console.log(x);', {
        runtime: CloudFrontFunctionRuntime.JS_2_0,
      });

      const result = code.render();
      expect(result).toBeTruthy();
    });
  });

  describe('fromInline', () => {
    test('creates CloudFront function with inline TypeScript code', () => {
      const code = CloudFrontTypeScriptCode.fromInline('console.log("Hello CloudFront");');

      const fn = new CloudFrontFunction(stack, 'TestFunction', {
        code,
      });

      expect(fn.functionName).toBeDefined();
    });

    test('renders transformed inline code', () => {
      const code = CloudFrontTypeScriptCode.fromInline('var x = 42; console.log(x);');

      const renderedCode = code.render();
      expect(typeof renderedCode).toBe('string');
      expect(renderedCode.length).toBeGreaterThan(0);
    });

    test('warns when inline handler is not exported', () => {
      const emitWarningSpy = jest.spyOn(process, 'emitWarning');

      const code = CloudFrontTypeScriptCode.fromInline('function handler(event) { return { statusCode: 200 }; }');
      code.render();

      expect(emitWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining('CloudFrontTypeScriptCode produced an empty file'),
        'EmptyCloudFrontTypeScriptCodeWarning',
      );

      emitWarningSpy.mockRestore();
    });
  });
});
