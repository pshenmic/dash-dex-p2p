const createFakeOrder = () => {
  const boolVal = Math.random() <= 0.5; // Random boolean value
  return {
    is_complete: boolVal,
    status: boolVal ? 'completed' : 'created',
    is_maker_buying: boolVal,
    maker_id: 1, // Example maker_id
    taker_id: 3,
    offer_id: 1, // Example offer_id
    price_dash: "250",
    dash_amount: "2",
    fiat_amount: "500",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};

module.exports.seed = function (knex) {
  const fakeOrder = createFakeOrder();
  return knex("orders").insert(fakeOrder);
};