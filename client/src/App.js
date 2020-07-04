import React, {Fragment, useEffect, useState, Component} from 'react'
import logo from './logo.svg';
import './App.css';
import 'react-filterable-table/dist/app.css';
const FilterableTable = require('react-filterable-table');
const JobForm = require('./Components/JobForm').default;  //.default? what?
const StatusForm = require('./Components/StatusForm').default;
const axios = require('axios').default;

// this one looks way less ugly https://ianwitherow.github.io/react-filterable-table/example/index.html





function App() {

  const [data, setData] = useState([]);
  
  //the fields that will appear in the table.
  const fields = [
    { name: 'job_name', displayName: "Title", inputFilterable: true, sortable: true },
    { name: 'company', displayName: "Company", inputFilterable: true, sortable: true },
    { name: 'location', displayName: "Location", inputFilterable: true, sortable: true },
    { name: 'keywords', displayName: "Keywords", inputFilterable: true, sortable: true },
    { name: 'status', displayName: "Job Status", inputFilterable: true, exactFilterable: true, sortable: true },
    { name: 'status_submit', displayName: "", inputFilterable: false, exactFilterable: false, sortable: false },
    
  ];

  // let stats = 
  // {"1": "listed",
  // "2": "applying",
  // "3": "applied",
  // "4": "first contact",
  // "5": "second contact",
  // "6": "third contact",
  // "12": "rejected",
  // "14": "no contact",
  // "20": "expired"}

  //returns a job title that links to the job listing
  const Job = ({name}) =>{
    return <a href={name.url}>{name.name}</a>
  }

  //retrieves job information from DB.
  const getData = async function() {
    try {

      axios.get('http://localhost:9000/jobs').then(r=>{
        // console.log(r)
        r.data.map((j)=>{
          let newstat = j.status[j.status.length - 1].type; /* relies on new status being pushed to the end */
          j.job_name = <Job name={{name: j.name, url:j.url}}></Job>;
          j.status = newstat;
          j.keywords = j.keywords.map(k=>k.keyword).join(' ')
          j.status_submit = <StatusForm id={j._id} status_type={newstat} />;
        })
        setData(r.data);
      });
        
        // console.log(jsonData)

    } catch (err) {
        console.error(err.message);
    }
}

const analyse = async(e) => {
  e.preventDefault() //prevents referesh
  try {
      const response = await axios.put('http://localhost:9000/analyse')
      window.location = "/"; 
  } catch (err) {
      console.error(err.message)
  }
}


useEffect(() => {
  getData();
}, []);

//returns a form for adding jobs and a table of all jobs.
  return (
    <div className="App">
      <h1>Job Tracker</h1>
      <h4>Insert job url below</h4>
      <JobForm submission={getData}></JobForm>
      <FilterableTable
      namespace="People"
      initialSort="name"
      data={data}
      fields={fields}
      noRecordsMessage="There are no jobs to display"
      noFilteredRecordsMessage="No jobs match your filters!" // this was from a template TODO
      />
      <button onClick={analyse}>Refresh</button>
    </div>
  );
}

export default App;
