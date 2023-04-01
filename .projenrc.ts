import { awscdk, github, javascript, release, vscode } from 'projen';
import { SourceFile } from 'ts-morph';
import { tagOnNpm, TypeScriptSourceFile } from './projenrc';
import { IntegrationTests } from './projenrc/IntegrationTests';
import { WordmarkReadme } from './projenrc/WordmarkReadme';
import { Esbuild } from './src/private/esbuild-source';

const project = new awscdk.AwsCdkConstructLibrary({
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  projenrcTsOptions: {
    filename: '.projenrc.ts',
  },

  // Project info
  name: '@mrgrain/cdk-esbuild',
  repositoryUrl: 'https://github.com/mrgrain/cdk-esbuild',
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

  // Testing
  jestOptions: {
    jestConfig: {
      testPathIgnorePatterns: ['/node_modules/', '/examples/'],
      coveragePathIgnorePatterns: ['/node_modules/', '/examples/'],
    },
  },

  // Automation
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromApp(),
    pullRequestLintOptions: {
      semanticTitleOptions: {
        types: ['feat', 'fix', 'chore', 'docs', 'ci', 'revert'],
      },
    },
  },
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: [
      'projen-builder[bot]', // Bot account for upgrade PRs
      'mrgrain', // Auto-approve PRs of main maintainer
    ],
  },

  // Release
  npmDistTag: 'latest',
  defaultReleaseBranch: 'main',
  majorVersion: 4,
  releaseBranches: {
    v3: {
      majorVersion: 3,
      npmDistTag: 'old-stable',
    },
  },
  releaseTrigger: release.ReleaseTrigger.scheduled({
    schedule: '0 5 1,15 * *',
  }),
  publishToPypi: {
    distName: 'mrgrain.cdk-esbuild',
    module: 'mrgrain.cdk_esbuild',
  },
  publishToNuget: {
    dotNetNamespace: 'Mrgrain.CdkEsbuild',
    packageId: 'Mrgrain.CdkEsbuild',
    iconUrl: 'https://raw.githubusercontent.com/mrgrain/cdk-esbuild/main/images/logo.png',
  },
  publishToGo: {
    moduleName: 'github.com/mrgrain/cdk-esbuild-go',
    packageName: 'cdkesbuild',
    githubUseSsh: true,
    githubDeployKeySecret: 'GO_DEPLOY_KEY',
  },
  catalog: {
    twitter: '@mrgrain',
  },
  workflowBootstrapSteps: [{
    name: 'Update npm',
    run: 'sudo npm i -g npm@8',
  }],

  // Dependencies
  cdkVersion: '2.12.0',
  devDeps: [
    '@aws-cdk/aws-synthetics-alpha@2.12.0-alpha.0',
    '@types/eslint',
    Esbuild.spec,
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
    '!/examples/**',
  ],
  npmignore: [
    '.npmrc',
    '.nvmrc',
    '.versionrc',
    '.gitattributes',
    '*.tgz',
    '*.gz',
    '*.zip',
    'cdk.out',
    '.cdk.staging',
    '/examples',
    'PUBLISHING.md',
    '.vscode',
    '.projenrc.ts',
    'projenrc',
    '/images',
    'API.md',
    'CHANGELOG.md',
    'CONTRIBUTING.md',
    'SECURITY.md',
  ],
});


// setup integration tests
new IntegrationTests(project, {
  python: {
    cdkVersion: '2.58.1',
  },
  go: {
    cdkVersion: '2.58.1',
  },
});


// test against latest versions
const REPO_TEMP_DIRECTORY = '.repo';
project.buildWorkflow?.addPostBuildJob('test-latest-versions', {
  runsOn: ['ubuntu-latest'],
  permissions: {},
  tools: {
    node: { version: '18.x' },
  },
  steps: [
    {
      name: 'Prepare Repository',
      run: `mv ${project.artifactsDirectory} ${'.repo'}`,
    },
    {
      name: 'Bump CDK versions',
      run: `cd ${REPO_TEMP_DIRECTORY} && npx npm-check-updates -u "/^(@aws-cdk|aws-cdk)/"`,
    },
    {
      name: 'Install Dependencies',
      run: `cd ${REPO_TEMP_DIRECTORY} && ${project.package.installAndUpdateLockfileCommand}`,
    },
    {
      name: 'Run tests',
      run: `cd ${REPO_TEMP_DIRECTORY} && ${project.runTaskCommand(project.testTask)}`,
    },
  ],
});


// changelog for main
const releaseWorkflow = project.tryFindObjectFile('.github/workflows/release.yml');
project.release?.publisher?.publishToGit({
  changelogFile: 'dist/dist/changelog.md',
  versionFile: 'dist/dist/version.txt',
  releaseTagFile: 'dist/dist/releasetag.txt',
  projectChangelogFile: 'CHANGELOG.md',
  gitBranch: 'main',
});
releaseWorkflow?.addToArray('jobs.release.steps', {
  name: 'Publish Changelog',
  run: 'npx projen publish:git',
});
releaseWorkflow?.addToArray('jobs.release_npm.steps',
  tagOnNpm(project.package.packageName, ['cdk-v2', 'unstable', 'next']),
);

