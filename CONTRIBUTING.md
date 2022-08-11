# How to contribute

## Getting started

- Fork the repository on GitHub
- Checkout the fork and create a branch for you to work on
- This project uses [projen](https://github.com/projen/projen) as a management tool
- Run `npm ci` once, then `npm build`

## Testing packages for other languages

Like every Construct, *cdk-esbuild* is a [jsii](https://github.com/aws/jsii) project and a package is published for additional language.
Sometimes it is required to test these generated packages in a real life environment.
All paths in the instructions below, will assume you are testing with one of the examples.

### Node.js

**Option 1:**

*This is the preferred approach, as it is more consistent and closer to how npm would behave for a real user.*

- `pj build`
- The Node.js package can be found in `dist/js`
- In your Python app, run `npm install ../../dist/js/cdk-esbuild@0.0.0.jsii.tgz` (path to the file in dist)
- `npx cdk synth` will use the locally build version

**Option 2:**

*This approach allows for faster iterations. However it is not a true representation of what would happen for a real user. There are known issues with CDK version mismatches.*

- In `package.json` add/change `@mrgrain/cdk-esbuild: '../..'` (path to your)
- `npx cdk synth` will use the compiled files in `lib`

### Python

- `pj build`
- The Python package can be found in `dist/python`
- In your Python app, run `pip install -I ../../dist/python/mrgrain.cdk_esbuild-0.0.0-py3-none-any.whl` (path to the .whl file)
- `npx cdk synth` will use the locally build version
