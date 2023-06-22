/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("profiles", function (table) {
      table.jsonb("socials");
    })
    .then(() => {
      console.log("Column 'socials' has been added to the 'profiles' table!");
    })
    .catch((error) => {
      console.error(`Error adding column: ${error}`);
      throw error;
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("profiles", function (table) {
    table.dropColumn("socials");
  });
};
