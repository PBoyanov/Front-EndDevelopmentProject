/* globals module */

let port = process.env.PORT || 3000;
let connection = process.env.MONGODB_URI || "mongodb://localhost/hundredtouristsites";
let url = process.env.NODE_ENV || "http://localhost:3000";
let herokuConnectionString = "mongodb://heroku_c3l8sv5j:849vvjs6in34pqgc6e52721dgu@ds137550.mlab.com:37550/heroku_c3l8sv5j";

module.exports = {
    rootUrl: url,
    connectionString: connection,
    port: port,
    herokuConnectionString: herokuConnectionString
};