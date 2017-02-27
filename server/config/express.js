'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require("cors");
//cookieParser = require('cookie-parser')
//session = require('express-session');
module.exports = function () {
    var app = express();
    //app.set('view engine', 'pug');
    app.use('/libs', express.static('./node_modules'));
    app.use('/static', express.static('./public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // app.use(cookieParser());
    // app.use(session({ secret: 'totally random' }));
    app.use(cors());
    app.use(express.static("public"));
    return app;
};
//# sourceMappingURL=application.js.map