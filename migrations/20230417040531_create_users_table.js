/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id");
      table.string("username", 50).notNullable();
      table.string("password", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("fullname", 255).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at");
      table.timestamp("deleted_at");
    })
    .then(() => {
      console.log("The users Table has been successfully created");
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
  return knex.schema.dropTableIfExists("users");
};
