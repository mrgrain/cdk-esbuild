## Publish version

```
npm i && npm run build && npm t

npm publish . --access public --tag cdk-1.XX.0
npm dist-tag add @mrgrain/cdk-esbuild@1.XX.0 latest
```

## Unpublish broken version

```
npm unpublish @mrgrain/cdk-esbuild@X.Y.Z
```
