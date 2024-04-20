const chatModel = require("./chatModel.js");
const io = require("../socket.js");
const CustomError = require("../errors/CustomError.js");

module.exports.getAllMessages = async (req, res) => {

    const { order_id } = req.params;

    const allMyOrders = await chatModel.findAllByOrderId(order_id);

    if (allMyOrders.length === 0) {
      throw new CustomError("No orders found for the given order_id!", 404);
    }

    return res.status(200).json(allMyOrders);
};

module.exports.createChat = async (req, res) => {

    const message = chatModel.message.fromJSON(req.body)

    const savedMessage = await chatModel.saveMessage(message);

    if (savedMessage.length === 0) {
      throw new CustomError("Something went wrong with your trade request.", 400)
    }

    io.getIO().to(req.body.order_id).emit("newMessage", {
      action: "create",
      message: savedMessage,
    });

    return res.status(201).json({msg:"Successfully created new message"});
};
