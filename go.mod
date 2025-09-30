module cdkesbuild_integ_tests

go 1.23.0

toolchain go1.23.6

require github.com/aws/aws-cdk-go/awscdk/v2 v2.84.0

require github.com/aws/aws-cdk-go/awscdkintegtestsalpha/v2 v2.84.0-alpha.0

require (
	github.com/aws/constructs-go/constructs/v10 v10.2.26
	github.com/aws/jsii-runtime-go v1.115.0
	github.com/mrgrain/cdk-esbuild-go/cdkesbuild v0.0.0-unpublished
)

require (
	github.com/Masterminds/semver/v3 v3.4.0 // indirect
	github.com/cdklabs/awscdk-asset-awscli-go/awscliv1/v2 v2.2.210 // indirect
	github.com/cdklabs/awscdk-asset-kubectl-go/kubectlv20/v2 v2.1.3 // indirect
	github.com/cdklabs/awscdk-asset-node-proxy-agent-go/nodeproxyagentv5/v2 v2.0.166 // indirect
	github.com/fatih/color v1.18.0 // indirect
	github.com/mattn/go-colorable v0.1.13 // indirect
	github.com/mattn/go-isatty v0.0.20 // indirect
	github.com/yuin/goldmark v1.4.13 // indirect
	golang.org/x/lint v0.0.0-20210508222113-6edffad5e616 // indirect
	golang.org/x/mod v0.27.0 // indirect
	golang.org/x/sync v0.16.0 // indirect
	golang.org/x/sys v0.35.0 // indirect
	golang.org/x/tools v0.36.0 // indirect
)

replace github.com/mrgrain/cdk-esbuild-go/cdkesbuild v0.0.0-unpublished => ./dist/go/cdkesbuild

replace github.com/mrgrain/cdk-esbuild-go/cdkesbuild/jsii v0.0.0-unpublished => ./dist/go/cdkesbuild/jsii

replace github.com/mrgrain/cdk-esbuild-go/cdkesbuild/internal v0.0.0-unpublished => ./dist/go/cdkesbuild/internal
