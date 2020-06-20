const config = require('../knexfile')["development"];
var knex = require('knex')(config);

const readJobs = () =>{
    return knex.raw('select job.*, status.* from job left join status on job.job_id = status.job_id right join (select job_id, max(as_of) as as_of from status group by job_id) as s2 on status.job_id = s2.job_id and status.as_of = s2.as_of order by status.as_of desc').then(j =>{
        return j.rows;
    })
}

const readJobsByStatus = s =>{
    let query = knex.raw('select job.*, status.* from job left join status on job.job_id = status.job_id right join (select job_id, max(as_of) as as_of from status group by job_id) as s2 on status.job_id = s2.job_id and status.as_of = s2.as_of where status.status_type = ? order by status.as_of desc', s);
    return query.then(j =>{
        return j.rows;
    })
}

const readOneJob = job_id =>{
    // console.log(`the jobid is ${job_id}`)
    return knex.raw('select job.*, status.* from job left join status on job.job_id = status.job_id right join (select job_id, max(as_of) as as_of from status group by job_id) as s2 on status.job_id = s2.job_id and status.as_of = s2.as_of where job.job_id = ? order by status_id desc', job_id).then(j =>{
        return j.rows[0];
    })
}

module.exports = {readJobs, readJobsByStatus, readOneJob}