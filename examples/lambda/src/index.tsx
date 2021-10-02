import { Handler } from "aws-lambda";

interface Favorites {
  colour: string;
  food: string;
  season: string;
}

export const handler: Handler<Favorites, string> = async (favorites) => {
  return (
    `My favorite colour is ${favorites.colour}, ` +
    `I always like to eat some ${favorites.food} and ` +
    `${favorites.season} is the best time of the year.`
  );
};
