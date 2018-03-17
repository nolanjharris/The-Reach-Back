var express = require("express");
var router = express.Router();
var Course = require('../models/course');
// var middleware = require('../middleware');

//Index route/ show all courses
router.get('/', function(req, res){
	Course.find({}, function(err, allCourses){
		if(err){
			console.log(err);
		} else {
			res.render("courses/index", {courses:allCourses});
		}
	});
});

//Show route
router.get("/:id", function(req, res){
	Course.findById(req.params.id).exec(function(err, foundCourse){
		if(err || !foundCourse){
			req.flash("error", "Course not found");
			res.redirect("back");
		} else {
			res.render("courses/show", {course: foundCourse});
		}
	});	
});

module.exports = router;