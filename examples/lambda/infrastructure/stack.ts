import * as cdk from "@aws-cdk/core";
import { Function, Runtime } from "@aws-cdk/aws-lambda";
import { TypeScriptCode } from "@mrgrain/cdk-esbuild";

export class LambdaStack extends cdk.Stack {
  constructor(scope?: cdk.Construct, id?: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const lambda = new Function(this, "Lambda", {
      runtime: Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: new TypeScriptCode("./src/index.tsx"),
    });

    new cdk.CfnOutput(this, "LambdaArn", {
      value: lambda.functionArn,
    });
  }
}
