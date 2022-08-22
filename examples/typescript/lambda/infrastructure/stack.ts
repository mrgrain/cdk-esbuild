import { TypeScriptCode } from "@mrgrain/cdk-esbuild";
import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class LambdaStack extends Stack {
  constructor(scope?: Construct, id?: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new Function(this, "Lambda", {
      runtime: Runtime.NODEJS_16_X,
      handler: "index.handler",
      code: new TypeScriptCode("./src/index.ts"),
    });

    new CfnOutput(this, "LambdaArn", {
      value: lambda.functionArn,
    });
  }
}
