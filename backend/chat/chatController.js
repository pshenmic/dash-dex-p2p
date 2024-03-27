const chatModel = require("./chatModel.js");
const io = require("../socket.js");
const { responseErrorHandler } = require("../errorHandler/responseErrorsHandler.js");

module.exports.getAllMessages = async (req, res) => {

    const { order_id } = req.params;
    
    const allMyOrders = await chatModel.findAllByOrderId(order_id);

    if (!allMyOrders) {
      return responseErrorHandler(res, 404)
    }

    return res.status(200).json(allMyOrders);
};

module.exports.createChat = async (req, res) => {

    const {text, author_id, order_id} = req.body

    const savedMessage = await chatModel.saveMessage(text, author_id, order_id);

    if (!savedMessage) {
      return responseErrorHandler(res, 400, "Something went wrong with your trade request")
    }

    io.getIO().to(req.body.order_id).emit("newMessage", {
      action: "create",
      message: savedMessage,
    });

    return responseErrorHandler(res, 201, "Successfully created new message")
};
