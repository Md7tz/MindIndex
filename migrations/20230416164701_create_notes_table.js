/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("notes", function (table) {
      table.increments("id");
      table.string("title", 255).notNullable();
      table.text("body").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at");
      table.timestamp("deleted_at");
    })
    .then(() => {
      console.log("Table 'notes' has been created!");
    })
    .catch((error) => {
      console.error(`Error creating table: ${error}`);
      throw error;
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('notes');
};
