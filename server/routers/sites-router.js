/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .put("/sites/:id/comment", controllers.addSiteComment)
        .get("/sites/:id", controllers.getSiteById)
        .put("/sites/:id", controllers.markSiteAsVisited)
        .get("/sites", controllers.getAllSites);

    app.use("/api", router);

    return router;
};