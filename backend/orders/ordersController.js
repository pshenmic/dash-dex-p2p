const ordersModel = require("./ordersModel.js");
const chatModel = require("../chat/chatModel.js");
const { responseErrorHandler } = require("../errorHandler/responseErrorsHandler.js");
const NotFoundError = require("../errors/not.found.error");

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
      return responseErrorHandler(res, 404, "Message not found");
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
    responseErrorHandler(res, 400, "Please provide a valid id")
  }

  const allMyOrders = await ordersModel.findMyOrders(id);

  if (!allMyOrders) {
    responseErrorHandler(res, 404)
  }

  return res.status(200).json(allMyOrders);
};

module.exports.getCurrentOrder = async (req, res) => {

  const { userId, orderId } = req.params;

  const currentOrder = await ordersModel.findOrderIdUserId(userId, orderId);

  if (!currentOrder) {
    responseErrorHandler(res, 404)
  }

  return res.status(200).json(currentOrder);
};

module.exports.updateOrder = async (req, res) => {
  const {
    bchAmount,
    fiatAmount,
    isMakerBuying,
    makerId,
    offerId,
    priceBCH,
    takerId,
    cancelled,
    complete,
    id,
  } = req.body

  const order = {
    maker_id: makerId,
    taker_id: takerId,
    offer_id: offerId,
    price_bch: priceBCH,
    bch_amount: bchAmount,
    fiat_amount: fiatAmount,
    is_maker_buying: isMakerBuying,
    cancelled,
    complete,
    id,
  }

  const updatedOrder = await ordersModel.updateOrderById(order);

  if (!updatedOrder) {
    responseErrorHandler(res, 404)
  }

  return res.status(200).json(updatedOrder);
};
