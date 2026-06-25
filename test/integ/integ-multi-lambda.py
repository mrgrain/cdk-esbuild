import aws_cdk as cdk
import aws_cdk.aws_lambda as lambda_
import aws_cdk.integ_tests_alpha as integ
from constructs import Construct
from mrgrain.cdk_esbuild import (
    BuildOptions,
    TypeScriptCodeCollection,
    EsbuildProvider,
    EsbuildSource,
)


class MultiLambdaStack(cdk.Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Set a new default
        EsbuildProvider.override_default_provider(
            EsbuildProvider(esbuild_module_path=EsbuildSource.install())
        )

        # Use TypeScriptCodeCollection to build multiple functions
        code_collection = TypeScriptCodeCollection(
            self,
            "MultiLambda",
            entry_points={
                "ts_handler": "test/fixtures/handlers/ts-handler.ts",
                "js_handler": "test/fixtures/handlers/js-handler.js",
            },
        )

        lambda_.Function(
            self,
            "TsHandlerFunction",
            runtime=lambda_.Runtime.NODEJS_18_X,
            handler="index.handler",
            code=code_collection.get_code("ts_handler"),
        )

        lambda_.Function(
            self,
            "JsHandlerFunction",
            runtime=lambda_.Runtime.NODEJS_18_X,
            handler="index.handler",
            code=code_collection.get_code("js_handler"),
        )

        # Use TypeScriptCodeCollection with build options
        code_collection_with_options = TypeScriptCodeCollection(
            self,
            "MultiLambdaWithOptions",
            entry_points={
                "colors": "test/fixtures/handlers/colors.ts",
            },
            build_options=BuildOptions(
                external=["aws-sdk"],
            ),
        )

        lambda_.Function(
            self,
            "ColorsFunction",
            runtime=lambda_.Runtime.NODEJS_18_X,
            handler="index.handler",
            code=code_collection_with_options.get_code("colors"),
        )


app = cdk.App()
stack = MultiLambdaStack(app, "MultiLambda")

integ.IntegTest(app, "MultiLambdaFunctions", test_cases=[stack])

app.synth()
