var mongoose = require('mongoose');

var userSchema = {
    username : {type: String, unique: true},
    counter : Number
}

var User = mongoose.model('User', new mongoose.Schema(userSchema,  {timestamps: true}));

exports = module.exports  = User;