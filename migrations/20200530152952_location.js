
exports.up = function(knex) {
  return knex.schema.createTable("location", table =>{
      table.string("location_id", 255).primary();
      table.string("parent", 255).notNullable().references("location_id");
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("location");
};
