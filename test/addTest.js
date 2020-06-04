const assert = require('chai').assert;
const Add = require('../server/Add');
const config = require('../knexfile')["development"];
var knex = require('knex')(config);

//adding a location should be doable with one argument (name) or two arguments (location and parent)
//adding a location should fail(??) if the id (name) is the same

//the tests are not executed synchronously, and each location gets deleted so the locations have to be different in order to avoid inserting a job with a deleted loc
describe('add', () =>{

    describe('location', () =>{
        it('adds a location with two properties', (done) =>{
            Add.addLoc({location_id:'lol', parent:'loll'}).then(r=>{
                assert.equal('lol', r[0].location_id)
                done()
            }).catch(e =>{
                done(e)
            }).finally(async () =>{
               await knex('location').del().where({location_id:"lol"})
                // .then(rows => console.log(rows))
            })
        });
        it('adds a location with one property', done =>{
            Add.addLoc({location_id:'lmfao'}).then(r=>{
                assert.equal('lmfao', r[0].parent)
                // console.log(r)
                done()
            }).catch(e =>{
                done(e)
            }).finally(async () =>{
               await knex('location').del().where({location_id:"lmfao"})
                // .then(rows => console.log(rows))
            })
        });
        it('handles duplicate locations', done =>{
            Add.addLoc({location_id:'atlanta'}).then(res=>{
                // console.log(`res is ${res}`)
            }).then(()=>{
              return Add.addLoc({location_id:'atlanta'})})
            .then(res=>{
                assert.isFalse(res)
                done()
            }).catch(e =>{
                done(e)
            }).finally(async () =>{
               await knex('location').del().where({location_id:"atlanta"})
                // .then(rows => console.log(rows))
            })
        })
    });
    
    describe('job', async() =>{
         it('adds a job with all properties', done =>{
            Add.addLoc({location_id:'jobland'}).then(res=>{
            }).then(()=>{
                return Add.addJob({job_name:"thejob", location_id:"jobland",url:"job.com",desc:"descriptive",company:"the job company"})
            }).then(r=>{
                assert.equal(r[0].job_name, 'thejob')
                assert.equal(r[0].desc, 'descriptive')
                done()
            }).catch(e =>{
                done(e)
            }).finally(async () =>{
               await knex('location').del().where({location_id:"jobland"})
                // .then(rows => console.log(rows))
            })
        })
        it('adds a job without desc', done =>{
            Add.addLoc({location_id:'jobasia'}).then(res=>{
            }).then(()=>{
                return Add.addJob({job_name:"thejob", location_id:"jobasia",url:"job.com",company:"the job company"})
            }).then(r=>{
                assert.equal(r[0].job_name, 'thejob')
                assert.equal(r[0].desc, '')
                done()
            }).catch(e =>{
                done(e)
            }).finally(async () =>{
               await knex('location').del().where({location_id:"jobland"})
                // .then(rows => console.log(rows))
            })
        })
    })
})