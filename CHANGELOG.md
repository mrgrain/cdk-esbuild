# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
