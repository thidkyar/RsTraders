"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.get("/favorites", (req, res) => {
    if (!req.session.user_id) {
      res.json({
        redirect: true,
        url: "/"
      });
    } else {
      knex
        .select("*")
        .from("favorites")
        .where("users_id", req.session.user_id)
        .then(results => {
          res.json(results);
        });
    }
  });

  // Get information from login web page
  router.post("/favorites", (req, res) => {
    if (!req.session.user_id) {
      res.json({
        redirect: true,
        url: "/"
      });
    } else {
      knex
        .select("*")
        .from("favorites")
        .where("users_id", req.session.user_id)
        .where("coin_id", req.body.coin_id)
        .then(results => {
          if (results.length === 0) {
            knex("favorites")
              .returning("id")
              .insert([
                {
                  users_id: req.session.user_id,
                  coin_id: req.body.coin_id,
                  rank: req.body.rank
                }
              ])
              .then(res.json({ sucess: true }))
              .catch(function(error) {
                console.error("Error: Inserting the user", error);
              });
          } else {
            res.json({ sucess: false });
          }
        });
    }
  });

  router.post("/favorites/delete/", (req, res) => {
    knex("favorites")
      .where("users_id", "=", req.session.user_id)
      .where("coin_id", "=", req.body.coin_id)
      .del()
      .then(res.json({ success: true }));
  });

  return router;
};
