var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
module.exports = mongoose.model('Problem', Problem);