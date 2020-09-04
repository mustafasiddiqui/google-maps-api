This API is based on a database with locations around the LA area stored in it.

 The API takes a zip code and finds locations in proximity to that zip code and returns them.  These locations can then be used in a map in a client.

Instructions

1. Before beginning, you will need to have a DB username/password supplied to you in order for your api to be able to retrieve locations.  The assumption is that you have already have an API key for Google Maps Javascript API

2. Clone this repository into a folder

3. Create .env file in folder with the following:
    - GOOGLE_MAPS_API_KEY=<your_api_key>
    - MONGO_DB_USER=<db_user_name>
    - MONGO_DB_PASSWORD=<db_password>

4. Install NodeJS from https://nodejs.org/en/

5. From a command line:
    - npm install -g nodemon
    - nodemon app.js

6. Verify that your API works by accessing: 
http://localhost:3000/api/stores?zip_code=90048
