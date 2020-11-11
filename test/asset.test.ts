import "@aws-cdk/assert/jest";
import { mocked } from "ts-jest/utils";
import { TypeScriptAsset } from "../lib/index";
import * as util from "../lib/util";

jest.mock("../lib/util", () => ({
  findUp: jest.fn(),
  nodeMajorVersion: jest.fn().mockReturnValue(10),
}));

describe("asset", () => {
  describe("project root cannot be auto detected", () => {
    beforeEach(() => {
      mocked(util.findUp).mockReturnValue(undefined);
    });

    afterEach(() => {
      mocked(util.findUp).mockReset();
    });

    it("should throw an exception", () => {
      expect(
        () => new TypeScriptAsset("fixtures/handlers/ts-handler.ts")
      ).toThrow(/Cannot find project root/);
      expect(util.findUp).toBeCalledTimes(4);
    });
  });
});
