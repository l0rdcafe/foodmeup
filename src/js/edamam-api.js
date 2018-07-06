import helpers from "./helpers";

const getRecipe = function(query) {
  const APP_ID = "382eeaf3";
  const APP_KEY = "b2a47b9b8c822bb8b655f0328ecce92b";
  const url = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}`;

  function parseDish(res) {
    const recipes = [];

    res.forEach(item => {
      const name = item.recipe.label;
      const recipeURL = item.recipe.url;
      const { totalNutrients } = item.recipe;
      const ingredients = item.recipe.ingredients.map(ing => ({ text: ing.text, done: false }));
      const nutrients = [];
      const img = item.recipe.image;

      Object.keys(totalNutrients).forEach(nutrient => {
        const rounded = Math.round(totalNutrients[nutrient].quantity);
        const nut = {
          name: `${totalNutrients[nutrient].label}`,
          quantity: `${rounded}${totalNutrients[nutrient].unit}`
        };
        nutrients.push(nut);
      });

      recipes.push({
        name,
        recipeURL,
        nutrients,
        ingredients,
        img
      });
    });

    return recipes;
  }
  return helpers.getJSON(url).then(res => parseDish(res.hits));
};

export default { getRecipe };
