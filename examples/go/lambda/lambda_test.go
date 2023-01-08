package main

import (
	"testing"

	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/assertions"
	"github.com/aws/jsii-runtime-go"
)

func TestLambdaStack(t *testing.T) {
	// GIVEN
	app := awscdk.NewApp(nil)

	// WHEN
	stack := NewLambdaStack(app, "GoTestStack", nil)

	// THEN
	template := assertions.Template_FromStack(stack, &assertions.TemplateParsingOptions{})

	template.HasResourceProperties(jsii.String("AWS::Lambda::Function"), map[string]interface{}{
		"Handler": "index.handler",
		"Runtime": "nodejs18.x",
	})

	template.HasOutput(jsii.String("LambdaArn"), struct{}{})
}
