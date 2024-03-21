import { JsonPatch, release, typescript } from 'projen';

export interface StableReleaseBranchOptions extends Omit<release.BranchOptions, 'npmDistTag'> {
  minNodeVersion: string;
  releaseSchedule: string;
  npmDistTags?: string[];
  cdkVersion: string;
  jsiiVersion: string;
  typescriptVersion: string;
  syntheticsVersion?: string;
  supportedUntil: Date | true;
}

export interface StableReleaseBranches {
  [name: string]: StableReleaseBranchOptions;
}

export class StableReleases {
  public constructor(public readonly currentBranch: string, public readonly branches: StableReleaseBranches) {
    if (!branches[currentBranch]) {
      throw Error(`Current branch must be defined as branch.\nGot: ${currentBranch}\nAvailable: ${Object.keys(branches).sort().join(', ')}`);
    }
  }

  public bind(project: typescript.TypeScriptProject) {
    /**
     * Special configuration for the current branch only
     */
    const configureCurrentBranch = (opts: StableReleaseBranchOptions) => {
      project.addDevDeps( `@aws-cdk/aws-synthetics-alpha@${opts.syntheticsVersion ?? opts.cdkVersion + '-alpha.0'}`);
    };

    /**
     * Configure features for all branches
     */
    const configureBranch = (branch: string, opts: StableReleaseBranchOptions) => {
      const releaseWorkflow = getReleaseWorkflow(branch);

      // Release schedule
      releaseWorkflow?.patch(JsonPatch.replace('/on/schedule', [{ cron: opts.releaseSchedule }]));

      // Use the app to publish the changelog
      releaseWorkflow?.patch(
        JsonPatch.add('/jobs/release/steps/0', {
          name: 'Generate token',
          id: 'generate_token',
          uses: 'tibdex/github-app-token@021a2405c7f990db57f5eae5397423dcc554159c',
          with: {
            app_id: '${{ secrets.PROJEN_APP_ID }}',
            private_key: ' ${{ secrets.PROJEN_APP_PRIVATE_KEY }}',
          },
        }),
        JsonPatch.add('/jobs/release/steps/1/with/token', '${{ steps.generate_token.outputs.token }}'),
      );

      // Check out the correct ref
      releaseWorkflow?.patch(JsonPatch.add('/jobs/release/steps/1/with/ref', branch));

      // Update changelog
      project.release?.publisher?.publishToGit({
        changelogFile: 'dist/dist/changelog.md',
        versionFile: 'dist/dist/version.txt',
        releaseTagFile: 'dist/dist/releasetag.txt',
        projectChangelogFile: 'CHANGELOG.md',
        gitBranch: branch,
      });
      releaseWorkflow?.patch(JsonPatch.add('/jobs/release/steps/-', {
        name: 'Publish Changelog',
        run: `npx projen publish:git:${branch}`,
      }));

      // Additional npm dist tags
      if (opts.npmDistTags) {
        releaseWorkflow?.patch(JsonPatch.add('/jobs/release_npm/steps/-', tagOnNpm(opts.npmDistTags)));
      }

      // Go branch
      releaseWorkflow?.patch(JsonPatch.add('/jobs/release_golang/steps/9/env/GIT_BRANCH', branch));

      // npm provenance information
      releaseWorkflow?.patch(
        JsonPatch.add('/jobs/release_npm/env', { NPM_CONFIG_PROVENANCE: 'true' }),
        JsonPatch.add('/jobs/release_npm/permissions/id-token', 'write'),
      );
    };

    const getReleaseWorkflow = (branch: string) => {
      if (branch === this.currentBranch) {
        return project.tryFindObjectFile('.github/workflows/release.yml');
      }

      return project.tryFindObjectFile(`.github/workflows/release-${branch}.yml`);
    };

    const tagOnNpm = (tags: string[]) => {
      return {
        name: 'Update tags',
        run: [
          'version=`cat dist/version.txt`',
          'echo $version',
        ].concat(tags.map(tag => `npm dist-tag add ${project.package.packageName}@$version ${tag}`)).join('\n'),
        env: {
          NPM_REGISTRY: 'registry.npmjs.org',
          NPM_TOKEN: '${{ secrets.NPM_TOKEN }}',
        },
      };
    };

    /**
     * Configure features
     */
    configureCurrentBranch(this.branches[this.currentBranch]);
    for (const branch of project.release?.branches ?? []) {
      configureBranch(branch, this.branches[branch]);
    }
  }

  public get projectOptions(): {
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
    const current = this.branches[this.currentBranch];

    return {
      npmDistTag: 'latest',
      defaultReleaseBranch: this.currentBranch,
      majorVersion: current.majorVersion,
      workflowNodeVersion: current.minNodeVersion,
      prerelease: current.prerelease,
      cdkVersion: current.cdkVersion,
      jsiiVersion: current.jsiiVersion,
      typescriptVersion: current.typescriptVersion,
      releaseBranches: Object.fromEntries(
        Object.entries(this.branches)
          .filter(([b]) => b !== this.currentBranch && this.isSupported(b))
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

  private isSupported(branch: string): boolean {
    const supportedUntil = this.branches[branch]?.supportedUntil;
    if (supportedUntil === true) {
      return true;
    }

    // SupportedUntil plus one day is EOS
    const eos = new Date(+supportedUntil + 86400000);
    return new Date() <= eos;
  };
}
