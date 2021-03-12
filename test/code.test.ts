import "@aws-cdk/assert/jest";
import { Stack } from "@aws-cdk/core";
import { Function, Runtime } from "@aws-cdk/aws-lambda";
import { resolve } from "path";
import { mocked } from "ts-jest/utils";
import { JavaScriptCode, TypeScriptCode, JavaScriptAsset } from "../lib/code";
import * as util from "../lib/util";

jest.mock("../lib/util", () => {
  const originalModule = jest.requireActual("../lib/util");

  return {
    __esModule: true,
    ...originalModule,
    findProjectRoot: jest.fn(),
  };
});

describe("asset", () => {
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

        const code = new JavaScriptCode("fixtures/handlers/js-handler.js");

        new Function(stack, "MyFunction", {
          runtime: Runtime.NODEJS_14_X,
          handler: "index.handler",
          code,
        });
      }).toThrow(/MyFunction\/JavaScriptCode: Cannot find project root/);
      expect(util.findProjectRoot).toBeCalledTimes(1);
    });
  });

  describe("entry is an absolute path", () => {
    it("should throw an exception", () => {
      expect(() => {
        const stack = new Stack();

        const code = new TypeScriptCode("/project/index.ts");

        new Function(stack, "MyFunction", {
          runtime: Runtime.NODEJS_14_X,
          handler: "index.handler",
          code,
        });
      }).toThrow(
        /MyFunction\/TypeScriptCode: Entrypoints must be a relative path/
      );
    });
  });

  describe("using a custom hash", () => {
    it("does not throw", () => {
      expect(() => {
        const stack = new Stack();

        const assetHash = "abcdefghij1234567890";
        const code = new TypeScriptCode("fixtures/handlers/ts-handler.ts", {
          projectRoot: resolve(__dirname),
          assetHash,
        });

        new Function(stack, "MyFunction", {
          runtime: Runtime.NODEJS_14_X,
          handler: "index.handler",
          code,
        });
      }).not.toThrow();
    });
  });

  describe("deprecated asset name can be used", () => {
    beforeEach(() => {
      mocked(util.findProjectRoot).mockReturnValue(resolve(__dirname));
    });

    it("should not throw", () => {
      expect(() => {
        const stack = new Stack();

        const code = new JavaScriptAsset("fixtures/handlers/js-handler.js");

        new Function(stack, "MyFunction", {
          runtime: Runtime.NODEJS_14_X,
          handler: "index.handler",
          code,
        });
      }).not.toThrow();
    });
  });
});
