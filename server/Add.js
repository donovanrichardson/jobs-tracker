const config = require('../knexfile')["development"];
var knex = require('knex')(config);
const Read = require("./Read")

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
    let thejob = j;
    // console.log(thejob)
    thejob.desc = thejob.desc || '';
    // knex('location').select().where({location_id: thejob.location_id}).then(j=>{
    //     console.log()
    // })
    return addLoc(thejob).then(r =>{
        // console.log(r)
        // console.log(`job in addjob is ${r[0].job_id}`)
        return knex('job').insert(thejob, '*');
    }).then(job=>{
        let thisJob = job[0] //equivalent to thejob
        let newStatus = 
        {   job_id:thisJob.job_id,
            status_type: 1
        }
        return addStat(newStatus)//the status is added
    }).then(s=>{
        // console.log(`jobid in add ${s.job_id}`)
        return Read.readOneJob(s.job_id)
    }).then(statjob=>{
        // console.log(statjob)
        return statjob; //the status id etc is returned
    }).catch(e=>{
       console.error(e)
    })
}

// switching from next to await... such good practice....

//adds a status update for a job into the DB
const addStat = async s => {
    let stat = await knex('status').insert(s,'*')
    // console.log(stat)
    return await Read.readOneJob(s.job_id)
}

module.exports = {addLoc, addJob, addStat}