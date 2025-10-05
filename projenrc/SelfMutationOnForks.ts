import { JsonPatch, awscdk } from 'projen';

export class SelfMutationOnForks {
  constructor(project: awscdk.AwsCdkConstructLibrary) {
    const buildWorkflow = project.github?.tryFindWorkflow('build');
    if (!buildWorkflow) return;

    // Update condition to run on all pull requests
    buildWorkflow.file?.patch(
      JsonPatch.replace('/jobs/self-mutation/if', "always() && needs.build.outputs.self_mutation_happened && github.event_name == 'pull_request'"),
    );

    // Remove permissions (will be checked dynamically)
    buildWorkflow.file?.patch(
      JsonPatch.remove('/jobs/self-mutation/permissions'),
    );

    // Add permission check step
    buildWorkflow.file?.patch(
      JsonPatch.add('/jobs/self-mutation/steps/2', {
        name: 'Check if can push to PR',
        id: 'check-push',
        env: {
          GH_TOKEN: '${{ steps.generate_token.outputs.token }}',
          FORK_FULL_NAME: '${{ github.event.pull_request.head.repo.full_name }}',
          IS_FORK: '${{ github.event.pull_request.head.repo.full_name != github.repository }}',
        },
        run: `# Check if we have push permissions to the base repository
BASE_PERMS=$(gh api repos/\${{ github.repository }} 2>/dev/null | jq '.permissions.push // false')

if [ "$IS_FORK" = "true" ]; then
  # For forks, check if maintainer can modify and we have base permissions
  MAINTAINER_CAN_MODIFY=$(gh pr view \${{ github.event.number }} --json maintainerCanModify --jq '.maintainerCanModify // false')
  
  if [ "$BASE_PERMS" = "true" ] && [ "$MAINTAINER_CAN_MODIFY" = "true" ]; then
    echo "can-push=true" >> $GITHUB_OUTPUT
  else
    # Fall back to checking permissions on the fork repository
    FORK_PERMS=$(gh api "repos/$FORK_FULL_NAME" 2>/dev/null | jq '.permissions.push // false')
    echo "can-push=$FORK_PERMS" >> $GITHUB_OUTPUT
  fi
else
  # For same repository PRs, use base repository permissions
  echo "can-push=$BASE_PERMS" >> $GITHUB_OUTPUT
fi`,
      }),
    );

    // Make mutation steps conditional
    const conditionalSteps = [3, 4, 5, 6];
    conditionalSteps.forEach(stepIndex => {
      buildWorkflow.file?.patch(
        JsonPatch.add(`/jobs/self-mutation/steps/${stepIndex}/if`, 'steps.check-push.outputs.can-push == \'true\''),
      );
    });
  }
}
