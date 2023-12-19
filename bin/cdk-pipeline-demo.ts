#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkPipelineDemoStack } from "../lib/cdk-pipeline-demo-stack";

const app = new cdk.App();
new CdkPipelineDemoStack(app, "CdkPipelineDemoStack", {
  env: {
    account: "062887326995",
    region: "us-west-2",
  },
});
