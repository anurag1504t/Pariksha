const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Responses = require('../models/response');
var authenticate = require('../authenticate');

const responseRouter = express.Router();
responseRouter.use(bodyParser.json());

// Methods for http://localhost:3000/response/ API end point
responseRouter.route('/')
.get((req,res,next) => {
    Responses.find(req.query)
    .then((responses) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(responses);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    if (req.body != null) {
        req.body.student = req.user._id;
        Responses.create(req.body)
        .then((response) => {
            Responses.findById(response._id)
            .populate('student')
            .populate('exam')
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else {
        err = new Error('Response information not found in request body');
        err.status = 404;
        return next(err);
    }
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /responses');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Responses.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

responseRouter.route('/:examId/multiple')
.post(authenticate.verifyUser, (req, res, next) => {
    Responses.findOne({exam:req.params.examId, student: req.user._id})
    .then((response) => {
        if(response != null) {
            var pushed = false;
            for(var i = (response.multiple.length - 1); i >= 0; i--) {
                if(response.multiple[i].question == req.body.question) {
                    response.multiple[i].response = req.body.response;
                    pushed = true;
                    break;
                }
            }
            if(pushed === false) {
                response.multiple.push(req.body);                
            }
            response.save()
            .then((response) => {
                Responses.findById(response._id)
                .populate('student')
                .then((response) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(response);
                })               
            }, (err) => next(err));
        }
        else {            
            Responses.create({exam:req.params.examId, student: req.user._id})
            .then((response) => {
                response.multiple.push(req.body);
                response.save()
                .then((response) => {
                    Responses.findById(response._id)
                    .populate('student')
                    .then((response) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(response);
                    })               
                }, (err) => next(err));
            }, (err) => next(err))
            .catch((err) => next(err));           
        }
    }, (err) => next(err))
    .catch((err) => next(err)); 
}); 

responseRouter.route('/:examId/numerical')
.post(authenticate.verifyUser, (req, res, next) => {
    Responses.findOne({exam:req.params.examId, student: req.user._id})
    .then((response) => {
        if(response != null) {
            var pushed = false;
            for(var i = (response.numerical.length - 1); i >= 0; i--) {
                if(response.numerical[i].question == req.body.question) {
                    response.numerical[i].response = req.body.response;
                    pushed = true;
                    break;
                }
            }
            if(pushed === false) {
                response.numerical.push(req.body);                
            }
            response.save()
            .then((response) => {
                Responses.findById(response._id)
                .populate('student')
                .then((response) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(response);
                })               
            }, (err) => next(err));
        }
        else {            
            Responses.create({exam:req.params.examId, student: req.user._id})
            .then((response) => {
                response.numerical.push(req.body);
                response.save()
                .then((response) => {
                    Responses.findById(response._id)
                    .populate('student')
                    .then((response) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(response);
                    })               
                }, (err) => next(err));
            }, (err) => next(err))
            .catch((err) => next(err));           
        }
    }, (err) => next(err))
    .catch((err) => next(err)); 
}); 

responseRouter.route('/:examId/subjective')
.post(authenticate.verifyUser, (req, res, next) => {
    Responses.findOne({exam:req.params.examId, student: req.user._id})
    .then((response) => {
        if(response != null) {
            var pushed = false;
            for(var i = (response.subjective.length - 1); i >= 0; i--) {
                if(response.subjective[i].question == req.body.question) {
                    response.subjective[i].response = req.body.response;
                    pushed = true;
                    break;
                }
            }
            if(pushed === false) {
                response.subjective.push(req.body);                
            }
            response.save()
            .then((response) => {
                Responses.findById(response._id)
                .populate('student')
                .then((response) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(response);
                })               
            }, (err) => next(err));
        }
        else {            
            Responses.create({exam:req.params.examId, student: req.user._id})
            .then((response) => {
                response.subjective.push(req.body);
                response.save()
                .then((response) => {
                    Responses.findById(response._id)
                    .populate('student')
                    .then((response) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(response);
                    })               
                }, (err) => next(err));
            }, (err) => next(err))
            .catch((err) => next(err));           
        }
    }, (err) => next(err))
    .catch((err) => next(err)); 
}); 

module.exports = responseRouter;