import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import { App } from "@aws-cdk/core";
import { ListAppStack } from "../infrastructure/stack";

test("Empty Stack", () => {
  const app = new App();
  // WHEN
  const stack = new ListAppStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
