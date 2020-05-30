
exports.up = function(knex) {
  return knex.schema.createTable("location", table =>{
      table.increments("location_id");
      table.string("location_name", 255).notNullable();
      table.integer("parent").notNullable().unsigned().references("location_id");
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("location");
};
