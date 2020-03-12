const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const withAuth = function(req, res, next) {
  const token = req.cookies.telly_tracker;
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

async function isTokenValid(token) {
  if (token) {
    const result = new Promise((resolve, reject) => {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          resolve({ error });
        }
        if (decoded) {
          resolve({ decoded });
        }
      });
    });
    return result;
  }
  return { error: "No token provided" };
}

module.exports = {
  withAuth: withAuth,
  isTokenValid: isTokenValid
};
