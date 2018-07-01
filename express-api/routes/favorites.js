"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/favorites/:id", (req, res) => {
    if (!req.body.user_id) {
      res.status(400).send(systemMessages('User is not login.'));
    } else {
      knex
        .select("*")
        .from('favorites')
        .where('user_id', '=', req.body.user_id)
        .then((results) => {
          res.json(results);
      });
    }
  });


  // Get information from login web page
  router.post("/favorites/:id", (req, res) => {
    
    if (!req.body.user_id) {
      res.status(400).send(systemMessages('User is not login.'));
    } else {

      var query = knex("favorites")
        .del()
        .where('user_id', '=', req.body.user_id);
      query.exec();

      // do a for loop to how many coins and ranks

      knex('favorites')
              .insert([{
                users_id: req.body.user_id,
                coin_id: req.params.coin_id,
                rank: req.params.rank
              }])
              .catch(function(error) {
                console.error(error)
              });

      }
  });

  return router;
}