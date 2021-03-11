import "@aws-cdk/assert/jest";
import { EsbuildBundling } from "../lib/bundling";

jest.mock("esbuild", () => ({
  buildSync: jest.fn(),
}));

describe("Bundling", () => {
  describe("Given a project root path", () => {
    it("should append the entry path to the project root for the local bundler", () => {
      const bundler = new EsbuildBundling("/project", "index.ts", {}, true);
      expect(bundler.local?.options?.entryPoints).toContain(
        "/project/index.ts"
      );
    });

    it("should keep the relative entry path for the docker bundler", () => {
      const bundler = new EsbuildBundling("/project", "index.ts", {}, true);
      expect(bundler?.options?.entryPoints).toContain("index.ts");
    });
  });
});
