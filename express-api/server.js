'use strict'

require('dotenv').config()

const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')

const PORT = process.env.PORT || 4000

const app = express()

// Add Proper CORS headers to all routes
app.use(cors())

// Parses JSON Bodies in POST requests
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({message: 'Hello World! from GET'})
})

app.get('/', (req, res) => {
  res.json({message: 'Hello World! from GET'})
})

app.post('/block', (req, res) => {
  console.log(req.body)
  res.json({message: 'Hello World!, from POST'})
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
