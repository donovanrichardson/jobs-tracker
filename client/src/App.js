import React, {Fragment, useEffect, useState, Component} from 'react'
import logo from './logo.svg';
import './App.css';
const FilterableTable = require('react-filterable-table');
const JobForm = require('./Components/JobForm').default;  //.default? what?
const axios = require('axios').default;

// this one looks way less ugly https://ianwitherow.github.io/react-filterable-table/example/index.html





function App() {

  const [data, setData] = useState([]);
  
  //the fields that will appear in the table.
  const fields = [
    { name: 'job_name', displayName: "Title", inputFilterable: true, sortable: true },
    { name: 'company', displayName: "Company", inputFilterable: true, sortable: true },
    { name: 'location_id', displayName: "Location", inputFilterable: true, sortable: true },
    // { name: 'keywords', displayName: "Keywords", inputFilterable: true, sortable: true },
    { name: 'status_name', displayName: "Job Status", inputFilterable: true, exactFilterable: true, sortable: true },
  ];

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
          j.job_name = <Job name={{name: j.job_name, url:j.url}}></Job>
        })
        setData(r.data);
      });
        
        // console.log(jsonData)

    } catch (err) {
        console.error(err.message);
    }
}

useEffect(() => {
  getData();
}, []);

//returns a form for adding jobs and a table of all jobs.
  return (
    <div className="App">
      <JobForm submission={getData}></JobForm>
      <FilterableTable
      namespace="People"
      initialSort="name"
      data={data}
      fields={fields}
      noRecordsMessage="There are no people to display"
      noFilteredRecordsMessage="No people match your filters!"
      />
      <button onClick={getData}>Refresh</button>
    </div>
  );
}

export default App;
