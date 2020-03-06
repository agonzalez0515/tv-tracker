const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const client = require('../db')


router.post('/register', (req, res) => {
  const { username, password, email } =  req.body
 
  const text = 'SELECT username FROM tv_tracker_users where username=$1'
  const values = [username]

  client
    .query(text, values)
    .then(queryRes => {
      if (queryRes.rows.length > 0) {
        return res.status(400).json({ username: 'username already exists' })
      } else {
        bcrypt.genSalt(10, (err, salt)  => {
          bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) throw err
            registerNewUser(username, hashedPassword, email, res)
          })
        })
      }
    })
    .catch(err => console.log('err', err))
})

function registerNewUser(username, password, email, res) {
  const text = 'INSERT into tv_tracker_users(username, password_digest, email) values($1, $2, $3) RETURNING *'
  const values = [username, password, email]
  
  client
    .query(text, values)
    .then(queryRes => res.status(200).json({username: queryRes.rows[0].username}))
    .catch(err =>  console.log(err))
}

module.exports = router

