/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .post('/register', controllers.register)
        .post('/login', controllers.login)
        .get("/profiles/:username/sites", controllers.getUserVisitedSites)
        .get('/user', controllers.getLoggedUser);


    app.use("/api", router);

    return router;
};