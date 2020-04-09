var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContestProblem = new Schema({
    score: {
        type: Number,
        min: 0,
        default: 0
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }
})

var Contest = new Schema({
    name: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    rule: {
        type: String,
        default: ''
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    testers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    problems: [ ContestProblem ]
},{
    timestamps: true
});

module.exports = mongoose.model('Contest', Contest);