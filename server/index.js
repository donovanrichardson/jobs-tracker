const express = require('express');
const app = express();
const cors = require("cors");
const port = 3000;
const bodyParser = require('body-parser');
const axios = require('axios').default;
const Import = require('./Import')
const Add = require('./Add')
const Read = require('./Read')

app.get('/', (req, res) => res.send('Hello World!'))
app.use(bodyParser.json());
app.use(cors())

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

app.post('/status', (req, res) =>{
    return Add.addStat({job_id: req.query.id, status_type:req.query.status}).then(jobstat=>{
        res.send(jobstat)
    })
    // res.send(req);
})

app.get('/jobs', (req, res) =>{
    return Read.readJobs().then(jobs=>{
        res.send(jobs)
    })
})

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports =app;