const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MCQ = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
});

var Numerical = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
});

var Subjective = new Schema({
    question: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
});

const responseScema = new Schema({
    exam:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    attempts: {
        type: String,
        default: ''
    },
    multiple: [MCQ],
    numerical: [Numerical],
    subjective: [Subjective]
}, {
    timestamps: true
});

var Responses = mongoose.model('Response', responseScema);

module.exports = Responses;