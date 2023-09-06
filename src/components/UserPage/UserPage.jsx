import React, { useEffect, useState } from "react";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import "./UserPage.css";
import { useDispatch, useSelector } from "react-redux";
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

function UserPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT" });
    dispatch({ type: "FETCH_RECIPE" });
  }, []);
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const ingredientReducer = useSelector((store) => store.ingredientReducer);
  const recipeReducer = useSelector((store) => store.recipeReducer);
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

  // Function to handle the search input from the user. The input will match against all items in the
  // reducer and return any matches.
  function searchRecipe(event) {
    event.preventDefault();
    let foundRecipe = null; // Initialize a variable to store the found recipe
    recipeReducer.forEach(function (item) {
      if (formData === item.name) {
        foundRecipe = item; // Store the matched item in foundRecipe
      }
    });

    if (foundRecipe) {
      // If a matching recipe was found, update the state
      setRecipe(foundRecipe);
      console.log("Match found:", foundRecipe);
    } else {
      console.log("No match");
    }
  }
  const ariaLabel = { "aria-label": "description" };

  function insertIngredient(ingredient) {
    console.log("Inside Ingredient", ingredient.id);
  }

  return (
    // <div className="container">
    <div className="background-user">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <LogOutButton className="btn" /> */}
      <form onSubmit={searchRecipe}>
        <div>
          {/* <label htmlFor="name">Name:</label> */}
          <Box
            // marginBottom={10}
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <Input
              placeholder="Search Recipe"
              type="text"
              id="name"
              name="name"
              inputProps={ariaLabel}
              // value={formData.name}
              onChange={(event) => setFormData(event.target.value)}
            />
          </Box>
          <button type="submit" style={{ marginBottom: '50px' }}>SEARCH</button>
        </div>
      </form>
      {recipe.name !== "" ? (
        // <ul>
        //   <li>Name: {recipe.name}</li>
        //   <li>Health: {recipe.health}</li>
        //   <li>Hunger: {recipe.hunger}</li>
        //   <li>Sanity: {recipe.sanity}</li>
        //   <li>Ingredient IDs: {recipe.ingredient_ids.join(", ")}</li>
        //   <li>Description: {recipe.description}</li>
        //   <img src={recipe.image} alt="Recipe Image" />
        //   <button>Favorite</button>
        // </ul>
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
        <Card sx={{ maxWidth: 300 }} >
          <CardMedia
            sx={{ height: 190 }}
            image={recipe.image}
            title={recipe.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {recipe.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {recipe.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Favorite</Button>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
        </Grid>
        </Container>
      ) : (
        <img src={"images/icons/crockpot.png"} alt="Recipe Placeholder" style={{ marginBottom: '50px' }}/>
      )}
      {/* <ul>
        {ingredientReducer.map((ingredient) => (
          <li key={ingredient.id}>
            <img src={ingredient.image} alt={ingredient.name} />
            {ingredient.name} - Type: {ingredient.type}
          </li>
        ))}
      </ul> */}
      {/* <Box sx={{ flexGrow: 1 }}> */}
      <Container maxWidth="lg">
        <Grid
          justifyContent="center"
          container
          spacing={5}
          sx={{ flexGrow: 1 }}
          columns={{ xs: 4 }}
        >
          {ingredientReducer.map((ingredient) => (
            <Grid item xs={1} key={ingredient.id}>
              {/* <Item>{ingredient.image}</Item> */}
              <img
                src={ingredient.image}
                onClick={() => insertIngredient(ingredient)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* </Box> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
