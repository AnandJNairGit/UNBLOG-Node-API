const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
require('dotenv').config()
console.log()

const mongoose = require("mongoose");

const usersRoutes = require("./API/routes/users");

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CONNECT MONGO DB
const mongooseConnectUrl =process.env.MONGO_DB_URL;
mongoose.connect(mongooseConnectUrl);



app.use("/users", usersRoutes);

//error handling
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

module.exports = app;
