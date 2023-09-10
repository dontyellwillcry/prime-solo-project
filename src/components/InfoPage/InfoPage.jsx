import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const favoriteReducer = useSelector((store) => store.favoriteReducer);

  function addFavorite() {
    console.log(favoriteReducer)
  }

  return (
    <div className="container">
      <p>Flavorpits</p>
      <Container maxWidth="md">
        <Grid container spacing={3} sx={{ flexGrow: 1 }} columns={{ xs: 12 }}>
          {favoriteReducer.map((favorite) => (
            // item xs={3} changes how close the cards are together.
            <Grid item xs={3} key={favorite.id}>
              <Card
                sx={{
                  width: 200, // Changes the width of my card
                  height: 200, // Changes height.
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
                    Type: {favorite.type}
                  </Typography>
                  <Button
                    variant="outlined"
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => addFavorite(favorite.id)}
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
