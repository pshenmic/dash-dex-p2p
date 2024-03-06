const ordersModel = require("./ordersModel.js");
const chatModel = require("../chat/chatModel.js");

const { mapOrderBody } = require("./ordersHelper");

module.exports.createOrder = async (req, res) => {
  const { order, initial_message } = req.body;
  try {
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
  } catch (error) {
    ResponseErrorHandler(res, 500, error);
  }
};

module.exports.getMyOrders = async (req, res) => {

  const { id } = req.params;
  if (!id) {
    ResponseErrorHandler(res, 400, "Please provide a valid id")
  }
  try {

    const allMyOrders = await ordersModel.findMyOrders(id);

    if (!allMyOrders) {
      ResponseErrorHandler(res, 400, "Something went wrong with your request")
    }

    return res.status(200).json(allMyOrders);
  } catch (error) {
    ResponseErrorHandler(res, 500, error);
  }
};

module.exports.getCurrentOrder = async (req, res) => {

  const { userId, orderId } = req.params;

  try {

    const currentOrder = await ordersModel.findOrderIdUserId(userId, orderId);

    if (!currentOrder) {
      ResponseErrorHandler(res, 400, "Something went wrong with your request")
    }

    return res.status(200).json(currentOrder);

  } catch (error) {
    ResponseErrorHandler(res, 500, error);
  }
};

module.exports.updateOrder = async (req, res) => {
  const order = mapOrderBody(req.body);

  try {
    const updatedOrder = await ordersModel.updateOrderById(order);

    if (!updatedOrder) {
      ResponseErrorHandler(res, 400, "Something went wrong with your request")
    }

    return res.status(200).json(updatedOrder);

  } catch (error) {
    ResponseErrorHandler(res, 500, error);
  }
};
