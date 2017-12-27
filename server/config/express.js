'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors')
    //cookieParser = require('cookie-parser')
    //session = require('express-session');
module.exports = function () {
    var app = express();
    //app.set('view engine', 'pug');
    app.use('/libs', express.static('./node_modules'));
    app.use('/static', express.static('./public'));
    app.use(bodyParser.json({limit: '4mb'}));
    app.use(bodyParser.urlencoded({limit: '4mb', extended: true }));
    // app.use(cookieParser());
    // app.use(session({ secret: 'totally random' }));
    app.use(cors());
    app.use(express.static("public"));
    return app;
};
//# sourceMappingURL=application.js.map