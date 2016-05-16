module.exports = {
    port: process.env.PORT || 8000,
    host: process.env.HOST || '127.0.0.1',
    notificationTimer : process.env.NOT_TIMER  || 5000,
    mongoDB: {
        host: process.env.MONGO_HOST || 'localhost',
        port: process.env.MONGO_PORT || 27017,
        //Add user and password if required
        // user: 'username',
        // password: 'password',
        database: 'notifications'
    }
};