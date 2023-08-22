import { readdirSync } from 'fs';
import { basename, join } from 'path';
import { Component, awscdk } from 'projen';
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

  public constructor(
    public readonly project: awscdk.AwsCdkConstructLibrary,
    private readonly options: IntegrationTestsOptions,
  ) {
    super(project);

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

    // Langugages
    const jsiiTargets = project.package.manifest?.jsii?.targets;

    if (jsiiTargets.python && hasTestFor.python) {
      this.setupPython(jsiiTargets.python);
    }

    if (jsiiTargets.go && hasTestFor.go) {
      this.setupGo(jsiiTargets.go);
    }
  }

  private setupPython(pythonTarget: {
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
        uses: 'actions/setup-python@v4',
        with: { 'python-version': '3.x' },
      },
      {
        name: 'Update Pipfile.lock',
        run: ['pip install pipenv', 'pipenv lock'].join('\n'),
      },
    );
    this.project.buildWorkflow?.addPostBuildJobCommands('integ-python', [
      'pip install pipenv',
      'mv dist .repo',
      'cd .repo',
      'npm ci',
      'npx projen package:python',
      'npx projen integ:python',
    ], {
      tools: {
        python: {
          version: '3.x',
        },
        node: {
          version: this.project.minNodeVersion ?? '14.x',
        },
      },
    });

    // Pipenv
    this.project.addPackageIgnore('Pipfile');
    this.project.addPackageIgnore('Pipfile.lock');

    const pythonCdkVersion = this.options.python?.cdkVersion ?? this.project.cdkVersion;
    const pipenv = new Pipenv(this.project);
    pipenv.addPackage(`aws-cdk-lib@==${pythonCdkVersion}`);
    pipenv.addPackage(`aws-cdk.integ-tests-alpha@==${pythonCdkVersion}a0`);
    pipenv.addPackage('constructs@<11.0.0,>=10.0.0');
    pipenv.addPackage(`${pythonTarget.distName}@{path = "./dist/python/${pythonTarget.module}-0.0.0-py3-none-any.whl"}`);
  }

  private setupGo(_goTarget: {
    moduleName: string;
    packageName?: string;
  }) {
    const goVersion = '1.16'; // same version as package uses
    // const goCdkVersion = this.options.go?.cdkVersion ?? this.project.cdkVersion.replace(/[\^~]+/g, '');
    // const goPackageName = goTarget.packageName ?? this.project.name.replace(/[\W_]+/g, '');
    // const goRepository = goTarget.moduleName;

    // Task
    this.project.addTask('integ:go', {
      exec: `integ-runner --app="go run -mod=mod {filePath}" --test-regex="${this.goPattern}"`,
      receiveArgs: true,
    });

    // Workflow
    this.project.buildWorkflow?.addPostBuildSteps(
      {
        uses: 'actions/setup-go@v3',
        with: { 'go-version': '^1.16.0' },
      },
      {
        name: 'Update go.mod',
        run: 'go mod tidy',
      },
    );
    this.project.buildWorkflow?.addPostBuildJobCommands('integ-go', [
      'mv dist .repo',
      'cd .repo',
      'npm ci',
      'npx projen package:go',
      'npx projen integ:go',
    ], {
      tools: {
        go: {
          version: `^${goVersion}.0`,
        },
        node: {
          version: this.project.minNodeVersion ?? '14.x',
        },
      },
    });

    // go.mod
    this.project.addPackageIgnore('go.mod');
    this.project.addPackageIgnore('go.sum');

    // new TextFile(this.project, 'go.mod', {
    //   marker: true,
    //   readonly: false,
    //   lines: [
    //     `// ${PROJEN_MARKER}`,
    //     `module ${goPackageName}_integ_tests`,
    //     '',
    //     `go ${goVersion}`,
    //     '',
    //     `require github.com/aws/aws-cdk-go/awscdk/v2 v${goCdkVersion}`,
    //     `require github.com/aws/aws-cdk-go/awscdkintegtestsalpha/v2 v${goCdkVersion}-alpha.0`,
    //     `require ${goRepository}/${goPackageName} v0.0.0-unpublished`,
    //     `replace ${goRepository}/${goPackageName} v0.0.0-unpublished => ./dist/go/${goPackageName}`,
    //     `replace ${goRepository}/${goPackageName}/jsii v0.0.0-unpublished => ./dist/go/${goPackageName}/jsii`,
    //     `replace ${goRepository}/${goPackageName}/internal v0.0.0-unpublished => ./dist/go/${goPackageName}/internal`,
    //   ],
    // });
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
