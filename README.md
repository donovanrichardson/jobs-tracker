# Job Tracker

This is a job tracker web app that can run on your local machine. It takes job listing information from the Internet, and allows you to record your progress in a job application on your local Mongo database.

Want to contribute? See [CONTRIBUTING.md](CONTRIBUTING.md).

## First time setup

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) installed.

This job tracker also requires that MongoDB is installed on your computer. See [here](https://docs.mongodb.com/manual/installation/) for more information on how to download MongoDB.

Clone this repo and install dependencies with npm
 
 ```
 git clone https://github.com/donovanrichardson/jobs-tracker.git
 cd jobs-tracker
 npm install
 cd client
 npm install
 ```
 
 ## How to use

 ### Start the servers

Start the back end server from the directory `jobs-tracker`
 ```
 npm start
 ```

 Then start the front end webpage in a new terminal, in the directory `jobs-tracker/client`

 ```
 npm start
 ```

 Then open `localhost:3000` in your web browser

 ### Master the job search

 #### Add a job using its URL. (Currently supports LinkedIn and Indeed)
 ![Enter the job's URL using the text box on top, and click "Add" to add the job.](https://live.staticflickr.com/65535/50055749502_9e9779d7c6_o.gif)

 #### Sort columns
 ![Sort columns by clicking the arrows on their headers](https://live.staticflickr.com/65535/50055749797_e99459c583_o.gif)

 #### Analyse each job description to find keywords
![Analyse job descriptions by clicking "Refresh"](https://live.staticflickr.com/65535/50054925993_7e30537c91_o.gif)

 #### Change the status of a job
 ![Choose a status from the dropdown menu on the right-hand side, then click "Submit"](https://live.staticflickr.com/65535/50055504601_e728d08eb2_o.gif)

 Happy job searching!
