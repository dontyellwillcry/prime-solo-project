import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RecipeReady from "../SoundFiles/RecipeReady";



function MatchingRecipe() {
  const dispatch = useDispatch();

  // Access ingredients and recipeReducer from Redux store
  const clickedIngredient = useSelector((state) => state.clickedIngredient);
  const recipeReducer = useSelector((state) => state.recipeReducer);
  const [ingredientImage, setIngredientImages] = useState([])

  

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

  return (
    <>
      
      {/* Render content based on conditions */}
    {matchingRecipes.length > 0 ? (
      
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
              //   <Modal
              //   // open={open}
              //   // onClose={handleClose}
              //   aria-labelledby="modal-modal-title"
              //   aria-describedby="modal-modal-description"
              // >
                <Card
                  sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "2px solid #000",
                  }}
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
                  // </Modal>
              )}
              {RecipeReady()}

            </Grid>
          ))}
        </Grid>
      </Container>
    ) : clickedIngredient.length > 0 ? (
      <img
        src={"https://media.tenor.com/0KQEvukP8lYAAAAj/crock-pot.gif"} // Replace with the correct image source
        alt="Recipe Placeholder"
        style={{
          width: "100px",
          height: "auto",
          marginBottom: "50px",
          marginTop: "50px",
        }}
      />
    ) : (
      <Grid>
      <img
        src={"/images/icons/crockpot.png"}
        alt="Recipe Placeholder"
        style={{
          width: "100px",
          height: "auto",
          marginBottom: "50px",
          marginTop: "50px",
        }}
        
      />
          {/* {CookingSound()} */}

      </Grid>
    )}
    </>
  );
}

export default MatchingRecipe;
