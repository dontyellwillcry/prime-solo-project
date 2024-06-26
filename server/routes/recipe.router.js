const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

router.get("/", rejectUnauthenticated, (req, res) => {
  //ARRAY(...) AS ingredient_images: This constructs an array of images associated with the ingredients in each recipe. 
  //It uses a subquery to select image column from the ingredients table where the id matches any of the ingredient_ids in the current recipe. 
  //The result is stored as an array and aliased as ingredient_images.
  const query = `SELECT
  r.id AS recipe_id,
  r.name AS name,
  r.health,
  r.hunger,
  r.sanity,
  ARRAY(
      SELECT i.image
      FROM ingredients i
      WHERE i.id = ANY(r.ingredient_ids)
  ) AS ingredient_images,
  r.ingredient_ids,
  r.description,
  r.image AS recipe_image
FROM
  recipe r;`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all recipe", err);
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log(req.body);
  const ingredientIds = req.body.ingredient_ids.split(",").map(Number);

  let queryText = `INSERT INTO recipe (name, health, hunger, sanity, ingredient_ids, description, image)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
  pool
    .query(queryText, [
      req.body.name,
      req.body.health,
      req.body.hunger,
      req.body.sanity,
      ingredientIds,
      req.body.description,
      req.body.image,
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});


router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const recipeId = req.params.id;

  const deleteQuery1 = "DELETE FROM recipe WHERE recipe.id=$1";
  const deleteQuery2 = "DELETE FROM favorites WHERE recipe_id=$1";

  // Execute the first DELETE query
  pool
    .query(deleteQuery1, [recipeId])
    .then(() => {
      // Execute the second DELETE query
      return pool.query(deleteQuery2, [recipeId]);
    })
    .then(() => {
      // Both DELETE operations were successful
      res.status(200).json({ message: "Recipe and related data deleted" });
    })
    .catch((error) => {
      console.log("Error DELETE /api/recipe", error);
      res.sendStatus(500);
    });
});


router.put("/:id", (req, res) => {
  const updatedRecipe = req.body;
  const queryText = `UPDATE recipe SET
    "name" = $1,
    "health" = $2,
    "hunger" = $3,
    "sanity" = $4,
    "ingredient_ids" = $5,
    "description" = $6,
    "image" = $7
  WHERE id = $8;`;

  const queryValues = [
    updatedRecipe.name,
    updatedRecipe.health,
    updatedRecipe.hunger,
    updatedRecipe.sanity,
    updatedRecipe.ingredient_ids,
    updatedRecipe.description,
    updatedRecipe.image,
    updatedRecipe.id,
  ];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing PUT Recipe query", err);
      res.sendStatus(500);
    });
});

module.exports = router;
