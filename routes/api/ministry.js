var async = require('async'),
	keystone = require('keystone'),
	restUtils = require('./restUtils'),
	express = require('express'),
	router = express.Router();

var Ministry = keystone.list("Ministry");
var model = Ministry.model;

router.route('/list')
	.get(function(req, res, next) {
		restUtils.list(model, req, res);
	});

router.route('/:id')
	.get(function(req, res, next) {
		restUtils.get(model, req, res);
	});

router.route('/:id/questions')
	.get(function(req, res, next) {
		keystone.list('MinistryQuestion').model.find({ministry: req.params.id}).populate("selectOptions").exec(function(err, questions){
			if (err) return res.send(err);
			return res.json(questions);
		});
	});

router.route('/find')
	.post(function(req, res, next) {
		restUtils.find(model, req, res);
	});

router.route('/search')
	.post(function(req, res, next) {
		restUtils.search(model, req, res);
	});

router.route('/create')
	.post(function(req, res, next) {
		restUtils.create(model, req, res);
	});

router.route('/update')
	.post(function(req, res, next) {
		restUtils.update(model, req, res);
	});

module.exports = router;
