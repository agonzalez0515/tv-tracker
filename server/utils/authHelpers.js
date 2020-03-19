const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const withAuth = function(req, res, next) {
  const token = req.cookies.telly_tracker;
  if (!token) {
    res.status(401).json("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).json("Unauthorized: Invalid token");
      } else {
        req.user = { email: decoded.email, id: decoded.id };
        next();
      }
    });
  }
};

module.exports = {
  withAuth: withAuth
};
