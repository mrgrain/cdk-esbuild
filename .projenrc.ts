import { awscdk, github, javascript, JsonPatch, vscode } from 'projen';
import { SourceFile } from 'ts-morph';
import { StableReleases, TypeScriptSourceFile, WordmarkReadme } from './projenrc';
import { IntegrationTests } from './projenrc/IntegrationTests';
import { Esbuild } from './src/private/esbuild-source';

const stableReleases = new StableReleases('v5', {
  v5: {
    majorVersion: 5,
    cdkVersion: '2.51.0',
    minNodeVersion: '18',
    releaseSchedule: '0 5 1,15 * *',
    npmDistTags: ['cdk-v2'],
    jsiiVersion: '5.8.x',
    typescriptVersion: '5.8.x',
    supportedUntil: true,
  },
  v4: {
    majorVersion: 4,
    cdkVersion: '2.12.0',
    minNodeVersion: '14',
    workflowNodeVersion: '16.x', // should be 14.x but that version doesn't build anymore
    releaseSchedule: '0 5 15 * *',
    jsiiVersion: '1.x',
    typescriptVersion: '4.9.x',
    supportedUntil: new Date('2024-12-01'),
  },
  v3: {
    majorVersion: 3,
    cdkVersion: '2.0.0',
    syntheticsVersion: '2.0.0-alpha.11',
    minNodeVersion: '14',
    workflowNodeVersion: '16.x', // should be 14.x but that version doesn't build anymore
    releaseSchedule: '0 5 15 * *',
    jsiiVersion: '1.x',
    typescriptVersion: '4.9.x',
    supportedUntil: new Date('2024-02-01'),
  },
});

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
  releaseEnvironment: 'release',
  npmTrustedPublishing: true,
  publishToPypi: {
    trustedPublishing: true,
    distName: 'mrgrain.cdk-esbuild',
    module: 'mrgrain.cdk_esbuild',
  },
  publishToNuget: {
    trustedPublishing: true,
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
  publishToMaven: {
    mavenServerId: 'central-ossrh',
    mavenGroupId: 'io.github.mrgrain',
    mavenArtifactId: 'cdkesbuild',
    javaPackage: 'io.github.mrgrain.cdkesbuild',
  },
  catalog: {
    twitter: '@mrgrain',
  },

  // Dependencies
  devDeps: [
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

  // Force stable release options
  ...stableReleases.projectOptions,
});
stableReleases.bind(project);

// auto approve backports
project.tryFindObjectFile('.mergify.yml')?.addOverride('defaults.actions.backport', {
  labels: ['auto-approve'],
});
project.tryFindObjectFile('.mergify.yml')?.addOverride('merge_queue', {
  max_parallel_checks: 1,
});
project.tryFindObjectFile('.mergify.yml')?.addDeletionOverride('queue_rules.0.conditions');


// setup integration tests
new IntegrationTests(project, {
  python: {
    cdkVersion: '2.84.0',
  },
  go: {
    cdkVersion: '2.84.0',
  },
});


// test against latest versions
project.buildWorkflow?.addPostBuildJobCommands('test-latest-versions', [
  'npx npm-check-updates -u "/^(@aws-cdk|aws-cdk)/"',
  project.package.installAndUpdateLockfileCommand,
  project.runTaskCommand(project.compileTask),
  project.runTaskCommand(project.testTask),
], {
  checkoutRepo: true,
  installDeps: true,
  runsOn: ['ubuntu-latest'],
  tools: {
    node: { version: '22.x' },
  },
});


// jsii rosetta
project.package.addField('jsiiRosetta', {
  strict: true,
  exampleDependencies: {
    'aws-cdk-lib': '2.139.0',
    '@mrgrain/cdk-esbuild': '^5',
    'constructs': '^10',
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

// tmp: NPM Trusted Publishing needs a newer npm version
project.github?.tryFindWorkflow('release')?.file?.patch(
  JsonPatch.add('/jobs/release_npm/steps/0/with/node-version', '24.x'),
);

// Enable self-mutation on forks
project.github?.tryFindWorkflow('build')?.file?.patch(
  JsonPatch.replace('/jobs/self-mutation/if', "always() && needs.build.outputs.self_mutation_happened && github.event_name == 'pull_request'"),
);
project.github?.tryFindWorkflow('build')?.file?.patch(
  JsonPatch.remove('/jobs/self-mutation/permissions'),
);
project.github?.tryFindWorkflow('build')?.file?.patch(
  JsonPatch.add('/jobs/self-mutation/steps/2', {
    name: 'Check if can push to PR',
    id: 'check-push',
    env: {
      GH_TOKEN: '${{ secrets.PROJEN_GITHUB_TOKEN }}',
      FORK_FULL_NAME: '${{ github.event.pull_request.head.repo.full_name }}',
      IS_FORK: '${{ github.event.pull_request.head.repo.full_name != github.repository }}'
    },
    run: `# Check if we have push permissions to the base repository
BASE_PERMS=$(gh api repos/\${{ github.repository }} 2>/dev/null | jq '.permissions.push // false')

if [ "$IS_FORK" = "true" ]; then
  # For forks, check if maintainer can modify and we have base permissions
  MAINTAINER_CAN_MODIFY=$(gh pr view \${{ github.event.number }} --json maintainerCanModify --jq '.maintainerCanModify // false')
  
  if [ "$BASE_PERMS" = "true" ] && [ "$MAINTAINER_CAN_MODIFY" = "true" ]; then
    echo "can-push=true" >> $GITHUB_OUTPUT
  else
    # Fall back to checking permissions on the fork repository
    FORK_PERMS=$(gh api "repos/$FORK_FULL_NAME" 2>/dev/null | jq '.permissions.push // false')
    echo "can-push=$FORK_PERMS" >> $GITHUB_OUTPUT
  fi
else
  # For same repository PRs, use base repository permissions
  echo "can-push=$BASE_PERMS" >> $GITHUB_OUTPUT
fi`
  }),
);
project.github?.tryFindWorkflow('build')?.file?.patch(
  JsonPatch.add('/jobs/self-mutation/steps/3/if', 'steps.check-push.outputs.can-push == \'true\''),
);
project.github?.tryFindWorkflow('build')?.file?.patch(
  JsonPatch.add('/jobs/self-mutation/steps/4/if', 'steps.check-push.outputs.can-push == \'true\''),
);
project.github?.tryFindWorkflow('build')?.file?.patch(
  JsonPatch.add('/jobs/self-mutation/steps/5/if', 'steps.check-push.outputs.can-push == \'true\''),
);
project.github?.tryFindWorkflow('build')?.file?.patch(
  JsonPatch.add('/jobs/self-mutation/steps/6/if', 'steps.check-push.outputs.can-push == \'true\''),
);

// Synth project
project.synth();
