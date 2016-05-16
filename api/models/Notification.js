var mongoose = require('mongoose');

var notificationStoreSchema = {
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    notification : String,
    status : Boolean
}

var Notification = mongoose.model('Notification', new mongoose.Schema(notificationStoreSchema,  {timestamps: true}));

module.exports = exports = Notification;