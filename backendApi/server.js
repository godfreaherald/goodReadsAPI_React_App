//const express = require("express");
//const mongoose = require("mongoose");
//const dotenv = require("dotenv")
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import "dotenv/config";
//const cors = require("cors");
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.config";
import logger from "./winston.config";
//dotenv.config();
const app = express();

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const booksRoute = require("./routes/book");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const env = process.env.NODE_ENV;
const morganFormat = env !== "production" ? "dev" : "combined";

app.use(
  morgan(morganFormat, {
    SKIP: function (req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr,
  })
);

app.use(
  morgan(morganFormat, {
    SKIP: function (req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  })
);

app.use("/user/auth", authRoute);
app.use("/user", userRoute);
app.use("/books", booksRoute);

// const connect = async (done) => {
//   const mongooseOpts = {
//     useNewUrlParser: true,
//     autoReconnect: true,
//     reconnectTries: Number.MAX_VALUE,
//     reconnectInterval: 1000,
//   };
//   try {
//     await mongoose.connect(process.env.MONGODB_URI__, mongooseOpts);
//     console.log("Db Connected");
//     done();
//   } catch (error) {
//     console.log(error);
//     done(error);
//   }
// };

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Db Connected");
    logger.info("Db Connected");
  })
  .catch((err) => {
    logger.error("Db Connection error " + err);
    console.log(err);
  });

app.listen(8080, console.log("App running"));

module.exports = app;
