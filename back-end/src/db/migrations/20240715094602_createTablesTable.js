
exports.up = function(knex) {
    return knex.schema.createTable("tables", (table) => {
        table.increments("tables_id").primary();
        table.string("table_name").notNullable();
        table.string("table_state");
        table.integer("table_capacity").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("reservations");
};
