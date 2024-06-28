const ordersModel = require("./ordersModel.js");
const chatModel = require("../chat/chatModel.js");
const NotFoundError = require("../errors/not.found.error");
const { orderModel } = require("./ordersHelper.js");
const BadRequest = require("../errors/bad.request.error.js");
const ServerError = require("../errors/server.error.js");
const db = require("../data/dbConfig");
const usersModel = require("../users/usersModels.js");

module.exports.createOrder = async (req, res) => {

  const { order, initial_message } = req.body;
  let transaction;

  try {

    const checkUser = await usersModel.findById(order?.makerId).then(user => user)
    if(!checkUser) {
      throw new NotFoundError("Maker id not found")
    }
    
    transaction = await db.transaction();
    const new_order = orderModel.fromJSON(order)
    const savedOrder = await ordersModel.saveOrder(new_order, transaction);

    if (!savedOrder) {
      await transaction.rollback();
      throw new NotFoundError("Order not found!")
    }

    const messageBody = {
      order_id: savedOrder.id,
      text: initial_message,
      author_id: savedOrder.taker_id,
    };
    
    const newMessage = await chatModel.saveMessage(chatModel.message.fromJSON(messageBody), transaction);

    if (!newMessage) {
      await transaction.rollback();
      throw new NotFoundError("Message not found!")
    }

    await transaction.commit();

    return res.status(201).json(savedOrder);
  } catch (e) {
    await transaction.rollback();

    throw new ServerError("Could not save order")
  }
};

module.exports.getMyOrders = async (req, res) => {

  const { id } = req.params;

  if (!id) {
    throw new BadRequest('Please provide a valid id')
  }

  const allMyOrders = await ordersModel.findMyOrders(id);

  if (allMyOrders.length === 0) {
    throw new NotFoundError("No orders found for the given order_id!");
  }

  return res.status(200).json(allMyOrders);
};

module.exports.getAllOrders = async (req, res) => {
  const allOffers = await ordersModel.fetchAllOffers();
  return res.status(200).json(allOffers);
};

module.exports.getAllCompletedOrders = async (req, res) => {

  const {userId} = req.params;

  const currentOrder = await ordersModel.findCompletedOrders(userId);

  if (!currentOrder) {
    throw new NotFoundError("No current order found for the given order_id and user_id")
  }

  return res.status(200).json(currentOrder);
};

module.exports.getCurrentOrders = async (req, res) => {

  const { userId } = req.params;

  const currentOrder = await ordersModel.findOrderIdUserId(userId);

  if (!currentOrder) {
    throw new NotFoundError("No current order found for the given order_id and user_id")
  }

  return res.status(200).json(currentOrder);
};

module.exports.updateOrder = async (req, res) => {

  const order = orderModel.fromJSON(req.body)

  const updatedOrder = await ordersModel.updateOrderById(order);

  if (!updatedOrder) {
    throw new NotFoundError("Order was not updated")
  }

  return res.status(200).json(updatedOrder);
};
