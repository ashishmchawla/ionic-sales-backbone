const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");

const auth = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
  return next();
};

module.exports = auth;
