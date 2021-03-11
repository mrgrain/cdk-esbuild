import "@aws-cdk/assert/jest";
import { Stack } from "@aws-cdk/core";
import { resolve } from "path";
import { mocked } from "ts-jest/utils";
import { TypeScriptCode } from "../lib/code";
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
      expect(
        () => new TypeScriptCode("fixtures/handlers/ts-handler.ts")
      ).toThrow(/TypeScriptCode: Cannot find project root/);
      expect(util.findProjectRoot).toBeCalledTimes(1);
    });
  });

  describe("entry is an absolute path", () => {
    it("should throw an exception", () => {
      expect(() => new TypeScriptCode("/project/index.ts")).toThrow(
        /TypeScriptCode: Entry must be a relative path/
      );
    });
  });

  describe("using a custom hash", () => {
    it("does not throw", () => {
      const stack = new Stack();
      const assetHash = "abcdefghij1234567890";
      const code = new TypeScriptCode("fixtures/handlers/ts-handler.ts", {
        projectRoot: resolve(__dirname),
        assetHash,
      });

      expect(() => {
        code.bind(stack);
      }).not.toThrow();
    });
  });
});
