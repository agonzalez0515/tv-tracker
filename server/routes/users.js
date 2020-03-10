const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  const findUserByEmail = "SELECT * FROM users where email=$1";
  const values = [email];

  db.query(findUserByEmail, values)
    .then(queryRes => {
      if (queryRes.rows.length) {
        return res.status(400).json({ email: "email already exists" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) throw err;
            registerNewUser(email, hashedPassword, res);
          });
        });
        console.log(`${email} has been registered.`);
      }
    })
    .catch(err => console.log("err", err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const findUserByEmail = "SELECT * FROM users where email=$1";
  const values = [email];

  db.query(findUserByEmail, values).then(queryRes => {
    if (queryRes.rows.length === 0) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    const { password_digest, id, email } = queryRes.rows[0];
    bcrypt.compare(password, password_digest).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: id,
          email: email
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
        res.cookie("telly_tracker", token, { httpOnly: true }).sendStatus(200);
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

function registerNewUser(email, password, res) {
  const text =
    "INSERT into users(email, password_digest) values($1, $2) RETURNING *";
  const values = [email, password];

  db.query(text, values)
    .then(queryRes => res.status(200).json({ email: queryRes.rows[0].email }))
    .catch(err => console.log(err));
}

module.exports = router;
