import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { TypeScriptCodeCollection } from '@mrgrain/cdk-esbuild';

export class MultiLambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const codeCollection = new TypeScriptCodeCollection(this, 'MultiLambda', {
      entryPoints: {
        'api': './src/api.ts',
        'auth': './src/auth.ts',
        'notifications': './src/notifications.ts',
      },
      buildOptions: {
        minify: true,
      },
    });

    new lambda.Function(this, 'ApiFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'api.handler',
      code: codeCollection.getCode('api'),
    });

    new lambda.Function(this, 'AuthFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'auth.handler',
      code: codeCollection.getCode('auth'),
    });

    new lambda.Function(this, 'NotificationsFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'notifications.handler',
      code: codeCollection.getCode('notifications'),
    });
  }
}

const app = new cdk.App();
new MultiLambdaStack(app, 'MultiLambdaStack');