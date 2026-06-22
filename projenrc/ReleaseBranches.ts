import { components } from 'mrpj';
import { github, JsonPatch, release, typescript } from 'projen';
import { VersionsFile } from './VersionsFile';

export interface StableReleaseBranchOptions extends Omit<release.BranchOptions, 'npmDistTag'> {
  minNodeVersion: string;
  workflowNodeVersion?: string;
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
    new VersionsFile(project, {
      versions: Object.fromEntries(Object.entries(this.branches).map(([version, info]) => [version,
        {
          minCdk: info.cdkVersion,
          minNode: info.minNodeVersion, // don't convert spec to version here
          endOfSupport: info.supportedUntil,
        }]).concat([['v2', {
        minCdk: '1.99.0',
        minNode: '14',
        endOfSupport: new Date('2023-06-01'),
      }], ['v1', {
        minCdk: '1.99.0',
        minNode: '12',
        endOfSupport: new Date('2021-11-21'),
      }]])),
    });

    /**
     * Special configuration for the current branch only
     */
    const configureCurrentBranch = (opts: StableReleaseBranchOptions) => {
      new components.NodeVersion(project as any, { versionSpec: opts.minNodeVersion });
      project.addDevDeps( `@aws-cdk/aws-synthetics-alpha@${opts.syntheticsVersion ?? opts.cdkVersion + '-alpha.0'}`);
    };

    const appToken = (repositories?: string[], permissions?: github.workflows.AppPermissions) => {
      return github.GithubCredentials.fromApp({
        appIdSecret: 'PROJEN_APP_ID',
        privateKeySecret: 'PROJEN_APP_PRIVATE_KEY',
        owner: repositories ? '${{ github.repository_owner }}' : undefined,
        repositories,
        permissions,
        environment: 'automation',
      });
    };

    /**
     * Configure features for all branches
     */
    const configureBranch = (branch: string, opts: StableReleaseBranchOptions) => {
      const releaseWorkflow = getReleaseWorkflow(branch);

      // Release schedule
      releaseWorkflow?.patch(JsonPatch.replace('/on/schedule', [{ cron: opts.releaseSchedule }]));

      // Don't run the workflow if the last commit was a release
      releaseWorkflow?.patch(
        JsonPatch.add('/jobs/check', {
          'runs-on': 'ubuntu-latest',
          'outputs': {
            has_changes: '${{ steps.changes.outputs.has_changes }}',
          },
          'steps': [
            github.WorkflowSteps.checkout(),
            {
              id: 'changes',
              run: `if git log --oneline -1 | grep -qv "chore(release):"; then
  echo "has_changes=true" >> $GITHUB_OUTPUT
else
  echo "has_changes=false" >> $GITHUB_OUTPUT
fi`,
            },
          ],
        }),
        JsonPatch.add('/jobs/release/needs', 'check'),
        JsonPatch.add('/jobs/release/if', "needs.check.outputs.has_changes == 'true'"),
      );

      // Use the app to publish the changelog
      const releaseToken = appToken();
      releaseWorkflow?.patch(
        JsonPatch.add('/jobs/release/environment', releaseToken.environment),
        JsonPatch.add('/jobs/release/steps/0', releaseToken.setupSteps[0]),
        JsonPatch.add('/jobs/release/steps/1/with/token', releaseToken.tokenRef),
      );

      // Check out the correct ref
      releaseWorkflow?.patch(JsonPatch.add('/jobs/release/steps/1/with/ref', branch));

      // Update changelog
      project.release?.publisher?.publishToGit({
        changelogFile: 'dist/changelog.md',
        versionFile: 'dist/version.txt',
        releaseTagFile: 'dist/releasetag.txt',
        projectChangelogFile: 'CHANGELOG.md',
        gitBranch: branch,
      });
      releaseWorkflow?.patch(JsonPatch.add('/jobs/release/steps/-', {
        name: 'Publish Changelog',
        run: `npx projen publish:git:${branch}`,
      }));

      // Additional npm dist tags
      if (opts.npmDistTags) {
        // @todo: revert once `npm dist-tag add` is supported by trusted publishers
        tagOnNpm(opts.npmDistTags);
        // releaseWorkflow?.patch(JsonPatch.add('/jobs/release_npm/steps/-', {
        //   id: 'npm_oidc_token',
        //   uses: 'electron/npm-trusted-auth-action@v1.0.0',
        //   with: {
        //     'package-name': project.package.packageName,
        //   },
        // }));
        // releaseWorkflow?.patch(JsonPatch.add('/jobs/release_npm/steps/-', tagOnNpm(opts.npmDistTags)));
      }

      // release: Go
      const goPublishToken = appToken(
        [project.package.manifest.jsii?.targets?.go?.moduleName?.split('/').pop()],
        { contents: github.workflows.AppPermission.WRITE },
      );
      releaseWorkflow?.patch(
        JsonPatch.add('/jobs/release_golang/environment', goPublishToken.environment),
        JsonPatch.add('/jobs/release_golang/steps/10', goPublishToken.setupSteps[0]),
        JsonPatch.add('/jobs/release_golang/steps/11/env/GITHUB_TOKEN', `x-access-token:${goPublishToken.tokenRef}`),
        JsonPatch.add('/jobs/release_golang/steps/11/env/GIT_BRANCH', branch),
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
          'version=`cat dist.old/version.txt`',
          'echo $version',
        ].concat(tags.map(tag => `npm dist-tag add ${project.package.packageName}@$version ${tag}`)).join('\n'),
        env: {
          NPM_TOKEN: '${{ steps.npm_oidc_token.outputs.npm-token }}',
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
      workflowNodeVersion: current.workflowNodeVersion ? current.workflowNodeVersion : `${components.NodeVersion.specToVersion(current.minNodeVersion)}.x`,
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
