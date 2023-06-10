/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("notes", function (table) {
      table.specificType("full_text", "TSVECTOR");
    })
    .then(function () {
      return knex.raw(
        "CREATE INDEX notes_full_text_index ON notes USING GIN(full_text)"
      );
    })
    .then(function () {
      return knex.raw(`
            CREATE TRIGGER notes_full_text_trigger
            BEFORE INSERT OR UPDATE ON notes
            FOR EACH ROW EXECUTE FUNCTION tsvector_update_trigger(full_text, 'pg_catalog.english', title, body)
          `);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("notes", function (table) {
      table.dropColumn("full_text");
    })
    .then(function () {
      return knex.raw("DROP INDEX IF EXISTS notes_full_text_index");
    })
    .then(function () {
      return knex.raw(
        "DROP TRIGGER IF EXISTS notes_full_text_trigger ON notes"
      );
    });
};
