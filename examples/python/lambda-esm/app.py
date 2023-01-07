#!/usr/bin/env python3
import aws_cdk as cdk

from infrastructure.lambda_esm_stack import LambdaEsmStack


app = cdk.App()
LambdaEsmStack(app, "LambdaEsmStack")

app.synth()
