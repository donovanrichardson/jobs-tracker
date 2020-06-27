const express = require('express');
const app = express();
const cors = require("cors");
const port = 3000;
const bodyParser = require('body-parser');
const axios = require('axios').default;
const Import = require('./Import')
const Add = require('./Add')
const Read = require('./Read')
const Tfidf = require('./Tfidf')

app.get('/', (req, res) => res.send('Hello World!'))
app.use(bodyParser.json());
app.use(cors())

// imports job listing to DB based on url given in req.body.url
app.post('/import', (req, res) =>{
    // console.log(req.body.url)
    axios.get(req.body.url).then(p =>{
        return Add.addJob(Import.grabIndeed(p.data,req.body.url))
        // console.log()
        // res.send(p.data)
    }).then(job=>{
        res.send(job)
    }).catch(e=>{
        console.error(e)
    })
    // res.send(req);
})

//posts a status update for a job listing based on request parameters
app.post('/status', (req, res) =>{
    return Add.addStat({job_id: req.query.id, status_type:req.query.status}).then(jobstat=>{
        res.send(jobstat)
    })
    // res.send(req);
})

//gets all jobs in DB.
app.get('/jobs', (req, res) =>{
    return Read.readJobs().then(jobs=>{
        res.send(jobs)
    })
})

app.put('/analyse', (req, res) =>{
    return Tfidf.update().then(kwds=>{
        res.send(kwds)
    })
})

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports =app;