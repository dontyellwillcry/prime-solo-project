import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


//? Was able to take out this small code block from the UserForm and add it as its own component.
//? I have to pass ingredientImage and removeImage as props so that it would still fuction.
const IngredientImagesBox = ({ ingredientImage, removeImage }) => {
  return (
    <Box
      sx={{
        width: 50,
        marginLeft: "65%",
        marginBottom: 0,
        marginTop: 0,
        height: 200,
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent="flex-end"
        alignItems="flex-start"
      >
        {ingredientImage.map((image, index) => (
          <Grid item key={index}>
            <img
              src={image}
              alt={`Ingredient ${index}`}
              onClick={() => removeImage(index)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default IngredientImagesBox;
