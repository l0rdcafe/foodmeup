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
  section.insertAdjacentHTML("afterbegin", div);
  const notif = helpers.qs(".notif");
  const title = helpers.qs(".title");
  title.classList.add("pushed");

  setTimeout(() => {
    notif.classList.remove("fadeInUp");
    notif.classList.add("fadeOutDown");
    title.classList.remove("pushed");
  }, 2500);
};

const drawSearchState = function() {
  const field = helpers.newEl("input");
  const section = helpers.qs(".section");
  const title = helpers.newEl("h3");
  title.className = "title text-c";
  title.innerHTML = "Please search one or more ingredients to find a recipe.";
  field.className = "input input--primary x-centered";
  field.id = "search";
  removeNotifs();
  section.insertBefore(field, section.firstChild);
  section.insertBefore(title, section.firstChild);
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
  p.className = "link";
  a.innerHTML = "here.";
  a.href = url;
  a.setAttribute("target", "_blank");
  p.appendChild(a);
  return p;
};

const drawNextBtn = function() {
  const btn = helpers.newEl("button");
  const section = helpers.qs(".section");
  btn.className = "secondary button";
  btn.id = "next";
  btn.innerHTML = "Next";
  section.appendChild(btn);
};

const removeNextBtn = function() {
  const btn = helpers.qs("#next");
  btn.parentNode.removeChild(btn);
};

const drawRecipe = function(recipe) {
  const section = helpers.qs(".section");
  const { name, ingredients, recipeURL, nutrients, img } = recipe;
  const [nameElm, ingredientsElm, linkElm, nutrientsElm] = [
    drawName(name),
    drawIngredients(ingredients),
    drawLink(recipeURL),
    drawNutrients(nutrients)
  ];
  const footer = helpers.qs(".footer");
  removeNotifs();
  section.innerHTML = "";
  footer.style.position = "absolute";
  footer.style.float = "none";
  section.appendChild(nameElm);
  section.appendChild(ingredientsElm);
  section.appendChild(nutrientsElm);
  section.appendChild(linkElm);
  drawImg(img);
  drawNextBtn();

  const pxFromBottom = window.innerHeight - document.body.scrollHeight;

  if (pxFromBottom - 100 < 100) {
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
  drawSearchState,
  drawNotif,
  toggleState,
  removeNotifs,
  removeNextBtn
};
