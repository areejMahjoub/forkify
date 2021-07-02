// const { async } = require('q');

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODEL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //0. Update Results view to Mark Selected Results View
    resultView.update(model.getSearchResultPage());

    //1. Loading Recipe From model.js Module
    await model.loadRecipe(id);

    //2. Rendering Recipe
    recipeView.render(model.state.recipe);

    //3. Updating Bookmarks
    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};
const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    //1. Get Search Query
    const query = searchView.getQuery();
    if (!query) return;
    //2. Load Search Results
    await model.loadSearchResults(query);
    //3. Render Search Results
    resultView.render(model.getSearchResultPage());
    //4 Render Initial Pagination Buttons
    paginationView.render(model.state.search);
  } catch (err) {}
};
const controlPagination = function (goToPage) {
  //3. Render New Search Results
  resultView.render(model.getSearchResultPage(goToPage));
  //4 Render New Pagination Buttons
  console.log(model.state.search);
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //1. Update the Recipe Servings (in state)
  model.updateServings(newServings);
  //2. Update the Recipe View
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1. Add/Remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //2. Update Recipe
  recipeView.update(model.state.recipe);
  //3.
  bookmarkView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Show Loading Spinner
    addRecipeView.renderSpinner();

    //Upload Our New Recipe Data
    await model.uploadRecipe(newRecipe);

    //Render Our Recipe on RecipeView
    recipeView.render(model.state.recipe);

    //Desplay Success Message
    addRecipeView.renderMessage();

    //Render BookMark View
    bookmarkView.render(model.state.bookmarks);

    //Change ID in the URL Using History API
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close Form Window immediately after Uploding Our Own recipe
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controllRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('Welcome');
};
init();
