# Lambda ESM Function

Create a ESM Lambda function that can be invoked using the `aws-cli` or AWS Console.

Inspired by [this AWS blog post](https://aws.amazon.com/blogs/compute/using-node-js-es-modules-and-top-level-await-in-aws-lambda/), ESM Lambda functions allow the use of top-level await.

## Getting started

Run `npm ci` to get setup. Next, deploy the app with `npx cdk deploy`. If you haven't used the CDK in your account before, you will have bootstrap the account first (typically by running `npx cdk bootstrap`) and sort out permissions. Please refer to [the official AWS CDK documentation](https://docs.aws.amazon.com/cdk/latest/guide/home.html) to get started.

At the end of the deployment, the URL of your function will be displayed. To test your function, open the URL in a browser.

You'll notice that the affirmation won't always change on refresh. Have a look at the Lambda code in `./src/index.mts`. This is because the API call is made outside the handler function, similar to how dynamic configuration might be retrieved. See the linked blog post for details.

Don't forget to tear everything down with `npx cdk destroy` - otherwise you might occur costs.

## Useful commands

- `npm install` start with this
- `npm test` perform the jest unit tests
- `npm start` serve the website on localhost
- `npx cdk bootstrap` setup your AWS environment
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk destroy` destroy this stack to ensure you don't occur any costs
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template
