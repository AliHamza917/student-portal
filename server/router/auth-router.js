const express = require("express")
const authController = require("../controllers/auth-controller");
const router = express.Router()
// Controller


router.route("/login-user").post(authController.loginController);
router.route("/register-user").post(authController.registerController);

router.route("/register-user").post(authController.registerController);

module.exports = router;
