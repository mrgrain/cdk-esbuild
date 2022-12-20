import * as esbuild from 'esbuild';
import { BuildOptions, EsbuildProvider, TransformOptions } from '../src';

describe('Build API', () => {

  describe('given a custom esbuildBinaryPath', () => {
    it('should set the ESBUILD_BINARY_PATH env variable', () => {
      const mockLogger = jest.fn();

      expect(() => {
        const buildProvider = new EsbuildProvider(undefined, {
          esbuildBinaryPath: 'dummy-binary',
        });
        (buildProvider as any)._require = jest.fn(() => ({
          buildSync: (options: BuildOptions) => {
            mockLogger(process.env.ESBUILD_BINARY_PATH);
            esbuild.buildSync(options);
          },
        }));

        buildProvider.buildSync({});

      }).not.toThrow();

      expect(mockLogger).toHaveBeenCalledTimes(1);
      expect(mockLogger).toHaveBeenCalledWith('dummy-binary');
    });
  });

  describe('with an esbuild module path from', () => {
    const requireSpy = jest.fn(() => esbuild);

    beforeEach(() => {
      requireSpy.mockClear();
    });
    afterAll(() => {
      requireSpy.mockRestore();
    });

    describe('the default', () => {
      it('should call the esbuild provider with "esbuild"', () => {
        const provider = new EsbuildProvider();
        (provider as any)._require = requireSpy;
        provider.buildSync({});

        expect(requireSpy).toHaveBeenCalledTimes(1);
        expect(requireSpy).toHaveBeenCalledWith('esbuild');
      });
    });

    describe('`esbuildModulePath` prop', () => {
      it('should use the path from the prop', () => {
        const provider = new EsbuildProvider(
          undefined,
          { esbuildModulePath: '/path/provided/by/prop' },
        );
        (provider as any)._require = requireSpy;

        provider.buildSync({});

        expect(requireSpy).toHaveBeenCalledTimes(1);
        expect(requireSpy).toHaveBeenCalledWith('/path/provided/by/prop');
      });
    });

    describe('`CDK_ESBUILD_MODULE_PATH` env var', () => {
      beforeEach(() => {
        process.env.CDK_ESBUILD_MODULE_PATH = '/path/provided/by/env/var';
      });
      afterEach(() => {
        delete process.env.CDK_ESBUILD_MODULE_PATH;
      });

      it('should use the path from the env var', () => {
        const provider = new EsbuildProvider();
        (provider as any)._require = requireSpy;
        provider.buildSync({});

        expect(requireSpy).toHaveBeenCalledTimes(1);
        expect(requireSpy).toHaveBeenCalledWith('/path/provided/by/env/var');
      });

      describe('and `esbuildModulePath` prop', () => {
        it('should prefer the path from prop', () => {
          const provider = new EsbuildProvider(
            undefined,
            { esbuildModulePath: '/path/provided/by/prop' },
          );
          (provider as any)._require = requireSpy;

          provider.buildSync({});
          expect(requireSpy).toHaveBeenCalledTimes(1);
          expect(requireSpy).toHaveBeenCalledWith('/path/provided/by/prop');
        });
      });
    });
  });

  describe('given a broken module', () => {
    it('will report any issues', () => {
      expect(() => {
        const provider = new EsbuildProvider();
        (provider as any)._require = jest.fn().mockReturnValue(undefined);
        provider.buildSync({});

      }).toThrow('Cannot read prop');
    });
  });
});

describe('Transform API', () => {
  describe('given a custom esbuildBinaryPath', () => {
    it('should set the ESBUILD_BINARY_PATH env variable', () => {
      const mockLogger = jest.fn();

      expect(() => {
        const buildProvider = new EsbuildProvider(undefined, {
          esbuildBinaryPath: 'dummy-binary',
        });
        (buildProvider as any)._require = jest.fn(() => ({
          transformSync: (code: string, options: TransformOptions) => {
            mockLogger(process.env.ESBUILD_BINARY_PATH);
            return esbuild.transformSync(code, options);
          },
        }));

        buildProvider.transformSync('', {});

      }).not.toThrow();

      expect(mockLogger).toHaveBeenCalledTimes(1);
      expect(mockLogger).toHaveBeenCalledWith('dummy-binary');
    });
  });

  describe('with an esbuild module path from', () => {
    const requireSpy = jest.fn(() => esbuild);

    beforeEach(() => {
      requireSpy.mockClear();
    });
    afterAll(() => {
      requireSpy.mockRestore();
    });

    describe('the default', () => {
      it('should call the esbuild provider with "esbuild"', () => {
        const provider = new EsbuildProvider();
        (provider as any)._require = requireSpy;
        provider.transformSync('', {});

        expect(requireSpy).toHaveBeenCalledTimes(1);
        expect(requireSpy).toHaveBeenCalledWith('esbuild');
      });
    });

    describe('`esbuildModulePath` prop', () => {
      it('should use the path from the prop', () => {
        const provider = new EsbuildProvider(
          undefined,
          { esbuildModulePath: '/path/provided/by/prop' },
        );
        (provider as any)._require = requireSpy;

        provider.transformSync('', {});

        expect(requireSpy).toHaveBeenCalledTimes(1);
        expect(requireSpy).toHaveBeenCalledWith('/path/provided/by/prop');
      });
    });

    describe('`CDK_ESBUILD_MODULE_PATH` env var', () => {
      beforeEach(() => {
        process.env.CDK_ESBUILD_MODULE_PATH = '/path/provided/by/env/var';
      });
      afterEach(() => {
        delete process.env.CDK_ESBUILD_MODULE_PATH;
      });

      it('should use the path from the env var', () => {
        const provider = new EsbuildProvider();
        (provider as any)._require = requireSpy;
        provider.transformSync('', {});

        expect(requireSpy).toHaveBeenCalledTimes(1);
        expect(requireSpy).toHaveBeenCalledWith('/path/provided/by/env/var');
      });

      describe('and `esbuildModulePath` prop', () => {
        it('should prefer the path from prop', () => {
          const provider = new EsbuildProvider(
            undefined,
            { esbuildModulePath: '/path/provided/by/prop' },
          );
          (provider as any)._require = requireSpy;

          provider.transformSync('', {});
          expect(requireSpy).toHaveBeenCalledTimes(1);
          expect(requireSpy).toHaveBeenCalledWith('/path/provided/by/prop');
        });
      });
    });
  });

  describe('given a broken module', () => {
    it('will report any issues', () => {
      expect(() => {
        const provider = new EsbuildProvider();
        (provider as any)._require = jest.fn().mockReturnValue(undefined);
        provider.transformSync('');

      }).toThrow('Cannot read prop');
    });
  });
});
