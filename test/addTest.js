const assert = require('chai').assert;
const Add = require('../server/Add');
const config = require('../knexfile')["development"];
var knex = require('knex')(config);
const Read = require('../server/Read');
const Job = require('../mongoose').Job;


//adding a location should be doable with one argument (name) or two arguments (location and parent)
//adding a location should fail(??) if the id (name) is the same

//the tests are not executed synchronously, and each location gets deleted so the locations have to be different in order to avoid inserting a job with a deleted loc
describe('add', () =>{
    
    describe('job', async() =>{
        it('adds a job with a location', () =>{
            return Add.addJob({name:"thejob", location:"jobbia",url:"job.com",desc:"descriptive",company:"the job company"})
            .then(r=>{
                assert.equal(r.name, 'thejob')
                assert.equal(r.desc, 'descriptive')
                // done()
            }).catch(e =>{
                // done(e)
                console.error(e)
            }).finally( () =>{
                Job.deleteMany({"location":"jobbia"}, function(err, resp){console.log(resp)}).exec()
                // .then(rows => console.log(rows))
            })
        })
    })

    describe('status', async() =>{
        return it('adds a status to a job', async () =>{
            return Add.addJob({name:"thejob", location:"jobland",url:"job.com",desc:"descriptive",company:"the job company"})
            .then(job=>{
                // console.log(`job is ${job.job_id}`)
                return Add.addStat({_id:job._id,type:'1'} )
            }).then(s=>{
                assert.equal(s.type, 1)
                return Add.addStat({_id:s.job_id,type:'2'})
            }).then(s=>{
                assert.equal(s.type, 1)
                return Add.addStat({_id:s.job_id,type:'3'})
            }).then(s=>{
                assert.equal(s.type, 1)
                return Add.addStat({_id:s.job_id,type:'4'})
            }).then(s=>{
                assert.equal(s.type, 1)
                return Add.addStat({_id:s.job_id,type:'5'})
            }).then(s=>{
                assert.equal(s.type, 1)
                return Add.addStat({_id:s.job_id,type:'6'})
            }).then(s=>{
                assert.equal(s.type, 1)
                return Add.addStat({_id:s.job_id,type:'12'})
            }).then(s=>{
                assert.equal(s.type, 1)
                return Add.addStat({_id:s.job_id,type:'14'})
            }).then(s=>{
                assert.equal(s.type, 1)
                return Add.addStat({_id:s.job_id,type:'20'})
            }).catch(e=>{
                // assert.equal(e.detail, 'Key (status_type)=(222) is not present in table "status_type".') //todo
            }).finally( ()=>{
                Job.deleteMany({"location":"jobland"}, function(err, resp){console.log(resp)}).exec()
             //either return or await here will ensure that this is executed
            })
            // job = await addingSeoul().job_id;
            // stattus = await Add.addStat({job_id:job,status_type:'1'} )
            // console.log(stattus)
            // await knex('location').del().where({location_id:"seoul"});
        })
        // it('adds job with default status', done =>{
            //done above
        // })

// module.exports = {addingPlace}
    })

})