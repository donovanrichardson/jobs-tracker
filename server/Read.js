const config = require('../knexfile')["development"];
var knex = require('knex')(config);


//returns all jobs in db, with most recent status for each.
const readJobs = () =>{
    return knex.raw('select job.*, status.*, status_type.name as status_name, status_type.desc from job left join status on job.job_id = status.job_id left join status_type on status.status_type = status_type.type_id right join (select job_id, max(as_of) as as_of from status group by job_id) as s2 on status.job_id = s2.job_id and status.as_of = s2.as_of order by status.as_of desc').then(j =>{
        return j.rows;
    })
}

//gets jobs filtered by status.
const readJobsByStatus = s =>{
    let query = knex.raw('select job.*, status.* from job left join status on job.job_id = status.job_id right join (select job_id, max(as_of) as as_of from status group by job_id) as s2 on status.job_id = s2.job_id and status.as_of = s2.as_of where status.status_type = ? order by status.as_of desc', s);
    return query.then(j =>{
        return j.rows;
    })
}

//gets one job by job_id
const readOneJob = job_id =>{
    // console.log(`the jobid is ${job_id}`)
    return knex.raw('select job.*, status.* from job left join status on job.job_id = status.job_id right join (select job_id, max(as_of) as as_of from status group by job_id) as s2 on status.job_id = s2.job_id and status.as_of = s2.as_of where job.job_id = ? order by status_id desc', job_id).then(j =>{
        return j.rows[0];
    })
}

module.exports = {readJobs, readJobsByStatus, readOneJob}