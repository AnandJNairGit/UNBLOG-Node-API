const express = require("express");
const router = express.Router();

//USERS MIDDLEWARES
const signup = require("./signUp");
const login = require("./login");

//ROUTES THAT HANDLE REQUEST
router.post("/signup", signup);
router.post("/login", login)

module.exports = router;
