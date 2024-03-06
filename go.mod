module cdkesbuild_integ_tests

go 1.16

require github.com/aws/aws-cdk-go/awscdk/v2 v2.58.1

require github.com/aws/aws-cdk-go/awscdkintegtestsalpha/v2 v2.58.1-alpha.0

require (
	github.com/aws/constructs-go/constructs/v10 v10.2.26
	github.com/aws/jsii-runtime-go v1.95.0
	github.com/mrgrain/cdk-esbuild-go/cdkesbuild v0.0.0-unpublished
)

replace github.com/mrgrain/cdk-esbuild-go/cdkesbuild v0.0.0-unpublished => ./dist/go/cdkesbuild

replace github.com/mrgrain/cdk-esbuild-go/cdkesbuild/jsii v0.0.0-unpublished => ./dist/go/cdkesbuild/jsii

replace github.com/mrgrain/cdk-esbuild-go/cdkesbuild/internal v0.0.0-unpublished => ./dist/go/cdkesbuild/internal
