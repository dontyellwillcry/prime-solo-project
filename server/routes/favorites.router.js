const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

router.get("/", rejectUnauthenticated, (req, res) => {
  let query = `SELECT recipe.*, favorites.user_id
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
// router.get('/', (req, res) => {
//   console.log("checking endpoint")
//   if (req.isAuthenticated()) {
//     console.log("/pet GET route");
//     console.log("is authenticated?", req.isAuthenticated());
//     console.log("user", req.user);
//     let queryText = `SELECT recipe.*, favorites.user_id
//     FROM recipe
//     JOIN favorites ON recipe.id = favorites.recipe_id
//     WHERE favorites.user_id = $1;`;
//     pool
//       .query(queryText, [req.user.id])
//       .then((result) => {
//         res.send(result.rows);
//       })
//       .catch((error) => {
//         console.log(error);
//         res.sendStatus(500);
//       });
//   } else {
//     res.sendStatus(403);
//   }});

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
