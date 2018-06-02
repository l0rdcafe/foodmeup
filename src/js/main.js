import helpers from "./helpers";
import model from "./model";
import view from "./view";
import RecipeAPI from "./edamam-api";
import ImgAPI from "./imgur-api";

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

const searchRecipe = function(e) {
  const key = e.which || e.keyCode;
  if (key === 13) {
    const { value } = helpers.qs("#search");
    if (value !== "") {
      view.drawSpinner();
      RecipeAPI.getRecipe(value)
        .then(res => {
          const { recipe } = model.setRecipeInfo(res);
          view.removeSpinner();
          view.drawRecipe(recipe);
          ingStateListener();

          const query = encodeURIComponent(recipe.name.toLowerCase());

          ImgAPI.getImage(query)
            .then(resp => {
              if (resp.error) {
                view.drawNotif(resp.message, "error");
              } else {
                const { imgURL } = model.setImg(resp);
                view.drawImg(imgURL);
              }
            })
            .catch(err => console.error(err));
        })
        .catch(err => {
          view.drawNotif("Sorry, something went wrong. Please try again later.", "error");
          view.removeSpinner();
        });
    }
    fieldListener();
  }
};

const fieldListener = function() {
  view.drawSearchState();
  helpers.$on(document, "keydown", searchRecipe);
};

helpers.$on(document, "DOMContentLoaded", fieldListener);
