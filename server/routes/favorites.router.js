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
  let query = `SELECT recipe.*, favorites.user_id, ARRAY(SELECT image FROM ingredients WHERE id = ANY(recipe.ingredient_ids)) AS ingredient_images
  FROM recipe
  JOIN favorites ON recipe.id = favorites.recipe_id
  WHERE favorites.user_id = $1;`;
  pool
    .query(query, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all recipe", err);
      res.sendStatus(500);
    });
});
router.delete("/:id", rejectUnauthenticated,(req, res) => {
  const favoriteId = req.params.id;
  console.log("favID", favoriteId)

  const deleteQuery1 = "DELETE FROM favorites WHERE recipe_id=$1 AND user_id = $2";

  // Execute the first DELETE query
  pool
    .query(deleteQuery1, [favoriteId, req.user.id])
    
    .then(() => {
      // Both DELETE operations were successful
      res.status(200).json({ message: "Recipe and related data deleted" });
    })
    .catch((error) => {
      console.log("Error DELETE /api/favorite", error);
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log(req.body);

  let queryText = `INSERT INTO favorites (recipe_id, user_id)
    VALUES
        ($1, $2)`;

  pool
    .query(queryText, [req.body.id, req.user.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
