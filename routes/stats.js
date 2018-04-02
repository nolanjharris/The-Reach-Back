var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Score = require('../models/score');


// scorecard route
router.get('/stats', function(req, res, next){
	Score.find({}, function(err, allScores){
        if(err){
            console.log(err);
        }else{
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
		            res.render("stats", {stats: result, scores: allScores});
				};
			});
			// console.log(agg);
        }
    });
});

module.exports = router;
