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
            res.render("stats", {scores:allScores});
        }
    });
});

module.exports = router;
