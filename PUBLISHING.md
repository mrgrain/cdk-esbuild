## Publish version

- Update the package version in `package.json`
- Run `npm it`
- Run `npm publish`

In the background, the publish command will execute the following steps:

```
npm run clean
npm run build
npm t

npm publish . --access public --tag cdk-$npm_package_version

npm dist-tag add @mrgrain/cdk-esbuild@$npm_package_version latest
npm run clean
```

## Unpublish broken version

```
npm unpublish @mrgrain/cdk-esbuild@X.Y.Z
```
