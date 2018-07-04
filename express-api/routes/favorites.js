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
  router.post("/favorites", (req, res) => {
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
        .where('coin_id', req.session.coin_id)
        .then((results) => {
          if (results.length != 0) {
            knex('favorites')
              .insert([{
                users_id: req.session.user_id,
                coin_id: req.body.coin_id,
                rank: req.body.rank
              }])
              .catch(function(error) {
                res.json({ sucess: false, message: error })
              });
              res.json({ sucess: true });
          } else {
            res.json({ sucess: false });
          }
      });
    }
  });

  router.post("/favorites/delete/", (req, res) => {

      const query = knex("favorites")
        .del()
        .where('user_id', '=', req.session.user_id);
      query.exec();
      
      res.json({ sucess: true });

  });

  return router;
}