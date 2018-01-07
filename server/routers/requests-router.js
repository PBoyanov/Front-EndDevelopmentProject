/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        //.put("/news/:id/comment", controllers.addNewsItemComment)
        //.get("/news/:id", controllers.getNewsItemById)
        .get("/requests", controllers.getRequests);

    app.use("/api", router);

    return router;
};