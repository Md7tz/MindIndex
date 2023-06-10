/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("collections", function (table) {
      table.specificType("full_text", "TSVECTOR");
    })
    .then(function () {
      return knex.raw(
        "CREATE INDEX collections_full_text_index ON collections USING GIN(full_text)"
      );
    })
    .then(function () {
      return knex.raw(`
          CREATE TRIGGER collections_full_text_trigger
          BEFORE INSERT OR UPDATE ON collections
          FOR EACH ROW EXECUTE FUNCTION tsvector_update_trigger(full_text, 'pg_catalog.english', name, description)
        `);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("collections", function (table) {
      table.dropColumn("full_text");
    })
    .then(function () {
      return knex.raw("DROP INDEX IF EXISTS collections_full_text_index");
    })
    .then(function () {
      return knex.raw(
        "DROP TRIGGER IF EXISTS collections_full_text_trigger ON collections"
      );
    });
};
