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

	// Override default provider
	cdkesbuild.EsbuildProvider_OverrideDefaultBuildProvider(
		cdkesbuild.NewEsbuildProvider(&cdkesbuild.EsbuildProviderProps{
			EsbuildModulePath: cdkesbuild.EsbuildSource_Install(),
		}),
	)

	// Use an explicit provider
	awslambda.NewFunction(stack, jsii.String("FunctionOne"), &awslambda.FunctionProps{
		Runtime: awslambda.Runtime_NODEJS_16_X(),
		Handler: jsii.String("index.handler"),
		Code: cdkesbuild.NewTypeScriptCode(
			jsii.String("../fixtures/handlers/colors.ts"),
			&cdkesbuild.TypeScriptCodeProps{
				CopyDir: jsii.String("../fixtures/handlers"),
				BuildProvider: cdkesbuild.NewEsbuildProvider(&cdkesbuild.EsbuildProviderProps{}),
			},
		),
	})

	// Set build options
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

	// Inline Code
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
			&cdkesbuild.TransformerProps{
				// Try to find the package anywhere, but don't install it
				TransformProvider: cdkesbuild.NewEsbuildProvider(&cdkesbuild.EsbuildProviderProps{
					EsbuildModulePath: cdkesbuild.EsbuildSource_Anywhere(),
				}),
			},
		),
	})

	awscdkintegtestsalpha.NewIntegTest(app, jsii.String("GoLambdaFunctions"), &awscdkintegtestsalpha.IntegTestProps{
		TestCases: &[]awscdk.Stack{
			stack,
		},
	})

	app.Synth(nil)
}