import { readdirSync } from 'fs';
import { basename, join } from 'path';
import { Component, JsonPatch, awscdk } from 'projen';
import { GoDotMod } from './GoDotMod';
import { Pipenv } from './Pipenv';

export interface IntegrationTestsOptions {
  /**
   * Test source tree.
   *
   * @default - Project test dir
   */
  readonly testdir?: string;

  /**
   * Options for Python integration tests
   */
  readonly python?: {
    /**
     * The version of CDK to use for the integration test.
     *
     * @default - CDK version from project
     */
    cdkVersion?: string;

    /**
     * The pattern used to detect python integration tests.
     *
     * @default "^integ-.*\\.py$"
     */
    testPattern?: string;
  };

  /**
   * Options for Go integration tests
   */
  readonly go?: {
    /**
     * The Go version to use.
     */
    goVersion: string;

    /**
     * The version of CDK to use for the integration test.
     *
     * @default - CDK version from project
     */
    cdkVersion?: string;

    /**
     * The pattern used to detect Go integration tests.
     *
     * @default "^integ_.*\\.go$"
     */
    testPattern?: string;
  };
}

export class IntegrationTests extends Component {
  private pythonPattern: string;
  private goPattern: string;
  private nodeVersion: string;

  public constructor(
    public readonly project: awscdk.AwsCdkConstructLibrary,
    options: IntegrationTestsOptions,
  ) {
    super(project);

    this.nodeVersion
      // @ts-ignore
      = this.project.nodeVersion ?? 'latest',

    // Define patterns
    this.pythonPattern = options.python?.testPattern ?? '^integ-.*\\.py$';
    this.goPattern = options.go?.testPattern ?? '^integ_.*\\.go$';

    const cwd = join(this.project.outdir, options.testdir ?? project.testdir);
    const hasTestFor = matchDir(cwd, {
      python: new RegExp(this.pythonPattern),
      go: new RegExp(this.goPattern),
    });

    // No tests found => Abort early
    if (!Object.values(hasTestFor).some(Boolean)) {
      return;
    }

    // Add base dependencies
    project.addDevDeps('@aws-cdk/integ-runner@latest');
    project.addGitIgnore('cdk-integ.out.*');

    // Languages
    const jsiiTargets = project.package.manifest?.jsii?.targets;

    if (options.python && jsiiTargets.python && hasTestFor.python) {
      this.setupPython(options.python, jsiiTargets.python);
    }

    if (options.go && jsiiTargets.go && hasTestFor.go) {
      this.setupGo(options.go, jsiiTargets.go);
    }
  }

  private setupPython(
    options: NonNullable<IntegrationTestsOptions['python']>,
    pythonTarget: {
      distName: string;
      module: string;
    }) {
    // Task
    const pythonInteg = this.project.addTask('integ:python', {
      exec: `integ-runner --app="pipenv run python {filePath}" --test-regex="${this.pythonPattern}"`,
      receiveArgs: true,
    });
    pythonInteg.prependExec('pipenv sync');

    // Workflow
    this.project.buildWorkflow?.addPostBuildSteps(
      {
        uses: 'actions/setup-python@v5',
        with: { 'python-version': '3.x' },
      },
      {
        name: 'Update Pipfile.lock',
        run: [
          'npx projen package:python',
          'pip install pipenv',
          'pipenv lock',
        ].join('\n'),
      },
    );

    const pythonJobName = 'integ-python';
    this.project.buildWorkflow?.addPostBuildJobCommands(pythonJobName, [
      'pip install pipenv',
      'npx projen integ:python',
    ], {
      checkoutRepo: true,
      installDeps: true,
      tools: {
        python: {
          version: '3.x',
        },
        node: {
          version: this.nodeVersion,
        },
      },
    });
    this.fixIntegTestJob(pythonJobName);

    // Pipenv
    this.project.addPackageIgnore('Pipfile');
    this.project.addPackageIgnore('Pipfile.lock');

    const pythonCdkVersion = options.cdkVersion ?? this.project.cdkVersion;
    const pipenv = new Pipenv(this.project);
    pipenv.addPackage(`aws-cdk-lib@==${pythonCdkVersion}`);
    pipenv.addPackage(`aws-cdk.integ-tests-alpha@==${pythonCdkVersion}a0`);
    pipenv.addPackage('constructs@<11.0.0,>=10.0.0');
    pipenv.addPackage(`${pythonTarget.distName}@{path = "./dist/python/${pythonTarget.module.replace(/\./g, '_')}-0.0.0-py3-none-any.whl"}`);
  }

