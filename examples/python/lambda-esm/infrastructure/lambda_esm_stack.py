from aws_cdk import Stack, CfnOutput
import aws_cdk.aws_lambda as lambda_
from constructs import Construct
from mrgrain.cdk_esbuild import TypeScriptCode, BuildOptions


class LambdaEsmStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        lambda_fn = lambda_.Function(
            self,
            "Lambda",
            runtime=lambda_.Runtime.NODEJS_18_X,
            handler="index.handler",
            code=TypeScriptCode(
                "lambda-handler/index.mts",
                build_options=BuildOptions(format="esm", outfile="index.mjs"),
                copy_dir={"./data": "data"},
            ),
        )

        url = lambda_fn.add_function_url(auth_type=lambda_.FunctionUrlAuthType.NONE)

        CfnOutput(self, "LambdaUrl", value=url.url)
