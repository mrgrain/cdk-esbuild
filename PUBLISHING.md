## Publish version

- Update the package version in `package.json`
- Run `npm it`
- Run `npm publish`
- Run `npm run tag-latest`

In the background, the publish command will execute the following steps:

```
npm run clean
npm run build
npm t

npm publish . --access public --tag cdk-$npm_package_version

npm run clean
```

## Unpublish broken version

```
npm unpublish @mrgrain/cdk-esbuild@X.Y.Z
```
