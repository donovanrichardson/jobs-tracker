# Job Tracker

This is a job tracker web app that can run on your local machine. It takes job listing information from the Internet, and allows you to record your progress in a job application on your local PostgreSQL database.

Want to contribute? See [CONTRIBUTING.md](CONTRIBUTING.md)

## First time setup

Make sure you have [Node.js](https://nodejs.org/en/) installed.

This job tracker also requires that PostgreSQL is installed on your computer. Download [here](https://www.postgresql.org/download/) or, if you have installed brew, use the brew formula below:
```
brew install postgresql
```

Clone this repo, install dependencies with npm, initialize database with knex
 
 ```
 git clone https://github.com/donovanrichardson/jobs-tracker.git
 cd jobs-tracker
 npm install
 knex migrate:latest
 cd client
 npm install
 ```
 
 ## How to use

 ### Start the servers

 Initialize the database with knex and start the back end server from the directory `jobs-tracker`
 ```
 npm start
 ```

 Then start the front end webpage in a new terminal, in the directory `jobs-tracker/client`

 ```
 npm start
 ```

 Then open `localhost:3000` in your web browser

 ### Master the job search

 #### Add a job using its Indeed URL
 ![Enter the job's URL using the text box on top, and click "Add" to add the job.](add.gif)

 #### Sort columns
 ![Sort columns by clicking the arrows on their headers](sorting.gif)

 #### Analyze each job description to find keywords
![Analyze job descriptions by clicking "Refresh"](analyze.gif)

 #### Change the status of a job
 ![Choose a status from the dropdown menu on the right-hand side, then click "Submit"](status.gif)

 Happy job searching!
