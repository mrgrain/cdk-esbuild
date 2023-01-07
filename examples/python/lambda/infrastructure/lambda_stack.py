from aws_cdk import Stack, CfnOutput
import aws_cdk.aws_lambda as lambda_
from constructs import Construct
from mrgrain.cdk_esbuild import (
    TypeScriptCode,
)


class LambdaStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        lambda_fn = lambda_.Function(
            self,
            "Lambda",
            runtime=lambda_.Runtime.NODEJS_18_X,
            handler="index.handler",
            code=TypeScriptCode("lambda-handler/index.ts"),
        )

        CfnOutput(self, "LambdaArn", value=lambda_fn.function_arn)
