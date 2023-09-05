import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./UserPage.css";

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

  function searchRecipe(event) {
    event.preventDefault();
    if (formData === recipeReducer[0].name) {
      console.log(recipeReducer[0]);
    } else {
      console.log("No match");
    }
  }

  return (
    // <div className="container">
    <div>
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
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
