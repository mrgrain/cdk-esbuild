import { Component, release, typescript } from 'projen';

export interface StableReleaseBranchOptions extends release.BranchOptions {
  minNodeVersion: string;
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
