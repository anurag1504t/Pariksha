const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Results = require('../models/result');
const Responses = require('../models/response');
var authenticate = require('../authenticate');

const resultRouter = express.Router();
resultRouter.use(bodyParser.json());

// Methods for http://localhost:3000/results/ API end point
resultRouter.route('/')
.get(authenticate.verifyUser, (req,res,next) => {
    Results.find({student: req.user._id})
    .populate('exam')
    .then((results) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    if (req.body != null) {
        req.body.student = req.user._id;
        Results.create(req.body)
        .then((result) => {
            Results.findById(result._id)
            .populate('student')
            .populate('exam')
            .then((result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            })
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else {
        err = new Error('Result information not found in request body');
        err.status = 404;
        return next(err);
    }
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /results');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Results.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

// Methods for http://localhost:3000/results/:examId API end point
resultRouter.route('/:examId')
.post(authenticate.verifyUser, (req, res, next) => {
    Responses.findOne({exam:req.params.examId, student: req.user._id})
    .then((response) => {
        if(response != null){
            var scored = 0;
            var maxScored = 0;
            for(var i = (response.multiple.length - 1); i >= 0; i--) {
                if(response.multiple[i].answer == response.multiple[i].response) {
                    scored = scored + 1;
                }
            }
            for(var i = (response.numerical.length - 1); i >= 0; i--) {
                if(response.numerical[i].answer == response.numerical[i].response) {
                    scored = scored + 1;
                }
            }
            maxScored = response.multiple.length + response.numerical.length;
            response.attempts = req.body.attempts;
            response.save()
            .then((response) => {
                console.log(response)
            }, (err) => next(err));
            Results.create({
                score: scored,
                maxScore : maxScored,
                exam : req.params.examId,
                student: req.user._id
            })
            .then((result) => {
                Results.findById(result._id)
                .populate('exam')
                .then((result) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(result);
                })  
            }, (err) => next(err));
        }
        else {
            Results.create({
                score: 0,
                maxScore : 0,
                exam : req.params.examId,
                student: req.user._id
            })
            .then((result) => {
                Results.findById(result._id)
                .populate('exam')
                .then((result) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(result);
                })  
            }, (err) => next(err));
        }
    }, (err) => next(err))
    .catch((err) => next(err));
    // if (req.body != null) {

    //     Results.create(req.body)
    //     .then((result) => {
    //         Results.findById(result._id)
    //         .populate('student')
    //         .populate('exam')
    //         .then((result) => {
    //             res.statusCode = 200;
    //             res.setHeader('Content-Type', 'application/json');
    //             res.json(result);
    //         })
    //     }, (err) => next(err))
    //     .catch((err) => next(err));
    // }
    // else {
    //     err = new Error('Result information not found in request body');
    //     err.status = 404;
    //     return next(err);
    // }
});

module.exports = resultRouter;