var winston = require('winston');

function stringify(object){
    return process.env.NODE_ENV === 'development' ? JSON.stringify(object, null, 4) : JSON.stringify(object);
}

function LogFormatter(content, isError) {
    var obj = {};
    if (content.length === 1 && typeof content[0] === 'string') {
        obj.message = content[0];
    } else {
        content.forEach(function (arg, key) {
            if (typeof arg === 'string') {
                obj.message = arg;
            }
            else {
                Object.keys(arg).forEach(function(key) {
                    if (key === 'req') {
                    obj.clientRequest = {
                        "headers": arg[key].headers,
                        "url": arg[key].url,
                        "query": arg[key].query
                    }
                    } else if (key === 'error') {
                        obj[key] = arg[key].stack || arg[key];
                    } else {
                        obj[key] = arg[key];
                    }
                 })
            }
        });
    }
    return isError ? obj : stringify(obj, null, 4);
}

function Logger (stream){
    this.logger = new winston.Logger({
        level: stream.level,
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)(stream)
        ]
    });
    this.logger.level = "silly";
    this.logger.cli();
    return this;
}

Logger.prototype.trace = function() {
    return this.logger.log("trace", LogFormatter.call(this, Array.prototype.slice.call(arguments)));
};

Logger.prototype.debug = function() {
    return this.logger.log("debug", LogFormatter.call(this, Array.prototype.slice.call(arguments)));
};

Logger.prototype.info = function() {
    return this.logger.log("info", LogFormatter.call(this, Array.prototype.slice.call(arguments)));
};

Logger.prototype.warn = function() {
    return this.logger.log("warn", LogFormatter.call(this, Array.prototype.slice.call(arguments)));
};

Logger.prototype.error = function() {
    var payload =  LogFormatter.call(this, Array.prototype.slice.call(arguments), true);
    return this.logger.log("error", stringify(payload));
};

Logger.prototype.fatal = function() {
    return this.logger.log("fatal", LogFormatter.call(this, Array.prototype.slice.call(arguments)))
};

exports = module.exports = Logger;