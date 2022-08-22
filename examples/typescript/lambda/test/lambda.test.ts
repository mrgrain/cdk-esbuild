import "@aws-cdk/assert/jest";
import { LambdaStack } from "../infrastructure/stack";

test("Creates a Lambda Function", () => {
  // WHEN
  const stack = new LambdaStack();

  // THEN
  expect(stack).toHaveResourceLike("AWS::Lambda::Function", {
    Handler: "index.handler",
    Runtime: "nodejs14.x",
  });

  expect(stack).toHaveOutput({
    outputName: "LambdaArn",
  });
});
