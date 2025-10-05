import { JsonPatch, awscdk } from 'projen';

export class SelfMutationOnForks {
  constructor(project: awscdk.AwsCdkConstructLibrary) {
    const buildWorkflow = project.github?.tryFindWorkflow('build');
    if (!buildWorkflow) return;

    // Update condition to run on all pull requests
    buildWorkflow.file?.patch(
      JsonPatch.remove('/jobs/self-mutation'),
    );

    // Add a new self mutation workflow that runs on completion of build
    // and if the build failed and there is a patch, updates the PR
    const selfMutation = project.github?.addWorkflow('self-mutation');
    selfMutation?.on({
      workflowRun: {
        workflows: [buildWorkflow.name],
        types: ['completed'],
      },
    });
  }
}
