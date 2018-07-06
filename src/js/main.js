import helpers from "./helpers";
import model from "./model";
import view from "./view";
import RecipeAPI from "./edamam-api";

const ingStateListener = function() {
  const ingList = helpers.qs(".ingredients");
  function toggleState(e) {
    const id = view.toggleState(e.target);
    if (id) {
      model.updateState(id);
    }
  }
  helpers.$on(ingList, "click", toggleState);
};

const nextListener = function() {
  const btn = helpers.qs("#next");
  helpers.$on(btn, "click", () => {
    const { recipes } = model.getState();
    console.log(recipes);
    nextRecipe(recipes);
  });
};

const nextRecipe = function(recipes) {
  if (recipes.length > 0) {
    const recipe = recipes.shift();
    view.drawRecipe(recipe);
    ingStateListener();
    nextListener();
    fieldListener();
  } else {
    view.drawNotif("You ran out of results.", "info");
    view.removeNextBtn();
  }
};

const searchRecipe = function(e) {
  const key = e.which || e.keyCode;
  if (key === 13) {
    const { value } = helpers.qs("#search");
    const isValid = value !== "" && !/[<>/\\&;`"*{}()\d$^%#@![\]]+/.test(value);
    if (isValid) {
      view.drawSpinner();
      RecipeAPI.getRecipe(value)
        .then(res => {
          const { recipes } = model.setState(res);
          view.removeSpinner();
          nextRecipe(recipes);
        })
        .catch(err => {
          view.drawNotif("Sorry, something went wrong. Please try again later.", "error");
          view.removeSpinner();
        });
    } else {
      view.drawNotif("Please enter a valid search query.", "primary");
    }
  }
};

const fieldListener = function() {
  view.drawSearchState();
  helpers.$on(document, "keydown", searchRecipe);
};

helpers.$on(document, "DOMContentLoaded", fieldListener);
