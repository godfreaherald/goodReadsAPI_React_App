const mongoose = require("mongoose");
// import mongoose from "mongoose"; to be used in es6 with babel
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import logger from "../winston.config";
const uniqueValidator = require("mongoose-unique-validator");
//const secret = process.env.SECRET_KEY;
const secret = "secret";
console.log(secret);
const HOST = process.env.HOST;

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    isConfirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, default: "" },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.setPassword = function setPassword(password) {
  const salt = bcrypt.genSaltSync(10);

  this.passwordHash = bcrypt.hashSync(password, salt);
};

userSchema.methods.setConfirmationToken = function setConfirmationToken() {
  console.log("test set COnfrimation TOken");
  this.confirmationToken = this.jwtGenerator();
  logger.info("ConfirmationToken created ");
};

userSchema.methods.generateConfirmationURL = function generateConfirmationURL() {
  logger.info("ConfirmationURL generated ");
  return `${HOST}/confirmation/${this.confirmationToken}`;
};

userSchema.methods.generateResetPasswordURL = function generateResetPasswordURL() {
  return `${HOST}/resetPassword/${this.hasExpiryJwtGenerator()}`;
};

userSchema.methods.isValidEmail = function isValidEmail(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.methods.jwtGenerator = function jwtGenerator() {
  logger.info("Jwt Token generated ");
  return jwt.sign({ email: this.email, isConfirmed: this.isConfirmed }, secret);
};
userSchema.methods.hasExpiryJwtGenerator = function hasExpiryJwtGenerator() {
  logger.info("Jwt Token with expiry generated ");
  return jwt.sign({ _id: this._id }, secret, { expiresIn: "1h" });
};

userSchema.methods.toJsonAuth = function toJsonAuth() {
  return {
    email: this.email,
    isConfirmed: this.isConfirmed,
    token: this.jwtGenerator(),
  };
};

userSchema.plugin(uniqueValidator, { message: "Email already taken" });

//export default mongoose.model("User", userSchema); //to use in es6 with babel

module.exports = mongoose.model("User", userSchema); // es5
//export default mongoose.model("User", schema);
