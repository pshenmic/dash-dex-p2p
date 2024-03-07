const chatModel = require("./chatModel.js");
const io = require("../socket");
const { ResponseErrorHandler } = require("../ErrorsHandler/ResponseErrorHandler.js");

module.exports.getAllMessages = async (req, res) => {
  const { order_id } = req.params;
  try {
    
    const allMyOrders = await chatModel.findAllByOrderId(order_id);

    if (!allMyOrders) {
      return ResponseErrorHandler(res, 400, "Something went wrong with your chat request")
    }

    return res.status(200).json(allMyOrders);

  } catch (error) {
    return ResponseErrorHandler(res, 500, error)
  }
};

module.exports.createChat = async (req, res) => {

  const {text, author_id, order_id} = req.body
  try {

    const savedMessage = await chatModel.saveMessage(text, author_id, order_id);

    if (!savedMessage) {
      return ResponseErrorHandler(res, 400, "Something went wrong with your trade request")
    }

    io.getIO().to(req.body.order_id).emit("newMessage", {
      action: "create",
      message: savedMessage,
    });

    return ResponseErrorHandler(res, 201, "Successfully created new message")

  } catch (error) {
    return ResponseErrorHandler(res, 500, error)
  }
};
