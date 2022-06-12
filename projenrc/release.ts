export function tagOnNpm(packageName: string, tags: string[]) {
  return {
    name: 'Update tags',
    run: [
      'version=`cat dist/version.txt`',
      'echo $version',
    ].concat(tags.map(tag => `npm dist-tag add ${packageName}@$version ${tag}`)).join('\n'),
    env: {
      NPM_REGISTRY: 'registry.npmjs.org',
      NPM_TOKEN: '${{ secrets.NPM_TOKEN }}',
    },
  };
}