  private setupGo(
    options: NonNullable<IntegrationTestsOptions['go']>,
    goTarget: {
      moduleName: string;
      packageName?: string;
    }) {
    const goVersion = options.goVersion;
    const goCdkVersion = options.cdkVersion ?? this.project.cdkVersion.replace(/[\^~]+/g, '');
    const goRepository = goTarget.moduleName;
    const goPackageName = goTarget.packageName ?? this.project.name.replace(/[\W_]+/g, '');
    const goModulePath = `${goRepository}/${goPackageName}`;
    const localUnpublished = 'v0.0.0-unpublished';

    const goDotMod = new GoDotMod(this.project, {
      goVersion,
      moduleName: 'cdkesbuild_integ_tests',
    });
    goDotMod.require(`github.com/aws/aws-cdk-go/awscdk/v2@v${goCdkVersion}`);
    goDotMod.require('github.com/aws/aws-cdk-go/awscdkintegtestsalpha/v2@v2.84.0-alpha.0');

    goDotMod.require(`${goModulePath}@${localUnpublished}`);
    goDotMod.replace(`${goModulePath}@${localUnpublished}`, './dist/go/cdkesbuild');
    goDotMod.replace(`${goModulePath}/jsii@${localUnpublished}`, './dist/go/cdkesbuild/jsii');
    goDotMod.replace(`${goModulePath}/internal@${localUnpublished}`, './dist/go/cdkesbuild/internal');

    // Task
    this.project.addTask('integ:go', {
      exec: `integ-runner --app="go run -mod=mod {filePath}" --test-regex="${this.goPattern}"`,
      receiveArgs: true,
    });

    // Workflow
    this.project.buildWorkflow?.addPostBuildSteps(
      {
        uses: 'actions/setup-go@v5',
        with: { 'go-version': '^1.18.0' },
      },
      {
        name: 'Update go.mod',
        run: [
          'npx projen package:go',
          'go mod tidy',
        ].join('\n'),
      },
    );

    const goJobName = 'integ-go';
    this.project.buildWorkflow?.addPostBuildJobCommands(goJobName, [
      'npx projen integ:go',
    ], {
      checkoutRepo: true,
      installDeps: true,
      tools: {
        go: {
          version: `^${goVersion}`,
        },
        node: {
          version: this.nodeVersion,
        },
      },
    });
    this.fixIntegTestJob(goJobName);

    // go.mod
    this.project.addPackageIgnore('go.mod');
    this.project.addPackageIgnore('go.sum');
  }

  private fixIntegTestJob(name: string) {
    const POST_BUILD_ARTIFACTS_STEP = 2;
    this.project.github?.tryFindWorkflow(this.project.buildWorkflow?.name!)?.file?.patch(
      JsonPatch.remove(`/jobs/${name}/steps/${POST_BUILD_ARTIFACTS_STEP+1}`),
      JsonPatch.move(`/jobs/${name}/steps/${POST_BUILD_ARTIFACTS_STEP}`, `/jobs/${name}/steps/${POST_BUILD_ARTIFACTS_STEP+1}`),
    );
  }
}


function matchDir(path: string, patterns: {
  [id: string]: RegExp;
}) {
  const fileList = readDirDeep(path);
  return Object.fromEntries(
    Object.entries(patterns)
      .map(([id, pattern]) => [
        id,
        fileList.some(file => basename(file).match(pattern) || file.match(pattern)),
      ]),
  );
}

function readDirDeep(path: string): string[] {
  return readdirSync(path, { withFileTypes: true }).flatMap((dirent) => {
    const current = join(path, dirent.name);
    return dirent.isDirectory() ? readDirDeep(current) : current;
  });
}
