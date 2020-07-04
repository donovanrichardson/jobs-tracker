const cheerio = require('cheerio');
const fs = require('fs');
const util = require('util');
const { doesNotMatch } = require('assert');
const readFile = util.promisify(fs.readFile);
const htt = require('html-to-text')
const Import = require('../server/Import')
const Add = require('../server/Add')
const Job = require("../mongoose").Job;

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

describe('import', function(){
    this.timeout(10000);
    var job = ''
    it('scrapes info from the page and adds it', (done)=>{
        let page = readFile('./sample-job.html', 'utf8').then(file=>{
            return Import.grabIndeed(file,"example-url")
        }).then(forInsert =>{
            console.log(Object.keys(forInsert).join() + "INSERT")
            return Add.addJob(forInsert)
        }).then(inserted =>{
            job = inserted._id
            done()
          
        }).catch(e=>{
            console.error(e)
        }).finally(()=>{
            
            Job.deleteMany().where({location:"Dallas, TX"}).exec()
        })
        

    })
})
