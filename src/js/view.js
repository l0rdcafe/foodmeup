import helpers from "./helpers";

const drawSpinner = function() {
  const spinner = helpers.newEl("i");
  const section = helpers.qs(".section");
  const footer = helpers.qs(".footer");
  spinner.className = "fas fa-spinner fa-spin x-centered fa-lg";
  section.innerHTML = "";
  footer.style.position = "absolute";
  section.appendChild(spinner);
};

const removeSpinner = function() {
  const spinner = helpers.qs(".fa-spinner");
  spinner.parentNode.removeChild(spinner);
};

const removeNotifs = function() {
  const notifs = helpers.qsa(".notif");

  if (notifs.length > 0) {
    for (let i = 0; i < notifs.length; i += 1) {
      notifs[i].parentNode.removeChild(notifs[i]);
    }
  }
};

const drawNotif = function(msg, type) {
  const div = `<div class="notif animated fadeInUp text-c ${type}">${msg}</div>`;
  const section = helpers.qs(".section");
  removeNotifs();
  section.insertAdjacentHTML("beforebegin", div);
  const notif = helpers.qs(".notif");

  setTimeout(() => {
    notif.classList.remove("fadeInUp");
    notif.classList.add("fadeOutDown");
  }, 2500);
};

const drawSearchField = function() {
  const field = helpers.newEl("input");
  const section = helpers.qs(".section");
  field.className = "input input--primary";
  field.id = "search";
  removeNotifs();
  section.insertBefore(field, section.firstChild);
  return field;
};

const drawName = function(text) {
  const recipeName = helpers.newEl("h4");
  recipeName.className = "name text-c";
  recipeName.innerHTML = text;
  return recipeName;
};

const drawImg = function(url) {
  const recipeImg = helpers.newEl("img");
  const section = helpers.qs(".section");
  const nutrients = helpers.qs(".nutrients");
  recipeImg.src = url;
  recipeImg.className = "img";
  section.insertBefore(recipeImg, nutrients);
};

const drawIngredients = function(ingredients) {
  const ingredientsList = helpers.newEl("ul");
  ingredientsList.className = "ingredients";

  ingredients.forEach((ingredient, idx) => {
    const ingredientLi = helpers.newEl("li");
    ingredientLi.innerHTML = `<i class="far fa-square text-secondary"></i>${ingredient.text}`;
    ingredientLi.className = "ingredients__item";
    ingredientLi.id = idx;
    ingredientsList.appendChild(ingredientLi);
  });
  return ingredientsList;
};

const drawNutrients = function(nutrients) {
  const nutrientsList = helpers.newEl("ul");
  nutrientsList.className = "nutrients";

  nutrients.forEach(nutrient => {
    const nutrientLi = helpers.newEl("li");
    nutrientLi.className = "nutrients__item";
    nutrientLi.innerHTML = `${nutrient.name}: ${nutrient.quantity}`;
    nutrientsList.appendChild(nutrientLi);
  });
  return nutrientsList;
};

const drawLink = function(url) {
  const p = helpers.newEl("p");
  const a = helpers.newEl("a");
  p.innerHTML = "Full recipe ";
  p.className = "text-c link";
  a.innerHTML = "here.";
  a.href = url;
  a.setAttribute("target", "_blank");
  p.appendChild(a);
  return p;
};

const drawRecipe = function(recipe) {
  const section = helpers.qs(".section");
  const { name, ingredients, recipeURL, nutrients } = recipe;
  const [nameElm, ingredientsElm, linkElm, nutrientsElm] = [
    drawName(name),
    drawIngredients(ingredients),
    drawLink(recipeURL),
    drawNutrients(nutrients)
  ];
  const footer = helpers.qs(".footer");
  removeNotifs();
  section.appendChild(nameElm);
  section.appendChild(ingredientsElm);
  section.appendChild(nutrientsElm);
  section.appendChild(linkElm);

  const pxFromBottom = window.innerHeight - document.body.scrollHeight;

  if (pxFromBottom - 60 < 20) {
    footer.style.position = "static";
    footer.style.float = "left";
  } else {
    footer.style.position = "absolute";
    footer.style.float = "none";
  }
};

const toggleState = function(target) {
  if (target.classList.contains("fa-square")) {
    target.parentNode.classList.add("checked");
    target.classList.remove("fa-square");
    target.classList.add("fa-check-square");
    return target.parentNode.id;
  } else if (target.classList.contains("fa-check-square")) {
    target.parentNode.classList.remove("checked");
    target.classList.remove("fa-check-square");
    target.classList.add("fa-square");
    return target.parentNode.id;
  }
};

export default {
  drawRecipe,
  drawSpinner,
  removeSpinner,
  drawSearchField,
  drawNotif,
  toggleState,
  drawImg,
  removeNotifs
};
