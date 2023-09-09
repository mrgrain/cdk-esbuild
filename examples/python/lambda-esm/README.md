
# Python Lambda ESM example

This is an example how to create a Node.js ESM Lambda Function using cdk-esbuild and Python.

Refer to the specific [Python usage instructions](https://github.com/mrgrain/cdk-esbuild#python-net-go) for further details.

Inspired by [this AWS blog post](https://aws.amazon.com/blogs/compute/using-node-js-es-modules-and-top-level-await-in-aws-lambda/), ESM Lambda functions allow the use of top-level await.

## Getting started

To set up a new virtualenv, run:

```console
python3 -m venv .venv
```

Then activate the virtualenv and install all dependencies:

```console
source .venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
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

At the end of the deployment, the URL of your function will be displayed.
To test your function, open the URL in a browser.

While the output changes on every refresh, the data file is only loaded once and kept in memory of the particular function instance.
Have a look at the Lambda code in `./lambda-handler/index.mts`.
Reading the JSON file is done outside the handler function, similar to how dynamic configuration might be retrieved.
See this [blog post](https://aws.amazon.com/blogs/compute/using-node-js-es-modules-and-top-level-await-in-aws-lambda/) for details.

### Install esbuild locally (optional, but recommended)

Inside the Python package, run the following command to install a local version of esbuild:

```console
npm install esbuild
```

This will create a `package.json` and `package-lock-json` file in your project root.
These files should be committed to version control.

In automated builds, add `npm ci` as an additional setup step.

### Testing your code

To execute the provided example test, simply run:

```console
pytest
```

### Clean-up

Don't forget to run `cdk destroy` - otherwise you might incur costs.
