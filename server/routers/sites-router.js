/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        // .post('/register', controllers.register)
        // .post('/login', controllers.login)
        .get('/sites/:id', controllers.getSiteById)
        .get('/sites', controllers.getAllSites);

    app.use("/api", router);

    return router;
};