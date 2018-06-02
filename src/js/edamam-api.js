import helpers from "./helpers";

const getRecipe = function(query) {
  const APP_ID = "382eeaf3";
  const APP_KEY = "b2a47b9b8c822bb8b655f0328ecce92b";
  const url = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}`;

  function parseDish(res) {
    const name = res.recipe.label;
    const recipeURL = res.recipe.url;
    const { totalNutrients } = res.recipe;
    const ingredients = res.recipe.ingredients.map(ing => ({ text: ing.text, done: false }));
    const nutrients = [];

    Object.keys(totalNutrients).forEach(nutrient => {
      const rounded = Math.round(totalNutrients[nutrient].quantity);
      const item = {
        name: `${totalNutrients[nutrient].label}`,
        quantity: `${rounded}${totalNutrients[nutrient].unit}`
      };
      nutrients.push(item);
    });
    return {
      name,
      recipeURL,
      nutrients,
      ingredients
    };
  }
  return helpers.getJSON(url).then(res => parseDish(res.hits[0]));
};

export default { getRecipe };
