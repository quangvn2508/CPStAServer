var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    nickname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
    ownedContests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest'
    }]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);