const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contest = new Schema({
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
    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    score: [{
        type: Number,
        min: 0,
        default: 0  
    }]
},{
    timestamps: true
});

module.exports = mongoose.model('Contest', Contest);