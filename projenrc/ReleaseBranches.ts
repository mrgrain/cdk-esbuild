import { Component, JsonPatch, release, typescript } from 'projen';

export interface StableReleaseBranchOptions extends Omit<release.BranchOptions, 'npmDistTag'> {
  isCurrent?: boolean;
  minNodeVersion: string;
  releaseSchedule: string;
  npmDistTags?: string[];
  cdkVersion: string;
  jsiiVersion: string;
  typescriptVersion: string;
  syntheticsVersion?: string;
}

export interface StableReleaseBranches {
  [name: string]: StableReleaseBranchOptions;
}

export class StableReleases extends Component {
  public project: typescript.TypeScriptProject;

  public constructor(project: typescript.TypeScriptProject, public readonly branches: StableReleaseBranches) {
    super(project);
    this.project = project;

    for (const branch of project.release?.branches ?? []) {
      const opts = branches[branch];
      const isCurrentBranch = this.isCurrentBranch(branch);
      const releaseWorkflow = this.getReleaseWorkflow(branch);

      // Features only for current branch
      if (isCurrentBranch) {
        project.addDevDeps( `@aws-cdk/aws-synthetics-alpha@${opts.syntheticsVersion ?? opts.cdkVersion + '-alpha.0'}`);
      }

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
      if (!isCurrentBranch) {
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
    }
  }

  private isCurrentBranch(branch: string): boolean {
    const [currentBranch] = Object.entries(this.branches).find(([_, options]) => options.isCurrent) || [];
    return branch === currentBranch;
  }

  private getReleaseWorkflow(branch: string) {
    if (this.isCurrentBranch(branch)) {
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

export function releaseOptions(branches: StableReleaseBranches): {
  npmDistTag: string;
  defaultReleaseBranch: string;
  majorVersion: number;
  prerelease?: string;
  releaseBranches: StableReleaseBranches;
  workflowNodeVersion: string;
  releaseTrigger: release.ReleaseTrigger;
  cdkVersion: string;
  jsiiVersion: string;
  typescriptVersion: string;
} {
  const [currentBranch, current] = Object.entries(branches).find(([_, options]) => options.isCurrent) || [];
  if (!currentBranch || !current) {
    throw Error('Exactly one branch must be the current version');
  }

  return {
    npmDistTag: 'latest',
    defaultReleaseBranch: currentBranch,
    majorVersion: current.majorVersion,
    workflowNodeVersion: current.minNodeVersion,
    prerelease: current.prerelease,
    cdkVersion: current.cdkVersion,
    jsiiVersion: current.jsiiVersion,
    typescriptVersion: current.typescriptVersion,
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
