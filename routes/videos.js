var express = require("express");
var router = express.Router();
var Video = require('../models/videos');


router.get('/videos/:page', function(req, res){
	var perPage = 4;
	var page = req.params.page || 1;
	var videoList = req.query.t ? {type:req.query.t} : {};
	Video.find(videoList)
		.skip(perPage * (page-1))
		.limit(perPage)
		.exec(function(err, videos){
			Video.count(videoList).exec(function(err, count){
				if (err) return next(err)
				res.render('videos', {
					videos: videos,
					current: page,
					videoType: req.query.t,
					pages: Math.ceil(count/perPage)
				});
			});
		});
});

module.exports = router;