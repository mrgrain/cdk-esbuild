import { Component, JsonPatch, release, typescript } from 'projen';

export enum LockfileVersion {
  'V2' = 'V2',
  'V3' = 'V3'
}


export interface StableReleaseBranchOptions extends release.BranchOptions {
  minNodeVersion: string;
  lockfileVersion: LockfileVersion;
}

export interface StableReleaseBranches {
  [name: string]: StableReleaseBranchOptions;
}

export class StableReleases extends Component {
  public constructor(project: typescript.TypeScriptProject, options: StableReleaseBranches) {
    super(project);

    for (const branch of project.release?.branches ?? []) {
      // skip main branch
      if (!options[branch]) {
        continue;
      }

      // use npm@8 for LockfileVersion.V2 branches
      if (options[branch]?.lockfileVersion === LockfileVersion.V2) {
        project.github?.tryFindWorkflow(`upgrade-${branch}`)?.file?.patch(
          JsonPatch.add('/jobs/upgrade/steps/2', {
            name: 'Use npm@8',
            run: ['npm i -g npm@8', 'npm --version'].join('\n'),
          }),
        );
      }
    }
  }
}

export function releaseOptions(branches: StableReleaseBranches, currentBranch = 'main'): {
  npmDistTag: string;
  defaultReleaseBranch: string;
  majorVersion: number;
  releaseBranches: StableReleaseBranches;
  workflowNodeVersion: string;
} {
  const current = branches[currentBranch];
  return {
    npmDistTag: current.npmDistTag ?? 'latest',
    defaultReleaseBranch: currentBranch,
    majorVersion: current.majorVersion,
    workflowNodeVersion: current.minNodeVersion,
    releaseBranches: Object.fromEntries(Object.entries(branches).filter(([branch]) => branch !== currentBranch)),
  };
}
