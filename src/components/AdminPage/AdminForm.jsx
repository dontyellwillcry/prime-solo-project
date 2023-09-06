import { func } from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminForm() {
  const dispatch = useDispatch();
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

  function deleteRecipe() {
    dispatch({
        type: "DELETE_RECIPE",
        payload: recipe.id
    })
  }
  return (
    <>
      <h1> Admin page</h1>
      <form onSubmit={searchRecipe}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(event) => setFormData(event.target.value)}
          />
          <button type="submit">SEARCH</button>
        </div>
      </form>

      {/*First i tried doing recipe ? but bacause the recipeReducer is holding all the recipes it 
      was not flagging as false. SOOOOO I tried recipe.name ?, bacause the recipe from useState is empty.  */}
      {recipe.name !== "" ? (
        <ul key={recipe.id}>
          <li>Name: {recipe.name}</li>
          <li>Health: {recipe.health}</li>
          <li>Hunger: {recipe.hunger}</li>
          <li>Sanity: {recipe.sanity}</li>
          <li>Ingredient IDs: {recipe.ingredient_ids.join(", ")}</li>
          <li>Description: {recipe.description}</li>
          <img src={recipe.image} alt="Recipe Image" />
          <button onClick={deleteRecipe}>Delete Recipe</button>
          <button>Update Recipe</button>
        </ul>
      ) : (
        <h2>Recipe info here.</h2>
      )}
    </>
  );
}

export default AdminForm;
