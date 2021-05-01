## Publish version

- `npm run test-cycle`
- `npm run release -- --release-as minor` or `npm run release -- --release-as minor --prerelease beta`
- `git push --follow-tags origin main`
- `npm publish`

Optional:

- `npm run tag:cdk`
- `npm run tag:latest`
- `npm run github-release`

In the background, the publish command will execute the following steps:

```
npm run clean
npm run build
npm t

npm publish . --access public --tag unstable

npm run clean
```

## Unpublish broken version from npm

```
npm unpublish @mrgrain/cdk-esbuild@X.Y.Z
```

## Remove tag

```
npm dist-tag rm @mrgrain/cdk-esbuild <tag>
```
