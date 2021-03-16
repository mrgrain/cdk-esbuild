import "@aws-cdk/assert/jest";
import { buildSync } from "esbuild";
import { mocked } from "ts-jest/utils";
import { EsbuildBundling } from "../lib/bundling";

jest.mock("esbuild", () => ({
  buildSync: jest.fn(),
}));

describe("Bundling", () => {
  describe("Given a project root path", () => {
    it("should keep the relative path for the local bundler", () => {
      const bundler = new EsbuildBundling(
        { absWorkingDir: "/project", entryPoints: ["index.ts"] },
        { localBundling: true }
      );
      expect(bundler.local?.buildOptions?.entryPoints).toContain("index.ts");
    });

    it("should keep the relative entry path for the docker bundler", () => {
      const bundler = new EsbuildBundling(
        { absWorkingDir: "/project", entryPoints: ["index.ts"] },
        { localBundling: true }
      );
      expect(bundler?.options?.entryPoints).toContain("index.ts");
    });
  });

  describe("Given an outdir", () => {
    it("should append outdir behind the cdk asset directory", () => {
      const bundler = new EsbuildBundling(
        { absWorkingDir: "/project", entryPoints: ["index.ts"], outdir: "js" },
        { localBundling: true }
      );

      expect(bundler.options?.outdir).toBe("/asset-output/js");

      bundler.local?.tryBundle("cdk.out/123456", bundler);

      expect(mocked(buildSync)).toHaveBeenCalledWith(
        expect.objectContaining({
          outdir: "cdk.out/123456/js",
        })
      );
    });
  });
});
