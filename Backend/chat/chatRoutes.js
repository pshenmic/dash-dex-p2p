const express = require("express");
const chatController = require("./chatController");
const checkLoggedIn = require("../middlewares/restrictedMiddleware");

const router = express.Router();

router.get("/order/:id/chat", checkLoggedIn, chatController.getAllMessages);
router.post("/order/:id/chat", checkLoggedIn, chatController.createChat);

module.exports = router;
