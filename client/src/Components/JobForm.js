import React, {Fragment, useState} from "react";

function JobForm({submission}) {

    const [url, setUrl] = useState("");

    //inserts job provided by URL into database, refreshes the page to show any new jobs
    const onSubmitForm = async(e) => {
        e.preventDefault() //prevents referesh
        try {
            const body = {url: url}
            const response = await fetch("http://localhost:9000/import", {
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/"; //perhaps use submission function which merely changes state of App.js, hopefully refreshing the table.
        } catch (err) {
            console.error(err.message)
        }
    }

    return(
        <Fragment>
            {/* <h1 className="text-center mt-5 ">Pern Todo List</h1> */}
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    className = "form-control" 
                    value={url} 
                    onChange={e=> setUrl(e.target.value)}/>
                <button className = "btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default JobForm;