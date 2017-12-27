/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .post("/register", controllers.register)
        .post("/login", controllers.login)
        .get("/profiles/:username/sites", controllers.getUserVisitedSites)
        .get("/profiles/:username", controllers.getUser)
        .get("/user", controllers.getLoggedUser)
        .put("/user/:username/visitRequest", controllers.addVisitRequest);


    app.use("/api", router);

    return router;
};