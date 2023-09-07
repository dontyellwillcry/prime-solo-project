import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";

const RecipeForm = () => {
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
    console.log("Inside SAVE RECIpe");
    const action = {
      type: "SAVE_RECIPE",
      payload: formData,
    };
    dispatch(action);
  };

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
              ml: -20, // Adjust margin-left to move the inputs closer to the left side
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleDispatch}
        >
          <h2>Create a New Recipe</h2>

          <div>
            {/* <label htmlFor="name">Name:</label> */}
            <TextField
              label="Name"
              variant="filled"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <label htmlFor="health">Health:</label> */}
            <TextField
              label="Health"
              variant="filled"
              type="number"
              id="health"
              name="health"
              value={formData.health}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <label htmlFor="hunger">Hunger:</label> */}
            <TextField
              label="Hunger"
              variant="filled"
              type="number"
              id="hunger"
              name="hunger"
              value={formData.hunger}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <label htmlFor="sanity">Sanity:</label> */}
            <TextField
              label="Sanity"
              variant="filled"
              type="number"
              id="sanity"
              name="sanity"
              value={formData.sanity}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <label htmlFor="ingredient_ids">
              Ingredient IDs (comma-separated):
            </label> */}
            <TextField
              label="Ingredient Id's"
              variant="filled"
              type="text"
              id="ingredient_ids"
              name="ingredient_ids"
              value={formData.ingredient_ids}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <label htmlFor="description">Description:</label> */}
            <TextField
              label="Description"
              // placeholder="Placeholder"
              multiline
              variant="filled"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <label htmlFor="image">Image URL:</label> */}
            <TextField
              label="Image URL"
              variant="filled"
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save Recipe</button>
        </Box>
      </Container>
    </div>
  );
};

export default RecipeForm;
