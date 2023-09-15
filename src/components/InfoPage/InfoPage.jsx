import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const dispatch = useDispatch();
  const favoriteReducer = useSelector((store) => store.favoriteReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT" });
    dispatch({ type: "FETCH_RECIPE" });
    dispatch({type: "FETCH_FAVORITE"})
  }, []);

  function removeFavorite(id) {
    dispatch({
      type: "DELETE_FAVORITE",
      payload: id
    })
    console.log(id)
  }
  
    const containerStyle = {
      marginLeft: '470px', // Adjust the margin value as needed
    };

  return (
    <div className="container">
      {/* <Typography marginBottom={5}>Flavorpits</Typography> */}
      <img
          src={"https://media.tenor.com/NC4dlQa2BjoAAAAj/dont-starve-wilson.gif"}
          alt="Recipe Placeholder"
          style={{ marginBottom: "50px", marginTop: "50px" }}
        />
      <Container maxWidth="lg"  style={containerStyle}>
        <Grid container spacing={6} sx={{ flexGrow: 1 }} columns={{ xs: 10 }}>
          {favoriteReducer.map((favorite) => (
            // item xs={3} changes how close the cards are together.
            <Grid item xs={3} key={favorite.id}>
              <Card
                sx={{
                  width: 300, // Changes the width of my card
                  height: 335, // Changes height.
                  // backgroundColor: "rgba(255, 255, 255, 0.1)", 
                  backgroundColor: "orange", 
                  border: "2px solid #000", // Add a border
                }}
              >
                <CardContent>
                  <img
                    src={favorite.image}
                    alt={favorite.name}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ fontSize: "1rem" }}
                  >
                    {favorite.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Health: {favorite.health}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Hunger: {favorite.hunger}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Sanity: {favorite.sanity}
                  </Typography>
                  <Grid>
                  <img
                    src={favorite.ingredient_images[0]}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <img
                    src={favorite.ingredient_images[1]}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <img
                    src={favorite.ingredient_images[2]}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <img
                    src={favorite.ingredient_images[3]}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  </Grid>
                  <Button
                    variant="outlined"
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => removeFavorite(favorite.id)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default InfoPage;
