const assert = require('chai').assert;
const addTest = require('./addTest');
const Read = require('../server/Read');
const Add = require('../server/Add');
const config = require('../knexfile')["development"];
var knex = require('knex')(config);

// const addingStatuses = async (place, final) =>{
//     return addTest.addingPlace(place).then(job=>{
//         // console.log(`job is ${job.job_id}`)
//         return Add.addStat({job_id:job.job_id,status_type:'1'} )
//     }).then(s=>{
//         return Add.addStat({job_id:s.job_id,status_type:'2'} )
//     }).then(s=>{
//         return Add.addStat({job_id:s.job_id,status_type:'3'} )
//     }).then(s=>{
//         return Add.addStat({job_id:s.job_id,status_type:'4'} )
//     }).then(s=>{
//         return Add.addStat({job_id:s.job_id,status_type:'5'} )
//     }).then(s=>{
//         return Add.addStat({job_id:s.job_id,status_type:'6'} )
//     }).then(s=>{
//         return Add.addStat({job_id:s.job_id,status_type:'12'} )
//     }).then(s=>{
//         return Add.addStat({job_id:s.job_id,status_type:'14'} )
//     }).then(s=>{
//         return Add.addStat({job_id:s.job_id,status_type:final} )
//     }).then(s=>{
//         return s;
//     })
// }

// describe('read', () =>{
//     it('reads jobs and statuses newest-to-oldest',(done) =>{
//         let inserted;
//         addingStatuses('hogwarts', 20).then(a =>{
//             inserted = a
//             return Read.readJobs();
//         }).then(j=>{
//             let queried = j[0];
//             assert.equal(queried.status_id, inserted.status_id);
//             assert.equal(queried.job_id, inserted.job_id);
//             assert.equal(queried.status_type, inserted.status_type);
//             assert.equal(queried.status_type, 20);
//             // console.log(queried.as_of.getTime())
//             // console.log(inserted.as_of.getTime())
//             assert.equal(queried.as_of.getTime(), inserted.as_of.getTime());
//             assert.equal(queried.notes, inserted.notes);
//             done()
//             // console.log(j)
//         }).catch(e=>{
//             done(e)
//         }).finally(async ()=>{
//             await knex('location').del().where({location_id:"hogwarts"});
//         })
//     })
//     //TODO
//     it('reads jobs newest-to-oldest by status', (done) =>{
//         addingStatuses('pluto', 20).then(ins =>{
//             return Read.readJobsByStatus(20)
//         }).then(q =>{
//             assert.equal(q[0].status_type, 20)
//             done()
//         }).catch(e=>{
//             console.error(e)
//             done(e)
//         }).finally(async ()=>{
//             await knex('location').del().where({location_id:"pluto"});
//         })
//     })
// })
