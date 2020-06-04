
exports.up = function(knex) {
    return knex.schema.createTable("status", table =>{
        table.increments("status_id");
        table.integer("job_id").unsigned().notNullable().references("job.job_id").onUpdate('cascade').onDelete('cascade');
        table.integer("status_type").notNullable().references("status_type.type_id");
        table.timestamp("as_of").notNullable().defaultTo(knex.fn.now())
        table.text("notes")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("status");
  
};
