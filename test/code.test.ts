import "@aws-cdk/assert/jest";
import { Stack } from "@aws-cdk/core";
import { Function, Runtime } from "@aws-cdk/aws-lambda";
import { resolve } from "path";
import { JavaScriptCode, TypeScriptCode } from "../lib/code";

describe("code", () => {
  describe("entry is an absolute path", () => {
    it("should throw an exception", () => {
      expect(() => {
        const stack = new Stack();

        const code = new JavaScriptCode("/project/index.js");

        new Function(stack, "MyFunction", {
          runtime: Runtime.NODEJS_14_X,
          handler: "index.handler",
          code,
        });
      }).toThrow(
        /MyFunction\/JavaScriptCode: Entry points must be a relative path/
      );
    });
  });

  describe("using a custom hash", () => {
    it("does not throw", () => {
      expect(() => {
        const stack = new Stack();

        const assetHash = "abcdefghij1234567890";
        const code = new TypeScriptCode("fixtures/handlers/ts-handler.ts", {
          assetHash,
          buildOptions: { absWorkingDir: resolve(__dirname) },
        });

        new Function(stack, "MyFunction", {
          runtime: Runtime.NODEJS_14_X,
          handler: "index.handler",
          code,
        });
      }).not.toThrow();
    });
  });

  describe("JavaScriptCode can be used", () => {
    it("should not throw", () => {
      expect(() => {
        const stack = new Stack();

        const code = new JavaScriptCode("fixtures/handlers/js-handler.js", {
          buildOptions: { absWorkingDir: resolve(__dirname) },
        });

        new Function(stack, "MyFunction", {
          runtime: Runtime.NODEJS_14_X,
          handler: "index.handler",
          code,
        });
      }).not.toThrow();
    });
  });

  describe("Map can be used for entry points", () => {
    it("should not throw", () => {
      expect(() => {
        const stack = new Stack();

        const code = new JavaScriptCode(
          { handler: "fixtures/handlers/js-handler.js" },
          {
            buildOptions: { absWorkingDir: resolve(__dirname) },
          }
        );

        new Function(stack, "MyFunction", {
          runtime: Runtime.NODEJS_14_X,
          handler: "index.handler",
          code,
        });
      }).not.toThrow();
    });
  });
});
