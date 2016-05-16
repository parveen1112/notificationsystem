module.exports = {
    mongoDB: {
        host: 'localhost',
        port: 27017,
        database: 'notifications'
    },
    port: process.env.PORT || 8000,
    host: process.env.HOST || '127.0.0.1',
    notificationTimer : 10000
};