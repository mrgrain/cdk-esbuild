import aws_cdk as cdk
import aws_cdk.aws_lambda as lambda_
import aws_cdk.integ_tests_alpha as integ
from constructs import Construct
from mrgrain.cdk_esbuild import (
    BuildOptions,
    InlineTypeScriptCode,
    TypeScriptCode,
    EsbuildProvider,
    EsbuildSource,
)


class LambdaStack(cdk.Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Set a new default
        EsbuildProvider.override_default_provider(
            EsbuildProvider(esbuild_module_path=EsbuildSource.install())
        )

        # Use an explicit provider
        lambda_.Function(
            self,
            "FunctionOne",
            runtime=lambda_.Runtime.NODEJS_16_X,
            handler="index.handler",
            code=TypeScriptCode(
                "../fixtures/handlers/colors.ts",
                copy_dir="../fixtures/handlers",
                build_provider=EsbuildProvider(),  # Override for a specific construct
            ),
        )

        # Set build options
        lambda_.Function(
            self,
            "FunctionTwo",
            runtime=lambda_.Runtime.NODEJS_16_X,
            handler="index.handler",
            code=TypeScriptCode(
                "../fixtures/handlers/colors.ts",
                build_options=BuildOptions(
                    format="esm",
                    outfile="index.mjs",
                    external=["aws-sdk"],
                    log_level="verbose",
                ),
            ),
        )

        # Inline Code
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
                # Try to find the package anywhere, but don't install it
                transform_provider=EsbuildProvider(
                    esbuild_module_path=EsbuildSource.anywhere()
                ),
            ),
        )


app = cdk.App()
stack = LambdaStack(app, "Lambda")

integ.IntegTest(app, "LambdaFunctions", test_cases=[stack])

app.synth()
