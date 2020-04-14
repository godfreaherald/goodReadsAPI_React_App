const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const mailer = require("../emails/mailer");
const parseError = require("../utils/parseError");

const secret = process.env.SECRET_KEY;

router.post("/signup", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body.user;
  console.log(email);
  console.log(password);

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        console.log("Email already exists");
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
        .then(createdUser => {
          mailer.sendConfirmationEmail(createdUser);
          console.log("User created");
          console.log(createdUser.toJsonAuth());
          res.status(201).json({ user: createdUser.toJsonAuth() });
        })
        .catch(err => {
          console.log("Error occuered");
          console.log(err);
          res.json({ errors: parseError(err) });
        });
    })
    .catch(err => {
      console.log(err);
      res.json({ errors: "Something went wrong while signing up." });
    });
});

router.post("/confirm_email", (req, res) => {
  const { token } = req.body;
  console.log(req.body);

  User.findOne({ confirmationToken: token })
    .then(user => {
      if (user) {
        user.confirmationToken = "";
        user.isConfirmed = true;
        user
          .save()
          .then(userRecord => {
            res.status(200).json({ user: userRecord.toJsonAuth() });
          })
          .catch(err =>
            res.json({
              errors: { global: "Something went wrong while confirming." }
            })
          );
      } else {
        res
          .status(400)
          .json({ errors: { global: "Confirmation Token Doesnt Exist" } });
      }
    })

    .catch(err => {
      console.log(err);
      res.json({ errors: "Something went wrong while signing up." });
    });
});

router.post("/request_password_reset", (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        mailer.sendResetPasswordEmail(user);
        res.status(200).json({});
      } else {
        res.status(400).json({ errors: { global: "Email Doesnt Exist" } });
      }
    })

    .catch(err => {
      console.log(err);
      res.json({ errors: "Something went wrong while sending mail." });
    });
});

router.post("/reset_password", (req, res) => {
  const { token, password } = req.body.data;
  console.log(req.body);

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res
        .status(400)
        .json({ errors: { global: "Error occured while reseting passsword" } });
    } else {
      User.findOne({ _id: decoded._id })
        .then(user => {
          if (user) {
            user.setPassword(password);
            user.save().then(() => {
              res.status(200).json({});
            });
          } else {
            res.status(400).json({ errors: { global: "Email Doesnt Exist" } });
          }
        })
        .catch(err => {
          console.log(err);
          res.json({
            errors: "Something went wrong while resetting password."
          });
        });
    }
  });
});

module.exports = router;
