const cheerio = require('cheerio');
const fs = require('fs');
const util = require('util');
const { doesNotMatch } = require('assert');
const readFile = util.promisify(fs.readFile);
const htt = require('html-to-text')



//gets text based on an html object and a css selector
const grab = (html, css) =>{
    let res = cheerio.load(html)(css).text()
    return res;
    
}

//gets text with line breaks for a job description based on html object and css selector
const grabDesc = (html, css) =>{
    let elements = cheerio.load(html)(css)
    let res = elements.html()
    return htt.fromString(res);
}

//gets job details from an Indeed job listing
const grabIndeed = (html, url) =>{
    return {
        name: grab(html, ".icl-u-xs-mb--xs"),
        location: grab(html, ".jobsearch-InlineCompanyRating > div:nth-child(3)"),
        url: url,
        desc: grabDesc(html, "#jobDescriptionText"),
        company: grab(html, "div.icl-u-lg-mr--sm:nth-child(1)")
    };

}

module.exports= {grabIndeed};