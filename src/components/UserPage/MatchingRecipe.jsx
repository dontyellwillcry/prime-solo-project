import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RecipeReady from "../SoundFiles/RecipeReady";
import "./MatchingRecipe.css"



function MatchingRecipe() {
  const dispatch = useDispatch();

  // Access ingredients and recipeReducer from Redux store
  const clickedIngredient = useSelector((state) => state.clickedIngredient);
  const recipeReducer = useSelector((state) => state.recipeReducer);
  const [ingredientImage, setIngredientImages] = useState([])



  // Function to find recipes that match ingredient_ids
  // Define the findMatchingRecipes function
  function findMatchingRecipes(clickedIngredient, recipes) {
    const matchingRecipes = [];

    recipes.forEach((recipe) => {
      const ingredientIds = recipe.ingredient_ids;

      const matchingIngredients = ingredientIds.filter((recipeId) =>
        recipe.ingredient_ids.every((ingredientId) =>
          clickedIngredient.some((clicked) => clicked.id === ingredientId)
        )
      );

      if (matchingIngredients.length === ingredientIds.length &&
        matchingIngredients.every((value, index) => value === ingredientIds[index])) {

        matchingRecipes.push(recipe);
      }
    });
    return matchingRecipes;
  }





  // Use the findMatchingRecipes function when clickedIngredient or recipeReducer changes
  const matchingRecipes = findMatchingRecipes(clickedIngredient, recipeReducer, dispatch);


  console.log("matchingRecipes", matchingRecipes);

  const [isCardOpen, setIsCardOpen] = useState(true);

  function addToFavorite(id) {
    setIsCardOpen(false);
    console.log("Inside addToFavorite", id);
    dispatch({
      type: "SAVE_FAVORITE",
      payload: { id }, // Remember to put your payload in an object or your Saga/router will get mad
    });
    dispatch({
      type: "RESET_INGREDIENT",
    });
    setIsCardOpen(true);
  }

  function closeCard() {
    setIsCardOpen(false);
    setIngredientImages([])
    dispatch({
      type: "RESET_INGREDIENT",
    });
    setIsCardOpen(true);
  }

  const removeRamsey = () => {
    dispatch({
      type: "RESET_INGREDIENT",
      
    })

  }

  return (
    <div>
      {matchingRecipes.length === 0 && clickedIngredient.length === 4 ? (
        // Display loading indicator or placeholder while waiting for recipes
        
        <img 
              src={"https://media1.tenor.com/m/ZWd2z4Iy97UAAAAC/idiot-sandwich.gif"}
              alt="Recipe Placeholder"
              onClick={removeRamsey}
              className="gordonRamsey"
            />
      ) : (
        matchingRecipes.length > 0 ? (
          <div>
            {matchingRecipes.map((recipe) => (
              <div key={recipe.recipe_id}>
                {isCardOpen && (
                  <Card className="crockpotCard"
                    key={recipe.recipe_id}
                    onClick={closeCard}
                  >
                    <CardContent>
                      <img
                        src={recipe.recipe_image}
                        alt={recipe.name}
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                      <Typography
                        variant="h5"
                        component="div"
                        style={{ fontSize: "1rem" }}
                      >
                        {recipe.name}
                      </Typography>
  
                      <Button
                        variant="outlined"
                        style={{ fontSize: "0.8rem" }}
                        onClick={() => addToFavorite(recipe.recipe_id)}
                      >
                        Favorite
                      </Button>
                    </CardContent>
                  </Card>
                )}
                {RecipeReady()}
              </div>
            ))}
          </div>
        ) : (
          clickedIngredient.length > 0 ? (
            <img className="imgCrockpot"
              src={"https://media.tenor.com/0KQEvukP8lYAAAAj/crock-pot.gif"}
              alt="Recipe Placeholder"
            />
          ) : (
            <img className="imgCrockpot"
              src={"/images/icons/crockpot.png"}
              alt="Recipe Placeholder"
            />
          )
        )
      )}
    </div>
  );
}

export default MatchingRecipe;
