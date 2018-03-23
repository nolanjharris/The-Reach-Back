var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Score = require('../models/score');


// scorecard route
router.get('/stats', function(req, res, next){
	console.log("get /stats");
	Score.find({}, function(err, allScores){
        if(err){
            console.log(err);
        }else{
        	console.log("aggregating Score");
	    	var agg = Score.aggregate([
				{ $match: {} },
				{ $group: { 
					_id : "$player.username",
					average: { $avg: "$toPar" },
					last_course : {$last : "$course"},
					last_date : {$last : "$date"},
					last_score: {$last : "$toPar"}
					}
				},
				{ $sort: {average: 1}}
			],function(err, result){
				if(err){
					console.log(err);
				} else {
		            res.render("stats", {stats: result, scores: allScores, currentUser: currentUser});
				};
			});
			// console.log(agg);
        }
    });
});

module.exports = router;
