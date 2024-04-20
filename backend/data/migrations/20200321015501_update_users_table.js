module.exports.up = function(knex) {
  return knex.schema.table("users", users => {
    users.string("blurb", 255);
    users.boolean("is_email_verification").defaultTo(false);
    users.boolean("is_merchant").defaultTo(false);
  });
};

module.exports.down = function(knex) {
  return knex.schema.table("users", users => {
    users.dropColumn("merchant");
    users.dropColumn("email_verification");
    users.dropColumn("blurb");
  });
};
