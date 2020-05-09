const router = require("express").Router();

const userController = require("../controllers/userController");

router.post("/signup", userController.signUp);

router.post("/confirm_email", userController.confirmEmail);

router.post("/request_password_reset", userController.requestPasswordReset);

router.post("/reset_password", userController.resetPassword);

module.exports = router;
