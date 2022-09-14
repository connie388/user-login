var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const requestMethod = require("../middleware/requestMethod");

// Require controller modules.
var user_controller = require("../controller/userController");

// POST request for creating user and system will generate an email to user
// validate the email
router.post("/user/signup", user_controller.createNewUser);

// POST request for verify a valid user
router.post("/user/verify", requestMethod, user_controller.loginUser);

// GET request for retrieving user profile if exist
router.get("/user/getById", auth, user_controller.getById);

// get request for resenting new OTP to email holder
// (client forgot password)
router.get("/user/resentOTP/:email", user_controller.resentOTP);

// POST request for user using the OTP to login the system
// user will be updated as verified
router.get("/user/verifyOTP/:email/:OTP", user_controller.verifyUserOTP);

// put request to reset password, server will send an email to confirm
router.post("/user/resetPwdRequest", user_controller.resetPwdRequest);

// user confirm the email and have a put request to server to update password
router.put("/user/updatePassword", auth, user_controller.updatePassword);

module.exports = router;
