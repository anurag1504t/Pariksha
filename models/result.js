const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var resultSchema = new Schema({
    score: {
        type: Number,
        required: true
    },
    maxScore: {
        type: Number,
        required: true
    },
    exam:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
      
}, {
    timestamps: true
});

var Results = mongoose.model('Result', resultSchema);

module.exports = Results;