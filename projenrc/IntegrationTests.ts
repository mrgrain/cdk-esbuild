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
   * Options for Python integ tests
   */
  readonly python?: {
    /**
     * The version of CDK to use for the integration test.
     *
     * @default - CDK version from project
     */
    cdkVersion?: string;
  };
}

export class IntegrationTests extends Component {
  public constructor(project: awscdk.AwsCdkConstructLibrary, options: IntegrationTestsOptions) {
    super(project);

    const pythonPattern = '^integ-.*\\.py$';

    const cwd = join(this.project.outdir, options.testdir ?? project.testdir);
    const hasTestFor = matchDir(cwd, {
      python: new RegExp(pythonPattern),
    });

    // No tests found => Abort early
    if (!Object.values(hasTestFor).some(Boolean)) {
      return;
    }

    // Add base dependencies
    project.addDevDeps('@aws-cdk/integ-runner@^2');
    project.addGitIgnore('cdk-integ.out.*');

    // Python
    const pythonTarget = project.package.manifest?.jsii?.targets.python;
    if (pythonTarget && hasTestFor.python) {
      // Task
      const pythonInteg = project.addTask('integ:python', {
        exec: `integ-runner --app="pipenv run python {filePath}" --test-regex="${pythonPattern}"`,
        receiveArgs: true,
      });
      pythonInteg.prependExec('pipenv install --skip-lock');

      // Workflow
      project.buildWorkflow?.addPostBuildJobCommands('integ-python', [
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
            version: project.minNodeVersion ?? '14.x',
          },
        },
      });

      // Pipenv
      project.addPackageIgnore('Pipfile');
      project.addPackageIgnore('Pipfile.lock');
      project.addGitIgnore('Pipfile.lock');

      const pythonCdkVersion = options.python?.cdkVersion ?? project.cdkVersion;
      const pipenv = new Pipenv(project);
      pipenv.addPackage(`aws-cdk-lib@==${pythonCdkVersion}`);
      pipenv.addPackage(`aws-cdk.integ-tests-alpha@==${pythonCdkVersion}a0`);
      pipenv.addPackage('constructs@<11.0.0,>=10.0.0');
      pipenv.addPackage(`${pythonTarget.distName}@{path = "./dist/python/${pythonTarget.module}-0.0.0-py3-none-any.whl"}`);
    }
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
