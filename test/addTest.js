const assert = require('chai').assert;
const Add = require('../server/Add');
const config = require('../knexfile')["development"];
var knex = require('knex')(config);

const addingPlace = async p =>{

    // Add.addLoc({location_id:'seoul'}).then(()=>{
    //     return Add.addJob({job_name:"thejob", location_id:"seoul",url:"job.com",desc:"descriptive",company:"the job company"})
    // }).then(()=>{

    // })
    await Add.addLoc({location_id:p});
    await Add.addJob({job_name:"thejob", location_id:p,url:"job.com",desc:"descriptive",company:"the job company"});
    rez = await knex('job').select().where({location_id:p});
    // console.log(rez[0])
    return rez[0];
}



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
               await knex('location').del().where({location_id:"jobland"});
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
               await knex('location').del().where({location_id:"jobasia"})
                // .then(rows => console.log(rows))
            })
        })
        it('auto-adds a new location in a job',done=>{
            Add.addJob({job_name:"thejob", location_id:"herculaneum",url:"job.com",company:"the job company"}).then(j=>{
                console.log(j)
                done()
            }).catch(e=>{
                console.error(e)
                done(e)
            }).finally(async()=>{
                await knex('location').del().where({location_id:"herculaneum"})
            })
        })
    })

    describe('status', async() =>{
        return it('adds a status to a job', async () =>{
            return addingPlace('seoul').then(job=>{
                // console.log(`job is ${job.job_id}`)
                return Add.addStat({job_id:job.job_id,status_type:'1'} )
            }).then(s=>{
                assert.equal(s.status_type, 1)
                return Add.addStat({job_id:s.job_id,status_type:'2'} )
            }).then(s=>{
                assert.equal(s.status_type, 2)
                return Add.addStat({job_id:s.job_id,status_type:'3'} )
            }).then(s=>{
                assert.equal(s.status_type, 3)
                return Add.addStat({job_id:s.job_id,status_type:'4'} )
            }).then(s=>{
                assert.equal(s.status_type, 4)
                return Add.addStat({job_id:s.job_id,status_type:'5'} )
            }).then(s=>{
                assert.equal(s.status_type, 5)
                return Add.addStat({job_id:s.job_id,status_type:'6'} )
            }).then(s=>{
                assert.equal(s.status_type, 6)
                return Add.addStat({job_id:s.job_id,status_type:'12'} )
            }).then(s=>{
                assert.equal(s.status_type, 12)
                return Add.addStat({job_id:s.job_id,status_type:'14'} )
            }).then(s=>{
                assert.equal(s.status_type, 14)
                return Add.addStat({job_id:s.job_id,status_type:'20'} )
            }).then(s=>{
                assert.equal(s.status_type, 20)
                return Add.addStat({job_id:s.job_id,status_type:'222'} )
            }).catch(e=>{
                assert.equal(e.detail, 'Key (status_type)=(222) is not present in table "status_type".')
            }).finally(async ()=>{
                await knex('location').del().where({location_id:"seoul"}); //either return or await here will ensure that this is executed
            })
            // job = await addingSeoul().job_id;
            // stattus = await Add.addStat({job_id:job,status_type:'1'} )
            // console.log(stattus)
            // await knex('location').del().where({location_id:"seoul"});
        })
    })
})

module.exports = {addingPlace}