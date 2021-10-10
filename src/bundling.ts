import { DockerImage } from '@aws-cdk/core';
import {
  EsbuildOptions,
  EsbuildBundlingProps,
  LocalBundler,
} from './bundlers';

/**
 * @experimental
 */
export class EsbuildBundling {
  public readonly local: LocalBundler;

  public readonly image = DockerImage.fromRegistry('scratch');

  public constructor(
    public readonly buildOptions: EsbuildOptions,
    bundlerProps: EsbuildBundlingProps = {},
  ) {
    if (buildOptions.outfile && buildOptions.outdir) {
      throw new Error('Cannot use both "outfile" and "outdir"');
    }

    this.local = new LocalBundler(this.buildOptions, bundlerProps);
  }
}
