from aws_cdk import Stack
import aws_cdk.aws_lambda as lambda_
from constructs import Construct
from mrgrain.cdk_esbuild import TypeScriptCode, BuildOptions


class PythonAppStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        lambda_.Function(
            self,
            "Function",
            runtime=lambda_.Runtime.NODEJS_16_X,
            handler="index.handler",
            code=TypeScriptCode(
                "lambda-handler/index.ts",
                build_options=BuildOptions(
                    format="esm", outfile="index.mjs", external=["aws-sdk"]
                ),
            ),
        )
