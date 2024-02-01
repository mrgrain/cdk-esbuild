
### [5.0.11](https://github.com/mrgrain/cdk-esbuild/compare/v5.0.10...v5.0.11) (2024-02-01)

### [5.0.10](https://github.com/mrgrain/cdk-esbuild/compare/v5.0.9...v5.0.10) (2024-01-15)

### [5.0.9](https://github.com/mrgrain/cdk-esbuild/compare/v5.0.8...v5.0.9) (2024-01-01)


### Bug Fixes

* cannot have multiple TypeScriptCode in the same scope ([#1020](https://github.com/mrgrain/cdk-esbuild/issues/1020)) ([149b36c](https://github.com/mrgrain/cdk-esbuild/commit/149b36cb63d67cb652df7df7b7c771f91ec00638)), closes [#1016](https://github.com/mrgrain/cdk-esbuild/issues/1016)

### [5.0.8](https://github.com/mrgrain/cdk-esbuild/compare/v5.0.7...v5.0.8) (2023-12-24)


### Bug Fixes

* cannot have multiple assets in the same scope ([#1016](https://github.com/mrgrain/cdk-esbuild/issues/1016)) ([6777ba2](https://github.com/mrgrain/cdk-esbuild/commit/6777ba20c50b7f2de359b13783bbf036df03840a)), closes [#993](https://github.com/mrgrain/cdk-esbuild/issues/993)

### [5.0.7](https://github.com/mrgrain/cdk-esbuild/compare/v5.0.6...v5.0.7) (2023-12-15)

### [5.0.6](https://github.com/mrgrain/cdk-esbuild/compare/v5.0.5...v5.0.6) (2023-12-01)

### [5.0.5](https://github.com/mrgrain/cdk-esbuild/compare/v5.0.4...v5.0.5) (2023-11-15)

### [5.0.4](https://github.com/mrgrain/cdk-esbuild/compare/v5.0.3...v5.0.4) (2023-11-01)

### [5.0.3](https://github.com/mrgrain/cdk-esbuild/compare/v5.0.2...v5.0.3) (2023-10-15)

### [5.0.2](https://github.com/mrgrain/cdk-esbuild/compare/v5.0.1...v5.0.2) (2023-10-01)

### [5.0.1](https://github.com/mrgrain/cdk-esbuild/compare/v5.0.0...v5.0.1) (2023-09-15)

## [5.0.0-rc.0](https://github.com/mrgrain/cdk-esbuild/compare/v4.2.3...v5.0.0-rc.0) (2023-09-09)


### ⚠ BREAKING CHANGES

* `TsConfigOptions` renamed to `TsconfigRaw` which is the name esbuild uses.
* The JavaScript versions of all classes have been removed. They have been functionally identical to the TypeScript versions since the beginning. Please use the TypeScript versions of the classes going forward.
* Low-level experimental classes `EsbuildAsset` and `EsbuildCode` have been removed. Please use `TypeScriptAsset` and `TypeScriptCode` respectively.
* The required minimum version of `aws-cdk-lib` is now `2.51.0`. If you need to use an older version of `aws-cdk-lib`, please stay on v4.
* Support for node14 and node16 has been dropped. If you need to use one of these versions, please use [@mrgrain/cdk-esbuild@v4](https://github.com/mrgrain/cdk-esbuild/tree/v4)

### Features

* drop support for node14 and node16  ([#718](https://github.com/mrgrain/cdk-esbuild/issues/718)) ([9b76a6d](https://github.com/mrgrain/cdk-esbuild/commit/9b76a6df2f703b4e5fea421f836fd7b1e35eaf6a))
* set minimum `aws-cdk-lib` version to 2.51.0 ([#730](https://github.com/mrgrain/cdk-esbuild/issues/730)) ([b9064af](https://github.com/mrgrain/cdk-esbuild/commit/b9064afccd3e22177c9e7619feb49312d39a916d))
* update esbuild to ^0.19.0 ([#731](https://github.com/mrgrain/cdk-esbuild/issues/731)) ([37e376a](https://github.com/mrgrain/cdk-esbuild/commit/37e376a74b4925c6a1ae37a11e18f5191ffc0024))
* upgrade to jsii@5.1 and typescript@5.1 ([#665](https://github.com/mrgrain/cdk-esbuild/issues/665)) ([fd7404f](https://github.com/mrgrain/cdk-esbuild/commit/fd7404fdf93704ccffb4d334025df9a90b041b1c))

### [4.2.3](https://github.com/mrgrain/cdk-esbuild/compare/v4.2.2...v4.2.3) (2023-09-01)

### [4.2.2](https://github.com/mrgrain/cdk-esbuild/compare/v4.2.1...v4.2.2) (2023-08-15)

### [4.2.1](https://github.com/mrgrain/cdk-esbuild/compare/v4.2.0...v4.2.1) (2023-08-01)

## [4.2.0](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.13...v4.2.0) (2023-07-26)


### Features

* upgrade to esbuild@0.18.x ([#658](https://github.com/mrgrain/cdk-esbuild/issues/658)) ([dfc8fec](https://github.com/mrgrain/cdk-esbuild/commit/dfc8fec59b597db322fe7ebc32f7f63760dc89ac))

### [4.1.13](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.12...v4.1.13) (2023-07-26)

### [4.1.12](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.11...v4.1.12) (2023-07-26)

### [4.1.11](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.10...v4.1.11) (2023-07-15)

### [4.1.10](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.9...v4.1.10) (2023-07-01)

### [4.1.9](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.8...v4.1.9) (2023-06-15)

### [4.1.8](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.7...v4.1.8) (2023-05-15)

### [4.1.7](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.6...v4.1.7) (2023-05-01)

### [4.1.6](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.5...v4.1.6) (2023-04-15)

### [4.1.5](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.4...v4.1.5) (2023-04-01)

### [4.1.4](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.3...v4.1.4) (2023-03-15)

### [4.1.3](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.2...v4.1.3) (2023-03-01)

### [4.1.2](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.1...v4.1.2) (2023-02-15)

### [4.1.1](https://github.com/mrgrain/cdk-esbuild/compare/v4.1.0...v4.1.1) (2023-01-30)

## [4.1.0](https://github.com/mrgrain/cdk-esbuild/compare/v4.0.0...v4.1.0) (2023-01-14)


### Features

* upgrade to esbuild@^0.17.0 ([#358](https://github.com/mrgrain/cdk-esbuild/issues/358)) ([0fa4679](https://github.com/mrgrain/cdk-esbuild/commit/0fa467953023ecb6c7743f5061cb2e498fc32100))

## [4.0.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.13.0...v4.0.0) (2023-01-09)


### ⚠ BREAKING CHANGES

* New minimal version requirement of `aws-cdk-lib >= 2.12.0`. Versions before that depend on vulnerable packages and should not be used anymore. Please upgrade to a more recent version of `aws-cdk-lib`.
* New unified provider interface to replace `buildFn`, `transformFn`, `esbuildBinaryPath` and `esbuildModulePath`. Please configure the included `EsbuildProvider` for more options or provide a custom implementation as an escape hatch to `buildProvider` and `transformProvider` respectively.
* `props.copyDir` now removes the destination directory and any containing files if it exists. This will only affect edge cases when an asset has already been bundled and re-bundling is forced. Previously the destination directory would not have been cleared out, leading to outdated files being included in the bundle or an error message in same cases. The previous behavior was not correct and cannot be restored.
* The default format and platform `InlineXCode` classes has been changed to `csj` and `node`. If you are using these classes to create browser or ESM compatible code, please update `format` and `platform` on `props.transformOptions` to the required values.
* Removal of `InlineJsxCode` and `InlineTsxCode` classes. Use `InlineJavaScriptCode` or `InlineTypeScriptCode` respectively and set `transformOptions.loader` to `jsx` or `tsx`.
* `InlineJavaScriptCode` and `InlineTypeScriptCode` now only take `TransformerProps` as second argument. Please provide any transform options via `props.transformOptions`. Previously `TransformOptions` could be provided at the top-level.

### Features

* `InlineJavaScriptCode` and `InlineTypeScriptCode` transform to CommonJS and Node by default ([#282](https://github.com/mrgrain/cdk-esbuild/issues/282)) ([37736a7](https://github.com/mrgrain/cdk-esbuild/commit/37736a7cb3cac5d2abdbd7bd60d23e438d258ee7))
* graduate `InlineJavaScriptCode` and `InlineTypeScriptCode` to stable ([#283](https://github.com/mrgrain/cdk-esbuild/issues/283)) ([be31a04](https://github.com/mrgrain/cdk-esbuild/commit/be31a043567b1237340609be145d5ecc731a3821))
* new `IBuildProvider` and `ITransformProvider` to unify esbuild provider options ([#286](https://github.com/mrgrain/cdk-esbuild/issues/286)) ([f60ab8e](https://github.com/mrgrain/cdk-esbuild/commit/f60ab8e89623c2cf224e5a615fc5fb39f4b7d3bf))
* publish for go ([#341](https://github.com/mrgrain/cdk-esbuild/issues/341)) ([66a0df0](https://github.com/mrgrain/cdk-esbuild/commit/66a0df084a2d1043df50adb23475a512a5301427))
* support overriding the default esbuild API implementations ([#313](https://github.com/mrgrain/cdk-esbuild/issues/313)) ([eee3443](https://github.com/mrgrain/cdk-esbuild/commit/eee344397218d845c532de6fce7d0c027e2c08de))


### Bug Fixes

* use shorter package name for go ([#342](https://github.com/mrgrain/cdk-esbuild/issues/342)) ([2026131](https://github.com/mrgrain/cdk-esbuild/commit/2026131b5e8c8a94fafc969811ad38dd6ef77ce9))
* remove deprecated support of top-level TransformOptions on InlineCode classes ([#281](https://github.com/mrgrain/cdk-esbuild/issues/281)) ([7159ef9](https://github.com/mrgrain/cdk-esbuild/commit/7159ef9ecde2ea24279d1e370b2b6d0466b8aa76))
* upgrade minium version requirement for `aws-cdk-lib` ([#315](https://github.com/mrgrain/cdk-esbuild/issues/315)) ([86096f7](https://github.com/mrgrain/cdk-esbuild/commit/86096f776e11bae7660bac976e75b0cea453a680))


## [3.13.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.11.6...v3.13.0) (2022-12-18)


### Features

* upgrade esbuild to 0.16.0 ([#279](https://github.com/mrgrain/cdk-esbuild/issues/279)) ([20bdefa](https://github.com/mrgrain/cdk-esbuild/commit/20bdefac870d13285e4ec4e2765b493f316e2320))

### [3.11.6](https://github.com/mrgrain/cdk-esbuild/compare/v3.11.5...v3.11.6) (2022-12-17)

### [3.11.5](https://github.com/mrgrain/cdk-esbuild/compare/v3.11.4...v3.11.5) (2022-12-03)

### [3.11.4](https://github.com/mrgrain/cdk-esbuild/compare/v3.11.3...v3.11.4) (2022-11-05)

### [3.11.3](https://github.com/mrgrain/cdk-esbuild/compare/v3.11.2...v3.11.3) (2022-10-29)


### Bug Fixes

* bundler silently fails in case of an error ([#239](https://github.com/mrgrain/cdk-esbuild/issues/239)) ([3a63486](https://github.com/mrgrain/cdk-esbuild/commit/3a63486414f055e5a0b6b71bc443a649069fd034)), closes [#237](https://github.com/mrgrain/cdk-esbuild/issues/237)

### [3.11.2](https://github.com/mrgrain/cdk-esbuild/compare/v3.11.1...v3.11.2) (2022-08-24)


### Bug Fixes

* esbuild discovery can't find module installed in project ([#234](https://github.com/mrgrain/cdk-esbuild/issues/234)) ([58d7604](https://github.com/mrgrain/cdk-esbuild/commit/58d7604096fb4f7f638a873a90a714565a078d69)), closes [#233](https://github.com/mrgrain/cdk-esbuild/issues/233)

### [3.11.1](https://github.com/mrgrain/cdk-esbuild/compare/v3.11.0...v3.11.1) (2022-08-22)


### Bug Fixes

* `TransformOptions.tsconfigRaw` cannot receive an object ([#230](https://github.com/mrgrain/cdk-esbuild/issues/230)) ([1584ece](https://github.com/mrgrain/cdk-esbuild/commit/1584ecedaff5251f183f08aa512151010a54df16))

## [3.11.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.10.0...v3.11.0) (2022-08-20)


### Features

* auto install esbuild on jsii platforms ([#226](https://github.com/mrgrain/cdk-esbuild/issues/226)) ([d97688a](https://github.com/mrgrain/cdk-esbuild/commit/d97688a32cf62212b2756b91297c27248363619c))

## [3.10.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.9.0...v3.10.0) (2022-08-14)


### Features

* support custom esbuild module path ([#220](https://github.com/mrgrain/cdk-esbuild/issues/220)) ([9cc071e](https://github.com/mrgrain/cdk-esbuild/commit/9cc071edbb8f173288ec4b68162b1bbd1f0e18c2))

## [3.9.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.8.1...v3.9.0) (2022-08-14)


### Features

* lazy evaluate `InlineCode` and show message before transforming ([#217](https://github.com/mrgrain/cdk-esbuild/issues/217)) ([98f7d1d](https://github.com/mrgrain/cdk-esbuild/commit/98f7d1d23fd51967aa27c4fad62fafcb6a8cf802))
* support NO_COLOR ([#213](https://github.com/mrgrain/cdk-esbuild/issues/213)) ([1abd267](https://github.com/mrgrain/cdk-esbuild/commit/1abd2676f9aed67f31df70dc99671bafeb9929d5)), closes [#211](https://github.com/mrgrain/cdk-esbuild/issues/211)
* upgrade esbuild to ^0.15.0 ([#207](https://github.com/mrgrain/cdk-esbuild/issues/207)) ([7d74485](https://github.com/mrgrain/cdk-esbuild/commit/7d7448533a58a7422a2e5edb3858a74c232026d2)), closes [#204](https://github.com/mrgrain/cdk-esbuild/issues/204)

### [3.8.1](https://github.com/mrgrain/cdk-esbuild/compare/v3.8.0...v3.8.1) (2022-08-13)


### Bug Fixes

* remove console object overwrites from InlineCode ([#214](https://github.com/mrgrain/cdk-esbuild/issues/214)) ([dde3fdf](https://github.com/mrgrain/cdk-esbuild/commit/dde3fdf23780c77e13e7454fb42eb2a9fda84d7e))

## [3.8.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.7.2...v3.8.0) (2022-08-13)


### Features

* support new esbuild options: `platform`, `jsxDev`, `jsxImportSource` ([#209](https://github.com/mrgrain/cdk-esbuild/issues/209)) ([a7d14e7](https://github.com/mrgrain/cdk-esbuild/commit/a7d14e7bbf1655850951c3f5d041b045309b0ced))


### Bug Fixes

* `esbuildBinaryPath` not working with `Code`, not available for `InlineCode` ([#210](https://github.com/mrgrain/cdk-esbuild/issues/210)) ([dc2609b](https://github.com/mrgrain/cdk-esbuild/commit/dc2609bf48956e3bc05a1d5fdb4851672cec3883)), closes [#203](https://github.com/mrgrain/cdk-esbuild/issues/203)
* esbuild messages printed out twice ([#212](https://github.com/mrgrain/cdk-esbuild/issues/212)) ([2596368](https://github.com/mrgrain/cdk-esbuild/commit/25963686f9f41e18af0f928e465263d1c87db611))

### [3.7.2](https://github.com/mrgrain/cdk-esbuild/compare/v3.7.0...v3.7.2) (2022-07-15)


### Bug Fixes

* only reset esbuild bin path if it was overwritten ([#190](https://github.com/mrgrain/cdk-esbuild/issues/190)) ([59c3c80](https://github.com/mrgrain/cdk-esbuild/commit/59c3c80b893c2b24180f7a61757de774157779dd))

## [3.7.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.6.0...v3.7.0) (2022-07-13)


### Features

* support absolute entry points, as long as they are within the working directory ([0e56b44](https://github.com/mrgrain/cdk-esbuild/commit/0e56b442a9b5c1874ee853721986f7f24d2ed455))

## [3.6.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.5.0...v3.6.0) (2022-06-23)


### Features

* allow setting of esbuildBinaryPath via Construct interface ([f4eeebe](https://github.com/mrgrain/cdk-esbuild/commit/f4eeebe613bf20b8b28313a81b328bdcd1c1a8e6))
* upgrade esbuild to support `supported` buildOption and new `copy` loader ([3ac5d92](https://github.com/mrgrain/cdk-esbuild/commit/3ac5d925342505669dbb3d3e88249f6e495b8566))


### Bug Fixes

* make TypeScriptCode and JavaScriptCode correctly extend aws_lambda.Code in jsii ([d04db27](https://github.com/mrgrain/cdk-esbuild/commit/d04db2798559b38d424a2012ebb96d14ebde4fb0))

## [3.5.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.4.0...v3.5.0) (2022-06-02)


### Features

* support logOverride buildOption ([d1cad61](https://github.com/mrgrain/cdk-esbuild/commit/d1cad614a28f0e07b9646ff62dd47393f5616b99))

## [3.4.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.3.0...v3.4.0) (2022-05-26)


### Features

* copyDir supports more complex scenarios ([08c59fb](https://github.com/mrgrain/cdk-esbuild/commit/08c59fba7bf1ee68ca103520b3e0b7ea5359a925))

## [3.3.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.2.0...v3.3.0) (2022-03-06)


### Features

* support mangleQuoted option ([f4d8859](https://github.com/mrgrain/cdk-esbuild/commit/f4d88597c2f93064f7e3f6d4f591630eacfe7b80))

## [3.2.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.1.0...v3.2.0) (2022-02-04)


### Features

* support esbuild mangle-props ([a2566d1](https://github.com/mrgrain/cdk-esbuild/commit/a2566d1ebdb3ed8fabecdda31de413d64075f441))

## [3.1.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.0.0...v3.1.0) (2022-01-28)


### Features

* support new build option `drop` from esbuild ([54445ad](https://github.com/mrgrain/cdk-esbuild/commit/54445ad2490e7cba81e54a555a91ba86553ec67f))


### Bug Fixes

* replace mocked with version from jest-mock ([2e9761d](https://github.com/mrgrain/cdk-esbuild/commit/2e9761d5f53293a6a840897e218c2e79a6b71c66))
* replace removed Node.js type ([e58b268](https://github.com/mrgrain/cdk-esbuild/commit/e58b2685c519cb9c4d7e1a148c4fc9f388d3ff90))

## [3.0.0](https://github.com/mrgrain/cdk-esbuild/compare/v3.0.0-rc.1...v3.0.0) (2021-12-09)

### Features

- upgrade to AWS CDK v2 ([c83b3e4](https://github.com/mrgrain/cdk-esbuild/commit/c83b3e47ad5d6d325a1ca1fa4e450bd92d7276d2))

### Bug Fixes

- remove imports from aws-cdk-lib/core ([68ee09a](https://github.com/mrgrain/cdk-esbuild/commit/68ee09ab7dbf9cf5d0e8e8ca9eda5ea24fedae69))

## [2.2.0](https://github.com/mrgrain/cdk-esbuild/compare/v2.1.0...v2.2.0) (2021-12-04)

**This release contains an upgrade of esbuild with backwards-incompatible changes.** This is inline with the versioning strategy for this package, which is to release esbuild upgrades with minor versions as long as esbuild has not reached version 1.0.0. The backwards-incompatible changes are fairly obscure this time around, but please make sure to read the [0.14.0 release notes](https://github.com/evanw/esbuild/releases/tag/v0.14.0).

### Features

- upgrade esbuild to [^0.14.0](https://github.com/evanw/esbuild/releases/tag/v0.14.0) ([#143](https://github.com/mrgrain/cdk-esbuild/issues/143)) ([4568b92](https://github.com/mrgrain/cdk-esbuild/commit/4568b92011a3e38f23d85998dcbbca1afa06918e))
- **examples/esbuild-with-plugins:** example of how to use the escape hatch to run esbuild with plugins ([#142](https://github.com/mrgrain/cdk-esbuild/issues/142)) ([0876f0e](https://github.com/mrgrain/cdk-esbuild/commit/0876f0e4d4bd65a792deef8adf43229568ab899b))

## [2.1.0](https://github.com/mrgrain/cdk-esbuild/compare/v2.0.0...v2.1.0) (2021-11-25)

### Features

- escape hatch to provide a custom build or transform function ([#141](https://github.com/mrgrain/cdk-esbuild/issues/141)) ([aacfac1](https://github.com/mrgrain/cdk-esbuild/commit/aacfac1b71f1de78fbfdc1161c6e8cf32fd0629e))
- `Inline*Code` now takes `TransformerProps` as second parameter, passing in `TransformOptions` is still supported but deprecated ([#141](https://github.com/mrgrain/cdk-esbuild/issues/141)) ([aacfac1](https://github.com/mrgrain/cdk-esbuild/commit/aacfac1b71f1de78fbfdc1161c6e8cf32fd0629e))

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

## [1.133.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.132.0...v1.133.0) (2021-11-21)

- **This is a release on the legacy v1 branch. Please upgrade to v2 as soon as possible.**
- works with cdk-1.133.0

### ⛔ EXTREMELY IMPORTANT NOTICE FOR USERS WHO HAVE NOT UPGRADE TO v2 OF THIS PACKAGE

**tl;dr No more "versioned" release on this legacy branch.**

Until now, I have release a new version of this package every time a new CDK version was released. Even if no updates where necessary. This practice will stop with this release and I will only release a new version on the legacy v1 branch, if an update is required for compatibility. **Please upgrade to v2 of this package as soon as possible!**

[**Upgrading instructions to v2 of this package**](https://github.com/mrgrain/cdk-esbuild#migrating-to-v2)

If you're using the tag `cdk-v1`, you will already receive the latest stable v2 release. If you're using a versioned tag (e.g. `cdk-1.29.0`), this tag format is deprecated and release have not been tagged for a while now.

## [1.132.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.131.0...v1.132.0) (2021-11-21)

- works with cdk-1.132.0

### ⚠ IMPORTANT NOTICE

This is a release on the legacy v1 branch. Please upgrade to v2 as soon as possible.

If you're using the tag `cdk-v1`, you will already receive the latest stable v2 release. If you're using a versioned tag (e.g. `cdk-1.29.0`), this tag format is deprecated and future releases won't be tagged like this.

## [1.131.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.130.0...v1.131.0) (2021-11-07)

- works with cdk-1.131.0

### ⚠ IMPORTANT NOTICE

This is a release on the legacy v1 branch. Please upgrade to v2 as soon as possible.

If you're using the tag `cdk-v1`, you will already receive the latest stable v2 release. If you're using a versioned tag (e.g. `cdk-1.29.0`), this tag format is deprecated and future releases won't be tagged like this.

## [1.130.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.129.0...v1.130.0) (2021-11-07)

- works with cdk-1.130.0

### ⚠ IMPORTANT NOTICE

This is the first release on the legacy v1 branch. Please upgrade to v2 as soon as possible.

If you're using the tag `cdk-v1`, you will already receive the latest stable v2 release. If you're using a versioned tag (e.g. `cdk-1.29.0`), this tag format is deprecated and future releases won't be tagged like this.

## [1.129.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.128.0...v1.129.0) (2021-10-28)

### ⚠ IMPORTANT NOTICE

This will be the final release tagged with a specific version of AWS CDK (i.e. `cdk-1.29.0`). From now on, a single tag `cdk-v1` will point to the latest stable release for v1 of AWS CDK.

Please also note, that a new major version of this package already has a release candidate. Using the `cdk-v1` will result in BREAKING CHANGES once the new version is stable.

### Features

- works with cdk-1.129.0 ([d7631d4](https://github.com/mrgrain/cdk-esbuild/commit/d7631d4119e6ef66e0da02a35f9680196e94f124))
- deprecated Docker bundler ([6715463](https://github.com/mrgrain/cdk-esbuild/commit/6715463ee90f339ac261622597e39b2ee6c46d71))

## [1.128.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.127.0...v1.128.0) (2021-10-16)

- works with cdk-1.128.0

## [1.127.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.126.0...v1.127.0) (2021-10-09)

- works with cdk-1.127.0
- **example/website:** How to monitor a website with Synthetics ([621d2d4](https://github.com/mrgrain/cdk-esbuild/commit/621d2d4192da63fa385b76b59353ffe77023c38d))

## [1.126.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.126.0-beta.0...v1.126.0) (2021-10-09)

### Features

- works with cdk-1.126.0
- [Experimental] `Code` is now compatible with `@aws-cdk/aws-synthetics` ([#99](https://github.com/mrgrain/cdk-esbuild/issues/99)) ([f840300](https://github.com/mrgrain/cdk-esbuild/commit/f840300439f7175c46d173378d8e941b7dd80483))

## [1.125.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.124.0...v1.125.0) (2021-10-01)

### ⚠ BREAKING CHANGES

- `esbuild` released a breaking change to the tree shaking options and introduced a new way how platform-specific binaries are installed. Please check the esbuild v0.13.0 [release notes](https://github.com/evanw/esbuild/releases/tag/v0.12.0) for details.

### Features

- works with cdk-1.125.0

- upgrade `esbuild` minimum version to ^0.13.0 ([3d0b5ee](https://github.com/mrgrain/cdk-esbuild/commit/3d0b5ee5c01b7edcf7042a728932a0e1ce722d3c))

## [1.124.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.123.0...v1.124.0) (2021-10-01)

- works with cdk-1.124.0

## [1.123.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.122.0...v1.123.0) (2021-09-22)

- works with cdk-1.123.0

## [1.122.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.121.0...v1.122.0) (2021-09-12)

- works with cdk-1.122.0

## [1.121.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.120.0...v1.121.0) (2021-09-12)

- works with cdk-1.121.0

## [1.120.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.119.0...v1.120.0) (2021-09-12)

- works with cdk-1.120.0

## [1.119.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.118.0...v1.119.0) (2021-09-12)

- works with cdk-1.119.0

## [1.118.0](https://github.com/mrgrain/cdk-esbuild/compare/v1.117.0...v1.118.0) (2021-09-12)

- works with cdk-1.118.0

### Bug Fixes

- fix error handling type issue in latest tsc version ([b5e36e2](https://github.com/mrgrain/cdk-esbuild/commit/b5e36e27481706ea5a7ac5f8c05d74418b07c125))

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
