#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { Function, Runtime } from "@aws-cdk/aws-lambda";
import { BuildOptions, TypeScriptCode } from "@mrgrain/cdk-esbuild";
import { execSync } from "child_process";
import { BuildResult } from "esbuild";

export class LambdaStack extends cdk.Stack {
  constructor(scope?: cdk.Construct, id?: string, props?: cdk.StackProps) {
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

    new cdk.CfnOutput(this, "LambdaArn", {
      value: lambda.functionArn,
    });
  }
}

const app = new cdk.App();
new LambdaStack(app, "Function");
