const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware.js')




router.get("/", rejectUnauthenticated, (req, res) => {
    const query = `SELECT * FROM recipe ORDER BY "name" ASC`;
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

  
  router.post("/:id", rejectUnauthenticated, (req, res) => {
    // POST route code here
    console.log(req.body);
  
    let queryText = `INSERT INTO favorites (recipe_id, user_id)
    VALUES
        ($1, $2)`;
      
    pool
      .query(queryText, [
        req.body.id,
        req.user.id
      ])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });


  module.exports = router;
