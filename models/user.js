const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
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
}, {
    timestamps: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);