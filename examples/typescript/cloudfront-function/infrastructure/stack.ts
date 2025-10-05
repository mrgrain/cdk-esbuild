import { CloudFrontTypeScriptCode } from "@mrgrain/cdk-esbuild";
import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import {
  Distribution,
  Function,
  FunctionEventType,
  FunctionRuntime,
} from "aws-cdk-lib/aws-cloudfront";
import { HttpOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Construct } from "constructs";

export class CloudFrontFunctionStack extends Stack {
  constructor(scope?: Construct, id?: string, props?: StackProps) {
    super(scope, id, props);

    const request = new Function(this, "ChangeOrigin", {
      // Create CloudFront function from TypeScript file
      code: CloudFrontTypeScriptCode.fromFile("./src/origin.ts", {
        runtime: FunctionRuntime.JS_2_0,
      }),
      runtime: FunctionRuntime.JS_2_0,
    });

    const response = new Function(this, "AddHeader", {
      // Create CloudFront function from TypeScript file
      code: CloudFrontTypeScriptCode.fromFile("./src/header.ts", {
        runtime: FunctionRuntime.JS_2_0,
      }),
      runtime: FunctionRuntime.JS_2_0,
    });

    // Create CloudFront distribution with HTTP origin
    const distribution = new Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new HttpOrigin("moritzkornher.de"),
        functionAssociations: [
          {
            function: request,
            eventType: FunctionEventType.VIEWER_REQUEST,
          },
          {
            function: response,
            eventType: FunctionEventType.VIEWER_RESPONSE,
          },
        ],
      },
    });

    new CfnOutput(this, "DistributionDomainName", {
      value: distribution.distributionDomainName,
    });

    new CfnOutput(this, "FunctionArn", {
      value: request.functionArn,
    });
  }
}
