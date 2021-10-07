import assert from "assert";
import synthetics from "Synthetics";

export const handler = async () => {
  assert(process.env.MONITORING_URL);
  assert(process.env.TIMEOUT);

  const { MONITORING_URL, TIMEOUT } = process.env;

  const page = await synthetics.getPage();
  await page.goto(MONITORING_URL, { timeout: parseInt(TIMEOUT) });
  await page.screenshot({ path: "/tmp/screenshot.png" });

  return;
};
