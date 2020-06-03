
const neatCsv = require('neat-csv');
const fs = require('fs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('status_type').del()
    .then(function () {
      return neatCsv(fs.createReadStream('status_seed.csv'))})
    .then(csv =>{
      // Inserts seed entries
      return knex('status_type').insert(csv);
    })
};
