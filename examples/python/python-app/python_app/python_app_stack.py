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
    TransformerProps,
    EsbuildSource,
)


class PythonAppStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        EsbuildSource.default = EsbuildSource.global_paths

        s3_deployment.BucketDeployment(
            self,
            "Website",
            sources=[
                TypeScriptSource(
                    "lambda-handler/index.ts",
                    copy_dir="lambda-handler",
                    esbuild_module_path=None,  # Use default
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
                    format="esm",
                    outfile="index.mjs",
                    external=["aws-sdk"],
                    log_level="verbose",
                ),
                # Override the default setting with a specific path per Construct
                esbuild_module_path=EsbuildSource.install,
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
                """,
                props=TransformerProps(
                    # Try to find the package anywhere, but don't install it
                    esbuild_module_path=EsbuildSource.anywhere
                ),
            ),
        )
