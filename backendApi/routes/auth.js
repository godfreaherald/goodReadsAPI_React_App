const router = require("express").Router();

//const bcrypt = require("bcrypt");
const authController = require("../controllers/authController");

router.post("/", authController.login);

module.exports = router;
