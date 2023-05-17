/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("profiles", function (table) {
      table.increments("id");
      table.string("bio", 255);
      table.string("avatar_url", 255);
      table.string("address", 255);
      table.string("birth_date", 255);
      table.enu("gender", ["M", "F"]);
      table.string("occupation", 255);
      table.string("interests", 255);
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at");
      table.timestamp("deleted_at");
    })
    .then(() => {
      console.log("Table 'profiles' has been created!");
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
  return knex.schema.dropTableIfExists("profiles");
};
