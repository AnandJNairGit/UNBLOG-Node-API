const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.autjorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return req.status(401).json({ message: "auth failed" });
  }
};

modules.exports = authenticate;
