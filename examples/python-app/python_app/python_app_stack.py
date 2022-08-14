from aws_cdk import Stack
import aws_cdk.aws_lambda as lambda_
import aws_cdk.aws_s3 as s3
import aws_cdk.aws_s3_deployment as s3_deployment
from constructs import Construct
from mrgrain.cdk_esbuild import (
    BuildOptions,
    InlineTypeScriptCode,
    TypeScriptCode,
    TypeScriptSource,
)


class PythonAppStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        s3_deployment.BucketDeployment(
            self,
            "Website",
            sources=[
                TypeScriptSource(
                    "lambda-handler/index.ts",
                    copy_dir="lambda-handler",
                )
            ],
            destination_bucket=s3.Bucket(
                self,
                "Bucket",
            ),
        )

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
                # Override the global setting with a specific path per Construct
                # This can be useful if a Construct requires a different version of esbuild
                esbuild_module_path="/project/node_modules/esbuild@13",
            ),
        )

        lambda_.Function(
            self,
            "InlineFunction",
            runtime=lambda_.Runtime.NODEJS_16_X,
            handler="index.handler",
            code=InlineTypeScriptCode(
                """
                const hello: string = 'world';
                export function handler() {
                    console.log(hello);
                }
                """
            ),
        )
