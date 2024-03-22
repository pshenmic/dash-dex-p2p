const express = require("express");
const usersControllers = require("./usersControllers");
const { validateUser} = require("./usersHelper");
const checkLoggedIn = require("../middlewares/restrictedMiddleware");

const router = express.Router();

router.post("/register", validateUser, usersControllers.signup);
router.post("/login", usersControllers.login);
// this route just for auth user testing It will be removed 
router.get("/user", checkLoggedIn, usersControllers.checkUser);


module.exports = router;
