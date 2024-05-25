const express = require("express");
const usersControllers = require("./usersControllers");
const { validateUser} = require("./usersHelper");
const checkLoggedIn = require("../middlewares/restrictedMiddleware");
const runAsyncWrapper = require("../middlewares/runAsyncWrapper");

const router = express.Router();

router.post("/register", validateUser, runAsyncWrapper(usersControllers.signup));
router.post("/login", runAsyncWrapper(usersControllers.login));

module.exports = router;
