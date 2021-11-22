# Using esbuild with plugins

`@mrgrain/cdk-esbuild` has an escape hatch that allows users to provide a custom implementation of the `buildSync` and `transformSyn` functions. This example demonstrates how to utilize the escape hatch to run `esbuild` with plugins.

## Demo

Run `npm ci` to get setup.

This example has loaded two plugins:

- `esbuild-plugin-cache` which allows to use `https` in imports (checkout `lambda.ts`), and
- `esbuild-plugin-time` which times the bundler executions.

Next run `npm run synth` to see them in action. You should get something like this:

```
Bundling asset Function/Lambda/TypeScriptCode/Stage...
Build started
Download https://cdn.skypack.dev/lodash.capitalize
Download https://cdn.skypack.dev/-/lodash.capitalize@v4.2.1-Hv486RVr5xfN8llJbFuK/dist=es2019,mode=imports/optimized/lodash.capitalize.js
Build ended: 233ms
```

Run the same command again, and notice how nothing is downloaded this time and how the build time improved.

```
Bundling asset Function/Lambda/TypeScriptCode/Stage...
Build started
Build ended: 15ms
```

To clear the cache, run `npm run clean` and the next time you run the synth command, the package will be downloaded again.

This integration also works with tests, run `npm test` to try it out!

If you feel like it, inspect the bundled `lambda.js` file inside the asset output directory `cdk.out/asset.????`. You should notice that `lodash.capitalize` was successfully included in the bundle.

## How it's working

Unfortunately AWS CDK [does not work well with asynchronous code](https://github.com/aws/aws-cdk/issues/8273). However esbuild's plugin API is async and we therefore need to use the escape hatch.

In `app.ts` we pass a custom build function to our `TypeScriptCode` object:

```ts
new TypeScriptCode("./lambda.ts", {
  buildFn: (options: BuildOptions): BuildResult => {
    try {
      execSync(`node build.mjs '${JSON.stringify(options)}'`, {
        stdio: "inherit",
      });
      return { errors: [], warnings: [] };
    } catch (error) {
      throw { errors: [], warnings: [] };
    }
  },
});
```

In this function, we start a new node process: A special esbuild build-script, that can take the usual build options as a command line argument in form of stringified JSON. This build script is very simple. Have a look at `build.mjs`.

First we recover the build options from the cli input:

```js
const options = JSON.parse(process.argv.slice(2, 3));
```

Then we call out the async build function. We pass in our regular options, but can also make any changes or additions we like. For example adding plugins:

```js
await esbuild
  .build({
    ...options,
    plugins: [time(), cache({ directory: ".cache" })],
  })
  .catch(() => process.exit(1));
```

Finally the above statement is `await`'ed. And since we are in a `.mjs` ECMA module file, the top-level await is supported out-of-the-box by recent Node.js versions.
