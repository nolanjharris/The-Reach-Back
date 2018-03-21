var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Score = require('../models/score');


// scorecard route
router.get('/stats', function(req, res, next){
	res.render('stats');
});

router.post('/scorecard/score', function(req, res){
		var toPar = req.body.toPar;
		var date = req.body.date;
		var course = req.body.course;
		var player = {
			id: req.user._id,
			username: req.user.username
		};
		var newScore = {toPar: toPar, date: date, course: course, player: player};

		Score.create(newScore, function(err, newlyCreated){
			if(err){
				console.log(err);
			} else {
				res.redirect("/stats");
			}
	});
});

module.exports = router;
