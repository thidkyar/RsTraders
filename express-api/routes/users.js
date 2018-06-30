"use strict";

const express = require('express');
const router  = express.Router();
const app         = express();
const bcrypt = require('bcrypt')

module.exports = (knex) => {
  
  router.get("/", (res,req) => {
    console.log("APP GET")
  })

  // Base web page to login into the system. If the user is login send session to /urls
  router.get("/login", (req, res) => {
    if (!req.session.user_id) {
      res.render("urls_login");
    } else {
      res.redirect("/urls");
    }
  });

  // Base web page to register a new user. If the user is login send the user to /urls.
  router.get("/register", (req, res) => {
    if (!req.session.user_id) {
      res.render("urls_register");
    } else {
      res.redirect("/urls");
    }
  });

  // Get information from login web page
  router.post("/login", (req, res) => {
    
    // test if the email or the password is blank or null and send a message to the user
    if (!req.body.email || req.body.email === '' && !req.body.password || req.body.password === '') {
      res.status(400).send(systemMessages('Fields cannot be Empty.'));
    } else { // for in to find the user into the database
      knex.select('*')
      .from('users')
      .where('email', '=', req.body.email)
      .then(function(results) {
        if (bcrypt.compareSync(req.body.password, results[0].password)) {
          req.session.user_id = results[0].id;
          // return res.redirect("/urls");
        }
      })
      .catch(function(error) {
        console.error(error)
      });

      // Send a message to the user if the login or the password is not correct
      res.status(400).send(systemMessages('Login or password is not correct.'));
    }
  });


  // Get the information from web page register new user.
  router.post("/register", (req, res) => {
    console.log(req.body)
    console.log('Hit')
    // if (!req.body.email || !req.body.password) { // test with user or password is blank
    //   res.status(400).send(('Blank cannot be used for user or password.'));
    // } else {

      knex.select('*')
      .from('users')
      .where('email', req.body.email)
      .then(function(results) {
        console.log(results)
        // if (results) { // test with user exist or not.
        //   res.status(400).send('User exist. Choose another one.');
        // } else {
          console.log('HEY')
            knex('users')
            .returning('id')
            .insert([{
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              phone: req.body.phone,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 15)
            }])
            .then(function(id) {
              req.session.user_id = id;
              console.log(req.session.user_id)

            })
            .catch(function(error) {
              console.error('ERROR1', error)
            });
          // }
      })
      .catch(function(error) {
        console.error('ERROR2', error)
      });
      console.log('SUBMITTED')
    // }
  });

  router.post("/changePassword", (req, res) => {

    knex.select('*')
      .from('users')
      .where('id', '=', req.session.user_id)
      .then(function(results) {
        if (bcrypt.compareSync(req.body.password, results[0].password)) {
          knex('users')
            .where('id', '=', req.session.user_id)
            .update({ password: bcrypt.hashSync(req.body.password, 15) })
          // return res.redirect("/urls");
        } else {
          res.status(400).send(systemMessages('The original password do not match.'));
        }
      })
      .catch(function(error) {
        console.error(error)
      });

    req.session = null;
    // res.redirect("/urls");
  });

  // Get the information when the user clicked in logout button and turn the session to null and redirect the user to /urls.
  router.post("/logout", (req, res) => {
    req.session = null;
    // res.redirect("/urls");
  });

  return router;
}