const User = require("../models/user");
const jwt = require("jsonwebtoken");
import logger from "../winston.config";
const mailer = require("../emails/mailer");
const parseError = require("../utils/parseError");
const secret = process.env.SECRET_KEY;

exports.signUp = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body.user;
  console.log(email);
  console.log(password);

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        //console.log("Email already exists");
        logger.error("Email already exists");
        res.status(400).json({ errors: { global: "Email already exists" } });
        //return res.status(400).json({ errors: "Email already exists" });
      }
      let newUser = new User({ email: email, isConfirmed: false });
      newUser.setPassword(password);
      newUser.setConfirmationToken();
      //const passwordHash = bcrypt.hashAsync(req.body.password, 10);
      //let user = new User({ email: req.body.email, passwordHash });
      newUser
        .save()
        .then((createdUser) => {
          mailer.sendConfirmationEmail(createdUser);
          logger.info("User created");
          console.log("User created");
          console.log(createdUser.toJsonAuth());
          logger.info(createdUser.toJsonAuth());
          res.status(201).json({ user: createdUser.toJsonAuth() });
        })
        .catch((err) => {
          console.log("Error occuered");
          logger.error("Error occuered");
          logger.error(parseError(err));
          console.log(err);
          res.json({ errors: parseError(err) });
        });
    })
    .catch((err) => {
      console.log(err);
      logger.error(err);
      res.json({ errors: "Something went wrong while signing up." });
      logger.info("Something went wrong while signing up.");
    });
};

exports.confirmEmail = (req, res) => {
  const { token } = req.body;
  console.log(req.body);

  User.findOne({ confirmationToken: token })
    .then((user) => {
      if (user) {
        user.confirmationToken = "";
        user.isConfirmed = true;
        user
          .save()
          .then((userRecord) => {
            res.status(200).json({ user: userRecord.toJsonAuth() });
          })
          .catch((err) => {
            logger.error(err);
            res.json({
              errors: { global: "Something went wrong while confirming." },
            });
          });
      } else {
        logger.info("Confirmation Token Doesnt Exist");
        res
          .status(400)
          .json({ errors: { global: "Confirmation Token Doesnt Exist" } });
      }
    })

    .catch((err) => {
      console.log(err);
      logger.error(err);
      res.json({ errors: "Something went wrong while signing up." });
    });
};

exports.requestPasswordReset = (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        mailer.sendResetPasswordEmail(user);
        res.status(200).json({});
      } else {
        res.status(400).json({ errors: { global: "Email Doesnt Exist" } });
      }
    })

    .catch((err) => {
      console.log(err);
      logger.error(err);
      res.json({ errors: "Something went wrong while sending mail." });
    });
};

exports.resetPassword = (req, res) => {
  const { token, password } = req.body.data;
  console.log(req.body);

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      logger.error(err);
      res
        .status(400)
        .json({ errors: { global: "Error occured while reseting passsword" } });
    } else {
      User.findOne({ _id: decoded._id })
        .then((user) => {
          if (user) {
            user.setPassword(password);
            user.save().then(() => {
              res.status(200).json({});
            });
          } else {
            res.status(400).json({ errors: { global: "Email Doesnt Exist" } });
          }
        })
        .catch((err) => {
          logger.error(err);
          console.log(err);
          res.json({
            errors: "Something went wrong while resetting password.",
          });
        });
    }
  });
};
