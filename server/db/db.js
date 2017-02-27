/* globals require, module */
"use strict";

const low = require("lowdb");

module.exports = {
    getDb() {
        const db = low("./server/db/localDb.json");
        db.defaults({ users: [], materials: [] })
            .value();
        db._.mixin(require("underscore-db"));
        return db;
    }
};