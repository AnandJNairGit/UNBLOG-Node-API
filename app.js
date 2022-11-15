const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CONNECT MONGO DB
const mongooseConnectUrl =
  "mongodb+srv://unblog:123@ubog.a3keuh7.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongooseConnectUrl);

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
