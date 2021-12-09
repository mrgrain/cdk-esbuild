import {
  AwsCdkConstructLibrary,
  IgnoreFile,
  JsonFile,
  NodePackageManager,
  release,
  vscode,
} from 'projen';
import { SourceFile } from 'ts-morph';
import { TypeScriptSourceFile } from './projenrc/TypeScriptSourceFile';

const project = new AwsCdkConstructLibrary({
  projenrcTs: true,
  projenrcTsOptions: {
    filename: '.projenrc.ts',
  },
  eslintOptions: {
    lintProjenRc: false,
    dirs: ['src', 'projenrc', '.projenrc.ts'],
  },
  depsUpgradeOptions: {
    workflow: false,
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

  // Testing & Linting
  githubOptions: {
    pullRequestLintOptions: {
      semanticTitleOptions: {
        types: ['feat', 'fix', 'chore', 'docs', 'ci'],
      },
    },
  },

  // Release
  packageManager: NodePackageManager.NPM,
  npmDistTag: 'latest',
  defaultReleaseBranch: 'main',
  majorVersion: 3,
  releaseTrigger: release.ReleaseTrigger.manual(),
  catalog: {
    twitter: '@mrgrain',
  },
  workflowContainerImage: 'jsii/superchain:1-buster-slim-node14',

  // Dependencies
  cdkVersion: '2.0.0',
  peerDeps: [
    'aws-cdk-lib@^2.0.0',
  ],
  cdkDependencies: [],
  cdkTestDependencies: [],
  cdkAssert: false,
  devDeps: [
    '@aws-cdk/aws-synthetics-alpha',
    '@types/eslint',
    'aws-cdk-lib@2.0.0',
    'constructs@10.0.5',
    'esbuild@^0.14.0',
    'jest-mock',
    'ts-morph',
  ],

  // Ignore files
  gitignore: [
    '.npmrc',
    '*.gz',
    '*.zip',
    'cdk.out',
    '.cdk.staging',
    'examples/template',
    '!/.github/workflows/manual-release.yml',
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
packageJson?.addOverride('optionalDependencies', {
  esbuild: '^0.14.0',
});
packageJson?.addOverride('jest.testPathIgnorePatterns.1', '/examples/');

const eslintRc = project.tryFindObjectFile('.eslintrc.json');
eslintRc?.addOverride('ignorePatterns', [
  '*.js',
  '*.d.ts',
  'node_modules/',
  'examples/',
  '*.generated.ts',
  'coverage',
  '!.projenrc.ts',
]);

(project.tryFindFile('.gitignore') as IgnoreFile).addPatterns(
  '!/examples/**',
);

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


new TypeScriptSourceFile(project, 'src/esbuild-types.ts', {
  source: 'node_modules/esbuild/lib/main.d.ts',
  editGitignore: false,
  transformer: (esbuildTypes: SourceFile) => {
    const readonlyInterface = (name: string) => {
      esbuildTypes.getInterface(name)?.getProperties().forEach(property => property.setIsReadonly(true));
    };

    const removeFromInterface = (name: string, properties: string[]) => {
      const interfaceDeclaration = esbuildTypes.getInterface(name);

      properties.forEach(property => interfaceDeclaration?.getProperty(property)?.remove());
    };


    ['CommonOptions', 'BuildOptions', 'TransformOptions'].forEach(readonlyInterface);
    removeFromInterface('BuildOptions', ['entryPoints', 'stdin', 'plugins', 'watch']);
    esbuildTypes.getInterface('TransformOptions')?.getProperty('tsconfigRaw')?.setType('string');
  },
});

project.synth();
