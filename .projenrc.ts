import {
  awscdk,
  javascript,
  JsonFile,
  release,
  vscode,
} from 'projen';
import { SourceFile } from 'ts-morph';
import { TypeScriptSourceFile } from './projenrc/TypeScriptSourceFile';

const project = new awscdk.AwsCdkConstructLibrary({
  projenrcTs: true,
  projenrcTsOptions: {
    filename: '.projenrc.ts',
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
  jestOptions: {
    jestConfig: {
      testPathIgnorePatterns: ['/node_modules/', '/examples/'],
      coveragePathIgnorePatterns: ['/node_modules/', '/examples/'],
    },
  },
  eslintOptions: {
    lintProjenRc: false,
    dirs: ['src', 'projenrc', '.projenrc.ts'],
  },

  // Release
  packageManager: javascript.NodePackageManager.NPM,
  npmDistTag: 'latest',
  defaultReleaseBranch: 'main',
  majorVersion: 3,
  releaseTrigger: release.ReleaseTrigger.manual(),
  catalog: {
    twitter: '@mrgrain',
  },
  workflowContainerImage: 'jsii/superchain:1-buster-slim-node14',
  workflowBootstrapSteps: [{
    name: 'Update npm',
    run: 'sudo npm i -g npm',
  }],

  // Dependencies
  cdkVersion: '2.0.0',
  devDeps: [
    '@aws-cdk/aws-synthetics-alpha@2.0.0-alpha.11',
    '@types/eslint',
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
    '!/examples/**',
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

// eslint
project.eslint?.allowDevDeps('projenrc/**');
project.eslint?.addRules({
  '@typescript-eslint/member-ordering': 'off',
});
project.eslint?.addIgnorePattern('examples/');
project.eslint?.addIgnorePattern('!projenrc/*.ts');


// VSCode config
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


// esbuild
project.tryFindObjectFile('package.json')?.addOverride('optionalDependencies', {
  esbuild: '^0.14.0',
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
    esbuildTypes.getInterface('CommonOptions')?.getProperty('mangleProps')?.setType('any');
    esbuildTypes.getInterface('CommonOptions')?.getProperty('reserveProps')?.setType('any');
    esbuildTypes.getInterface('TransformOptions')?.getProperty('tsconfigRaw')?.setType('string');
    esbuildTypes.getInterface('InitializeOptions')?.getProperty('wasmModule')?.setType('any');
  },
});


// Synth project
project.synth();
