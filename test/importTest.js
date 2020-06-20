const cheerio = require('cheerio');
const fs = require('fs');
const util = require('util');
const { doesNotMatch } = require('assert');
const readFile = util.promisify(fs.readFile);
const htt = require('html-to-text')
const Import = require('../server/Import')
const Add = require('../server/Add')
const config = require('../knexfile')["development"];
var knex = require('knex')(config);

const grab = (html, css) =>{
    let res = cheerio.load(html)(css).text()
    return res;
    
}

const grabDesc = (html, css) =>{
    let elements = cheerio.load(html)(`${css} *`)
    let res = elements.contents().map(function() {
        return (this.type === 'text') ? cheerio.load(html)(this).text()+' ' : '';
    }).get().join('');
    return res;
    
}

const grabDesc2 = (html, css) =>{
    let elements = cheerio.load(html)(css)
    let res = elements.html()
    return htt.fromString(res);
}

function grab2(html, css) {
    const cheerioStatic= cheerio.load(html);
  
    return cheerioStatic(css).contents().map(element => element.type === 'text' ? cheerioStatic(element).text().trim() : null)
      .filter(text => text)
      .join(' ');
  }

//   var t = $('html *').contents().map(function() {
//     return (this.type === 'text') ? $(this).text()+' ' : '';
// }).get().join('');

describe('import', function(){
    this.timeout(10000);
    var job = ''
    it('scrapes info from the page and adds it', (done)=>{
        let page = readFile('./sample-job.html', 'utf8').then(file=>{
            return Import.grabIndeed(file,"example-url")
        }).then(forInsert =>{
            return Add.addJob(forInsert)
        }).then(inserted =>{
            job = inserted.job_id
            
            // console.log(inserted.job_id)
            done()
        
            // console.log(grab(file, "div.icl-u-lg-mr--sm:nth-child(1)"));// returns ADB Companies
            // console.log(grab(file, ".jobsearch-InlineCompanyRating > div:nth-child(3)"));// returns Dallas, TX
            // console.log(grab(file, "span.icl-u-xs-mr--xs"));// returns pay
            // console.log(grab(file, ".icl-u-xs-mb--xs"));// returns title
            // console.log(grabDesc2(file, "#jobDescriptionText"));// returns description
            // console.log(grab(file, "#jobDescriptionText > ul:nth-child(43)"));// returns description
        }).catch(e=>{
            console.error(e)
        }).finally(()=>{
            console.log(`job is ${job}`)
            return knex('job').del().where({job_id:job})
        })
        // console.log(page)

    })
})

// ^([^/]*?)console