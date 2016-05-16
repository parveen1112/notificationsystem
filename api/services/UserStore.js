var Notification = require('../models/Notification');
var User = require('../models/User');

function UserStore(){
}


UserStore.prototype.getUser = function(username, cb){
    User.findOne({ username: username }, function(err, user) {
        cb(err, user);
    });
}

UserStore.prototype.getUserNotifications = function(user, cb){
    Notification.find({ user: user }).sort({updatedAt: 1}).exec(function(err, notifications) {
        cb(err, notifications);
    });
}

UserStore.prototype.markReadUserNotifications = function(user, cb){
    var conditions = { user: user }
        , update = { $set: { status: false }}
        , options = { multi: true };

    Notification.update(conditions, update, options, cb);
}


UserStore.prototype.addUserNotification = function(user, notification, cb){
    var newNotification = Notification({
        user: user,
        notification: notification,
        status : true
    });
    newNotification.save(function(err, notification) {
        if (err) {
            log.error('MongoDB Not able to add newNotification: ' + user);
        }
        cb(err, notification);
    });
}

UserStore.prototype.set = function(username, cb, counter, notification){
    var _this = this;
    this.getUser(username, function(err, user){
        if (err) {
            cb(err);
        } else if (user) {
            if (counter){
                user.counter = counter;
                user.save(function(err, user) {
                    if (notification) {
                        _this.addUserNotification(user, notification, function(err, notification){
                            cb(err, user, notification);
                        });
                    } else {
                        cb(err, user);
                    }
                });
            } else{
                _this.getUserNotifications(user, function(err, notifications){
                    cb(err, user, notifications);
                })
            }
        } else {
            var newUser = User({
                username: username,
                counter: 0
            });
            newUser.save(function(err, user) {
                if (err) {
                    log.error('MongoDB Not able to add username: ' + username);
                }
                cb(err, user);
            });
        }
    });
}

UserStore.prototype.update = function(username, counter, notification, cb){
    this.set(username, function(err, user, notification){
        cb(err, user, notification);
    }, counter, notification);
}

UserStore.prototype.reset = function(username, cb){
    this.set(username, function(err, user){
        if (err) {
            cb(err);
        } else {
            this.markReadUserNotifications(user, function(err, notifications){
                cb(err, user, notifications);
            });
        }
    }.bind(this), 0);
}

var instance;
function getInstance(){
    if (!instance) {
        instance = new UserStore();
        return instance;
    }
    return instance;
}

module.exports = exports = {
    instance : getInstance
};