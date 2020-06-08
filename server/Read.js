const config = require('../knexfile')["development"];
var knex = require('knex')(config);

const readJobs = () =>{
    return knex.raw('select job.*, status.* from job left join status on job.job_id = status.job_id right join (select job_id, max(as_of) as as_of from status group by job_id) as s2 on status.job_id = s2.job_id and status.as_of = s2.as_of').then(j =>{
        return j.rows;
    })
}

module.exports = {readJobs}