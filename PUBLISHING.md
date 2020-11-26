## Publish version

```
npm i && \
    npm run build && \
    npm t && \
    npm publish . --access public --tag latest --tag cdk-1.XX.0
```

## Unpublish broken version

```
npm unpublish @mrgrain/cdk-esbuild@X.Y.Z
```
