const express = require("express");
const router = express.Router();

router.post("signUp", (res, req, next) => {
  res.statusCode(200).json({ message: "hello" });
});
