#!/usr/bin/env python3
import os

import aws_cdk as cdk

from python_app.python_app_stack import PythonAppStack


app = cdk.App()
PythonAppStack(app, "PythonAppStack")

app.synth()
