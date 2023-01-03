import aws_cdk as cdk
import aws_cdk.aws_s3 as s3
import aws_cdk.aws_s3_deployment as s3_deployment
import aws_cdk.integ_tests_alpha as integ
from constructs import Construct
from mrgrain.cdk_esbuild import (
    TypeScriptSource,
    EsbuildProvider,
    EsbuildSource,
)


class WebsiteStack(cdk.Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Set a new default
        EsbuildProvider.override_default_provider(
            EsbuildProvider(esbuild_module_path=EsbuildSource.install())
        )

        s3_deployment.BucketDeployment(
            self,
            "Website",
            sources=[
                TypeScriptSource(
                    "../fixtures/handlers/colors.ts",
                    copy_dir="../fixtures/handlers",
                    build_provider=EsbuildProvider(),  # Override for a specific construct
                )
            ],
            destination_bucket=s3.Bucket(
                self,
                "Bucket",
            ),
        )


app = cdk.App()
stack = WebsiteStack(app, "Website")

integ.IntegTest(app, "S3Website", test_cases=[stack])

app.synth()
