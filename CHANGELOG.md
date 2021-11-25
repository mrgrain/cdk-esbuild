
## [2.1.0](https://github.com/mrgrain/cdk-esbuild/compare/v2.0.0...v2.1.0) (2021-11-25)


### Features

* escape hatch to provide a custom build or transform function ([#141](https://github.com/mrgrain/cdk-esbuild/issues/141)) ([aacfac1](https://github.com/mrgrain/cdk-esbuild/commit/aacfac1b71f1de78fbfdc1161c6e8cf32fd0629e))


### Bug Fixes

* make source tests more explicit ([#140](https://github.com/mrgrain/cdk-esbuild/issues/140)) ([b8cea99](https://github.com/mrgrain/cdk-esbuild/commit/b8cea99c39382fdef71e12c1f314d313e2f7e6f9))
* upgrade-main is broken, remove it ([#135](https://github.com/mrgrain/cdk-esbuild/issues/135)) ([1259907](https://github.com/mrgrain/cdk-esbuild/commit/12599075c73648af8162e016fe1979b625481cf5))
* use image with npm8 ([#134](https://github.com/mrgrain/cdk-esbuild/issues/134)) ([eb961cd](https://github.com/mrgrain/cdk-esbuild/commit/eb961cd147a990966f72bb6ca3aa5d698e67100d))

## [2.0.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.129.0...v2.0.0) (2021-11-07)

### ⚠ BREAKING CHANGES

- Major release of this package to make it JSII compatible (#114) ([727c78a](https://github.com/mrgrain/cdk-esbuild/commit/727c78aefa2079d0f561b8b664d75eb6c669e46b)), closes [#114](https://github.com/mrgrain/cdk-esbuild/issues/114) [#117](https://github.com/mrgrain/cdk-esbuild/issues/117) [#119](https://github.com/mrgrain/cdk-esbuild/issues/119) [#120](https://github.com/mrgrain/cdk-esbuild/issues/120) [#123](https://github.com/mrgrain/cdk-esbuild/issues/123)

- Deprecated features from v1 have been removed. Please see upgrading instructions below.

### Upgrading to v2

- Update the package dependency to v2: `npm install --save @mrgrain/cdk-esbuild@^2.0.0`
- `esbuild` is now installed as an optional dependency. If your setup does not automatically install optional dependencies, add it as an explicit dependency.
- Remove any use of `bundlerPriority`.
- Unstable construct `EsbuildBundling` has been renamed to `EsbuildBundler` and its interface has slightly changed. Like most other constructs, it now takes `entryPoints` as first parameter, with an optional `props` object as the second.

### Features

- JSII compatibility & v2 GA (#114) ([727c78a](https://github.com/mrgrain/cdk-esbuild/commit/727c78aefa2079d0f561b8b664d75eb6c669e46b)), closes [#114](https://github.com/mrgrain/cdk-esbuild/issues/114) [#117](https://github.com/mrgrain/cdk-esbuild/issues/117) [#119](https://github.com/mrgrain/cdk-esbuild/issues/119) [#120](https://github.com/mrgrain/cdk-esbuild/issues/120) [#123](https://github.com/mrgrain/cdk-esbuild/issues/123)

- Synthesize `esbuild` types from source ([#117](https://github.com/mrgrain/cdk-esbuild/issues/117)) ([af44d55](https://github.com/mrgrain/cdk-esbuild/commit/af44d55e97db6fd8fbda916eb0f25dae55513cba))

- Generated docs now contain links to esbuild documentation ([#123](https://github.com/mrgrain/cdk-esbuild/issues/123)) ([95f2fd0](https://github.com/mrgrain/cdk-esbuild/commit/95f2fd07330cf9624dd05f23345bfe0f5754fc57))
