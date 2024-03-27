const { check, validationResult } = require("express-validator");

const validateOfferBody = [
  check("city")
    .matches(/^[a-z\-_\s']+$/i)
    .not()
    .isEmpty()
    .withMessage("City field cannot be empty")
    .trim(),

  check("country")
    .matches(/^[a-z\-_\s']+$/i)
    .not()
    .isEmpty()
    .withMessage("Country field cannot  be empty")
    .trim(),

  check("paymentMethod")
    .matches(/^[a-z\-_\s']+$/i)
    .not()
    .isEmpty()
    .withMessage("Payment method field cannot  be empty")
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = {};
      errors.array().forEach((error) => {
        errorMessage[error.param] = error.msg;
      });
      return res.status(400).json({
        status: 400,
        errorMessage,
      });
    }
    return next();
  },
];


class offerModel {
  constructor({
    buyBCH,
    city,
    country,
    paymentMethod,
    currencyType,
    currencySymbol,
    dynamicPricing,
    margin,
    marginAbove,
    marketExchange,
    limitMin,
    limitMax,
    headline,
    tradeTerms,
    openHours,
    closeHours,
    verifiedOnly,
    makerId,
    pause,
  }) {
    this.buyBCH = buyBCH;
    this.city = city;
    this.country = country;
    this.payment_method = paymentMethod;
    this.currency_type = currencyType;
    this.currency_symbol = currencySymbol;
    this.dynamic_pricing = dynamicPricing;
    this.margin = margin;
    this.margin_above = marginAbove;
    this.market_exchange = marketExchange;
    this.limit_min = limitMin;
    this.limit_max = limitMax;
    this.headline = headline;
    this.trade_terms = tradeTerms;
    this.open_hours = openHours;
    this.close_hours = closeHours;
    this.verified_only = verifiedOnly;
    this.maker_id = makerId;
    this.pause = pause;
  }

  static fromJSON(json) {
    return new Offer(json);
  }
  
}

module.exports = {
  validateOfferBody,
  offerModel
};
