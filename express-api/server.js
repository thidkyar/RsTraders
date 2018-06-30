'use strict'

require('dotenv').config()

const PORT = process.env.PORT || 4000

const bcrypt = require("bcrypt");
const ENV         = process.env.ENV || "development";
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app         = express();
const cookieSession = require("cookie-session");


// Configuration of Knex
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// Add Proper CORS headers to all routes
app.use(cors())

// Parses JSON Bodies in POST requests
app.use(bodyParser.json())
app.use(
  cookieSession({
    name: "session",
    keys: ["Dont worry how this is encrypted"]
  })
);

// Routes
const usersRoutes = require("./routes/users");
const favoritesRoutes = require("./routes/favorites");
// const blockchainRoutes = require("./routes/blockchain");

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/favorites", favoritesRoutes(knex));
// app.use("/api/blockchain", blockchainRoutes(knex));




// app.post("/api/users/register", (req, res) => {
//   console.log('Hit')
// })

//   //this show all coins
// app.get('/', (req, res) => {
//   res.json({message: 'Hello World! from GET'});
//   knex.select('*')
//   .from('users')
//   .then(function(rows) {
//     console.log(rows);
//   })
//   .catch(function(error) {
//     console.error(error)
//   });
// })

// app.get('/', (req, res) => {
//   res.json({message: 'Hello World! from GET'})
// })

// app.post('/block', (req, res) => {
//   console.log(req.body)
//   res.json({message: 'Hello World!, from POST'})
// })

// app.post('/users', (req, res) => {
//   console.log(req.body)
//   res.json({message: 'Hello World!, from POST'})
// })

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
