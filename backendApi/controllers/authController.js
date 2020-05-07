const User = require("../models/user");

exports.login = (req, res) => {
  const { email, password } = req.body.credentials;
  User.findOne({ email: email })
    .then((user) => {
      if (user && user.isValidEmail(password)) {
        res.status(200).json({ user: user.toJsonAuth() });
      } else {
        res.status(400).json({ errors: { global: "Invalid Credentials" } });
      }
    })
    .catch((err) => {
      res.status(400).json({ errors: "Something went wrong during login." });
    });
};
