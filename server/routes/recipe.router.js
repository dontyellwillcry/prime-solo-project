const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const query = `SELECT * FROM recipe ORDER BY "name" ASC`;
    pool.query(query)
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all recipe', err);
        res.sendStatus(500)
      })
  });

  router.post('/', (req, res) => {
    // POST route code here
    console.log(req.body)
    const ingredientIds = req.body.ingredient_ids.split(',').map(Number);

    let queryText = `INSERT INTO recipe (name, health, hunger, sanity, ingredient_ids, description, image)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `
    pool.query(queryText, [req.body.name, req.body.health, req.body.hunger, req.body.sanity, ingredientIds, req.body.description, req.body.image])
    .then((result) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
  });

  router.delete('/:id', (req, res) => {
    pool.query('DELETE FROM recipe WHERE id=$1', [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error DELETE /api/recipe', error);
        res.sendStatus(500);
    })
});

router.put('/:id', (req, res) => {
  pool.query('DELETE FROM recipe WHERE id=$1', [req.params.id]).then((result) => {
      res.sendStatus(200);
  }).catch((error) => {
      console.log('Error DELETE /api/recipe', error);
      res.sendStatus(500);
  })
});


  module.exports = router;  
