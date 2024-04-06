const chatModel = require("./chatModel.js");
const io = require("../socket.js");
const NotFoundError = require("../errors/not.found.error");

module.exports.getAllMessages = async (req, res) => {

    const { order_id } = req.params;

    const allMyOrders = await chatModel.findAllByOrderId(order_id);

    if (!allMyOrders) {
      throw new NotFoundError()
    }

    return res.status(200).json(allMyOrders);
};

module.exports.createChat = async (req, res) => {

    const {text, author_id, order_id} = chatModel.chatingModel.fromJSON(req.body)

    const savedMessage = await chatModel.saveMessage(text, author_id, order_id);

    if (!savedMessage) {
      throw new NotFoundError()
    }

    io.getIO().to(req.body.order_id).emit("newMessage", {
      action: "create",
      message: savedMessage,
    });

    return res.status(201).json({msg:"Successfully created new message"});
};
