#!/usr/bin/env node
import * as cdk from "aws-cdk-lib/core";
import { CloudFrontFunctionStack } from "./stack";

const app = new cdk.App();
new CloudFrontFunctionStack(app, "CloudFrontFunction");
