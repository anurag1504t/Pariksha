var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Course = new Schema({
    courseCode: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    exams:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam'
        }
    ]
});

module.exports = mongoose.model('Course', Course);