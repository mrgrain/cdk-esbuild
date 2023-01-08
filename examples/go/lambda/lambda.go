package main

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awslambda"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
	"github.com/mrgrain/cdk-esbuild-go/cdkesbuild/v4"
)

type LambdaStackProps struct {
	awscdk.StackProps
}

func NewLambdaStack(scope constructs.Construct, id string, props *LambdaStackProps) awscdk.Stack {
	var sprops awscdk.StackProps
	if props != nil {
		sprops = props.StackProps
	}
	stack := awscdk.NewStack(scope, &id, &sprops)

	lambda := awslambda.NewFunction(stack, jsii.String("Lambda"), &awslambda.FunctionProps{
		Runtime: awslambda.Runtime_NODEJS_18_X(),
		Handler: jsii.String("index.handler"),
		Code:    cdkesbuild.NewTypeScriptCode(jsii.String("./lambda-handler/index.ts"), &cdkesbuild.TypeScriptCodeProps{}),
	})

	awscdk.NewCfnOutput(stack, jsii.String("LambdaArn"), &awscdk.CfnOutputProps{
		Value: lambda.FunctionArn(),
	})

	return stack
}

func main() {
	defer jsii.Close()

	app := awscdk.NewApp(nil)

	NewLambdaStack(app, "GoExample", &LambdaStackProps{})

	app.Synth(nil)
}
