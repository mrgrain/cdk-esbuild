import { Template } from "aws-cdk-lib/assertions";
import * as cdk from "aws-cdk-lib";
import { CloudFrontFunctionStack } from "../infrastructure/stack";

test("CloudFront Function Created", () => {
  const app = new cdk.App();
  const stack = new CloudFrontFunctionStack(app, "TestStack");
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::CloudFront::Function", {
    FunctionConfig: {
      Runtime: "cloudfront-js-2.0"
    }
  });
});
