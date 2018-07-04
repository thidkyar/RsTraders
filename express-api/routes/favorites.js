"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/favorites", (req, res) => {
    if (!req.session.user_id) {
      res.json({
        redirect: true,
        url: '/'
      })
    } else {
      knex
        .select("*")
        .from('favorites')
        .where('users_id', req.session.user_id)
        .then((results) => {
          res.json(results);
      });
    }
  });


  // Get information from login web page
<<<<<<< HEAD
  router.post("/favorites/:id", (req, res) => {
    
    if (!req.body.user_id) {
      res.status(400).send(systemMessages('User is not login.'));
    } else {
=======
  router.post("/favorites", (req, res) => {
    console.log('HEY', req.session.user_id)
      knex('favorites')
        .insert([{
          users_id: req.session.user_id,
          coin_id: req.body.coin_id,
          rank: req.body.rank
        }])
        .catch(function(error) {
          console.error('Error: Inserting the favorites',error);
          res.json({ sucess: false })
        });
      res.json({ sucess: true });
  });

  router.post("/favorites/delete/", (req, res) => {
>>>>>>> 677529a676245cc03ab1cf7b0d5eda76d56a2ad9

      var query = knex("favorites")
        .del()
        .where('user_id', '=', req.session.user_id);
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