const express = require("express");
const ordersController = require("./ordersController");
const checkLoggedIn = require("../middlewares/restrictedMiddleware");
const runAsyncWrapper = require("../middlewares/runAsyncWrapper");

const router = express.Router();

router.post("/create-order", ordersController.createOrder);
router.get("/orders", ordersController.getAllOrders);

router.get("/:id([0-9]+)",  runAsyncWrapper(ordersController.getMyOrders));
router.get(
  "/:userId([0-9]+)/:orderId([0-9]+)",
  checkLoggedIn,
  runAsyncWrapper(ordersController.getCurrentOrder)
);
router.put("/:orderId([0-9]+)", checkLoggedIn, runAsyncWrapper(ordersController.updateOrder));

module.exports = router;
