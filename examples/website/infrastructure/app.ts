#!/usr/bin/env node
import * as cdk from "aws-cdk-lib/core";
import { WebsiteStack } from "./stack";

const app = new cdk.App();
new WebsiteStack(app, "Website");
