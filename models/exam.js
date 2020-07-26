const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MCQ = new Schema({
    question: {
        type: String,
        required: true
    },
    optionA: {
        type: String,
        required: true
    },
    optionB: {
        type: String,
        required: true
    },
    optionC: {
        type: String,
        required: true
    },
    optionD: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Numerical = new Schema({
    question: {
        type: String,
        required: true
    },
    solution: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

var Descriptive = new Schema({
    question: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const examSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    courseCode:{
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    scheduled:{
        type: Date, 
        default: Date.now
    },
    multiple: [MCQ],
    numerical: [Numerical],
    descriptive: [Descriptive]
}, {
    timestamps: true
});

var Dishes = mongoose.model('Exam', examSchema);

module.exports = Dishes;