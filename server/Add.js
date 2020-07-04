const config = require('../knexfile')["development"];
var knex = require('knex')(config);
const Read = require("./Read")
const Job = require("../mongoose").Job;
const ObjectId = require('mongoose').Types.ObjectId; 

//adds a single location to DB
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

// adds a single job to DB
const addJob = j =>{
    return theJob = new Job(j).save().then(ins=>{
        // console.log(ins)
        return ins;
    })
}

// switching from next to await... such good practice....

//adds a status update for a job into the DB
const addStat = async s => {
    // console.log(s)
    return Job.findOne(new ObjectId(s._id)).then(j=>{
        j.status.push({type:s.type})
        return j.save()
    }).then(s=>{
        return s
    }).catch(e=>{
        console.error(e)
    })
}

module.exports = {addLoc, addJob, addStat}