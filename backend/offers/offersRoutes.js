const offersController = require("./offersController");
const offersValidator = require("./offersHelper");
const checkLoggedIn = require("../middlewares/restrictedMiddleware");
const express = require("express");
const runAsyncWrapper = require("../middlewares/runAsyncWrapper");

const router = express.Router();

router.post("/", checkLoggedIn, offersController.createOffer);
router.get("/offers", checkLoggedIn, runAsyncWrapper(offersController.getAllOffers));
router.get("/user/:id/offers", checkLoggedIn, runAsyncWrapper(offersController.getOffersByMakerId));
router.get("/offer/:id([0-9]+)", checkLoggedIn, runAsyncWrapper(offersController.getOffer));
router.get("/offer/:id([0-9]+)", checkLoggedIn, runAsyncWrapper(offersController.getOffer));


router.put(
  "/:userId([0-9]+)/:offerId([0-9]+)",
  checkLoggedIn,
  runAsyncWrapper(offersController.updateOffer)
);

router.delete(
  "/:offerId([0-9]+)",
  // checkLoggedIn,
  runAsyncWrapper(offersController.deleteOffer)
);

router.put(
  "/pause/:offerId([0-9]+)",
  // checkLoggedIn,
  runAsyncWrapper(offersController.pauseOffer)
);

module.exports = router;
