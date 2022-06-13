#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { LambdaStack } from "./stack";

const app = new cdk.App();
new LambdaStack(app, "EsmFunction");
