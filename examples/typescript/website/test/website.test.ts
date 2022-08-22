import "@aws-cdk/assert/jest";
import { WebsiteStack } from "../infrastructure/stack";

test("Creates a Website bucket", () => {
  // WHEN
  const stack = new WebsiteStack();

  // THEN
  expect(stack).toHaveResourceLike("AWS::S3::Bucket", {
    WebsiteConfiguration: {
      IndexDocument: "index.html",
    },
  });

  expect(stack).toHaveOutput({
    outputName: "WebsiteUrl",
  });
});
