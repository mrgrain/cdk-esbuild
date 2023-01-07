#!/usr/bin/env node
import { App, CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { IBuildProvider, ProviderBuildOptions, TypeScriptCode } from "@mrgrain/cdk-esbuild";
import { spawnSync } from "child_process";

class BuildScriptProvider implements IBuildProvider {
  constructor(public readonly scriptPath: string) { }

  buildSync(options: ProviderBuildOptions): void {
    const result = spawnSync('node', [this.scriptPath, JSON.stringify(options)], {
      stdio: ['inherit', 'inherit', 'pipe'],
    });

    if (result.stderr.byteLength > 0) {
      throw result.stderr.toString();
    }
  }
}

export class LambdaStack extends Stack {
  constructor(scope?: Construct, id?: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new Function(this, "Lambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "lambda.handler",
      code: new TypeScriptCode("./lambda.ts", {
        buildProvider: new BuildScriptProvider('build.mjs')
      }),
    });

    new CfnOutput(this, "LambdaArn", {
      value: lambda.functionArn,
    });
  }
}

const app = new App();
new LambdaStack(app, "Function");
