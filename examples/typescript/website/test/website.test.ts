import { Template } from "aws-cdk-lib/assertions";
import { WebsiteStack } from "../infrastructure/stack";

test("Creates a Website bucket", () => {
  // WHEN
  const stack = new WebsiteStack();
  const template = Template.fromStack(stack);

  // THEN
  template.hasResourceProperties("AWS::S3::Bucket", {
    WebsiteConfiguration: {
      IndexDocument: "index.html",
    },
  });

  template.hasOutput('WebsiteUrl', {});
});
