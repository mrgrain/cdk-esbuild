import { Bucket } from "@aws-cdk/aws-s3";
import { BucketDeployment, Source } from "@aws-cdk/aws-s3-deployment";
import * as cdk from "@aws-cdk/core";
import { CfnOutput, RemovalPolicy } from "@aws-cdk/core";
import { TypeScriptSource } from "@mrgrain/cdk-esbuild";

export class WebsiteStack extends cdk.Stack {
  constructor(scope?: cdk.Construct, id?: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBundle = new TypeScriptSource("./src/index.tsx", {
      buildOptions: {
        define: {
          // React requires this env variable to be set when building for the browser
          "process.env.NODE_ENV": '"production"',
        },
      },
    });

    const websiteBucket = new Bucket(this, "WebsiteBucket", {
      autoDeleteObjects: true,
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
    });

    new BucketDeployment(this, "DeployWebsite", {
      destinationBucket: websiteBucket,
      sources: [Source.asset("./static"), websiteBundle],
    });

    new CfnOutput(this, "WebsiteUrl", {
      value: websiteBucket.bucketWebsiteUrl,
    });
  }
}
