import { JsonPatch, awscdk, github } from 'projen';

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

    selfMutation?.addJob('self-mutation', {
      runsOn: ['ubuntu-latest'],
      if: "github.event.workflow_run.conclusion == 'failure' && github.event.workflow_run.event == 'pull_request'",
      permissions: {
        contents: github.workflows.JobPermission.READ,
      },
      steps: [
        {
          name: 'Download patch',
          id: 'download_patch',
          continueOnError: true,
          uses: 'dawidd6/action-download-artifact@ac66b43f0e6a346234dd65d4d0c8fbb31cb316e5',
          with: {
            run_id: '${{ github.event.workflow_run.id }}',
            name: 'repo.patch',
            path: '${{ runner.temp }}',
          },
        },
        {
          name: 'Generate token',
          id: 'generate_token',
          if: 'steps.download_patch.outcome == \'success\'',
          uses: 'actions/create-github-app-token@3ff1caaa28b64c9cc276ce0a02e2ff584f3900c5',
          with: {
            'app-id': '${{ secrets.PROJEN_APP_ID }}',
            'private-key': '${{ secrets.PROJEN_APP_PRIVATE_KEY }}',
          },
        },
        {
          name: 'Checkout PR',
          if: 'steps.download_patch.outcome == \'success\'',
          uses: 'actions/checkout@v5',
          with: {
            token: '${{ steps.generate_token.outputs.token }}',
            repository: '${{ github.event.workflow_run.head_repository.full_name }}',
            ref: '${{ github.event.workflow_run.head_branch }}',
          },
        },
        {
          name: 'Apply patch to PR',
          if: 'steps.download_patch.outcome == \'success\'',
          run: [
            'set -e',
            'if [ ! -f "${{ runner.temp }}/repo.patch" ]; then',
            '  echo "Patch file not found"',
            '  exit 1',
            'fi',
            'git config user.name "github-actions[bot]"',
            'git config user.email "github-actions[bot]@users.noreply.github.com"',
            'if ! git apply --check ${{ runner.temp }}/repo.patch; then',
            '  echo "Patch cannot be applied cleanly"',
            '  exit 1',
            'fi',
            'git apply ${{ runner.temp }}/repo.patch',
            'if [ -z "$(git status --porcelain)" ]; then',
            '  echo "No changes to commit"',
            '  exit 0',
            'fi',
            'git add .',
            'git commit -s -m "chore: self mutation"',
            'git push',
          ].join('\n'),
        },
      ],
    });
  }
}