// changelog for v3
const v3ReleaseWorkflow = project.tryFindObjectFile('.github/workflows/release-v3.yml');
project.release?.publisher?.publishToGit({
  changelogFile: 'dist/dist/changelog.md',
  versionFile: 'dist/dist/version.txt',
  releaseTagFile: 'dist/dist/releasetag.txt',
  projectChangelogFile: 'CHANGELOG.md',
  gitBranch: 'v3',
});
v3ReleaseWorkflow?.addToArray('jobs.release.steps', {
  name: 'Publish Changelog',
  run: 'npx projen publish:git:v3',
});
v3ReleaseWorkflow?.addOverride('on.schedule', [{ cron: '0 5 15 * *' }]);
v3ReleaseWorkflow?.addOverride('jobs.release.steps.0.with.ref', 'v3');
v3ReleaseWorkflow?.addOverride('jobs.release_golang.steps.10.env.GIT_BRANCH', 'v3');

// jsii rosetta
project.package.addField('jsiiRosetta', {
  strict: false,
});
const rosetta = project.addTask('rosetta', { exec: 'jsii-rosetta extract' });
project.tasks.tryFind('post-compile')?.prependSpawn(rosetta);
project.addGitIgnore('.jsii.tabl.json');
project.addPackageIgnore('.jsii.tabl.json');
project.addPackageIgnore('/rosetta/');

// Wordmark images in README
new WordmarkReadme(project, { altText: 'cdk-esbuild' });

// eslint
project.eslint?.addRules({
  'no-console': 'error',
  'eol-last': ['error', 'always'],
  '@typescript-eslint/member-ordering': 'off',
});
project.eslint?.addOverride({
  files: ['test/**'],
  rules: {
    'no-console': 'off',
  },
});
project.eslint?.addIgnorePattern('examples/');


// VSCode config
const editor = new vscode.VsCode(project);
editor.extensions.addRecommendations('dbaeumer.vscode-eslint', 'orta.vscode-jest');
editor.settings.addSettings({
  'editor.formatOnSave': true,
  'editor.defaultFormatter': 'esbenp.prettier-vscode',
  'eslint.format.enable': true,
  'jest.autoRun': 'off',
  'jest.jestCommandLine': './node_modules/.bin/jest',
  'svg.preview.background': 'dark-transparent',
  'python.formatting.provider': 'black',
});
editor.settings.addSettings({ 'editor.defaultFormatter': 'dbaeumer.vscode-eslint' }, ['javascript', 'typescript']);
editor.settings.addSetting('editor.defaultFormatter', 'jock.svg', 'svg');
editor.launchConfiguration.addConfiguration(
  {
    type: 'node',
    name: 'vscode-jest-tests.v2',
    request: 'launch',
    internalConsoleOptions: vscode.InternalConsoleOptions.NEVER_OPEN,
    program: '${workspaceFolder}/node_modules/.bin/jest',
    args: [
      '--runInBand',
      '--watchAll=false',
      '--testNamePattern',
      '${jest.testNamePattern}',
      '--runTestsByPath',
      '${jest.testFile}',
    ],
    console: vscode.Console.INTEGRATED_TERMINAL,
    disableOptimisticBPs: true,
    cwd: '${workspaceFolder}',
  });


// esbuild
project.tryFindObjectFile('package.json')?.addOverride('optionalDependencies', {
  [Esbuild.name]: Esbuild.version,
});
project.eslint?.addOverride({
  files: ['src/esbuild-types.ts'],
  rules: { 'max-len': ['off'] },
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

    ['CommonOptions', 'BuildOptions', 'TransformOptions', 'OutputFile'].forEach(readonlyInterface);
    removeFromInterface('BuildOptions', ['entryPoints', 'stdin', 'plugins']);
    esbuildTypes.getInterface('CommonOptions')?.getProperty('mangleProps')?.setType('any');
    esbuildTypes.getInterface('CommonOptions')?.getProperty('reserveProps')?.setType('any');
    esbuildTypes.getInterface('InitializeOptions')?.getProperty('wasmModule')?.setType('any');

    const compileOptions = esbuildTypes.addInterface({
      name: 'CompilerOptions',
      isExported: true,
      properties: [
        ['jsxFactory', 'string'],
        ['jsxFragmentFactory', 'string'],
        ['useDefineForClassFields', 'boolean'],
        ['importsNotUsedAsValues', "'remove' | 'preserve' | 'error'"],
        ['preserveValueImports', 'boolean'],
      ].map(([name, type]) => ({
        name,
        isReadonly: true,
        hasQuestionToken: true,
        type,
      })),
    });
    const tsconfigOptions = esbuildTypes.addInterface(
      {
        name: 'TsconfigOptions',
        isExported: true,
        properties: [{
          name: 'compilerOptions',
          isReadonly: true,
          hasQuestionToken: true,
          type: compileOptions.getName(),
        }],
      });
    esbuildTypes
      ?.getInterface('TransformOptions')
      ?.getProperty('tsconfigRaw')
      ?.setType(`string | ${tsconfigOptions.getName()}`);
  },
});


// Synth project
project.synth();
