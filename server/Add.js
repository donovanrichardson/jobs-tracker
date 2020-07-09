const Read = require("./Read")
const Job = require("../mongoose").Job;
const ObjectId = require('mongoose').Types.ObjectId; 

// adds a single job to DB
const addJob = j =>{
    return theJob = new Job(j).save().then(ins=>{
        // console.log(ins)
        return ins;
    })
}

//adds a status update for a job into the DB
const addStat = s => {
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

module.exports = {addJob, addStat}