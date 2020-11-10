import { join } from 'path';
import { findUp } from '../lib/util';

test('findUp', () => {
  // Starting at process.cwd()
  expect(findUp('README.md')).toMatch(/cdk-esbuild$/);

  // Non existing file
  expect(findUp('non-existing-file.unknown')).toBe(undefined);

  // Starting at a specific path
  expect(findUp('util.test.ts', join(__dirname, 'fixtures'))).toMatch(/cdk-esbuild\/test$/);

  // Non existing file starting at a non existing relative path
  expect(findUp('not-to-be-found.txt', 'non-existing/relative/path')).toBe(undefined);

  // Starting at a relative path
  expect(findUp('util.test.ts', 'test/fixtures')).toMatch(/cdk-esbuild\/test$/);
});
