import { awscdk, github, javascript, vscode } from 'projen';
import { SourceFile } from 'ts-morph';
import { releaseOptions as configureReleaseBranches, StableReleaseBranches, StableReleases, TypeScriptSourceFile, WordmarkReadme } from './projenrc';
import { IntegrationTests } from './projenrc/IntegrationTests';
import { Esbuild } from './src/private/esbuild-source';

const releaseBranches: StableReleaseBranches = {
  main: {
    majorVersion: 5,
    prerelease: 'rc',
    cdkVersion: '2.51.0',
    minNodeVersion: '18.x',
    releaseSchedule: '0 5 1,15 * *',
    npmDistTags: ['cdk-v2'],
    jsiiVersion: '5.1.x',
    typescriptVersion: '5.1.x',
  },
  v4: {
    majorVersion: 4,
    cdkVersion: '2.12.0',
    minNodeVersion: '16.x', // should be 14.x but that version doesn't build anymore
    releaseSchedule: '0 5 15 * *',
    jsiiVersion: '1.x',
    typescriptVersion: '4.9.x',
  },
  v3: {
    majorVersion: 3,
    cdkVersion: '2.0.0',
    minNodeVersion: '16.x', // should be 14.x but that version doesn't build anymore
    releaseSchedule: '0 5 15 * *',
    jsiiVersion: '1.x',
    typescriptVersion: '4.9.x',
  },
};

const project = new awscdk.AwsCdkConstructLibrary({
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,

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
      'mergify[bot]', // Bot account for backports
      'mrgrain', // Auto-approve PRs of main maintainer
    ],
  },

  // Release
  ...configureReleaseBranches(releaseBranches),
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

  // Dependencies
  cdkVersion: releaseBranches.main.cdkVersion,
  jsiiVersion: releaseBranches.main.jsiiVersion,
  typescriptVersion: releaseBranches.main.typescriptVersion,
  devDeps: [
    `@aws-cdk/aws-synthetics-alpha@${releaseBranches.main.cdkVersion}-alpha.0`,
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

// auto approve backports
project.tryFindObjectFile('.mergify.yml')?.addOverride('defaults.actions.backport', {
  labels: ['auto-approve'],
});


// setup integration tests
new IntegrationTests(project, {
  python: {
    cdkVersion: '2.84.0',
  },
  go: {
    cdkVersion: '2.84.0',
  },
});

new StableReleases(project, releaseBranches);


// test against latest versions
const REPO_TEMP_DIRECTORY = '.repo';
project.buildWorkflow?.addPostBuildJob('test-latest-versions', {
  runsOn: ['ubuntu-latest'],
  permissions: {},
  tools: {
    node: { version: '20.x' },
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


// jsii rosetta
project.package.addField('jsiiRosetta', {
  strict: true,
  exampleDependencies: {
    '@aws-cdk/aws-synthetics-alpha': '2.88.0-alpha.0',
    'aws-cdk-lib': '2.88.0',
    '@mrgrain/cdk-esbuild': '^4',
    '@types/node': '^18',
  },
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
        ['alwaysStrict', 'boolean'],
        ['baseUrl', 'string'],
        ['experimentalDecorators', 'boolean'],
        ['importsNotUsedAsValues', "'remove' | 'preserve' | 'error'"],
        ['jsx', "'preserve' | 'react-native' | 'react' | 'react-jsx' | 'react-jsxdev'"],
        ['jsxFactory', 'string'],
        ['jsxFragmentFactory', 'string'],
        ['jsxImportSource', 'string'],
        ['paths', 'Record<string, string[]>'],
        ['preserveValueImports', 'boolean'],
        ['strict', 'boolean'],
        ['target', 'string'],
        ['useDefineForClassFields', 'boolean'],
        ['verbatimModuleSyntax', 'boolean'],
      ].map(([name, type]) => ({
        name,
        isReadonly: true,
        hasQuestionToken: true,
        type,
      })),
    });

    esbuildTypes
      ?.getInterface('TsconfigRaw')
      ?.getProperty('compilerOptions')
      ?.setType(compileOptions.getName())
      ?.setIsReadonly(true);
  },
});


// Synth project
project.synth();
