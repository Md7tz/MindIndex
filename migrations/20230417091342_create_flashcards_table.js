/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
      .createTable("flashcards", function (table) {
        table.increments("id");
        table.string("question", 255).notNullable();
        table.text("answer").notNullable();
        table.bigInteger('collection_id').unsigned()
        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
        table.timestamp("updated_at");
        table.timestamp("deleted_at");
      })
      .then(() => {
        console.log("Table 'flashcards' has been created!");
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
    return knex.schema.dropTableIfExists("flashcards");
  };
  