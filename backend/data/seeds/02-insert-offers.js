exports.seed = function (knex) {
  return knex("offers")
    .del()
    .then(function () {
      return knex("offers").insert([
        {
          buy_dash: true,
          city: "New York",
          country: "USA",
          currency_symbol: "$",
          currency_type: "USD",
          dynamic_pricing: true,
          headline: "Buy DASH with USD",
          maker_id: 1,
          margin: 5,
          margin_above: true,
          market_exchange: "Coinbase",
          payment_method: "Bank Transfer",
          trade_terms: "Immediate transfer after payment",
          trusted_only: true,
        },
      ]);
    });
};
