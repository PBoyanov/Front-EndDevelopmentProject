/* globals module */

let port = process.env.PORT || 3000;
let connection = process.env.MONGODB_URI || "mongodb://localhost/hundredtouristsites";
let url = process.env.NODE_ENV || "http://localhost:3000";
let herokuConnectionString = "mongodb://heroku_sff40t7w:ueu3fo3si6q62tb4q0ko45gvjr@ds141328.mlab.com:41328/heroku_sff40t7w";

module.exports = {
    rootUrl: url,
    connectionString: connection,
    port: port,
    herokuConnectionString: herokuConnectionString
};