const express = require("express");
const ordersController = require("./ordersController");
const checkLoggedIn = require("../middlewares/restrictedMiddleware");
const runAsyncWrapper = require("../middlewares/runAsyncWrapper");

const router = express.Router();

router.post("/create_order", checkLoggedIn, ordersController.createOrder);
router.get("/orders", checkLoggedIn, ordersController.getAllOrders);
router.get("/completed_orders/:userId([0-9]+)", checkLoggedIn, runAsyncWrapper(ordersController.getAllCompletedOrders));

router.get("/:id([0-9]+)", checkLoggedIn, runAsyncWrapper(ordersController.getMyOrders));
router.get("/active_orders/:userId([0-9]+)", checkLoggedIn, runAsyncWrapper(ordersController.getCurrentOrders));
router.put("/:orderId([0-9]+)", checkLoggedIn, runAsyncWrapper(ordersController.updateOrder));

module.exports = router;
