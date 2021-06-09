import { LambdaRestApi } from "@aws-cdk/aws-apigateway";
import { AttributeType, Table } from "@aws-cdk/aws-dynamodb";
import { Function, Runtime } from "@aws-cdk/aws-lambda";
import { Construct, RemovalPolicy, Stack, StackProps } from "@aws-cdk/core";
import { TypeScriptCode } from "@mrgrain/cdk-esbuild";
import { List } from "../src/models/List";

const propertyOf = <TObj>(name: keyof TObj) => name;
export class ListAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const partitionKey = {
      name: propertyOf<List>("id"),
      type: AttributeType.STRING,
    };
    const storage = new Table(this, "storage", {
      partitionKey,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const backend = new Function(this, "backend", {
      runtime: Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: new TypeScriptCode("src/api/index.ts"),
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
        TABLE_NAME: storage.tableName,
        PARTITION_KEY: partitionKey.name,
      },
    });

    storage.grantReadWriteData(backend);

    new LambdaRestApi(this, "api", {
      handler: backend,
    });
  }
}
