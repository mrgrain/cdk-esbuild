import { Handler } from "aws-lambda";

interface Favourites {
  colour: string;
  food: string;
  season: string;
}

export const handler: Handler<Favourites, string> = async (favourites) => {
  return (
    `My favourite colour is ${favourites.colour}, ` +
    `I always like to eat some ${favourites.food} and ` +
    `${favourites.season} is the best time of the year.`
  );
};
