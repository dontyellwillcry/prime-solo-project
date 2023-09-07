import { func } from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import TextField from '@mui/material/TextField';
import AdminEdit from "./AdminEdit";


function AdminForm() {
  const dispatch = useDispatch();
  const recipeReducer = useSelector((store) => store.recipeReducer);
  const [formData, setFormData] = useState("");

  

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT" });
    dispatch({ type: "FETCH_RECIPE" });
  }, []);

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
    setFormData("")
  }

  function deleteRecipe() {
    dispatch({
      type: "DELETE_RECIPE",
      payload: recipe.id,
    });
    dispatch({ type: "FETCH_RECIPE" });
  }

  const transparentCardStyle = {
    // background: "transparent",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    // boxShadow:
  };
  return (
    <>
      <form onSubmit={searchRecipe}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData}
            onChange={(event) => setFormData(event.target.value)}
          />
          <button type="submit">SEARCH</button>
        </div>
      </form>

      {/*First i tried doing recipe ? but bacause the recipeReducer is holding all the recipes it 
      was not flagging as false. SOOOOO I tried recipe.name ?, bacause the recipe from useState is empty.  */}
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
            <Card sx={{ maxWidth: 300 }} style={transparentCardStyle}>
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
                {/* <Button size="small">Edit</Button> */}
                <AdminEdit id={recipe.id}/>
                <Button size="small" onClick={deleteRecipe}>
                  Delete Recipe
                </Button>
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
    </>
  );
}

export default AdminForm;
