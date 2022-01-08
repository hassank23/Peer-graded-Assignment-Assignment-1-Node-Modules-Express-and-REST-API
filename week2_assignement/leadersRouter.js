var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Leaders = require('../models/leadership');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .get(function(req, res, next) {
        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

.post(function(req, res, next) {
        Leaders.create(req.body)
            .then((leader) => {
                console.log('Dish Created ', leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })

.delete(function(req, res, next) {
    Leaders.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

leaderRouter.route('/:leaderId')
    .get(function(req, res, next) {
        Leaders.findById(req.params.leaderId, function(err, leader) {
            if (err) throw err;
            res.json(leader);
        });
    })

.put(function(req, res, next) {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function(err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.delete(function(req, res, next) {
    Leaders.findByIdAndRemove(req.params.leaderId, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = leaderRouter;