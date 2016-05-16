var path = require('path'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    bootstrap = require('./configs/bootstrap'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

//Landing Zone
global.LZ = __dirname;

// Bootstraping our application - Router, PersistenceConnection, Logger, configs etc
bootstrap(LZ, router, io);


// set the view engine to ejs
app.set('view engine', 'ejs');

// Just in case for Pull System
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(session({
    secret: '123#$@#45',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static(__dirname + '/assets/public'));
app.use('/', router);

// Middleware:: 404 handler

app.use(function (req, res) {
    var errMsg = req.url + " : " + '404';
    log.error(new Error(errMsg), errMsg);
    return res.status(404).send('NOT FOUND');
});

// Middleware:: 5xx hadnler

app.use(function (err, req, res, next) {
    var logs = {
        url : req.url,
        method : req.method,
        cause : err.code + " " + err.name + " " + err.message
    };
    log.error(JSON.stringify(logs) + err.stack);
    var code = err.errorCode ? err.errorCode.key ? err.errorCode.key : 500 : 500;
    return res.status(+code).send('INTERNAL SERVER ERROR');
});


/**
 * Uncaught Exception handling
 * Any unhandled exception will be catch and processed here
 */
process.on('uncaughtException', function (err) {
    console.log('uncaughtException===' + err);
    console.error(err.stack);
});


process.on('unhandledRejection', function (err, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", err.stack);
});

//Disabled X-Powered-By
app.disable('x-powered-by');

server.listen(notSys.config.port, function(){
    log.info('-------------------Application Started-----------------' + notSys.config.port);
});