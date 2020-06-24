# Job Tracker
This job tracker requires that PostgreSQL is installed on your computer. Download [here](https://www.postgresql.org/download/) or, if you have installed brew, use the brew formula below:
```
brew install postgresql
```

## How to use

### clone this repo
 ```
 git clone https://github.com/donovanrichardson/jobs-tracker.git
 cd jobs-tracker
 npm install
 ```
 
 ### initialize the database with knex start the back end server
 ```
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

 master the job search
