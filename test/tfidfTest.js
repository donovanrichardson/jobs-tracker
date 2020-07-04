const cheerio = require('cheerio');
const fs = require('fs');
const util = require('util');
const { doesNotMatch } = require('assert');
const readFile = util.promisify(fs.readFile);
const htt = require('html-to-text')
const Import = require('../server/Import')
const Add = require('../server/Add')
const Tfidf = require('../server/Tfidf')

describe('top terms', ()=>{
    it('gets the top terms', async ()=>{
        // console.log( await Tfidf.update())
    })
})