var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promotions = require('../models/promotions');

var promotionsRouter = express.Router();
promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
    .get(function(req, res, next) {
        Promotions.find({})
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

.post(function(req, res, next) {
        Promotions.create(req.body)
            .then((promotions) => {
                console.log('Dish Created ', promotions);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })

.delete(function(req, res, next) {
    Promotions.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

promotionsRouter.route('/:promoId')
    .get(function(req, res, next) {
        Promotions.findById(req.params.promoId, function(err, promo) {
            if (err) throw err;
            res.json(promo);
        });
    })

.put(function(req, res, next) {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {
        new: true
    }, function(err, promo) {
        if (err) throw err;
        res.json(promo);
    });
})

.delete(function(req, res, next) {
    Promotions.findByIdAndRemove(req.params.promoId, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = promotionsRouter;