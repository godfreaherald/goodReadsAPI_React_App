const router = require("express").Router();

const User = require("../models/user");
//const bcrypt = require("bcrypt");
//const userController = require("..controllers/user");

router.post("/", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body.credentials;
  User.findOne({ email: email })
    .then(user => {
      if (user && user.isValidEmail(password)) {
        res.status(200).json({ user: user.toJsonAuth() });
      } else {
        console.log("Invalid Credentials");
        res.status(400).json({ errors: { global: "Invalid Credentials" } });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ errors: "Something went wrong during login." });
    });
});

module.exports = router;
