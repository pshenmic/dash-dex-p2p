const offersController = require("./offersController");
const offersValidator = require("./offersHelper");
const checkLoggedIn = require("../middlewares/restrictedMiddleware");
const express = require("express");

const router = express.Router();

router.post(
  "/",
  checkLoggedIn,
  offersValidator.validateOfferBody,
  offersController.createOffer
);

router.get("/offers", offersController.getAllOffers);
router.get("/user/:id/offers", checkLoggedIn, offersController.getOffersByMakerId);
router.get("/offer/:id([0-9]+)", offersController.getOffer);

router.put(
  "/:userId([0-9]+)/:offerId([0-9]+)",
  checkLoggedIn,
  offersController.updateOffer
);

router.delete(
  "/:userId([0-9]+)/:offerId([0-9]+)",
  checkLoggedIn,
  offersController.deleteOffer
);

module.exports = router;
