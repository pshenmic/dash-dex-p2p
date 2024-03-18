const offersModel = require("./offersModel.js");
const { updateBody } = require("./offersHelper");
const io = require("../socket");
const { ResponseErrorHandler } = require("../ErrorsHandler/ResponseErrorHandler.js");
const { tryCatchHandler } = require("../ErrorsHandler/TryCatchHandler.js");

module.exports.getOffersByMakerId = async (req, res) => {

  const tryFn = async () => {

    const maker_id = req.params;

    const myOffers = await offersModel.fetchMyOffers(maker_id);

    return res.status(200).json(myOffers);
  }
  return tryCatchHandler(tryFn)
};

module.exports.getAllOffers = async (req, res) => {

  const tryFn = async () => {

    const allOffers = await offersModel.fetchAllOffers();

    return res.status(200).json(allOffers);
  }
  return tryCatchHandler(tryFn)
};

module.exports.getOffer = async (req, res) => {

  const tryFn = async () => {
    const { id } = req.params;

    if (!id) {
      ResponseErrorHandler(res, 400, "Please provide a valid id")
    }

    const myOffer = await offersModel.findById(id);
    return res.status(200).json(myOffer);
  }
  return tryCatchHandler(tryFn)
};

module.exports.createOffer = async (req, res) => {

  const tryFn = async () => {

    const newOffer = updateBody(req.body);

    const newOfferInfo = await offersModel.saveOffer(newOffer);

    io.getIO().emit("offers", { action: "create", offer: newOfferInfo });

    return res.status(201).json(newOfferInfo);
  }
  return tryCatchHandler(tryFn)
};

module.exports.updateOffer = async (req, res) => {

  const tryFn = async () => {

    const { offerId } = req.params;

    const isOfferExist = offersModel.checkOfferExistence(offerId);

    if (!isOfferExist) {
      ResponseErrorHandler(res, 404, "Offer or User not found!")
    }

    const updatedOffer = updateBody(req.body);

    const updateComplete = await offersModel.updateOffer(
      updatedOffer,
      offerId
    );

    if (!updateComplete) {
      ResponseErrorHandler(res, 400, "Something went wrong with your request")
    }

    io.getIO().emit("offers", { action: "update", offer: updateComplete });
    //console.log("getIO", io.getIO());

    return res.status(200).json(updateComplete);
  }
  return tryCatchHandler(tryFn)
};

module.exports.deleteOffer = async (req, res) => {

  const tryFn = async () => {

    const { offerId } = req.params;

    const isOfferExist = offersModel.checkOfferExistence(offerId);

    if (!isOfferExist) {
      ResponseErrorHandler(res, 404, "Offer or User not found!")
    }

    const result = await offersModel.deleteOfferById(offerId);

    io.getIO().emit("offers", { action: "delete", id: result });

    return res.status(200).json(result);

  }
  return tryCatchHandler(tryFn)
};
