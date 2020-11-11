import "@aws-cdk/assert/jest";
import { mocked } from "ts-jest/utils";
import { TypeScriptAsset } from "../lib/asset";
import * as util from "../lib/util";

jest.mock("../lib/util", () => ({
  findProjectRoot: jest.fn(),
}));

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
        () => new TypeScriptAsset("fixtures/handlers/ts-handler.ts")
      ).toThrow(/TypeScriptAsset: Cannot find project root/);
      expect(util.findProjectRoot).toBeCalledTimes(1);
    });
  });

  describe("entry is an absolute path", () => {
    it("should throw an exception", () => {
      expect(() => new TypeScriptAsset("/project/index.ts")).toThrow(
        /TypeScriptAsset: Entry must be a relative path/
      );
    });
  });
});
