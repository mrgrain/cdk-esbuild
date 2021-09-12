# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.118.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.117.0...v1.118.0) (2021-09-12)


### Bug Fixes

* make error handing compatible to latest tsc version ([b5e36e2](https://github.com/mrgrain/cdk-esbuild/commit/b5e36e27481706ea5a7ac5f8c05d74418b07c125))

## [1.117.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.116.0...v1.117.0) (2021-08-08)

- works with cdk-1.117.0

## [1.116.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.115.0...v1.116.0) (2021-08-08)

- works with cdk-1.116.0

## [1.115.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.114.0...v1.115.0) (2021-08-08)

- works with cdk-1.115.0

## [1.114.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.113.0...v1.114.0) (2021-08-08)

- works with cdk-1.114.0

## [1.113.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.112.0...v1.113.0) (2021-08-08)

- works with cdk-1.113.0

## [1.112.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.111.0...v1.112.0) (2021-08-08)

- works with cdk-1.112.0

## [1.111.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.110.0...v1.111.0) (2021-08-08)

- works with cdk-1.111.0

## [1.110.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.109.0...v1.110.0) (2021-06-24)

- works with cdk-1.110.0

## [1.109.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.108.0...v1.109.0) (2021-06-24)

- works with cdk-1.109.0

## [1.108.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.107.0...v1.108.0) (2021-06-09)

- works with cdk-1.108.0

## [1.107.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.106.0...v1.107.0) (2021-06-03)

- works with cdk-1.107.0

## [1.106.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.105.0...v1.106.0) (2021-05-31)

- works with cdk-1.106.0

## [1.105.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.104.0...v1.105.0) (2021-05-19)

- works with cdk-1.105.0

### ⚠️ BREAKING CHANGES TO EXPERIMENTAL FEATURES

- upgraded esbuild to [v0.12.0](https://github.com/evanw/esbuild/releases/tag/v0.12.0) which contains backwards-incompatible changes (mostly related to CSS bundling)

## [1.104.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.103.0...v1.104.0) (2021-05-19)

- works with cdk-1.104.0 ([fb0de78](https://github.com/mrgrain/cdk-esbuild/commit/fb0de78faf29815045822b8e80b2bbb07b8f7cbf))

## [1.103.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.102.0...v1.103.0) (2021-05-13)

- works with cdk-1.103.0

### ⚠️ BREAKING CHANGES TO EXPERIMENTAL FEATURES

- removed deprecated `forceDockerBundling` and `localBundling` ([cc40b90](https://github.com/mrgrain/cdk-esbuild/commit/cc40b900acd8cba725e31db0a79cd3f8b711277e))

## [1.102.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.101.0...v1.102.0) (2021-05-04)

- works with cdk-1.102.0 ([c616c1b](https://github.com/mrgrain/cdk-esbuild/commit/c616c1ba07a9bdd11f3dc3369b1335918458800f))

### Features

- new high-level constructs prop `bundlerPriority` to replace deprecated `forceDockerBundling` ([cc4c933](https://github.com/mrgrain/cdk-esbuild/commit/cc4c93376cf3a8628edd696fe9fa8f65a09c7e21))
- **examples/lambda:** added new complete example for lambda function ([f8ca3c0](https://github.com/mrgrain/cdk-esbuild/commit/f8ca3c093a11f1d56b9f08cd0a4f3b3eaecd5690))

### Bug Fixes

- **examples/website:** changed start command to work with latest esbuild versions ([45b4c91](https://github.com/mrgrain/cdk-esbuild/commit/45b4c91b454a9520e3aca4ff66ed75abc2ea7d4a))

## [1.101.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.100.0...v1.101.0) (2021-05-01)

- works with cdk-1.101.0

### Features

- pretty print esbuild build errors and warnings when using local bundler ([7f15bed](https://github.com/mrgrain/cdk-esbuild/commit/7f15bedbdfb619c2d0767bc37458108e01c3a85e))
- pretty print esbuild transform errors and warnings ([1eeeb10](https://github.com/mrgrain/cdk-esbuild/commit/1eeeb10ca6b1e46452c55792d28429986eb4b09f))
- set bundling priority explicitly, deprecating `localBundling` in favour of `priority` ([425665a](https://github.com/mrgrain/cdk-esbuild/commit/425665a2f8f20bb557119e79e3354a4d9d696d24))

## [1.100.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.100.0-beta.1...v1.100.0) (2021-05-01)

- no changes, cdk version constraints are now less strict

## [1.99.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.98.0...v1.99.0) (2021-04-19)

- update to cdk-1.99.0 ([cfffb19](https://github.com/mrgrain/cdk-esbuild/commit/cfffb1901f8567ea81de3e7f746d8cffd50b4bcc))

## [1.98.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.97.0...v1.98.0) (2021-04-13)

- update to cdk-1.98.0 ([0165256](https://github.com/mrgrain/cdk-esbuild/commit/0165256d26a2b24b45b17cb747f63eff26c983d1))

## [1.97.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.96.0...v1.97.0) (2021-04-11)

- update to cdk-1.97.0 ([fedb40a](https://github.com/mrgrain/cdk-esbuild/commit/fedb40a3098cd3b2de5b113d79a2edd185789fde))

### ⚠️ BREAKING CHANGES TO EXPERIMENTAL FEATURES

- esbuild minimum version updated to `^0.11.0` which includes [breaking changes re how some files are interpreted](https://github.com/evanw/esbuild/releases/tag/v0.10.0) as well as [updated behaviour for entry points](https://github.com/evanw/esbuild/releases/tag/v0.11.0); please check esbuild's change log ([35c9046](https://github.com/mrgrain/cdk-esbuild/commit/35c904666415797eb5e5f09add47edfe2979303e))
- use esbuild's handling of `process.env.NODE_ENV`, notably the value will now be set to `development` unless [minification](https://esbuild.github.io/api/#minify) is enabled ([04bc5ed](https://github.com/mrgrain/cdk-esbuild/commit/04bc5edb1eb40b42499ffb9dfd78dac28fea7602))

### Features

- support object maps for entry points ([62a4431](https://github.com/mrgrain/cdk-esbuild/commit/62a4431572a4b32acd45c569405d19244b1aa76a))

## [1.96.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.95.0...v1.96.0) (2021-04-11)

- update to cdk-1.96.0 ([ae26510](https://github.com/mrgrain/cdk-esbuild/commit/ae2651026617646833303f0b9259d564765273d5))

### ⚠️ BREAKING CHANGES TO EXPERIMENTAL FEATURES

- removed deprecated `projectRoot` prop, please use `buildOptions.absWorkingPath` instead ([40e7ab0](https://github.com/mrgrain/cdk-esbuild/commit/40e7ab0ccd6fa52727f548168cbbc05afcfe4b16))

## [1.95.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.94.1...v1.95.0) (2021-03-28)

- update to cdk-1.95.0 ([0a98ef3](https://github.com/mrgrain/cdk-esbuild/commit/0a98ef311d92e1366f535bf18d7a5f10ac6ad02a))

### ⚠️ BREAKING CHANGES TO EXPERIMENTAL FEATURES

- exported `TypeScriptAsset` & `JavaScriptAsset` are now implementing `s3.Asset` and replace the previously deprecated aliases for code classes of the same name; replace any previous use with `TypeScriptCode` & `JavaScriptCode` for lambda functions ([9b86eab](https://github.com/mrgrain/cdk-esbuild/commit/9b86eab91f82e66088a25248d7a4c754dbe73d85))

### Features

- added various InlineCode constructs using the transform api ([6ef1c97](https://github.com/mrgrain/cdk-esbuild/commit/6ef1c9756f22256c008e1f9725ea3b5b5a176e3c))
- support added for `outfile` build option ([90ef5ec](https://github.com/mrgrain/cdk-esbuild/commit/90ef5ecb5906e0f2fc76a933b9f0067f1aae6428))

### [1.94.1](https://github.com/mrgrain/cdk-esbuild/compare/v1.94.0...v1.94.1) (2021-03-17)

### Bug Fixes

- change cdk version constraints to work with patches ([fa0fa5f](https://github.com/mrgrain/cdk-esbuild/commit/fa0fa5fbdf608b14faf7a5e6132016fb6f2e393e))

## [1.94.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.93.1...v1.94.0) (2021-03-16)

- update to cdk-1.94.0 ([1623339](https://github.com/mrgrain/cdk-esbuild/commit/162333930a7534277c5ce4318f81df1fc954fe5e))

### ⚠️ BREAKING CHANGES TO EXPERIMENTAL FEATURES

- deprecated ~~`TypeScriptAsset`~~ & ~~`JavaScriptAsset`~~ in favour of `TypeScriptCode` & `JavaScriptCode` ([f31074e](https://github.com/mrgrain/cdk-esbuild/commit/f31074eeeca039dc847f199eeff88313b61605a1))
- deprecated ~~`projectRoot`~~ in favour of `buildOptions.absWorkDir` ([ef7ae23](https://github.com/mrgrain/cdk-esbuild/commit/ef7ae237827e381fa2708d67a2d68214a33ab41b)) \
  Now `absWorkDir` will take priority, then `projectRoot`. If neither are provided it falls back to the current working directory, which is esbuild's default behaviour. \
  **The automatic project root detection has been removed.**
- upgraded esbuild dependency requirement to `^0.9.0` which [contains breaking changes](https://github.com/evanw/esbuild/releases/tag/v0.9.0) ([f27d987](https://github.com/mrgrain/cdk-esbuild/commit/f27d987183034d4fbf88905769d8cd7d3f93db4a))

### Features

- set sensible defaults for website deployment ([a7a925d](https://github.com/mrgrain/cdk-esbuild/commit/a7a925da367d88184058719a56af55882e7c7aff))
- new `copyDir` prop to copy additional files into the output ([1dccb25](https://github.com/mrgrain/cdk-esbuild/commit/1dccb254c189500dc48371eeeeed0545c3116863))
- support for multiple `entryPoints` ([e41757b](https://github.com/mrgrain/cdk-esbuild/commit/e41757bb634d24d4c45ecf98ba981d28df258ce6))
- `bundleOptions.outdir` can now be provided as an additional path prefix for rendered files in the auto-generated cdk output directory ([9be0f62](https://github.com/mrgrain/cdk-esbuild/commit/9be0f626460b5fd1c4bfa131a5f57124bbdb4129))

## [1.93.1](https://github.com/mrgrain/cdk-esbuild/compare/v1.93.0...v1.93.1) (2021-03-12)

Required release to make version available on npm.

## [1.93.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.92.0...v1.93.0) (2021-03-12)

- update to cdk-1.93.0 ([2dd043b](https://github.com/mrgrain/cdk-esbuild/commit/2dd043b49b606dc6ebcf13c435a5665f5028fce5))

### ⚠️ BREAKING CHANGES TO EXPERIMENTAL FEATURES

- `projectRoot` auto detection now searches upwards from the entry point, instead of current working directory
- deprecated ~~`TypeScriptAsset`~~ & ~~`JavaScriptAsset`~~ in favour of `TypeScriptCode` & `JavaScriptCode` ([f31074e](https://github.com/mrgrain/cdk-esbuild/commit/f31074eeeca039dc847f199eeff88313b61605a1))

### Features

- added implementation of S3 deployment source which can be used for static website deployment ([f31074e](https://github.com/mrgrain/cdk-esbuild/commit/f31074eeeca039dc847f199eeff88313b61605a1))
