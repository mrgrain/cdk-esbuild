import { readFileSync } from 'fs';
import { ESLint } from 'eslint';
import {
  AwsCdkConstructLibrary,
  JsonFile,
  NodePackageManager,
  TextFile,
  vscode,
} from 'projen';

const project = new AwsCdkConstructLibrary({
  projenrcTs: true,
  projenrcTsOptions: {
    filename: '.projenrc.mjs',
  },
  eslintOptions: {
    lintProjenRc: false,
    fileExtensions: ['.ts', '.tsx', '.mjs'],
    dirs: ['src', '.projenrc.mjs'],
  },

  // Project info
  name: '@mrgrain/cdk-esbuild',
  repositoryUrl: 'git@github.com:mrgrain/cdk-esbuild.git',
  description:
    'CDK constructs for esbuild, an extremely fast JavaScript bundler',
  homepage: 'https://github.com/mrgrain/cdk-esbuild',
  keywords: [
    'aws-cdk',
    'bundler',
    'cdk',
    'constructs',
    'esbuild',
    'lambda',
    's3',
    's3-deployment',
    'static website',
  ],
  author: 'Moritz Kornher',
  authorAddress: '',
  authorEmail: 'mail@moritzkornher.de',
  authorUrl: 'https://moritzkornher.de',
  license: 'MIT',
  copyrightOwner: 'Moritz Kornher',

  // Release
  packageManager: NodePackageManager.NPM,
  npmDistTag: 'next',
  defaultReleaseBranch: 'next',
  majorVersion: 2,
  prerelease: 'alpha',
  releaseEveryCommit: false,
  catalog: {
    twitter: '@mrgrain',
  },
  workflowContainerImage: 'jsii/superchain:1-buster-slim-node14',
  // release: undefined /* Add release management to this project. */,

  // Dependencies
  cdkVersion: '1.99.0',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-s3-assets',
    '@aws-cdk/aws-s3-deployment',
    '@aws-cdk/aws-synthetics',
  ],
  cdkTestDependencies: [
    '@aws-cdk/assert',
    '@aws-cdk/aws-s3',
    '@aws-cdk/core',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-s3-assets',
    '@aws-cdk/aws-s3-deployment',
    '@aws-cdk/aws-synthetics',
  ],
  devDeps: [
    '@types/eslint',
    'esbuild@^0.13.0',
  ],

  // Ignore files
  gitignore: [
    '.npmrc',
    '*.gz',
    '*.zip',
    'cdk.out',
    '.cdk.staging',
    'examples/template',
  ],
  npmignore: [
    '.npmrc',
    '.nvmrc',
    '.versionrc',
    '*.tgz',
    '*.gz',
    '*.zip',
    'cdk.out',
    '.cdk.staging',
    '/examples',
    'PUBLISHING.md',
    '.vscode',
  ],
});

const packageJson = project.tryFindObjectFile('package.json');
packageJson.addOverride('optionalDependencies', {
  esbuild: '^0.13.0',
});
packageJson.addOverride('jest.testPathIgnorePatterns.1', '/examples/');

const eslintRc = project.tryFindObjectFile('.eslintrc.json');
eslintRc.addOverride('parserOptions.extraFileExtensions', ['.mjs']);
eslintRc.addOverride('ignorePatterns', [
  '*.js',
  '*.d.ts',
  'node_modules/',
  '*.generated.ts',
  'coverage',
  '!.projenrc.mjs',
]);

const linter = new ESLint({ fix: true });
const esbuildTypes = (
  await linter.lintText(
    readFileSync('node_modules/esbuild/lib/main.d.ts').toString(),
    {
      filePath: 'src/esbuild-types-raw.ts',
    },
  )
).pop().output;

new TextFile(project, 'src/esbuild-types-raw.ts', {
  editGitignore: false,
  lines: [esbuildTypes],
});

new JsonFile(project, '.vscode/extensions.json', {
  readonly: false,
  marker: false,
  obj: {
    recommendations: ['dbaeumer.vscode-eslint', 'orta.vscode-jest'],
  },
});

new JsonFile(project, '.vscode/settings.json', {
  readonly: false,
  marker: false,
  obj: {
    'editor.formatOnSave': true,
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
    'eslint.format.enable': true,
    '[javascript]': {
      'editor.defaultFormatter': 'dbaeumer.vscode-eslint',
    },
    '[typescript]': {
      'editor.defaultFormatter': 'dbaeumer.vscode-eslint',
    },
    'jest.autoRun': 'off',
    'jest.jestCommandLine': './node_modules/.bin/jest',
  },
});

new vscode.VsCode(project).launchConfiguration.addConfiguration({
  type: 'node',
  name: 'vscode-jest-tests',
  request: 'launch',
  internalConsoleOptions: vscode.InternalConsoleOptions.NEVER_OPEN,
  program: '${workspaceFolder}/node_modules/.bin/jest',
  args: ['--runInBand', '--watchAll=false'],
});

project.synth();
