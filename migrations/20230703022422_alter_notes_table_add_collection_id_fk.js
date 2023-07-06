/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.alterTable("notes", function (table) {
		table
			.bigInteger("collection_id")
			.unsigned()
			.references("id")
			.inTable("collections")
			.onDelete("CASCADE")
			.index();
	});
};
/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function (knex) {
	return knex.schema.alterTable("notes", function (table) {
		table.dropForeign("collection_id");
		table.dropColumn("collection_id");
	});
};
