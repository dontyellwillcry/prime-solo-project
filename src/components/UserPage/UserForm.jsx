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

function UserForm() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const recipeReducer = useSelector((store) => store.recipeReducer);
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

  function addFavorite() {
    console.log("Inside addFavorite", recipe.id);
    dispatch({
        type: "SAVE_FAVORITE",
        payload: {id: recipe.id} // Remember to put your payload in an object or your Saga/router will get mad
    })
  }

  const ariaLabel = { "aria-label": "description" };

  return (
    <>
    <Container maxWidth="xs">
    <Grid container spacing={1}> {/* Reduce the spacing to 1 */}
      <Grid item xs={12}>
        <form onSubmit={searchRecipe}>
          <h2>Welcome, {user.username}!</h2>
          
          <div>
            <Grid container spacing={1} alignItems="center"> {/* Reduce the spacing to 1 */}
              <Grid item xs={8}>
                <Box
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
                    inputProps={{ 'aria-label': ariaLabel }}
                    value={formData.name}
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
            <Card sx={{ maxWidth: 300 }}>
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
                <Button size="small" onClick={addFavorite}>
                  Favorite
                </Button>
                {/* <Button size="small">Learn More</Button> */}
              </CardActions>
            </Card>
          </Grid>
        </Container>
      ) : (
        <img
          src={"images/icons/crockpot.png"}
          alt="Recipe Placeholder"
          style={{ marginBottom: "50px" }}
        />
      )}
      <Container maxWidth="md">
        {/* constainer spacing changes the inside margins of the grid? */}
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
                  <Button variant="outlined" style={{ fontSize: "0.8rem" }}>
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
