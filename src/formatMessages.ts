import { WriteStream } from 'tty';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BuildFailure,
  BuildResult,
  TransformFailure,
  TransformResult,
} from './esbuild-types';
import { formatMessagesSync } from './esbuild-wrapper';

export function printBuildErrors(
  failure: TransformFailure | BuildFailure,
  {
    dest = process.stdout,
    color = true,
    prefix = '',
  }: {
    dest?: WriteStream;
    color?: boolean;
    prefix?: string;
  } = {},
): void {
  const errors = formatMessagesSync(failure.errors, {
    kind: 'error',
    color,
  });

  if (errors.length > 0) {
    dest.write(`${prefix}Errors:\n\n`);
    dest.write(errors.join('\n\n'));
  }
}

export function printBuildWarnings(
  failure: TransformFailure | BuildFailure | TransformResult | BuildResult,
  {
    dest = process.stdout,
    color = true,
    prefix = '',
  }: {
    dest?: WriteStream;
    color?: boolean;
    prefix?: string;
  } = {},
): void {
  const warnings = formatMessagesSync(failure.warnings, {
    kind: 'warning',
    color,
  });

  if (warnings.length > 0) {
    dest.write(`${prefix}Warning:\n\n`);
    dest.write(warnings.join('\n\n'));
  }
}

export function printBuildMessages(
  failure: TransformFailure | BuildFailure | TransformResult | BuildResult,
  props: {
    dest?: WriteStream;
    color?: boolean;
    prefix?: string;
  } = {},
): void {
  printBuildWarnings(failure, props);

  if ((failure as BuildFailure).errors) {
    printBuildErrors(failure as BuildFailure, props);
  }
}
