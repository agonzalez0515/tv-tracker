const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require("../db/knex");

const router = express.Router();

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  knex("users")
    .select("email")
    .where("email", email)
    .then(rows => {
      if (rows.length) {
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

  knex("users")
    .where("email", email)
    .then(rows => {
      if (rows.length === 0) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      const { password_digest, id, email } = rows[0];
      bcrypt.compare(password, password_digest).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: id,
            email: email
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1hr"
          });
          res
            .cookie("telly_tracker", token, { httpOnly: true })
            .status(200)
            .json({ email: email });
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
});

function registerNewUser(email, password, res) {
  knex("users")
    .returning("email")
    .insert({ email: email, password_digest: password })
    .then(email => res.status(200).json({ email: email }))
    .catch(err => console.log(err));
}

module.exports = router;
