#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { ListAppStack } from "./stack";

const app = new cdk.App();
new ListAppStack(app, "ListApp");
