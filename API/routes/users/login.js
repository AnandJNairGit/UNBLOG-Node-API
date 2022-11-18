const { default: mongoose } = require("mongoose");
const Users = require("../../models/users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res, next) => {
  const email = req.body.email;
  const user = await Users.find({ email: email });
  console.log(user);
  if (user.length >= 1 && user[0].email === email) {
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err || !result) {
        res.status(401).json({ message: `Auth failed for ${email}` });
      } else {
        const token = jwt.sign(
          { email: user[0].email, userId: user[0]._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ message: "login successfull", token: token });
      }
    });
  } else {
    res.status(401).json({ message: `Auth failed for ${email}` });
  }
};

module.exports = login;
