import "@aws-cdk/assert/jest";
import { BuildOptions, BuildResult, buildSync } from "esbuild";
import { mocked } from "ts-jest/utils";
import { BundlerPriority } from "../lib/bundlers";
import { EsbuildBundling } from "../lib/bundling";
import { printBuildMessages } from "../lib/formatMessages";

jest.mock("../lib/formatMessages", () => ({
  printBuildMessages: jest.fn(),
}));

jest.mock("esbuild", () => ({
  buildSync: jest.fn(),
}));

const realEsbuild = jest.requireActual("esbuild");

describe("bundling", () => {
  beforeEach(() => {
    mocked(printBuildMessages).mockReset();
  });

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
      expect(bundler?.buildOptions?.entryPoints).toContain("index.ts");
    });
  });

  describe("Given an outdir", () => {
    it("should append outdir behind the cdk asset directory", () => {
      const bundler = new EsbuildBundling(
        { absWorkingDir: "/project", entryPoints: ["index.ts"], outdir: "js" },
        { localBundling: true }
      );

      expect(bundler.buildOptions?.outdir).toBe("/asset-output/js");

      bundler.local?.tryBundle("cdk.out/123456", bundler);

      expect(mocked(buildSync)).toHaveBeenCalledWith(
        expect.objectContaining({
          outdir: "cdk.out/123456/js",
        })
      );
    });
  });

  describe("Given an outfile", () => {
    it("should set an outfile, inside the the cdk asset directory", () => {
      const bundler = new EsbuildBundling(
        {
          absWorkingDir: "/project",
          entryPoints: ["index.ts"],
          outfile: "index.js",
        },
        { localBundling: true }
      );

      expect(bundler.buildOptions?.outfile).toBe("/asset-output/index.js");

      bundler.local?.tryBundle("cdk.out/123456", bundler);

      expect(mocked(buildSync)).toHaveBeenCalledWith(
        expect.objectContaining({
          outdir: undefined,
          outfile: "cdk.out/123456/index.js",
        })
      );
    });
  });

  describe("Given an outdir and outfile", () => {
    beforeEach(() => {
      mocked(buildSync).mockImplementationOnce(
        (options: BuildOptions): BuildResult => {
          return realEsbuild.buildSync(options);
        }
      );
    });
    afterEach(() => {
      mocked(buildSync).mockReset();
    });

    it("should throw an exception", () => {
      expect(() => {
        const bundler = new EsbuildBundling(
          {
            absWorkingDir: "/project",
            entryPoints: ["index.ts"],
            outdir: "js",
            outfile: "index.js",
          },
          { localBundling: true }
        );
      }).toThrowError('Cannot use both "outfile" and "outdir"');
    });
  });

  describe("LocalBundling set to true", () => {
    it("should set a local bundler", () => {
      const bundler = new EsbuildBundling(
        {
          absWorkingDir: "/project",
          entryPoints: ["index.ts"],
          outfile: "index.js",
        },
        { localBundling: true }
      );

      expect(bundler.local).not.toBeUndefined();
    });
  });

  describe("LocalBundling set to false", () => {
    it("should NOT set a local bundler", () => {
      const bundler = new EsbuildBundling(
        {
          absWorkingDir: "/project",
          entryPoints: ["index.ts"],
          outfile: "index.js",
        },
        { localBundling: false }
      );

      expect(bundler.local).toBeUndefined();
    });
  });

  describe("Neither priority nor localBundling are set", () => {
    it("should set a local bundler", () => {
      const bundler = new EsbuildBundling({
        absWorkingDir: "/project",
        entryPoints: ["index.ts"],
        outfile: "index.js",
      });

      expect(bundler.local).not.toBeUndefined();
    });
  });

  describe("Priority is AttemptLocal", () => {
    beforeEach(() => {
      mocked(buildSync).mockImplementation(() => {
        throw new Error("a");
      });
    });

    afterEach(() => {
      mocked(buildSync).mockReset();
    });

    it("should set a local bundler", () => {
      const bundler = new EsbuildBundling(
        {
          absWorkingDir: "/project",
          entryPoints: ["indexA.ts"],
          outfile: "index.js",
        },
        {
          priority: BundlerPriority.AttemptLocal,
        }
      );

      expect(bundler.local).not.toBeUndefined();

      const result = bundler.local?.tryBundle("cdk.out/123456", bundler);

      expect(result).toBe(false);
      expect(mocked(printBuildMessages)).toHaveBeenCalledTimes(1);
      expect(mocked(printBuildMessages)).toHaveBeenLastCalledWith(
        expect.objectContaining({
          message: "a",
        }),
        expect.anything()
      );
    });
  });

  describe("Priority is LocalOnly", () => {
    beforeEach(() => {
      mocked(buildSync).mockImplementationOnce(() => {
        throw new Error("b");
      });
    });

    afterEach(() => {
      mocked(buildSync).mockReset();
    });

    it("should set a local bundler", () => {
      const bundler = new EsbuildBundling(
        {
          absWorkingDir: "/project",
          entryPoints: ["indexB.ts"],
          outfile: "index.js",
        },
        {
          priority: BundlerPriority.LocalOnly,
        }
      );

      expect(bundler.local).not.toBeUndefined();
      const result = bundler.local?.tryBundle("cdk.out/123456", bundler);

      expect(result).toBe(true);
      expect(mocked(printBuildMessages)).toHaveBeenCalledTimes(1);
      expect(mocked(printBuildMessages)).toHaveBeenLastCalledWith(
        expect.objectContaining({
          message: "b",
        }),
        expect.anything()
      );
    });
  });

  describe("Priority is DockerOnly", () => {
    it("should set a local bundler", () => {
      const bundler = new EsbuildBundling(
        {
          absWorkingDir: "/project",
          entryPoints: ["index.ts"],
          outfile: "index.js",
        },
        {
          priority: BundlerPriority.DockerOnly,
        }
      );

      expect(bundler.local).toBeUndefined();
    });
  });
});
