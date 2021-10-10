import '@aws-cdk/assert/jest';
import { mocked } from 'ts-jest/utils';
import { EsbuildBundling } from '../src/bundling';
import { BuildOptions, BuildResult } from '../src/esbuild-types';
import { buildSync } from '../src/esbuild-wrapper';
import { printBuildMessages } from '../src/formatMessages';

jest.mock('../src/formatMessages', () => ({
  printBuildMessages: jest.fn(),
}));

jest.mock('esbuild', () => ({
  buildSync: jest.fn(),
}));

const realEsbuild = jest.requireActual('esbuild');

describe('bundling', () => {
  beforeEach(() => {
    mocked(printBuildMessages).mockReset();
  });

  describe('Given a project root path', () => {
    it('should keep the relative path for the local bundler', () => {
      const bundler = new EsbuildBundling(
        { absWorkingDir: '/project', entryPoints: ['index.ts'] },
      );
      expect(bundler.local?.buildOptions?.entryPoints).toContain('index.ts');
    });
  });

  describe('Given an outdir', () => {
    it('should append outdir behind the cdk asset directory', () => {
      const bundler = new EsbuildBundling(
        { absWorkingDir: '/project', entryPoints: ['index.ts'], outdir: 'js' },
      );

      expect(bundler.buildOptions?.outdir).toBe('js');

      bundler.local?.tryBundle('cdk.out/123456', bundler);

      expect(mocked(buildSync)).toHaveBeenCalledWith(
        expect.objectContaining({
          outdir: 'cdk.out/123456/js',
        }),
      );
    });
  });

  describe('Given an outfile', () => {
    it('should set an outfile, inside the the cdk asset directory', () => {
      const bundler = new EsbuildBundling(
        {
          absWorkingDir: '/project',
          entryPoints: ['index.ts'],
          outfile: 'index.js',
        },
      );

      expect(bundler.buildOptions?.outfile).toBe('index.js');

      bundler.local?.tryBundle('cdk.out/123456', bundler);

      expect(mocked(buildSync)).toHaveBeenCalledWith(
        expect.objectContaining({
          outdir: undefined,
          outfile: 'cdk.out/123456/index.js',
        }),
      );
    });
  });

  describe('Given an outdir and outfile', () => {
    beforeEach(() => {
      mocked(buildSync).mockImplementationOnce(
        (options: BuildOptions): BuildResult => {
          return realEsbuild.buildSync(options);
        },
      );
    });
    afterEach(() => {
      mocked(buildSync).mockReset();
    });

    it('should throw an exception', () => {
      expect(() => {
        new EsbuildBundling(
          {
            absWorkingDir: '/project',
            entryPoints: ['index.ts'],
            outdir: 'js',
            outfile: 'index.js',
          },
        );
      }).toThrowError('Cannot use both "outfile" and "outdir"');
    });
  });
});
