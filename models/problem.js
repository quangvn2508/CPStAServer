var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Problem = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    statement: {
        type: String,
        default: '',
    },
    tag: [String],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

Problem.plugin(passportLocalMongoose);

module.exports = mongoose.model('Problem', Problem);