const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const db = require('../db')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = "secret"

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      const text = 'SELECT * FROM users where id=$1'
      const values = [jwt_payload.id]
      db.query(text, values)
        .then(queryRes => {
          if (queryRes.rows.length === 1) {
            return done(null, queryRes.rows[0])
          }
          return done(null, false)
        })
        .catch( err => console.log(err))
    })
  )
}
