# Lambda Function

Create a basic Lambda function that can be invoked using the `aws-cli` or AWS Console.

## Getting started

Run `npm ci` to get setup.

Have a look at the Lambda code in `./src/index.ts`. Maybe change the returned text to make it more personal. Also have a look at the values in `input.json`, we will use this later.

Once you are happy, deploy your app with `npx cdk deploy`. If you haven't used the CDK in your account before, you will have bootstrap the account first (typically by running `npx cdk bootstrap`) and sort out permissions. Please refer to [the official AWS CDK documentation](https://docs.aws.amazon.com/cdk/latest/guide/home.html) to get started.

As part of the deployment, the ARN of your function will be displayed. We need this for the next step.

To test your function, you could either go into the AWS Console and paste the contents of `input.json` into the test feature.

Alternatively, let's use the aws-cli to invoke our function from the command line:

```console
aws lambda invoke --function-name "<YOUR LAMBDA ARN HERE>" --payload fileb://input.json response.json
```

You will get a response containing the status of our request. Now check our `response.json` for the results:

```console
cat response.json
```

Don't forget to tear everything down with `npx cdk destroy` - otherwise you will incur costs.

## Useful commands

- `npm install` start with this
- `npm test` perform the jest unit tests
- `npm start` serve the website on localhost
- `npx cdk bootstrap` setup your AWS environment
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk destroy` destroy this stack to ensure you don't incur any costs
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template
