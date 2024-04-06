const ordersModel = require("./ordersModel.js");
const chatModel = require("../chat/chatModel.js");
const NotFoundError = require("../errors/not.found.error");
const { orderModel } = require("./ordersHelper.js");

module.exports.createOrder = async (req, res) => {

  const { order, initial_message } = req.body;

  let transaction;

  try {
    transaction = await db.transaction();

    const savedOrder = await ordersModel.saveOrder(order, transaction);

    if (!savedOrder) {
      await transaction.rollback();
      throw new NotFoundError()
    }

    const messageBody = {
      order_id: savedOrder.id,
      text: initial_message,
      author_id: savedOrder.taker_id,
    };

    const newMessage = await chatModel.saveMessage(messageBody, transaction);

    if (!newMessage) {
      await transaction.rollback();
      throw new NotFoundError()
    }

    await transaction.commit();

    return res.status(201).json(savedOrder);
  } catch (e) {
    await transaction.rollback();

    throw new Error("Could not save order")
  }
};

module.exports.getMyOrders = async (req, res) => {

  const { id } = req.params;

  if (!id) {
    throw new NotFoundError()
  }

  const allMyOrders = await ordersModel.findMyOrders(id);

  if (!allMyOrders) {
    throw new NotFoundError()
  }

  return res.status(200).json(allMyOrders);
};

module.exports.getCurrentOrder = async (req, res) => {

  const { userId, orderId } = req.params;

  const currentOrder = await ordersModel.findOrderIdUserId(userId, orderId);

  if (!currentOrder) {
    throw new NotFoundError()
  }

  return res.status(200).json(currentOrder);
};

module.exports.updateOrder = async (req, res) => {

  const order = orderModel.fromJSON(req.body)

  const updatedOrder = await ordersModel.updateOrderById(order);

  if (!updatedOrder) {
    throw new NotFoundError()
  }

  return res.status(200).json(updatedOrder);
};
