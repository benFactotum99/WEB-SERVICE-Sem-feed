const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");


router.post("/token", authController.token);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;