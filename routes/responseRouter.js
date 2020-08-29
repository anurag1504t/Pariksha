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
    Response.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

// Methods for http://localhost:3000/response/:responseId API end point
responseRouter.route('/:responseId')
.get((req,res,next) => {
    Response.findById(req.params.responseId)
    .then((response) => {
        Response.findById(response._id)
        .populate('student')
        .populate('exam')
        .then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /responses/${req.params.responseId}`);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Response.findByIdAndUpdate(req.params.responseId, {
        $set: req.body
    }, { new: true })
    .then((response) => {
        Response.findById(response._id)
        .populate('student')
        .populate('exam')
        .then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Response.findByIdAndRemove(req.params.responseId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = responseRouter;