const offersModel = require("./offersModel.js");
const { updateBody } = require("./offersHelper");
const io = require("../socket");

module.exports.getOffersByMakerId = async (req, res) => {

  const maker_id = req.params;

  try {

    const myOffers = await offersModel.fetchMyOffers(maker_id);
    return res.status(200).json(myOffers);

  } catch (error) {
    ResponseErrorHandler(res, 500, error)
  }
};
module.exports.getAllOffers = async (req, res) => {
  try {

    const allOffers = await offersModel.fetchAllOffers();
    return res.status(200).json(allOffers);

  } catch (error) {
    ResponseErrorHandler(res, 500, "Oops, something went wrong while getting all offers")
  }
};

module.exports.getOffer = async (req, res) => {

  const { id } = req.params;

  if (!id) {
    ResponseErrorHandler(res, 400, "Please provide a valid id")
  }

  try {

    const myOffer = await offersModel.findById(id);
    return res.status(200).json(myOffer);

  } catch (error) {
    ResponseErrorHandler(res, 500, error)
  }
};

module.exports.createOffer = async (req, res) => {

  const newOffer = updateBody(req.body);

  try {

    const newOfferInfo = await offersModel.saveOffer(newOffer);

    io.getIO().emit("offers", { action: "create", offer: newOfferInfo });

    return res.status(201).json(newOfferInfo);

  } catch (error) {
    ResponseErrorHandler(res, 500, error)
  }
};

module.exports.updateOffer = async (req, res) => {

  const { offerId } = req.params;

  try {

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

  } catch (error) {
    ResponseErrorHandler(res, 500, error)
  }
};

module.exports.deleteOffer = async (req, res) => {

  const { offerId } = req.params;

  try {

    const isOfferExist = offersModel.checkOfferExistence(offerId);

    if (!isOfferExist) {
      ResponseErrorHandler(res, 404, "Offer or User not found!")
    }

    const result = await offersModel.deleteOfferById(offerId);

    io.getIO().emit("offers", { action: "delete", id: result });

    return res.status(200).json(result);

  } catch (error) {
    ResponseErrorHandler(res, 500, error)
  }
};
