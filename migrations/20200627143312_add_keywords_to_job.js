
exports.up = function(knex) {
    return knex.schema.table('job', function(table) {
        table.text('keywords');
    });
    
  
};

exports.down = function(knex) {
    return knex.schema.table('job', function(table) {
        table.dropColumn('keywords');
    });
};
