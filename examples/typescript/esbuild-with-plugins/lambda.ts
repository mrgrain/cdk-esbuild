import capitalize from "https://cdn.skypack.dev/lodash.capitalize";

export const handler = async (input: { body: string }) =>
  capitalize(input?.body);
