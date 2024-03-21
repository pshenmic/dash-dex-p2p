const offersModel = require("./offersModel.js");
const { updateBody } = require("./offersHelper.js");
const io = require("../socket.js");
const { responseErrorHandler } = require("../errorsHandler/responseErrorHandler.js");

module.exports.getOffersByMakerId = async (req, res) => {

  const maker_id = req.params;

  const myOffers = await offersModel.fetchMyOffers(maker_id);

  return res.status(200).json(myOffers);
};

module.exports.getAllOffers = async (req, res) => {

    const allOffers = await offersModel.fetchAllOffers();

    return res.status(200).json(allOffers);
};

module.exports.getOffer = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      responseErrorHandler(res, 500, "Please provide a valid id")
    }

    const myOffer = await offersModel.findById(id);
    return res.status(200).json(myOffer);
};

module.exports.createOffer = async (req, res) => {
    const newOffer = updateBody(req.body);

    const newOfferInfo = await offersModel.saveOffer(newOffer);

    io.getIO().emit("offers", { action: "create", offer: newOfferInfo });

    return res.status(201).json(newOfferInfo);
};

module.exports.updateOffer = async (req, res) => {

    const { offerId } = req.params;

    const isOfferExist = offersModel.checkOfferExistence(offerId);

    if (!isOfferExist) {
      responseErrorHandler(res, 404, "Offer or User not found!")
    }

    const updatedOffer = updateBody(req.body);

    const updateComplete = await offersModel.updateOffer(
      updatedOffer,
      offerId
    );

    if (!updateComplete) {
      responseErrorHandler(res, 404)
    }

    io.getIO().emit("offers", { action: "update", offer: updateComplete });
    //console.log("getIO", io.getIO());

    return res.status(200).json(updateComplete);
};

module.exports.deleteOffer = async (req, res) => {

    const { offerId } = req.params;

    const isOfferExist = offersModel.checkOfferExistence(offerId);

    if (!isOfferExist) {
      responseErrorHandler(res, 404, "Offer or User not found!")
    }

    const result = await offersModel.deleteOfferById(offerId);

    io.getIO().emit("offers", { action: "delete", id: result });

    return res.status(200).json(result);
};
