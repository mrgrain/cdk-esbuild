# CloudFront Function

Create CloudFront Functions that modify request origin and add custom headers to responses, deployed with a CloudFront distribution.

## Getting started

Run `npm ci` to get setup.

Have a look at the CloudFront Function code in `./src/origin.ts` and `./src/header.ts`. This example demonstrates two functions:

- `origin.ts` - Changes the request origin to `github.com/mrgrain/cdk-esbuild`
- `header.ts` - Adds a custom header `x-custom-header` to responses

The CDK stack creates:

- Two CloudFront Functions built from TypeScript using `CloudFrontTypeScriptCode.fromFile()`
- A CloudFront distribution with an HTTP origin (`moritzkornher.de`)
- The origin function is associated as a viewer request function
- The header function is associated as a viewer response function

Once you are happy, deploy your app with `npx cdk deploy`. If you haven't used the CDK in your account before, you will have bootstrap the account first (typically by running `npx cdk bootstrap`) and sort out permissions. Please refer to [the official AWS CDK documentation](https://docs.aws.amazon.com/cdk/latest/guide/home.html) to get started.

As part of the deployment, both the CloudFront distribution domain name and function ARN will be displayed. You can test the functions by making requests to the distribution URL - requests will be redirected to the GitHub repository and responses will include the custom header.

Don't forget to tear everything down with `npx cdk destroy` - otherwise you will incur costs.

## Useful commands

- `npm install` start with this
- `npm test` perform the jest unit tests
- `npx cdk bootstrap` setup your AWS environment
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk destroy` destroy this stack to ensure you don't incur any costs
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template
