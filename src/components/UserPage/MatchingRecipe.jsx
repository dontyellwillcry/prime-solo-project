import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function MatchingRecipe() {
  const dispatch = useDispatch();

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

  console.log("matchingRecipes", matchingRecipes);

  const [isCardOpen, setIsCardOpen] = useState(true);

  function addFavorite(id) {
    setIsCardOpen(false);

    console.log("Inside addFavorite", id);
    dispatch({
      type: "SAVE_FAVORITE",
      payload: { id }, // Remember to put your payload in an object or your Saga/router will get mad
    });
    dispatch({
      type: "RESET_INGREDIENT",
    });

    setIsCardOpen(true);
    
  }

  return (
    <>
      <img
        src={"https://media.tenor.com/0KQEvukP8lYAAAAj/crock-pot.gif"}
        alt="Recipe Placeholder"
        style={{
          width: "100px",
          height: "auto",
          marginBottom: "50px",
          marginTop: "50px",
        }}
      />

      <Container maxWidth="md">
        <Grid
          container
          spacing={3}
          sx={{ flexGrow: 1 }}
          justifyContent="center"
        >
          {matchingRecipes.map((recipe) => (
            <Grid item xs={3} key={recipe.recipe_id}>
              {isCardOpen && (
                <Card
                  sx={{
                    width: 200, // Changes the width of my card
                    height: 200, // Changes height.
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Adjust the transparency here
                    border: "2px solid #000", // Add a border
                  }}
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
                    {/* <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Type: {recipe.type}
                  </Typography> */}
                    <Button
                      variant="outlined"
                      style={{ fontSize: "0.8rem" }}
                      onClick={() => addFavorite(recipe.recipe_id)}
                      // onClick={() => setingredientData(ingredient.id, ingredient.image)}
                    >
                      Favorite
                    </Button>
                  </CardContent>
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default MatchingRecipe;