const slugify = require("slugify");

exports.up = function (knex) {
  return knex.schema
    .alterTable("collections", function (table) {
      table.string("slug").unique().nullable();
			table.string("name").unique().notNullable().alter();
    })
    .then(() => {
      // Update the "slug" column based on the existing "name" values
      return knex("collections").select("id", "name").then((rows) => {
        const updatePromises = rows.map((row) => {
          const slug = slugify(row.name, { lower: true }); // Generate slug using slugify library
          return knex("collections")
            .where("id", row.id)
            .update({ slug });
        });
        return Promise.all(updatePromises);
      });
    })
    .then(() => {
      // Alter the "slug" column to be not nullable
      return knex.schema.alterTable("collections", function (table) {
        table.string("slug").notNullable().alter();
      });
    })
    .then(() => {
      console.log("Column 'slug' has been added to the 'collections' table, populated, and made not nullable!");
    })
    .catch((error) => {
      console.error(`Error adding column, populating data, and altering column: ${error}`);
      throw error;
    });
};

exports.down = function (knex) {
  return knex.schema.alterTable("collections", function (table) {
    table.dropColumn("slug");
		table.string("name").notNullable().alter();
  });
};
