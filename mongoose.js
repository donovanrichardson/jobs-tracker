// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Connecting_to_MongoDB
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/jobs';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let Schema = mongoose.Schema;

let StatusSchema = new Schema({
    type: { type: Number, min: 0, max: 20, required: true, default: 1 },
    as_of: { type: Date, default: Date.now() },
});

let KeywordSchema = new Schema({
    keyword: String,
    score: Number
});

let JobSchema = new Schema({
    name: String,
    location: String,
    url: String,
    desc: String,
    company: String,
    status: { type: [StatusSchema],required: true, default: () => ({})},
    keywords:[KeywordSchema]
});

let Job = db.model("job", JobSchema)

// let example = new Job({name: "thejob", location: 'nyc', url:'job.com', desc:'long', company:'apple'});
// example.save().then(r=>{
//     console.log(r);
//     r.status.push({type: 2}) //maybe put at front of array
//     return r.save()
// }).then(added=>{
//     console.log(added)
// })

// Job.find().then(jobs=>{
//     // console.log(jobs)
//     // console.log(jobs.map(j=>j.status))
//     console.log(jobs.map(j=>j.location))
// })

// Job.find().then(jobs=>{
//     console.log(jobs.map(j=>{
//         return j.location
//     }))
// })
// Job.deleteMany({location:''}).then(del=>{
//     console.log(del.deletedCount)
// })


// let example2 = ({name: "thejob", location: 'nyc', url:'job.com', desc:'long', company:'apple', status: new StatusSchema});

module.exports = {Job, db};