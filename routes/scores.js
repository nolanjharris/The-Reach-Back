var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Score = require('../models/score');
var Course = require('../models/course');

// scorecard route
router.get('/scorecard', function(req, res, next){
	Course.find({}, function(err, allCourses){
        if(err){
            console.log(err);
        }else{
            res.render("scorecard", {courses:allCourses});
        }
    });
});

router.post('/scorecard/pars', function(req, res, next){
	Course.findOne({"name":req.body.crsid},function(e,crs){
		res.render('partials/holePars',{course_id:crs.name,pars:crs.parList, crsPar: crs.par});
	});
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
