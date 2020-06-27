const config = require('../knexfile')["development"];
var knex = require('knex')(config);
const Read = require("./Read")
const { EnglishTokenizer, KeywordExtractor } = require("@agtabesh/keyword-extractor");


//produces keywords from each document.

const update = async ()=>{
    let jobs = await knex('job').select('job_id', 'desc');
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
            }).map(e=>e[0]).join(' ')
            // console.log(kwd)
                    //   console.log(job)
        return{job_id: job.job_id, keywords:kwd};
    })
    // console.log(ud)
    // https://stackoverflow.com/a/48069213
    return knex.transaction(trx => {
        const queries = [];
        ud.forEach(jobupdate => {
            const query = knex('job')
                .where('job_id', jobupdate.job_id)
                .update({
                    keywords: jobupdate.keywords
                }, ['job_id', 'keywords'])
                .transacting(trx); // This makes every update be in the same transaction
            queries.push(query);
            // console.log(query.toString())
        });
    
        Promise.all(queries) // Once every query is written
            .then(trx.commit).then(resp=>{
                // console.log(resp)
            }) // We try to execute all of them
            .catch(trx.rollback); // And rollback in case any of them goes wrong
    });
    
 
        
        
  

    //     // console.log(ud)
    //     return ud;        
    // })

    // console.log(res)
}

module.exports = {update}