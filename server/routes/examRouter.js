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

// Methods for http://localhost:3000/exams/:examId/multiple API end point
examRouter.route('/:examId/multiple')
.get((req,res,next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(exam.multiple);
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
            exam.multiple.push(req.body);
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
    res.end(`PUT operation not supported on /exams/${req.params.examId}/multiple`);
})
.delete((req, res, next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null) {
            for (var i = (exam.multiple.length -1); i >= 0; i--) {
                exam.multiple.id(exam.multiple[i]._id).remove();
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

// Methods for http://localhost:3000/exams/:examId/multiple/:multipleId API end point
examRouter.route('/:examId/multiple/:multipleId')
.get((req,res,next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null && exam.multiple.id(req.params.multipleId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(exam.multiple.id(req.params.multipleId));
        }
        else if (exam == null) {
            err = new Error(`Exam ${req.params.examId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`Multiple Choice Question ${req.params.multipleId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /exams/${req.params.examId}/multiple/${req.params.multipleId}`);
})
.put((req, res, next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null && exam.multiple.id(req.params.multipleId) != null) {
            if (req.body.question) {
                exam.multiple.id(req.params.multipleId).question = req.body.question;
            }
            if (req.body.optionA) {
                exam.multiple.id(req.params.multipleId).optionA = req.body.optionA;                
            }
            if (req.body.optionB) {
                exam.multiple.id(req.params.multipleId).optionB = req.body.optionB;                
            }
            if (req.body.optionC) {
                exam.multiple.id(req.params.multipleId).optionC = req.body.optionC;                
            }
            if (req.body.optionD) {
                exam.multiple.id(req.params.multipleId).optionD = req.body.optionD;                
            }
            if (req.body.solution) {
                exam.multiple.id(req.params.multipleId).solution = req.body.solution;                
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
            err = new Error(`Multiple Choice Question ${req.params.multipleId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null && exam.multiple.id(req.params.multipleId) != null) {
            exam.multiple.id(req.params.multipleId).remove();
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
            err = new Error(`Multiple Choice Question ${req.params.multipleId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Methods for http://localhost:3000/exams/:examId/numerical API end point
examRouter.route('/:examId/numerical')
.get((req,res,next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(exam.numerical);
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
            exam.numerical.push(req.body);
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
    res.end(`PUT operation not supported on /exams/${req.params.examId}/numerical`);
})
.delete((req, res, next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null) {
            for (var i = (exam.numerical.length -1); i >= 0; i--) {
                exam.numerical.id(exam.numerical[i]._id).remove();
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

// Methods for http://localhost:3000/exams/:examId/numerical/:numericalId API end point
examRouter.route('/:examId/numerical/:numericalId')
.get((req,res,next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null && exam.numerical.id(req.params.numericalId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(exam.numerical.id(req.params.numericalId));
        }
        else if (exam == null) {
            err = new Error(`Exam ${req.params.examId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`Numerical Question ${req.params.numericalId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /exams/${req.params.examId}/numerical/${req.params.numericalId}`);
})
.put((req, res, next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null && exam.numerical.id(req.params.numericalId) != null) {
            if (req.body.question) {
                exam.numerical.id(req.params.numericalId).question = req.body.question;
            }
            if (req.body.solution) {
                exam.numerical.id(req.params.numericalId).solution = req.body.solution;                
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
            err = new Error(`Numerical Question ${req.params.numericalId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null && exam.numerical.id(req.params.numericalId) != null) {
            exam.numerical.id(req.params.numericalId).remove();
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
            err = new Error(`Numerical Question ${req.params.numericalId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Methods for http://localhost:3000/exams/:examId/subjective API end point
examRouter.route('/:examId/subjective')
.get((req,res,next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(exam.subjective);
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
            exam.subjective.push(req.body);
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
    res.end(`PUT operation not supported on /exams/${req.params.examId}/subjective`);
})
.delete((req, res, next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null) {
            for (var i = (exam.subjective.length -1); i >= 0; i--) {
                exam.subjective.id(exam.subjective[i]._id).remove();
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

// Methods for http://localhost:3000/exams/:examId/subjective/:subjectiveId API end point
examRouter.route('/:examId/subjective/:subjectiveId')
.get((req,res,next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null && exam.subjective.id(req.params.subjectiveId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(exam.subjective.id(req.params.subjectiveId));
        }
        else if (exam == null) {
            err = new Error(`Exam ${req.params.examId} not found`);
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error(`Subjective Question ${req.params.subjectiveId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /exams/${req.params.examId}/subjective/${req.params.subjectiveId}`);
})
.put((req, res, next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null && exam.subjective.id(req.params.subjectiveId) != null) {
            if (req.body.question) {
                exam.subjective.id(req.params.subjectiveId).question = req.body.question;
            }
            if (req.body.solution) {
                exam.subjective.id(req.params.subjectiveId).solution = req.body.solution;                
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
            err = new Error(`Subjective Question ${req.params.subjectiveId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Exams.findById(req.params.examId)
    .then((exam) => {
        if (exam != null && exam.subjective.id(req.params.subjectiveId) != null) {
            exam.subjective.id(req.params.subjectiveId).remove();
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
            err = new Error(`Subjective Question ${req.params.subjectiveId} not found`);
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = examRouter;