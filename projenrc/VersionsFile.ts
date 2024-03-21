import { IConstruct } from 'constructs';
import { Component, TextFile } from 'projen';

export interface VersionsFileOptions {
  path?: string;
  currentBranch: string;
  versions: {
    [key: string]: {
      minCdk: string;
      minNode: string;
      endOfSupport?: Date;
    };
  };
}

export class VersionsFile extends Component {
  public constructor(scope: IConstruct, {
    path = 'VERSIONS.md',
    currentBranch,
    versions,
  }: VersionsFileOptions) {
    super(scope, `versions#${path}`);

    const table = Object.entries(versions).map(([version, info]) => {
      const base = `| ${version} | ^${info.minCdk} | >=${info.minNode} |`;

      if (!(info.endOfSupport instanceof Date)) {
        return `${base} :white_check_mark: |`;
      }

      const format = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      if (isSupported(info.endOfSupport)) {
        return `${base} :x: Security updates and critical bug fixes until ${format.format(info.endOfSupport)} |`;
      }

      return `${base} :x: Support ended on ${format.format(info.endOfSupport)} |`;
    }).join('\n');

    new TextFile(this, path, {
      marker: false,
      lines: `# Supported Versions

Only the latest release of each major version is supported.

| Package version | CDK version | Node.js versions | Support                                                       |
| --------------- | ----------- | ---------------- | ------------------------------------------------------------- |
${table}

## Tags on npm

| Tag         | Description                                          | Major version | Will the version change?     |
| ----------- | ---------------------------------------------------- | ------------- | ---------------------------- |
| \`latest\`    | The latest stable release of the package             | \`${currentBranch}\`          | Yes, with new major versions |
| \`latest-v*\` | The latest stable release of each major version      | n/a           | No                           |
| \`cdk-v2\`    | The latest stable release compatible with AWS CDK v2 | \`${currentBranch}\`          | Yes, with new major versions |
| \`cdk-v1\`    | The latest stable release compatible with AWS CDK v1 | \`v2\`          | No                           |
`.split('\n'),
    });
  }
}


function isSupported(supportedUntil: Date): boolean {
  const eos = new Date(+supportedUntil + 86400000);
  return new Date() <= eos;
}
