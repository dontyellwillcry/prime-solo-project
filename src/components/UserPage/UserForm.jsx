import React, { useEffect, useState, useRef } from "react";
import "./UserForm.css";
import { useDispatch, useSelector } from "react-redux";
import CookpotOpen from "../SoundFiles/CookpotOpen";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MatchingRecipe from "./MatchingRecipe";
import IngredientImagesBox from "./IngredientImagesBox";
import CookingSound from "../SoundFiles/CookingSound";

function UserForm() {
  const dispatch = useDispatch();
  const clickRef = useRef(0);
  const user = useSelector((store) => store.user);
  const recipeReducer = useSelector((store) => store.recipeReducer);
  const ingredientReducer = useSelector((store) => store.ingredientReducer);
  const clickedIngredient = useSelector((state) => state.clickedIngredient);
  const [formData, setFormData] = useState("");
  const [ingredientImage, setIngredientImages] = useState([]);
  const [cookingTimer, setCookingTimer] = useState(0);
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
      // Anonymous function with the function keyword
      if (formData === item.name) {
        foundRecipe = item; // Store the matched item in foundRecipe
      }
    });

    if (foundRecipe) {
      // If a matching recipe was found, update the state
      setRecipe(foundRecipe);
      setIsCardOpen(true);
      console.log("Match found:", foundRecipe);
    } else {
      console.log("No match"); // Make this an alert
      alert("No such recipe, Please speak with Cheif Gordon Ramsey");
    }
    setFormData("");
  }

  function addFavorite() {
    dispatch({
      type: "SAVE_FAVORITE",
      payload: { id: recipe.recipe_id }, // Remember to put your payload in an object or your Saga/router will get mad
    });
  }
 
  useEffect(() => {
    if (cookingTimer === 4) {
      CookingSound();
      setCookingTimer(0); // Reset the timer
    }
  }, [cookingTimer]);

  function addIngredient(ingredient) {
    setCookingTimer((prevTimer) => prevTimer + 1); // Increment the timer
    setTimeout(() => {
      dispatch({
        type: "CLICK_INGREDIENT",
        payload: { id: ingredient.id, imgage: ingredient.image },
      });
    }, 4000); //
  }
  function ingredientClickSound() {
    CookpotOpen();
  }

  function onIngredientClick(ingredient) {
    clickRef.current++;
    if (clickRef.current > 4) {
      alert("You cannot cook with more than 4 items")
      clickRef.current = 0;
      dispatch({
        type: "RESET_INGREDIENT",
      })
    }
    setIngredientImages([...ingredientImage, ingredient.image]);
    addIngredient(ingredient);
    ingredientClickSound();
  }

  const buttonStyle = {
    backgroundColor: "black",
    color: "white", // Set text color to contrast with the black background
  };

  const [isCardOpen, setIsCardOpen] = useState(true);
  const handleCloseClick = () => {
    setIsCardOpen(false);
    setRecipe({
      name: "",
      health: 0,
      hunger: 0,
      sanity: 0,
      ingredient_ids: [],
      description: "",
      image: "",
    });
  };

  function removeImage(index) {
    const newImages = [...ingredientImage];
    newImages.splice(index, 1); // Remove the image at the specified index
    setIngredientImages([]);
  }

  return (
    <>
      <div className="formContainer">
        <div className="recipeContainer">
          <h2 className="welcome">Welcome, {user.username}!</h2>
          <div className="crockpotIngredients">
            <IngredientImagesBox
              ingredientImage={ingredientImage}
              removeImage={removeImage}
            />
          </div>
          <MatchingRecipe
            removeImage={removeImage}
          />
          {" "}
          <div className="form">
            {/* <form onSubmit={searchRecipe}>
              <TextField
                placeholder="Search Recipe"
                type="text"
                id="name"
                name="name"
                variant="standard"
                inputProps={{ "aria-label": ariaLabel }}
                value={formData} // Changed this from formData.name to just formData so the input can be cleared. Check this later if you get errors
                onChange={(event) => setFormData(event.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={buttonStyle}
              >
                SEARCH
              </Button>

            </form> */}
          </div>
        </div>
        {recipe.name !== "" ? (
          <div className="searchedRecipe">
            {isCardOpen && (
              <Card
                sx={{
                  maxWidth: 300,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                onClick={handleCloseClick}
              >
                <CardMedia
                  sx={{ height: 190 }}
                  image={recipe.recipe_image}
                  title={recipe.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recipe.name}
                  </Typography>
                  <img src={recipe.ingredient_images[0]} />
                  <img src={recipe.ingredient_images[1]} />
                  <img src={recipe.ingredient_images[2]} />
                  <img src={recipe.ingredient_images[3]} />
                  <Typography variant="body2" color="text.secondary">
                    {recipe.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={addFavorite}>
                    Favorite
                  </Button>
                </CardActions>
              </Card>
            )}
          </div>
        ) : (
          <p></p>
        )}

      </div>
      <div className="ingredientContainer">
        {ingredientReducer.map((ingredient) => (
          <Grid item xs={3} key={ingredient.id}>
            <Card
              sx={{
                width: 180,
                height: 155,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "2px solid white",
                margin: 4,
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onClick={() => onIngredientClick(ingredient)}
            >
              <CardContent style={{ textAlign: 'center' }}>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  style={{ maxWidth: "100%", height: "auto", }}
                />
                <Typography
                  variant="h5"
                  component="div"
                  style={{ fontSize: "1rem", margin: '5px 0', display: 'flex', justifyContent: 'center' }}
                >
                  {ingredient.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontSize: "0.8rem" }}
                >
                </Typography>
              </CardContent>
            </Card>

          </Grid>
        ))}
      </div>
    </>
  );
}

export default UserForm;
