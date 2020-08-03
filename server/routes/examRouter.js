// Imported Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Exams = require('../models/exam');

const examRouter = express.Router();

examRouter.use(bodyParser.json());

// Methods for http://localhost:3000/exams/ API end point
examRouter.route('/')
.get((req,res,next) => {
    Exams.find(req.query)
    .then((exams) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(exams);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Exams.create(req.body)
    .then((exam) => {
        console.log('Exam Created ', exam);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(exam);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /exams');
})
.delete((req, res, next) => {
    Exams.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

// Methods for http://localhost:3000/exams/:examId API end point
examRouter.route('/:examId')
.get((req,res,next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(exam);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /exams/${req.params.examId}`);
})
.put((req, res, next) => {
    Exams.findByIdAndUpdate(req.params.examId, {
        $set: req.body
    }, { new: true })
    .then((exam) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(exam);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Exams.findByIdAndRemove(req.params.exam)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Methods for http://localhost:3000/exams/:examId/MCQ API end point
examRouter.route('/:examId/MCQ')
.get((req,res,next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(exam.MCQ);
        }
        else {
            err = new Error(`Exam ${req.params.examId} not found`);
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null) {
            exam.MCQ.push(req.body);
            exam.save()
            .then((exam) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(exam);                
            }, (err) => next(err));
        }
        else {
            err = new Error(`Exam ${req.params.examId} not found`);
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /exams/${req.params.examId}/MCQ`);
})
.delete((req, res, next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null) {
            for (var i = (exam.MCQ.length -1); i >= 0; i--) {
                exam.MCQ.id(exam.MCQ[i]._id).remove();
            }
            exam.save()
            .then((exam) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(exam);                
            }, (err) => next(err));
        }
        else {
            err = new Error(`Exam ${req.params.examId} not found`);
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

// Methods for http://localhost:3000/exams/:examId/MCQ/:MCQId API end point
examRouter.route('/:examId/MCQ/:MCQId')
.get((req,res,next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null && exam.MCQ.id(req.params.MCQId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(exam.MCQ.id(req.params.MCQId));
        }
        else if (exam == null) {
            err = new Error(`Exam ${req.params.examId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`MCQ ${req.params.MCQId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /exams/${req.params.examId}/MCQ/${req.params.MCQId}`);
})
.put((req, res, next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null && exam.MCQ.id(req.params.MCQId) != null) {
            if (req.body.question) {
                exam.MCQ.id(req.params.MCQId).question = req.body.question;
            }
            if (req.body.optionA) {
                exam.MCQ.id(req.params.MCQId).optionA = req.body.optionA;                
            }
            if (req.body.optionB) {
                exam.MCQ.id(req.params.MCQId).optionB = req.body.optionB;                
            }
            if (req.body.optionC) {
                exam.MCQ.id(req.params.MCQId).optionC = req.body.optionC;                
            }
            if (req.body.optionD) {
                exam.MCQ.id(req.params.MCQId).optionD = req.body.optionD;                
            }
            if (req.body.solution) {
                exam.MCQ.id(req.params.MCQId).solution = req.body.solution;                
            }
            exam.save()
            .then((exam) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(exam);                
            }, (err) => next(err));
        }
        else if (exam == null) {
            err = new Error(`Exam ${req.params.examId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`Multiple Choice Question ${req.params.MCQId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null && exam.MCQ.id(req.params.MCQId) != null) {
            exam.MCQ.id(req.params.MCQId).remove();
            exam.save()
            .then((exam) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(exam);                
            }, (err) => next(err));
        }
        else if (exam == null) {
            err = new Error(`Exam ${req.params.examId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`Multiple Choice Question ${req.params.MCQId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = examRouter;