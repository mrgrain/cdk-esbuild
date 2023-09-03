import { Component, JsonPatch, release, typescript } from 'projen';

export interface StableReleaseBranchOptions extends Omit<release.BranchOptions, 'npmDistTag'> {
  minNodeVersion: string;
  npmVersion?: string;
  releaseSchedule: string;
  npmDistTags?: string[];
  cdkVersion: string;
}

export interface StableReleaseBranches {
  [name: string]: StableReleaseBranchOptions;
}

export class StableReleases extends Component {
  public project: typescript.TypeScriptProject;

  public constructor(project: typescript.TypeScriptProject, options: StableReleaseBranches) {
    super(project);
    this.project = project;

    for (const branch of project.release?.branches ?? []) {
      const opts = options[branch];
      const isDefaultBranch = this.isDefaultBranch(branch);
      const releaseWorkflow = this.getReleaseWorkflow(branch);
      const upgradeWorkflow = this.project.github?.tryFindWorkflow(`upgrade-${branch}`)?.file;

      // Release schedule
      releaseWorkflow?.patch(JsonPatch.replace('/on/schedule', [{ cron: opts.releaseSchedule }]));

      // Check out the correct ref
      releaseWorkflow?.patch(JsonPatch.add('/jobs/release/steps/0/with/ref', branch));

      // Update changelog
      project.release?.publisher?.publishToGit({
        changelogFile: 'dist/dist/changelog.md',
        versionFile: 'dist/dist/version.txt',
        releaseTagFile: 'dist/dist/releasetag.txt',
        projectChangelogFile: 'CHANGELOG.md',
        gitBranch: branch,
      });
      const publishChangelogTask = ['publish', 'git'];
      if (!isDefaultBranch) {
        publishChangelogTask.push(branch);
      }
      releaseWorkflow?.patch(JsonPatch.add('/jobs/release/steps/-', {
        name: 'Publish Changelog',
        run: `npx projen ${publishChangelogTask.join(':')}`,
      }));

      // Additional npm dist tags
      if (opts.npmDistTags) {
        releaseWorkflow?.patch(JsonPatch.add('/jobs/release_npm/steps/-', this.tagOnNpm(opts.npmDistTags)));
      }

      // Go branch
      releaseWorkflow?.patch(JsonPatch.add('/jobs/release_golang/steps/9/env/GIT_BRANCH', branch));

      // npm provenance information
      releaseWorkflow?.patch(
        JsonPatch.add('/jobs/release_npm/env', { NPM_CONFIG_PROVENANCE: 'true' }),
        JsonPatch.add('/jobs/release_npm/permissions/id-token', 'write'),
      );

      // Set specific npm version for upgrade task
      // All other tasks run npm ci and will not change the lockfile
      if (opts.npmVersion) {
        const npmVersion = `npm@${opts.npmVersion}`;
        const npmVersionStep = {
          name: `Use ${npmVersion}`,
          run: [`npm i -g ${npmVersion}`, 'npm --version'].join('\n'),
        };
        upgradeWorkflow?.patch(JsonPatch.add('/jobs/upgrade/steps/2', npmVersionStep));
      }
    }
  }

  private isDefaultBranch(branch: string): boolean {
    return branch === 'main';
  }

  private getReleaseWorkflow(branch: string) {
    if (this.isDefaultBranch(branch)) {
      return this.project.tryFindObjectFile('.github/workflows/release.yml');
    }

    return this.project.tryFindObjectFile(`.github/workflows/release-${branch}.yml`);
  }

  private tagOnNpm(tags: string[]) {
    return {
      name: 'Update tags',
      run: [
        'version=`cat dist/version.txt`',
        'echo $version',
      ].concat(tags.map(tag => `npm dist-tag add ${this.project.package.packageName}@$version ${tag}`)).join('\n'),
      env: {
        NPM_REGISTRY: 'registry.npmjs.org',
        NPM_TOKEN: '${{ secrets.NPM_TOKEN }}',
      },
    };
  }

}


export function releaseOptions(branches: StableReleaseBranches, currentBranch = 'main'): {
  npmDistTag: string;
  defaultReleaseBranch: string;
  majorVersion: number;
  releaseBranches: StableReleaseBranches;
  workflowNodeVersion: string;
  releaseTrigger: release.ReleaseTrigger;
} {
  const current = branches[currentBranch];
  return {
    npmDistTag: 'latest',
    defaultReleaseBranch: currentBranch,
    majorVersion: current.majorVersion,
    workflowNodeVersion: current.minNodeVersion,
    releaseBranches: Object.fromEntries(
      Object.entries(branches)
        .filter(([b]) => b !== currentBranch)
        .map(([b, config]) => [b, {
          ...config,
          npmDistTag: `latest-v${config.majorVersion}`,
        }]),
    ),
    releaseTrigger: release.ReleaseTrigger.scheduled({
      schedule: current.releaseSchedule,
    }),
  };
}
