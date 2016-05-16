var Logger = require('./../lib/logger'),
    path = require('path'),
    mongoose = require('mongoose'),
    notificationSystemRouter = require('../lib/router'),
    persistConnection = require('../lib/persist-connect');


function merge(destination, source){
    for (var i in source){
        destination[i] = source[i];
    }
}

module.exports = function (bootstrapLocation, router, io) {
    global.notSys = {
        config : {},
        env : process.env.NODE_ENV || 'development'
    };
    // Requiring base config
    notSys.config = require(path.join(bootstrapLocation, 'configs', 'config.js'));
    // Requiring environment based configs
    if(notSys.env){
        var env_config = require(path.join(bootstrapLocation, 'configs', 'env', notSys.env + '.js'));
    }
    merge(notSys.config, env_config);
    global.log = new Logger(notSys.config.logs, true);

    // All the routes have been initialized using custom router in lib.
    // routes.js file contains all the routes in api folder
    notificationSystemRouter.initialize(router, require('../api/routes.js'));

    //All the socket io connections are initialized using this method
    persistConnection.initialize(io, require('../api/services/UserStore').instance());

    mongoose.connect('mongodb://' + notSys.config.mongoDB.host + ':' + notSys.config.mongoDB.port + '/' + notSys.config.mongoDB.database);

    mongoose.connection.on('error', function(err){
        log.error('MongoDB Not able to connect' + JSON.stringify(err));
    });
    mongoose.connection.once('open', function() {
        log.info('MongoDB connected');
    });
};