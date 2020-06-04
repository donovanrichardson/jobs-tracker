
exports.up = function(knex) {
    return knex.schema.createTable("job", table => {
        table.increments("job_id");
        table.string("job_name", 255).notNullable();
        table.string("location_id", 255).references("location.location_id").onUpdate('cascade').onDelete('cascade');
        table.text("url").notNullable();
        table.text("desc").notNullable();
        table.string("company", 255).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("job");
};
