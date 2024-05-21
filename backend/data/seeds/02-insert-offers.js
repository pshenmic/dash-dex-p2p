exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("offers")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("offers").insert([
        {
          buy_dash: true, // Use correct column name "buy_dash" instead of "buyDASH"
          city: "New York",
          country: "USA",
          currency_symbol: "$",
          currency_type: "USD",
          dynamic_pricing: true,
          headline: "Buy DASH with USD",
          maker_id: 1, // Replace with the appropriate maker_id
          margin: 5,
          margin_above: true,
          market_exchange: "Coinbase",
          payment_method: "Bank Transfer",
          trade_terms: "Immediate transfer after payment",
          trusted_only: true,
        },
        // Add more seed data entries as needed
      ]);
    });
};
