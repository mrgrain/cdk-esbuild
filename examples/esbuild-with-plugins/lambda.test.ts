import "@aws-cdk/assert/jest";
import { LambdaStack } from "./app";

test("Creates a Lambda Function", () => {
  // WHEN
  const stack = new LambdaStack();

  // THEN
  expect(stack).toHaveResourceLike("AWS::Lambda::Function", {
    Handler: "lambda.handler",
    Runtime: "nodejs14.x",
  });

  expect(stack).toHaveOutput({
    outputName: "LambdaArn",
  });
});
