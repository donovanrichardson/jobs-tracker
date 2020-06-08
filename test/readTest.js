const addTest = require('./addTest');
const Read = require('../server/Read');
const Add = require('../server/Add');

const addingStatuses = async (place, final) =>{
    return addTest.addingPlace(place).then(job=>{
        // console.log(`job is ${job.job_id}`)
        return Add.addStat({job_id:job.job_id,status_type:'1'} )
    }).then(s=>{
        return Add.addStat({job_id:s.job_id,status_type:'2'} )
    }).then(s=>{
        return Add.addStat({job_id:s.job_id,status_type:'3'} )
    }).then(s=>{
        return Add.addStat({job_id:s.job_id,status_type:'4'} )
    }).then(s=>{
        return Add.addStat({job_id:s.job_id,status_type:'5'} )
    }).then(s=>{
        return Add.addStat({job_id:s.job_id,status_type:'6'} )
    }).then(s=>{
        return Add.addStat({job_id:s.job_id,status_type:'12'} )
    }).then(s=>{
        return Add.addStat({job_id:s.job_id,status_type:'14'} )
    }).then(s=>{
        return Add.addStat({job_id:s.job_id,status_type:final} )
    }).then(s=>{
        return s;
    })
}

describe('read', () =>{
    it('reads jobs and statuses',() =>{
        addingStatuses('hogwarts', 20).then(a =>{
            console.log(a)
            return Read.readJobs();
        }).then(j=>{
            console.log(j)
        })
    })
})
