import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CookpotOpen from "../SoundFiles/CookpotOpen";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";



function UserForm() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const recipeReducer = useSelector((store) => store.recipeReducer);
  const favoriteReducer = useSelector((store) => store.favoriteReducer);
  const ingredientReducer = useSelector((store) => store.ingredientReducer);
  const [formData, setFormData] = useState("");
  const [recipe, setRecipe] = useState({
    name: "",
    health: 0,
    hunger: 0,
    sanity: 0,
    ingredient_ids: [],
    description: "",
    image: "",
  });
  // console.log(favoriteReducer)

  function searchRecipe(event) {
    event.preventDefault();
    let foundRecipe = null; // Initialize a variable to store the found recipe
    recipeReducer.forEach(function (item) {
      // Anonymous function with the function keyword
      if (formData === item.name) {
        foundRecipe = item; // Store the matched item in foundRecipe
      }
    });

    if (foundRecipe) {
      // If a matching recipe was found, update the state
      setRecipe(foundRecipe);
      setIsCardOpen(true);
      console.log("Match found:", foundRecipe);
    } else {
      console.log("No match");
    }
    setFormData("");
  }

  function addFavorite() {
    console.log("Inside addFavorite", recipe.recipe_id);
    dispatch({
      type: "SAVE_FAVORITE",
      payload: { id: recipe.recipe_id }, // Remember to put your payload in an object or your Saga/router will get mad
    });
  }

  function addIngredient(id) {
    CookpotOpen()
    console.log(id);
  }

  const [isCardOpen, setIsCardOpen] = useState(true);
  const handleCloseClick = () => {
    setIsCardOpen(false);
    setRecipe({
      name: "",
      health: 0,
      hunger: 0,
      sanity: 0,
      ingredient_ids: [],
      description: "",
      image: "",
    });
  };

  

  const ariaLabel = { "aria-label": "description" };

  return (
    <>
      <Container maxWidth="xs">
        <Grid container spacing={1}>
          {" "}
          {/* Reduce the spacing to 1 */}
          <Grid item xs={12}>
            <h2>Welcome, {user.username}!</h2>
            <form onSubmit={searchRecipe}>
              <div>
                <Grid container spacing={1} alignItems="center">
                  {" "}
                  {/* Reduce the spacing to 1 */}
                  <Grid item xs={8}>
                    <Box
                      // component="form"
                      sx={{
                        "& > :not(style)": { m: 1 },
                      }}
                      noValidate
                      autoComplete="on"
                      // onSubmit={searchRecipe}

                    >
                      <TextField
                        placeholder="Search Recipe"
                        type="text"
                        id="name"
                        name="name"
                        variant="standard"
                        inputProps={{ "aria-label": ariaLabel }}
                        value={formData} // Changed this from formData.name to just formData so the input can be cleared. Check this later if you get errors
                        onChange={(event) => setFormData(event.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Button type="submit" variant="contained" color="primary">
                      SEARCH
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
      {recipe.name !== "" ? (
        <Container maxWidth="sm">
          <Grid
            justifyContent="center"
            container
            spacing={5}
            sx={{ flexGrow: 1 }}
            columns={{ xs: 4 }}
            marginBottom={10}
            marginTop={10}
            marginLeft={-40}
          >
            {isCardOpen && (
              <Card sx={{ maxWidth: 300 }} onClick={handleCloseClick}>
                <CardMedia
                  sx={{ height: 190 }}
                  image={recipe.recipe_image}
                  title={recipe.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recipe.name}
                  </Typography>
                  <img src={recipe.ingredient_images[0]} />
                  <img src={recipe.ingredient_images[1]} />
                  <Typography variant="body2" color="text.secondary">
                    {recipe.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={addFavorite}>
                    Favorite
                  </Button>
                </CardActions>
              </Card>
            )}
          </Grid>
        </Container>
      ) : (
        <img
          src={"https://media.tenor.com/0KQEvukP8lYAAAAj/crock-pot.gif"}
          alt="Recipe Placeholder"
          style={{ width: '100px', height: 'auto', marginBottom: '50px', marginTop: '50px' }}
          
        />
      )}
      <Container maxWidth="md">
        <Grid container spacing={3} sx={{ flexGrow: 1 }} columns={{ xs: 12 }}>
          {ingredientReducer.map((ingredient) => (
            // item xs={3} changes how close the cards are together.
            <Grid item xs={3} key={ingredient.id}>
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
                    src={ingredient.image}
                    alt={ingredient.name}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ fontSize: "1rem" }}
                  >
                    {ingredient.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Type: {ingredient.type}
                  </Typography>
                  <Button
                    variant="outlined"
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => addIngredient(ingredient.id)}
                  >
                    Add to Crockpot
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default UserForm;
