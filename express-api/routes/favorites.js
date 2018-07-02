"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/favorites/:id", (req, res) => {
    if (!req.body.user_id) {
      res.json({
        redirect: true,
        url: '/'
      })
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
    
      knex('favorites')
        .insert([{
          users_id: req.body.user_id,
          coin_id: req.params.coin_id,
          rank: req.params.rank
        }])
        .catch(function(error) {
          console.error('Error: Inserting the favorites',error);
          res.json({ sucess: false })
        });
      res.json({ sucess: true });
  });

  router.post("/favorites/delete/:id", (req, res) => {

      const query = knex("favorites")
        .del()
        .where('user_id', '=', req.body.user_id);
      query.exec();
      
      res.json({ sucess: true });

  });

  return router;
}