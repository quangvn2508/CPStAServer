var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Problem = new Schema({
    name: {
        type: String,
        required: true
    },
    statement: {
        type: String,
        default: '',
    },
    contest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

Problem.plugin(passportLocalMongoose);

module.exports = mongoose.model('Problem', Problem);