interface Favorites {
  color: string;
  food: string;
  season: string;
}

export const handler = async (favorites: Favorites): Promise<string> => {
  return (
    `My favorite color is ${favorites.color}, ` +
    `I always like to eat some ${favorites.food} and ` +
    `${favorites.season} is the best time of the year.`
  );
};
