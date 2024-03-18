const ordersModel = require("./ordersModel.js");
const chatModel = require("../chat/chatModel.js");

const { mapOrderBody } = require("./ordersHelper");
const { ResponseErrorHandler } = require("../ErrorsHandler/ResponseErrorHandler.js");
const { tryCatchHandler } = require("../ErrorsHandler/TryCatchHandler.js");

module.exports.createOrder = async (req, res) => {

  const tryFn = async () => {

    const { order, initial_message } = req.body;

    const savedOrder = await ordersModel.saveOrder(order);

    if (!savedOrder) {
      ResponseErrorHandler(res, 400, "Something went wrong with your request")
    }

    const messageBody = {
      order_id: savedOrder.id,
      text: initial_message,
      author_id: savedOrder.taker_id,
    };

    const newMessage = await chatModel.saveMessage(messageBody);

    if (!newMessage) {
      ResponseErrorHandler(res, 400, "Something went wrong with your request")
    }

    return res.status(201).json(savedOrder);
  }
  return tryCatchHandler(tryFn)
};

module.exports.getMyOrders = async (req, res) => {

  const tryFn = async () => {

    const { id } = req.params;

    if (!id) {
      ResponseErrorHandler(res, 400, "Please provide a valid id")
    }

    const allMyOrders = await ordersModel.findMyOrders(id);

    if (!allMyOrders) {
      ResponseErrorHandler(res, 400, "Something went wrong with your request")
    }

    return res.status(200).json(allMyOrders);
  }
  return tryCatchHandler(tryFn)
};

module.exports.getCurrentOrder = async (req, res) => {

  const tryFn = async () => {

    const { userId, orderId } = req.params;

    const currentOrder = await ordersModel.findOrderIdUserId(userId, orderId);

    if (!currentOrder) {
      ResponseErrorHandler(res, 400, "Something went wrong with your request")
    }

    return res.status(200).json(currentOrder);

  }
  return tryCatchHandler(tryFn)
};

module.exports.updateOrder = async (req, res) => {
  
  const tryFn = async () => {

    const order = mapOrderBody(req.body);

    const updatedOrder = await ordersModel.updateOrderById(order);

    if (!updatedOrder) {
      ResponseErrorHandler(res, 400, "Something went wrong with your request")
    }

    return res.status(200).json(updatedOrder);

  }
  return tryCatchHandler(tryFn)
};