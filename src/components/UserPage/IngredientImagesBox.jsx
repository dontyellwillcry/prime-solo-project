import React from "react";



//? Was able to take out this small code block from the UserForm and add it as its own component.
//? I have to pass ingredientImage and removeImage as props so that it would still fuction.
const IngredientImagesBox = ({ ingredientImage, removeImage }) => {
  return (
    <>
      {ingredientImage.map((image, index) => (
        // <div item key={index}>
          <img
            item key={index}
            src={image}
            alt={`Ingredient ${index}`}
            onClick={() => removeImage(index)}
          />
      ))}
    </>
    
  );
};

export default IngredientImagesBox;
