const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");
const user = require("../models/user.js");

// for signup
router.route("/signup")
    .get(userController.rendeerSignupForm)
    .post(wrapAsync(userController.signup));


// for login
router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), userController.login);

// for logout
router.get("/logout", userController.logout);

module.exports = router;