var path = require('path');

module.exports = {
    "logs": {
        name: 'verbose-file',
        level: 'info',
        json: false,
        dirname: path.join(LZ, "logs"),
        filename: 'notificationsys.log'
    },
}