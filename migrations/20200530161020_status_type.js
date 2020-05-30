
exports.up = function(knex) {
    return knex.schema.createTable("status_type", table =>{
        table.integer("type_id").primary();
        table.string("name", 32).notNullable();
        table.text("desc").notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("status_type");
};
