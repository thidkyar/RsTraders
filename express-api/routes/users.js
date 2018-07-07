"use strict";

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

module.exports = (knex) => {

  router.get("/userprofile", (req, res) => {
    if (!req.session.user_id) {
      res.json({
        redirect: true,
        url: '/login'
      })
    } else {
      knex.select('*')
        .from('users')
        .where('id', '=', req.session.user_id)
        .then(function (results) {
          res.json({ message: results })
        })
        .catch(function (error) {
          console.error(error)
        });
    }
  })

  router.get("/login", (req, res) => {
    if (!req.session.user_id) {
      res.json({
        redirect: true,
        url: '/login'
      })
    } else {
      res.json({
        redirect: true,
        url: '/'
      })
    }
  });

  router.get("/register", (req, res) => {
    if (!req.session.user_id) {
      res.json({
        redirect: true,
        url: '/register'
      })
    } else {
      res.json({
        redirect: true,
        url: '/'
      })
    }
  });

  router.post("/login", (req, res) => {
    knex.select('*')
      .from('users')
      .where('email', '=', req.body.email)
      .then(function (results) {
        if (bcrypt.compareSync(req.body.password, results[0].password)) {
          console.log('results is', results);
          req.session.user_id = results[0].id;
          res.json({
            redirect: true,
            url: '/'
          })
        } else {
          res.json({
            redirect: false,
            url: '/'
          })
        }
      })
      .catch(function (error) {
        console.error(error)
        res.json({
          redirect: false,
          url: '/'
        })
      });
  });

  router.post("/register", (req, res) => {
    knex.select('*')
      .from('users')
      .where('email', req.body.email)
      .then(function (results) {
        console.log(results);
        if (results.length != 0) {
          res.json({ message: 'Error: The user exist!' })
        } else {
          knex('users')
            .returning('id')
            .insert([{
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              phone: req.body.phone,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10)
            }])
            .then(function (id) {
              req.session.user_id = id[0];
              console.log('req session after register', id);
              res.json({
                redirect: true,
                url: '/',
                message: 'User created'
              })
            })
            .catch(function (error) {
              console.error('Error: Inserting the user', error)
            });
        }
      })
      .catch(function (error) {
        console.error('Error: The user already have a user in the system', error)
      });
  });

  router.post("/changePassword", (req, res) => {
    knex.select('*')
      .from('users')
      .where('id', '=', req.session.user_id)
      .then(function (results) {
        if (req.body.new_pwd === req.body.rep_pwd) {
          console.log("REPEATED PWD", req.body.rep_pwd)
          if (bcrypt.compareSync(req.body.current_pwd, results[0].password) ) {
            knex('users')
              .where('id', '=', req.session.user_id)
              .update({ password: bcrypt.hashSync(req.body.new_pwd, 10) })
              .then( function (results) {
                res.json({ 
                  error: false, 
                  message: "The password was changed" });})

          } else {
            res.json({ 
              error: true, 
              message: "Error: The password doesn't match" }) 
          }
        } else {
          res.json({ 
            error: true, 
            message: "Error: The new password doesn't match" }) 
        }
      })
  });

  router.post("/changeEmail", (req, res) => {
    knex.select('*')
    .from('users')
    .where('email', '=', req.body.email)
    .then(function (results) {
      if (results) {
        if (req.session.user_id === results[0].id) {
          res.json({ message: 'The user is trying change his email but dont change a char' })
        } else {
          res.json({ message: 'This email is used by another user' })
        }
      } else {
        knex('users')
        .where({ 'id': req.session.user_id })
        .update({ email: req.body.email })
        .then( res.json({ messsage: req.body.email }) )
      }
    });
  });

  router.post("/changePhone", (req, res) => {
    knex('users')
      .where({ 'id': req.session.user_id })
      .update({ phone: req.body.phone })
      .then( res.json({ messsage: req.body.phone }) )
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.json({
      redirect: true,
      url: '/'
    })
  });

  return router;
}