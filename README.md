# Job Tracker

Want to contribute? See [CONTRIBUTING.MD](CONTRIBUTING.MD)

Make sure you have [Node.js](https://nodejs.org/en/) installed.

This job tracker also requires that PostgreSQL is installed on your computer. Download [here](https://www.postgresql.org/download/) or, if you have installed brew, use the brew formula below:
```
brew install postgresql
```

## How to use

### start the back end server
 ```
 git clone https://github.com/donovanrichardson/jobs-tracker.git
 cd jobs-tracker
 npm install
 knex migrate:latest
 ...
 npm start
 ```

 ### then start the front end webpage in a new terminal
 from `jobs-tracker` directory:

 ```
 cd client
 npm install
 ...
 npm start
 ```

 then open `localhost:3000` in your web browser

 ### master the job search

 #### add a job using its indeed url
 ![Enter the job's URL using the text box on top, and click "Add" to add the job.](add.gif)

 #### sort columns
 ![Sort columns by clicking the arrows on their headers](sorting.gif)

 #### analyze each job description to find keywords
![Analyze job descriptions by clicking "Refresh"](analyze.gif)

 #### change the status of a job
 ![Choose a status from the dropdown menu on the right-hand side, then click "Submit"](status.gif)
