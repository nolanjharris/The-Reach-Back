var express = require("express");
var router = express.Router();
var Course = require('../models/course');
var Comment = require('../models/comment');

router.get('/courses/:page', function(req, res){
	var perPage = 9;
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
	Course.findById(req.params.id).populate("comments").exec(function(err, foundCourse){
		if(err || !foundCourse){
			// req.flash("error", "Course not found");
			res.redirect("back");
		} else {
			res.render("show", {course: foundCourse});
		}
	});	
});

router.post("/course/:id/comments", function(req, res){
	Course.findById(req.params.id, function(err, course){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					course.comments.push(comment);
					course.save();
					res.redirect("/course/" + course._id);
				}
			});
		}
	});
});


//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

module.exports = router;