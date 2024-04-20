module.exports.up = function(knex) {
  return knex.schema.table("users", users => {
    users.string("blurb", 255);
    users.string("country", 255);
    users.string("city", 255);
    users.boolean("is_email_verification").defaultTo(false);
    users.boolean("is_phone_verification").defaultTo(false);
    users.boolean("is_merchant").defaultTo(false);
  });
};

module.exports.down = function(knex) {
  return knex.schema.table("users", users => {
    users.dropColumn("merchant");
    users.dropColumn("phone_verification");
    users.dropColumn("email_verification");
    users.dropColumn("city");
    users.dropColumn("country");
    users.dropColumn("blurb");
  });
};
