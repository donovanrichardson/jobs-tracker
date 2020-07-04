const config = require('../knexfile')["development"];
var knex = require('knex')(config);
const Read = require("./Read")
const { EnglishTokenizer, KeywordExtractor } = require("@agtabesh/keyword-extractor");
const ObjectId = require('mongoose').Types.ObjectId; 
const { Job } = require('../mongoose');


//produces keywords from each document.

const update = async ()=>{
    let jobs = await Read.readJobs();
    const tokenizer = new EnglishTokenizer()
    const keywordExtractor = new KeywordExtractor()
    keywordExtractor.setTokenizer(tokenizer)
    jobs.forEach((job, i) => {
        keywordExtractor.addDocument(i, job.desc)
      })
    let ud = jobs.map(job =>{
        kwd = keywordExtractor.extractKeywords(job.desc, {
            sortByScore: true,
            limit: 5
            }).map(e=>{
                return {keyword: e[0], score:e[1]}
            })
            // console.log(kwd)
                    //   console.log(job)
        return{_id: job._id, keywords:kwd};
    })
    // console.log(ud)
    // https://stackoverflow.com/a/48069213
    let upds = []
    ud.forEach(jobupdate => {
        let _id = new ObjectId(jobupdate._id)
        let kws = jobupdate.keywords
        Job.updateOne({_id:_id}, {$set:{keywords:kws}}).then(upd=>{
        });
    });
    return Job.find({},'name keywords').exec();
}

module.exports = {update}