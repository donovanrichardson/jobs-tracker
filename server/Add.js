const config = require('../knexfile')["development"];
var knex = require('knex')(config);
const Read = require("./Read")

//adds a single location
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

// adds a singlle job
const addJob = j =>{
    let thejob = j;
    // console.log(thejob)
    thejob.desc = thejob.desc || '';
    return knex('job').insert(thejob, '*').then(r =>{
        console.log(r)
        // console.log("whet")
        console.log(`job in addjob is ${r[0].job_id}`)
        return r;
    }).then(job=>{
        let thisJob = job[0] //equivalent to thejob
        // console.log(thisJob)
        let newStatus = 
        {   job_id:thisJob.job_id,
            status_type: 1
        }
        // console.log(newStatus)
        return addStat(newStatus)//the status is added
    }).then(s=>{
        console.log(`jobid in add ${s.job_id}`)
        return Read.readOneJob(s.job_id)
    }).then(statjob=>{
        console.log(statjob)
        return statjob; //the status id etc is returned
    }).catch(e=>{
        if(e.code == '23503'){
            addLoc({location_id:j.location_id}).then(()=>{
                return addJob(j)
            })
        }
    })
}

// switching from next to await... such good practice....

const addStat = async s => {
    let stat = await knex('status').insert(s,'*')
    // console.log(stat)
    return stat[0]
}

module.exports = {addLoc, addJob, addStat}