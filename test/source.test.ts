import "@aws-cdk/assert/jest";
import { RemovalPolicy, Stack } from "@aws-cdk/core";
import { Bucket } from "@aws-cdk/aws-s3";
import { BucketDeployment } from "@aws-cdk/aws-s3-deployment";
import { resolve } from "path";
import { mocked } from "ts-jest/utils";
import { JavaScriptSource, TypeScriptSource } from "../lib/source";
import * as util from "../lib/util";

jest.mock("../lib/util", () => {
  const originalModule = jest.requireActual("../lib/util");

  return {
    __esModule: true,
    ...originalModule,
    findProjectRoot: jest.fn(),
  };
});

describe("source", () => {
  describe("project root cannot be auto detected", () => {
    beforeEach(() => {
      mocked(util.findProjectRoot).mockReturnValue(undefined);
    });

    afterEach(() => {
      mocked(util.findProjectRoot).mockReset();
    });

    it("should throw an exception", () => {
      expect(() => {
        const stack = new Stack();

        const website = new TypeScriptSource("fixtures/handlers/ts-handler.ts");

        const websiteBucket = new Bucket(stack, "WebsiteBucket", {
          autoDeleteObjects: true,
          publicReadAccess: true,
          removalPolicy: RemovalPolicy.DESTROY,
          websiteIndexDocument: "index.html",
        });

        new BucketDeployment(stack, "DeployWebsite", {
          destinationBucket: websiteBucket,
          sources: [website],
        });
      }).toThrow(/DeployWebsite\/TypeScriptSource: Cannot find project root/);
      expect(util.findProjectRoot).toBeCalledTimes(1);
    });
  });

  describe("entry is an absolute path", () => {
    it("should throw an exception", () => {
      expect(() => {
        const stack = new Stack();

        const website = new TypeScriptSource("/root/handlers/ts-handler.ts");

        const websiteBucket = new Bucket(stack, "WebsiteBucket", {
          autoDeleteObjects: true,
          publicReadAccess: true,
          removalPolicy: RemovalPolicy.DESTROY,
          websiteIndexDocument: "index.html",
        });

        new BucketDeployment(stack, "DeployWebsite", {
          destinationBucket: websiteBucket,
          sources: [website],
        });
      }).toThrow(
        /DeployWebsite\/TypeScriptSource: Entrypoint must be a relative path/
      );
    });
  });

  describe("using a TypeScriptSource", () => {
    it("does not throw", () => {
      const stack = new Stack();

      const website = new TypeScriptSource("fixtures/handlers/ts-handler.ts", {
        projectRoot: resolve(__dirname),
      });

      const websiteBucket = new Bucket(stack, "WebsiteBucket", {
        autoDeleteObjects: true,
        publicReadAccess: true,
        removalPolicy: RemovalPolicy.DESTROY,
        websiteIndexDocument: "index.html",
      });

      new BucketDeployment(stack, "DeployWebsite", {
        destinationBucket: websiteBucket,
        sources: [website],
      });
    });
  });

  describe("using a JavaScriptSource", () => {
    it("does not throw", () => {
      const stack = new Stack();

      const website = new JavaScriptSource("fixtures/handlers/js-handler.js", {
        projectRoot: resolve(__dirname),
      });

      const websiteBucket = new Bucket(stack, "WebsiteBucket", {
        autoDeleteObjects: true,
        publicReadAccess: true,
        removalPolicy: RemovalPolicy.DESTROY,
        websiteIndexDocument: "index.html",
      });

      new BucketDeployment(stack, "DeployWebsite", {
        destinationBucket: websiteBucket,
        sources: [website],
      });
    });
  });

  describe("using a custom hash", () => {
    it("does not throw", () => {
      expect(() => {
        const stack = new Stack();

        const assetHash = "abcdefghij1234567890";
        const website = new JavaScriptSource(
          "fixtures/handlers/js-handler.js",
          {
            projectRoot: resolve(__dirname),
            assetHash,
          }
        );

        const websiteBucket = new Bucket(stack, "WebsiteBucket", {
          autoDeleteObjects: true,
          publicReadAccess: true,
          removalPolicy: RemovalPolicy.DESTROY,
          websiteIndexDocument: "index.html",
        });

        new BucketDeployment(stack, "DeployWebsite", {
          destinationBucket: websiteBucket,
          sources: [website],
        });
      }).not.toThrow();
    });
  });
});
