let state = {};

const resetState = function() {
  state = {};
};

const updateState = function(id) {
  state.recipe.ingredients[`${id}`].done = !state.recipe.ingredients[`${id}`].done;
};

const getState = function() {
  return state;
};

const setState = function(data) {
  resetState();
  state.recipes = [...data];
  return state;
};

export default { state, setState, updateState, getState };
