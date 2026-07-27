module cdkesbuild_integ_tests

go 1.25.0

require github.com/aws/aws-cdk-go/awscdk/v2 v2.84.0

require github.com/aws/aws-cdk-go/awscdkintegtestsalpha/v2 v2.84.0-alpha.0

require (
	github.com/aws/jsii-runtime-go v1.139.0
	github.com/mrgrain/cdk-esbuild-go/cdkesbuild v0.0.0-unpublished
)

require (
	github.com/Masterminds/semver/v3 v3.5.0 // indirect
	github.com/aws/constructs-go/constructs/v10 v10.5.0 // indirect
	github.com/cdklabs/awscdk-asset-awscli-go/awscliv1/v2 v2.2.210 // indirect
	github.com/cdklabs/awscdk-asset-kubectl-go/kubectlv20/v2 v2.1.3 // indirect
	github.com/cdklabs/awscdk-asset-node-proxy-agent-go/nodeproxyagentv5/v2 v2.0.166 // indirect
	github.com/fatih/color v1.19.0 // indirect
	github.com/mattn/go-colorable v0.1.14 // indirect
	github.com/mattn/go-isatty v0.0.23 // indirect
	github.com/yuin/goldmark v1.7.16 // indirect
	golang.org/x/lint v0.0.0-20241112194109-818c5a804067 // indirect
	golang.org/x/mod v0.38.0 // indirect
	golang.org/x/sync v0.22.0 // indirect
	golang.org/x/sys v0.47.0 // indirect
	golang.org/x/telemetry v0.0.0-20260708182218-49f421fb7959 // indirect
	golang.org/x/tools v0.48.0 // indirect
	golang.org/x/tools/cmd/godoc v0.1.0-deprecated // indirect
	golang.org/x/tools/godoc v0.1.0-deprecated // indirect
)

replace github.com/mrgrain/cdk-esbuild-go/cdkesbuild v0.0.0-unpublished => ./dist/go/cdkesbuild

replace github.com/mrgrain/cdk-esbuild-go/cdkesbuild/jsii v0.0.0-unpublished => ./dist/go/cdkesbuild/jsii

replace github.com/mrgrain/cdk-esbuild-go/cdkesbuild/internal v0.0.0-unpublished => ./dist/go/cdkesbuild/internal
