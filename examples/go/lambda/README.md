# Go Lambda example

This is an example how to create a Node.js Lambda Function using cdk-esbuild and Go.

All features are available, but refer to the specific [Go usage instructions](https://github.com/mrgrain/cdk-esbuild#python-net-go) for further details.

## Getting started

Install all dependencies:

```console
go mod tidy
```

You can now synth the CDK app:

```console
cdk synth
```

Next you can deploy your app:

```console
cdk deploy
```

If you haven't used the CDK in your account before, you will have bootstrap the account first (typically by running `cdk bootstrap`) and sort out permissions.
Please refer to [the official AWS CDK documentation](https://docs.aws.amazon.com/cdk/latest/guide/home.html) to get started.

As part of the deployment, the ARN of your function will be displayed. We need this for the next step.

To test your function, you can use the aws-cli to invoke the function from the command line and response will be printed to the console:

```console
aws lambda invoke \
--cli-binary-format raw-in-base64-out --no-cli-pager --output json \
--payload '{"color": "purple", "food": "noodles", "season": "summer"}' \
--function-name "<YOUR LAMBDA ARN HERE>" \
/dev/stdout
```

Change the payload values to see how the response changes!

### Install esbuild locally (optional, but recommended)

Inside your Go project, run the following command to install a local version of esbuild:

```console
npm install esbuild
```

This will create a `package.json` and `package-lock-json` file in your project root.
These files should be committed to version control.

In automated builds, add `npm ci` as an additional setup step.

### Testing your code

To execute the provided example test, simply run:

```console
go test
```

### Clean-up

Don't forget to run `cdk destroy` - otherwise you might incur costs.
