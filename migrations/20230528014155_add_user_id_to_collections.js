/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("collections", function (table) {
    table.bigInteger("user_id").unsigned().notNullable(); // Add unsigned bigInteger column
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("collections", function (table) {
    table.dropColumn("user_id"); // Remove the added column
  });
};
