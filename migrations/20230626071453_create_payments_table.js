/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("payments", function (table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned();
      // gateway: stripe, paypal, etc.
      table.string("gateway", 255);
      table.decimal("amount", 10, 2);
      table.string("currency", 3);
      table.string("status", 20);
      table.string("transaction_id", 255);
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at");
      table.timestamp("deleted_at").nullable();
      table.foreign("user_id").references("users.id");
    })
    .then(() => {
      console.log("Table 'payments' has been created!");
    })
    .catch((error) => {
      console.error(`Error creating table: ${error}`);
      throw error;
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("payments");
};
