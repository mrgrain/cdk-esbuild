#!/usr/bin/env node
import { App, CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { BuildOptions, TypeScriptCode } from "@mrgrain/cdk-esbuild";
import { execSync } from "child_process";
import { BuildResult } from "esbuild";

export class LambdaStack extends Stack {
  constructor(scope?: Construct, id?: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new Function(this, "Lambda", {
      runtime: Runtime.NODEJS_14_X,
      handler: "lambda.handler",
      code: new TypeScriptCode("./lambda.ts", {
        buildFn: (options: BuildOptions): BuildResult => {
          try {
            execSync(`node build.mjs '${JSON.stringify(options)}'`, {
              stdio: "inherit",
            });
            return { errors: [], warnings: [] };
          } catch (error) {
            throw { errors: [], warnings: [] };
          }
        },
      }),
    });

    new CfnOutput(this, "LambdaArn", {
      value: lambda.functionArn,
    });
  }
}

const app = new App();
new LambdaStack(app, "Function");
