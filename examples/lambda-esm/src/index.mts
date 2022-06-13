import { Handler } from "aws-lambda";
import fetch from "node-fetch";

interface Affirmation {
  affirmation: string;
}

const response = await fetch("https://www.affirmations.dev");
const data = (await response.json()) as Affirmation;

export const handler: Handler = async () => {
  return data.affirmation;
};
