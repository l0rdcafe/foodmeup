let state = {};

const resetState = function() {
  state = {};
};

const updateState = function(id) {
  state.recipe.ingredients[`${id}`].done = !state.recipe.ingredients[`${id}`].done;
};

const setImg = function(url) {
  state.recipe.imgURL = url;
  return state.recipe;
};

const setRecipeInfo = function(data) {
  resetState();

  const { name, recipeURL, nutrients, ingredients } = data;

  state.recipe = {
    name,
    ingredients,
    nutrients,
    recipeURL
  };

  return state;
};

export default { state, setRecipeInfo, updateState, setImg };
