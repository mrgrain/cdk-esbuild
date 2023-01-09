// ../fixtures/handlers/colors.ts
var handler = async (favorites) => {
  return `My favorite colour is ${favorites.colour}, I always like to eat some ${favorites.food} and ${favorites.season} is the best time of the year.`;
};
export {
  handler
};
