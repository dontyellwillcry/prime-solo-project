import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const AdminRecipe = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    health: 0,
    hunger: 0,
    sanity: 0,
    ingredient_ids: [],
    description: "",
    image: "",
  });

  // This destructuring targets a specific event. In my case, anytime someone types in the inputs
  // the const name/value is the "name" of the input and the value is the input from the user
  // we then use a spread syntax to create a 'copy' of the object.
  // When we enclose the [name] we are setting the key of the new object to the {name, value}
  // from the target event. Same thing for the value.

  const handleChange = (event) => {
    event.preventDefault(); // is this needed??
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDispatch = (event) => {
    event.preventDefault();
    console.log("Inside SAVE RECIPE");
    const action = {
      type: "SAVE_RECIPE",
      payload: formData,
    };
    dispatch(action);
    setFormData({
      name: "",
      health: 0,
      hunger: 0,
      sanity: 0,
      ingredient_ids: "",
      description: "",
      image: "",
    });
  };
  function dummyData() {
    console.log("Dummy")
    
  }

  return (
    <div>
      <Container maxWidth="sm">
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 1,
              width: "100%",
              maxWidth: "300px",
              ml: -30, // Adjust margin-left to move the inputs closer to the left side
            },
          }}
          noValidate
          autoComplete="on"
          onSubmit={handleDispatch}
        >
          <Grid container spacing={2}>
            <Grid xs={12}>
              <h2 onClick={dummyData}>Create a New Recipe</h2>

              <TextField
                label="Name"
                variant="filled"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                InputProps={{ style: { color: "white" } }}
                sx={{ mb: 2 }}
                
              />

              <TextField
                label="Health"
                variant="filled"
                type="number"
                id="health"
                name="health"
                value={formData.health}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Hunger"
                variant="filled"
                type="number"
                id="hunger"
                name="hunger"
                value={formData.hunger}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Sanity"
                variant="filled"
                type="number"
                id="sanity"
                name="sanity"
                value={formData.sanity}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Ingredient Id's"
                variant="filled"
                type="text"
                id="ingredient_ids"
                name="ingredient_ids"
                value={formData.ingredient_ids}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Description"
                multiline
                variant="filled"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Image URL"
                variant="filled"
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid xs={8}>
              <Button
                variant="outlined"
                type="submit"
                style={{ color: "yellow", borderColor: "yellow" }}
              >
                Save Recipe
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default AdminRecipe;
