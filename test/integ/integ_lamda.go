package main

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awslambda"
	"github.com/aws/aws-cdk-go/awscdkintegtestsalpha/v2"
	"github.com/aws/jsii-runtime-go"
	"github.com/mrgrain/cdk-esbuild-go/cdkesbuild"
)

func main() {
	defer jsii.Close()

	app := awscdk.NewApp(nil)
	stack := awscdk.NewStack(app, jsii.String("GoLambdaStack"), nil)

	awslambda.NewFunction(stack, jsii.String("FunctionOne"), &awslambda.FunctionProps{
		Runtime: awslambda.Runtime_NODEJS_16_X(),
		Handler: jsii.String("index.handler"),
		Code: cdkesbuild.NewTypeScriptCode(
			jsii.String("../fixtures/handlers/colors.ts"),
			&cdkesbuild.TypeScriptCodeProps{
				CopyDir: jsii.String("../fixtures/handlers"),
			},
		),
	})

	awslambda.NewFunction(stack, jsii.String("FunctionTwo"), &awslambda.FunctionProps{
		Runtime: awslambda.Runtime_NODEJS_16_X(),
		Handler: jsii.String("index.handler"),
		Code: cdkesbuild.NewTypeScriptCode(
			jsii.String("../fixtures/handlers/colors.ts"),
			&cdkesbuild.TypeScriptCodeProps{
				BuildOptions: &cdkesbuild.BuildOptions{
					Format: jsii.String("esm"),
					Outfile: jsii.String("index.mjs"),
					External: &[]*string{
						jsii.String("aws-sdk"),
					},
					LogLevel: jsii.String("verbose"),
				},
			},
		),
	})

	awslambda.NewFunction(stack, jsii.String("InlineFunction"), &awslambda.FunctionProps{
		Runtime: awslambda.Runtime_NODEJS_16_X(),
		Handler: jsii.String("index.handler"),
		Code: cdkesbuild.NewInlineTypeScriptCode(
			jsii.String(`
			const hello: string = 'world';
			export function handler() {
				console.log(hello);
			}
			`),
			&cdkesbuild.TransformerProps{},
		),
	})

	awscdkintegtestsalpha.NewIntegTest(app, jsii.String("GoLambdaFunctions"), &awscdkintegtestsalpha.IntegTestProps{
		TestCases: &[]awscdk.Stack{
			stack,
		},
	})

	app.Synth(nil)
}