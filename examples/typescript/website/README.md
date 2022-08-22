# Static Website with React

Make a static website with React and deploy it with a single command using cdk.

## Getting started

Run `npm ci` to get setup.

Have a look at the React code in `./src`. Maybe change the content in `App.tsx`.

To view your React app locally, run `npm start` and open the printed URL in a browser.

Once you are happy, deploy your app with `npx cdk deploy`. If you haven't used the CDK in your account before, you will have bootstrap the account first (typically by running `npx cdk bootstrap`) and sort out permissions. Please refer to [the official AWS CDK documentation](https://docs.aws.amazon.com/cdk/latest/guide/home.html) to get started.

As part of the deployment, a URL will be displayed. Open it to view your deployed website!

## Clean up

Don't forget to tear everything down with `npx cdk destroy` - otherwise you might occur costs.

Additionally, Amazon CloudWatch Synthetics creates a number of dependent resources that are not automatically removed when you destroy the stack. These are documented in [this AWS blog post](https://aws.amazon.com/blogs/mt/delete-amazon-cloudwatch-synthetics-dependent-resources-when-you-delete-a-cloudformation-stack/).

## Useful commands

- `npm install` start with this
- `npm test` perform the jest unit tests
- `npm start` serve the website on localhost
- `npx cdk bootstrap` setup your AWS environment
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk destroy` destroy this stack to ensure you don't occur any costs
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template
