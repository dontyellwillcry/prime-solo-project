import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function UserPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT" });
    dispatch({ type: "FETCH_RECIPE" });
  }, []);


  const componentStyles = {
    backgroundImage: 'url("https://c4.wallpaperflare.com/wallpaper/937/285/225/video-game-don-t-starve-wallpaper-preview.jpg")', // Replace with the URL of your image
    backgroundSize: 'cover', 
  };


  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const ingredientReducer = useSelector((store) => store.ingredientReducer);



  return (
    // <div className="container">
    <div style={componentStyles}>
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <LogOutButton className="btn" /> */}
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
