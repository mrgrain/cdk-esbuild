import { readFile } from "fs/promises";


const affirmations = JSON.parse((await readFile("data/affirmations.json")).toString('utf-8')) as string[];

export const handler = async () => {
  return affirmations[Math.floor(Math.random()*affirmations.length)];
};
