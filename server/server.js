const express = require('express')
const app = express()

app.get('/status', (req, res) => res.send({status: "I'm alive!"}));

module.exports = app