import RecipeForm from "../RecipeForm/RecipeForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminPage() {
  const dispatch = useDispatch();
  const recipeReducer = useSelector((store) => store.recipeReducer);
  const [formData, setFormData] = useState("");
  const [recipe, setRecipe] = useState({
    name: '',
    health: 0,
    hunger: 0,
    sanity: 0,
    ingredient_ids: [],
    description: '',
    image: '',
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
            // value={formData.name}
            onChange={(event) => setFormData(event.target.value)}
          />
          <button type="submit">SEARCH</button>
        </div>
      </form>
      <RecipeForm />
    </>
  );
}

export default AdminPage;
