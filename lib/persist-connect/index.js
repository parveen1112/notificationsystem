/**
 * PersistConnect is the class to manage persistence connections
 * @param connect Socket IO Handler
 * @constructor
 */
var PersistConnect = function(connect, userStore){
    this.connect = connect;
    this.userStore = userStore;
    this.attach();
}
/**
 * This function is used to attaches all the events
 */
PersistConnect.prototype.attach = function(){
    var _this = this, username;
    this.connect.on('connection', function(socket){
        var counter = 0, timer;
        //Reseting the counter
        socket.on('reset', function(){
            _this.userStore.reset(username, function(err, user, notifications){
                if (err) {
                    log.error('MongoDb Not able to reset for username:' + username,  JSON.stringify(err));
                } else if (!user){
                    log.error('MongoDb Not able to find username:' + username);
                } else {
                    counter = 0;
                }
            });
        });

        // Signal is emitted when User logs in
        socket.on('user', function(data){
            username = data;
            _this.userStore.set(data, function(err, user, notifications){
                if (err) {
                    log.error('MongoDb Not able to set counter for username:' + user, JSON.stringify(err));
                } else{
                    counter = user.counter;
                    if (counter) {
                        socket.emit('notification', {
                            counter : counter,
                            notifications : notifications || []
                        });
                    }

                    timer = setInterval(function(){
                        var val = ++counter, text = username + ' You have ' + val + ' new notification';
                        _this.userStore.update(username, val, text, function(err, user, notification){
                            if (err) {
                                log.error('MongoDb Not able to reset counter for username:' + username, JSON.stringify(err));
                            } else if (!user){
                                log.error('MongoDb Not able to find username:' + username);
                            } else {
                                socket.emit('notification', {
                                    counter : val,
                                    notifications : [notification]
                                });
                            }
                        });
                    }, notSys.config.notificationTimer)
                }
            });
        });

        socket.on('stop', function(){
            clearInterval(timer);
        })

        socket.on('disconnect', function(){
            clearInterval(timer);
        })
    });
}

module.exports = {
    'initialize' : function(connect, userStore){
        var persistConnect = new PersistConnect(connect, userStore);
    }
}