import React, { useEffect, useState } from "react";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import "./UserPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


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
    name: '',
    health: 0,
    hunger: 0,
    sanity: 0,
    ingredient_ids: [],
    description: '',
    image: '',
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

  return (
    // <div className="container">
    <div className="background-user">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <LogOutButton className="btn" /> */}
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
      <ul>
        {ingredientReducer.map((ingredient) => (
          <li key={ingredient.id}>
            <img src={ingredient.image} alt={ingredient.name} />
            {ingredient.name} - Type: {ingredient.type}
          </li>
        ))}
      </ul>
      {recipe.name !== '' ? (
        <ul>
          <li>Name: {recipe.name}</li>
          <li>Health: {recipe.health}</li>
          <li>Hunger: {recipe.hunger}</li>
          <li>Sanity: {recipe.sanity}</li>
          <li>Ingredient IDs: {recipe.ingredient_ids.join(", ")}</li>
          <li>Description: {recipe.description}</li>
          <img src={recipe.image} alt="Recipe Image" />
          <button>Favorite</button>
          
        </ul>
      ) : (
        <h2>WHY AM I SO BAD AT COMPONENTS....recipe will show up here.</h2>
      )}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
