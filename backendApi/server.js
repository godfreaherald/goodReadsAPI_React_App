//const express = require("express");
//const mongoose = require("mongoose");
//const dotenv = require("dotenv")
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
//const cors = require("cors");
import cors from "cors";
//dotenv.config();
const app = express();

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user/auth", authRoute);
app.use("/user", userRoute);

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
  .then(() => console.log("Db Connected"))
  .catch((err) => console.log(err));

app.listen(8080, console.log("App running"));

module.exports = app;
