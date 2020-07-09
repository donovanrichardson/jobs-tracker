import React, {Fragment, useState} from "react";

//allows user to update status
function StatusForm(props){

    const [stat, setStat] = useState(props.status_type)

    const handleChange = (e) => {

        setStat(e.target.value);

    }

    const handleSubmit = async(e) => {
        e.preventDefault() //prevents referesh
        try {
            let url = `http://localhost:9000/status?id=${props.id}&status=${stat}`;
            // console.log(url)
            const response = await fetch(url, {
                method:"POST"
            });
            window.location = "/"; //perhaps use submission function which merely changes state of App.js, hopefully refreshing the table.
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
          <label>
            <select value={stat} onChange={handleChange}>
              <option value="1">Listed</option>
              <option value="2">Applying</option>
              <option value="3">Applied</option>
              <option value="4">1st Contact</option>
              <option value="5">2nd Contact</option>
              <option value="6">3rd Contact</option>
              <option value="12">Rejected</option>
              <option value="14">No Contact</option>
              <option value="20">Expired</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );

}

export default StatusForm;