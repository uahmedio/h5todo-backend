const express = require("express");
const passport = require("passport");

const passportConf = require("../passport"); // Has to be imported
const UserController = require("../controllers/user.controller");

const router = express.Router();

// Authentication Strategies
const passportJWT = passport.authenticate("jwt", { session: false });
const passportSignIn = passport.authenticate("local", { session: false });

router.post("/login", passportSignIn, UserController.post_login);

router.post("/register", UserController.post_createUser);

router.get("/findall", UserController.get_findAllUser);

router.get("/secret", passportJWT, UserController.get_secret);

module.exports = router;
