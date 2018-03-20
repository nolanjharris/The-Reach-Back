var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


var express = require("express");
var router = express.Router();

// homepage route
router.get('/', function(req, res, next){
	res.render('home');
});

// scorecard route
router.get('/scorecard', function(req, res){
	res.render('scorecard');
});

//handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("/");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/");
		});
	});
});

// show login form
router.get("/login", function(req, res){
	res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/", 
		failureRedirect: "/"
	}), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

module.exports = router;