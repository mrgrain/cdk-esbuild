import { Canary, Cleanup, Runtime, Schedule, Test } from "@aws-cdk/aws-synthetics-alpha";
import { TypeScriptCode, TypeScriptSource } from "@mrgrain/cdk-esbuild";
import { BlockPublicAccess, Bucket, ObjectOwnership } from "aws-cdk-lib/aws-s3";
import { BucketDeployment } from "aws-cdk-lib/aws-s3-deployment";
import { Alarm, ComparisonOperator } from "aws-cdk-lib/aws-cloudwatch";
import {
  CfnOutput,
  Duration,
  RemovalPolicy,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export class WebsiteStack extends Stack {
  constructor(scope?: Construct, id?: string, props?: StackProps) {
    super(scope, id, props);

    const websiteBundle = new TypeScriptSource("./src/index.tsx", {
      copyDir: "static",
      buildOptions: {
        outdir: "js",
      },
    });

    const websiteBucket = new Bucket(this, "WebsiteBucket", {
      autoDeleteObjects: true,
      publicReadAccess: true,
      blockPublicAccess: new BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      objectOwnership: ObjectOwnership.OBJECT_WRITER,      
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
    });

    const website = new BucketDeployment(this, "DeployWebsite", {
      destinationBucket: websiteBucket,
      sources: [websiteBundle],
    });

    new CfnOutput(this, "WebsiteUrl", {
      value: websiteBucket.bucketWebsiteUrl,
    });

    const canary = new Canary(this, "Monitoring", {
      schedule: Schedule.rate(Duration.hours(1)),
      runtime: Runtime.SYNTHETICS_NODEJS_PUPPETEER_5_1,
      enableAutoDeleteLambdas: true,
      test: Test.custom({
        code: new TypeScriptCode("./src/canary.ts", {
          buildOptions: {
            outdir: "nodejs/node_modules",
            external: ["Synthetics"],
          },
        }),
        handler: "canary.handler",
      }),
      environmentVariables: {
        MONITORING_URL: websiteBucket.bucketWebsiteUrl,
        TIMEOUT: "3000",
      },
      artifactsBucketLocation: {
        bucket: new Bucket(this, "ArtifactsBucket", {
          autoDeleteObjects: true,
          removalPolicy: RemovalPolicy.DESTROY,
        }),
      },
    });
    canary.node.addDependency(website);

    new Alarm(this, "CanaryAlarm", {
      metric: canary.metricSuccessPercent(),
      evaluationPeriods: 2,
      threshold: 90,
      comparisonOperator: ComparisonOperator.LESS_THAN_THRESHOLD,
    });
  }
}
