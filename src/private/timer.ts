const enabled = () => !!process.env.TIMINGS;

export function timer(description: string) {
  const start = enabled() ? performance.now() : 0;
  return {
    stop(state?: string) {
      if (!enabled()) return;
      const ms = (performance.now() - start).toFixed(0);
      process.stderr.write(`[cdk-esbuild] ${description} ${ms}ms${state ? ` [${state}]` : ''}\n`);
    },
  };
}
