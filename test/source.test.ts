import { resolve } from 'path';
import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment } from 'aws-cdk-lib/aws-s3-deployment';
import { mocked } from 'jest-mock';
import { esbuild } from '../src/esbuild-wrapper';
import { JavaScriptSource, TypeScriptSource } from '../src/source';

const buildSync = esbuild().buildSync;

describe('source', () => {
  describe('entrypoint is an absolute path', () => {
    describe('outside of the esbuild working dir', () => {
      it('should throw an exception', () => {
        expect(() => {
          const stack = new Stack();

          const website = new TypeScriptSource('/root/handlers/ts-handler.ts');

          const websiteBucket = new Bucket(stack, 'WebsiteBucket', {
            autoDeleteObjects: true,
            publicReadAccess: true,
            removalPolicy: RemovalPolicy.DESTROY,
            websiteIndexDocument: 'index.html',
          });

          new BucketDeployment(stack, 'DeployWebsite', {
            destinationBucket: websiteBucket,
            sources: [website],
          });
        }).toThrow(
          /DeployWebsite\/TypeScriptSource: Entry points must be part of the working directory/,
        );
      });
    });

    describe('within of the esbuild working dir', () => {
      it('should be fine and rewrite the entrypoint', () => {
        const customBuild = jest.fn(buildSync);

        expect(() => {
          const stack = new Stack();

          // require.resolve() will return an absolute path
          const website = new TypeScriptSource({
            js: require.resolve('./fixtures/handlers/js-handler'),
            ts: require.resolve('./fixtures/handlers/ts-handler'),
          }, {
            buildFn: customBuild,
          });

          const websiteBucket = new Bucket(stack, 'WebsiteBucket', {
            autoDeleteObjects: true,
            publicReadAccess: true,
            removalPolicy: RemovalPolicy.DESTROY,
            websiteIndexDocument: 'index.html',
          });

          new BucketDeployment(stack, 'DeployWebsite', {
            destinationBucket: websiteBucket,
            sources: [website],
          });
        }).not.toThrow();

        expect(mocked(customBuild)).toHaveBeenCalledWith(
          expect.objectContaining({
            entryPoints: expect.objectContaining({
              js: 'test/fixtures/handlers/js-handler.js',
              ts: 'test/fixtures/handlers/ts-handler.ts',
            }),
          }),
        );
      });
    });
  });

  describe('using a TypeScriptSource', () => {
    it('does not throw', () => {
      expect(() => {
        const stack = new Stack();

        const website = new TypeScriptSource('fixtures/handlers/ts-handler.ts', {
          buildOptions: {
            absWorkingDir: resolve(__dirname),
          },
        });

        const websiteBucket = new Bucket(stack, 'WebsiteBucket', {
          autoDeleteObjects: true,
          publicReadAccess: true,
          removalPolicy: RemovalPolicy.DESTROY,
          websiteIndexDocument: 'index.html',
        });

        new BucketDeployment(stack, 'DeployWebsite', {
          destinationBucket: websiteBucket,
          sources: [website],
        });
      }).not.toThrow();
    });
  });

  describe('using a JavaScriptSource', () => {
    it('does not throw', () => {
      expect(() => {
        const stack = new Stack();

        const website = new JavaScriptSource('fixtures/handlers/js-handler.js', {
          buildOptions: {
            absWorkingDir: resolve(__dirname),
          },
        });

        const websiteBucket = new Bucket(stack, 'WebsiteBucket', {
          autoDeleteObjects: true,
          publicReadAccess: true,
          removalPolicy: RemovalPolicy.DESTROY,
          websiteIndexDocument: 'index.html',
        });

        new BucketDeployment(stack, 'DeployWebsite', {
          destinationBucket: websiteBucket,
          sources: [website],
        });
      }).not.toThrow();
    });
  });

  describe('using a custom hash', () => {
    it('does not throw', () => {
      expect(() => {
        const stack = new Stack();

        const assetHash = 'abcdefghij1234567890';
        const website = new JavaScriptSource(
          'fixtures/handlers/js-handler.js',
          {
            assetHash,
            buildOptions: {
              absWorkingDir: resolve(__dirname),
            },
          },
        );

        const websiteBucket = new Bucket(stack, 'WebsiteBucket', {
          autoDeleteObjects: true,
          publicReadAccess: true,
          removalPolicy: RemovalPolicy.DESTROY,
          websiteIndexDocument: 'index.html',
        });

        new BucketDeployment(stack, 'DeployWebsite', {
          destinationBucket: websiteBucket,
          sources: [website],
        });
      }).not.toThrow();
    });
  });

  describe('default build options', () => {
    it('does not override provided values', () => {
      const source = new JavaScriptSource('fixtures/handlers/js-handler.js', {
        buildOptions: {
          platform: 'neutral',
          define: {},
        },
      }) as any;

      expect(source.props.buildOptions.platform).toBe('neutral');
      expect(Object.keys(source.props.buildOptions.define).length).toBe(0);
    });

    it('platform=browser', () => {
      const source = new JavaScriptSource(
        'fixtures/handlers/js-handler.js',
      ) as any;

      expect(source.props.buildOptions.platform).toBe('browser');
    });
  });
});
