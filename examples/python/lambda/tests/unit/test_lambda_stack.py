import aws_cdk as core
import aws_cdk.assertions as assertions

from infrastructure.lambda_stack import LambdaStack


def test_lambda_created():
    app = core.App()
    stack = LambdaStack(app, "lambda")
    template = assertions.Template.from_stack(stack)

    template.resource_count_is("AWS::Lambda::Function", 3)
