const express = require("express");
const router = express.Router();

//USERS MIDDLEWARES
const signup = require("./signUp");

router.post("/signup", signup);

module.exports = router;
