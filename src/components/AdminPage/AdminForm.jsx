import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AdminEdit from "./AdminEdit";
import {
  buttonStyle,
  textFieldStyle,
  inputStyle,
  textInfoStyle,
} from "./StylesForAdminPage";

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
    let foundRecipe = null; // sets a variable to store the found recipe
    recipeReducer.forEach((item) => {
      // Anonymous arrow funtion without "function" keyword
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
      console.log("No match");
    }
    setFormData("");
  }

  function deleteRecipe() {
    dispatch({
      type: "DELETE_RECIPE",
      payload: recipe.id,
    });
    dispatch({ type: "FETCH_RECIPE" });
  }

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

  const transparentCardStyle = {
    // background: "transparent",
    // backgroundColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "black",

    // boxShadow:
  };

  return (
    <>
      <form onSubmit={searchRecipe}>
        <div>
          <label htmlFor="name">Name:</label>
          <TextField
            variant="outlined"
            style={textFieldStyle}
            InputProps={{
              style: inputStyle,
            }}
            type="text"
            id="name"
            name="name"
            value={formData}
            onChange={(event) => setFormData(event.target.value)}
          />
          <Button type="submit" variant="contained" style={buttonStyle}>
            SEARCH
          </Button>
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
            marginLeft={1}
          >
            {isCardOpen && (
              <Card sx={{ maxWidth: 300 }} style={transparentCardStyle}>
                <CardMedia
                  sx={{ height: 190 }}
                  image={recipe.recipe_image}
                  title={recipe.name}
                  onClick={handleCloseClick}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={textInfoStyle}
                  >
                    {recipe.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={textInfoStyle}
                  >
                    {recipe.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Button size="small">Edit</Button> */}
                  <AdminEdit id={recipe.id} />
                  <Button
                    size="small"
                    onClick={deleteRecipe}
                    style={{ color: "yellow" }}
                  >
                    Delete Recipe
                  </Button>
                </CardActions>
              </Card>
            )}
          </Grid>
        </Container>
      ) : (
        <img
          src={"https://media.tenor.com/UPtMYDs31NMAAAAj/pig-king-dst.gif"}
          alt="Recipe Placeholder"
          style={{ marginBottom: "50px", marginTop: "50px" }}
        />
        // <p></p>
      )}
    </>
  );
}

export default AdminForm;
