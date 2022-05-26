import { FileSystem } from 'aws-cdk-lib';
import { mocked } from 'jest-mock';
import { EsbuildBundler } from '../src/bundler';
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
      const bundler = new EsbuildBundler(
        ['index.ts'],
        { buildOptions: { absWorkingDir: '/project' } },
      );
      expect(bundler.entryPoints).toContain('index.ts');
    });
  });

  describe('Given an outdir', () => {
    it('should append outdir behind the cdk asset directory', () => {
      const bundler = new EsbuildBundler(
        ['index.ts'],
        { buildOptions: { absWorkingDir: '/project', outdir: 'js' } },
      );

      expect(bundler.props?.buildOptions?.outdir).toBe('js');

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
      const bundler = new EsbuildBundler(
        ['index.ts'],
        {
          buildOptions: {
            absWorkingDir: '/project',
            outfile: 'index.js',
          },
        },
      );

      expect(bundler.props?.buildOptions?.outfile).toBe('index.js');

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
        new EsbuildBundler(
          ['index.ts'],
          {
            buildOptions: {
              absWorkingDir: '/project',
              outdir: 'js',
              outfile: 'index.js',
            },
          },
        );
      }).toThrowError('Cannot use both "outfile" and "outdir"');
    });
  });


  describe('Given a custom build function', () => {
    it('should call my build function', () => {
      const customBuild = jest.fn().mockImplementation(() => ({
        errors: [],
        warnings: [],
      }));


      const bundler = new EsbuildBundler(
        ['index.ts'],
        {
          buildOptions: { absWorkingDir: '/project', outdir: 'js' },
          buildFn: customBuild,
        },
      );

      bundler.local?.tryBundle('cdk.out/123456', bundler);

      expect(mocked(customBuild)).toHaveBeenCalledWith(
        expect.objectContaining({
          outdir: 'cdk.out/123456/js',
        }),
      );
    });
  });

  describe('Given a copyDir', () => {
    const assetOutputDir = 'cdk.out/asset.123456';
    const originalCopyDirectory = FileSystem.copyDirectory;
    const copyDirectoryMock = jest.fn();

    beforeEach(() => {
      FileSystem.copyDirectory = copyDirectoryMock;
    });
    afterEach(() => {
      copyDirectoryMock.mockReset();
      FileSystem.copyDirectory = originalCopyDirectory;
    });

    describe('and it is a string', () => {
      it('should copy one directory into the root of the asset output directory', () => {
        const bundler = new EsbuildBundler(
          ['index.ts'],
          {
            buildOptions: { absWorkingDir: '/project' },
            copyDir: 'additionalData',
          },
        );

        bundler.local?.tryBundle(assetOutputDir, bundler);

        expect(copyDirectoryMock).toHaveBeenCalledTimes(1);
        expect(copyDirectoryMock).toHaveBeenCalledWith(
          '/project/additionalData',
          expect.stringMatching(assetOutputDir),
        );
      });
    });

    describe('and it is an array', () => {
      it('should copy all listed directories into the root of the asset output directory', () => {
        const bundler = new EsbuildBundler(
          ['index.ts'],
          {
            buildOptions: { absWorkingDir: '/project' },
            copyDir: ['one', 'two', 'three'],
          },
        );

        bundler.local?.tryBundle(assetOutputDir, bundler);

        expect(copyDirectoryMock).toHaveBeenCalledTimes(3);
        expect(copyDirectoryMock).toHaveBeenLastCalledWith(
          '/project/three',
          expect.stringMatching(assetOutputDir),
        );
      });
    });

    describe('and it is a map', () => {
      it('should copy all listed copy sources to their respective targets within the asset output directory', () => {
        const bundler = new EsbuildBundler(
          ['index.ts'],
          {
            buildOptions: { absWorkingDir: '/project' },
            copyDir: {
              '.': ['one'],
              'nested/directory': ['two', 'three'],
              'complex/../nesting': 'nested/dir/four',
            },
          },
        );

        bundler.local?.tryBundle(assetOutputDir, bundler);

        expect(copyDirectoryMock).toHaveBeenCalledTimes(4);
        expect(copyDirectoryMock.mock.calls).toEqual([
          ['/project/one', expect.stringMatching(assetOutputDir)],
          ['/project/two', expect.stringMatching(assetOutputDir + '/nested/directory')],
          ['/project/three', expect.stringMatching(assetOutputDir + '/nested/directory')],
          ['/project/nested/dir/four', expect.stringMatching(assetOutputDir + '/nesting')],
        ]);
      });

      describe('and we are actually copying data', () => {
        beforeEach(() => {
          FileSystem.copyDirectory = originalCopyDirectory;
        });

        it('should copy all listed copy sources to their respective targets within the asset output directory', () => {
          const bundler = new EsbuildBundler(
            ['index.ts'],
            {
              copyDir: {
                '.': ['src'],
                'nested/directory': ['src'],
                'complex/../nesting': 'src',
              },
            },
          );

          expect(() => {
            bundler.local?.tryBundle(assetOutputDir, bundler);
          }).not.toThrowError();

          expect(copyDirectoryMock).toHaveBeenCalledTimes(0);
        });
      });

      it('should throw if we are trying to copy files outside of the asset outpur dir', () => {
        const bundler = new EsbuildBundler(
          ['index.ts'],
          {
            buildOptions: { absWorkingDir: '/project' },
            copyDir: {
              '..': 'not/allowed',
            },
          },
        );

        expect(() => {
          bundler.local?.tryBundle(assetOutputDir, bundler);
        }).toThrowError(
          'Cannot copy files to outside of the asset staging directory. See docs for details.',
        );

        expect(copyDirectoryMock).toHaveBeenCalledTimes(0);
      });

    });
  });
});
