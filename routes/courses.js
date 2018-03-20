var express = require("express");
var router = express.Router();
var Course = require('../models/course');
var Comment = require('../models/comment');

router.get('/courses/:page', function(req, res){
	var perPage = 8;
	var page = req.params.page || 1;

	Course
		.find({})
		.skip((perPage * page) - perPage)
		.limit(perPage)
		.exec(function(err, courses){
			Course.count().exec(function(err, count){
				if (err) return next(err)
				res.render('courses', {
					courses: courses,
					current: page,
					pages: Math.ceil(count/perPage)
				});
			});
		});
});


//Show courses route
router.get("/course/:id", function(req, res){
	// var page = req.params.page || 1;
	Course.findById(req.params.id).exec(function(err, foundCourse){
		if(err || !foundCourse){
			// req.flash("error", "Course not found");
			res.redirect("back");
		} else {
			res.render("show", {course: foundCourse});
		}
	});	
});

module.exports = router;