/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .put("/requests/:id/requestResponse", controllers.requestResponse)
        .get("/requests", controllers.getRequests);

    app.use("/api", router);

    return router;
};