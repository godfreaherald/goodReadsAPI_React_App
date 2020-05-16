const router = require("express").Router();
//import router from "express/Router";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger.config";

const userController = require("../controllers/userController");

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.post("/signup", userController.signUp);

router.post("/confirm_email", userController.confirmEmail);

router.post("/request_password_reset", userController.requestPasswordReset);

router.post("/reset_password", userController.resetPassword);

module.exports = router;
