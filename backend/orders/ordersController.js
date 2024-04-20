const ordersModel = require("./ordersModel.js");
const chatModel = require("../chat/chatModel.js");
const { orderModel } = require("./ordersHelper.js");
const CustomError = require("../errors/CustomError.js");

module.exports.createOrder = async (req, res) => {

  const { order, initial_message } = req.body;

  let transaction;

  try {
    transaction = await db.transaction();

    const savedOrder = await ordersModel.saveOrder(order, transaction);

    if (!savedOrder) {
      await transaction.rollback();
      throw new CustomError("Order not found!")
    }

    const messageBody = {
      order_id: savedOrder.id,
      text: initial_message,
      author_id: savedOrder.taker_id,
    };

    const newMessage = await chatModel.saveMessage(messageBody, transaction);

    if (!newMessage) {
      await transaction.rollback();
      throw new CustomError("Message not found!", 404)
    }

    await transaction.commit();

    return res.status(201).json(savedOrder);
  } catch (e) {
    await transaction.rollback();

    throw new CustomError("Could not save order", 500)
  }
};

module.exports.getMyOrders = async (req, res) => {

  const { id } = req.params;

  if (!id) {
    throw new CustomError('Please provide a valid id', 400)
  }

  const allMyOrders = await ordersModel.findMyOrders(id);

  if (allMyOrders.length === 0) {
    throw new CustomError("No orders found for the given order_id!", 404);
  }

  return res.status(200).json(allMyOrders);
};

module.exports.getCurrentOrder = async (req, res) => {

  const { userId, orderId } = req.params;

  const currentOrder = await ordersModel.findOrderIdUserId(userId, orderId);

  if (!currentOrder) {
    throw new CustomError("No current order found for the given order_id and user_id", 404)
  }

  return res.status(200).json(currentOrder);
};

module.exports.updateOrder = async (req, res) => {

  const order = orderModel.fromJSON(req.body)

  const updatedOrder = await ordersModel.updateOrderById(order);

  if (!updatedOrder) {
    throw new CustomError("Order was not updated", 404)
  }

  return res.status(200).json(updatedOrder);
};
