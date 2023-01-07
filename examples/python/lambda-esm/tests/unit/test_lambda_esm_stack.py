import aws_cdk as core
import aws_cdk.assertions as assertions

from infrastructure.lambda_esm_stack import LambdaEsmStack


def test_lambda_esm_created():
    app = core.App()
    stack = LambdaEsmStack(app, "LambdaEsm")
    template = assertions.Template.from_stack(stack)

    template.resource_count_is("AWS::Lambda::Function", 1)
