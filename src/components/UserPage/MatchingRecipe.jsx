import React from "react";
import { useSelector } from "react-redux";

function MatchingRecipe() {
  // Access ingredients and recipeReducer from Redux store
  const clickedIngredient = useSelector((state) => state.clickedIngredient);
  const recipeReducer = useSelector((state) => state.recipeReducer);

  // Function to find recipes that match ingredient_ids
  // Define the findMatchingRecipes function
  function findMatchingRecipes(clickedIngredient, recipes) {
    // Create an empty array to store matching recipes
    const matchingRecipes = [];

    // Iterate through the recipes
    recipes.forEach((recipe) => {
      // Get the ingredient IDs required by the current recipe
      const ingredientIds = recipe.ingredient_ids;

      // Use the filter method to find ingredients that have matching IDs
      const matchingIngredients = clickedIngredient.filter((ingredient) =>
        ingredientIds.includes(ingredient.id)
      );

      // Check if the number of matching ingredients equals the required number
      if (matchingIngredients.length === ingredientIds.length) {
        // If the counts match, add the recipe to the matchingRecipes array
        matchingRecipes.push(recipe);
      }
    });

    // Return the array of matching recipes
    return matchingRecipes;
  }

  // Use the findMatchingRecipes function when clickedIngredient or recipeReducer changes
  const matchingRecipes = findMatchingRecipes(clickedIngredient, recipeReducer);

  return (
    <div>
      <h1>Matching Recipes</h1>
      <ul>
        {matchingRecipes.map((recipe) => (
          <li key={recipe.recipe_id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MatchingRecipe;
