## Publish version

- `npm run test-cycle`
- `npm run release -- --release-as minor`
- `git push --follow-tags origin main`
- `npm publish`
- `npm run tag-latest`
- `npm run github-release`

In the background, the publish command will execute the following steps:

```
npm run clean
npm run build
npm t

npm publish . --access public --tag cdk-$npm_package_version

npm run clean
```

## Unpublish broken version from npm

```
npm unpublish @mrgrain/cdk-esbuild@X.Y.Z
```
