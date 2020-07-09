const Job = require("../mongoose").Job;


//returns all jobs in db, with most recent status for each.
const readJobs = () =>{
    return Job.find().then(jobs=>{
        return jobs;
    })
}

module.exports = {readJobs}