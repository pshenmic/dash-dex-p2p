module.exports.up = function (knex) {
  return knex.schema.createTable("offers", (offers) => {
    offers.increments();
    offers.boolean("buy_dash").notNullable();
    offers.string("country").notNullable();
    offers.string("city").notNullable();
    offers.string("payment_method").notNullable();
    offers.string("currency_type").notNullable();
    offers.string("currency_symbol").notNullable();
    offers.boolean("dynamic_pricing").notNullable().defaultTo(true);
    offers.integer("margin").notNullable();
    offers.boolean("margin_above").notNullable();
    offers.string("market_exchange").notNullable();
    offers.integer("limit_min");
    offers.integer("limit_max");
    offers.string("headline").notNullable();
    offers.string("trade_terms", 1000);
    offers.time("open_hours");
    offers.time("close_hours");
    offers.boolean("trusted_only").notNullable();
    offers.boolean("pause").defaultTo(false);
    offers
      .integer("maker_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    offers.timestamps(true, true);
  });
};

module.exports.down = function (knex) {
  return knex.schema.dropTableIfExists("offers");
};
