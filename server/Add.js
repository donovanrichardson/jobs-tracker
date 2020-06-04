const config = require('../knexfile')["development"];
var knex = require('knex')(config);

const addLoc = l =>{
    // console.log(l.location_id, l.parent);
   return knex('location').insert({location_id:l.location_id, parent:(l.parent || l.location_id)}, '*').then(r=>{
       return r;
   }).catch(e=>{
       if(e.code == '23505'){
           return false;
       }else console.error(e);
   })
}

const addJob = j =>{
    let thejob = j;
    thejob.desc = thejob.desc || '';
    return knex('job').insert(thejob, '*').then(r =>{
        // console.log(r)
        return r;
    })
}

module.exports = {addLoc, addJob}