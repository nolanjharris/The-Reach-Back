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
router.get('/scorecard', function(req, res, next){
	res.render('scorecard');
});

//handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.redirect(req.get("referrer"));
		}
		passport.authenticate("local")(req, res, function(){
			return res.redirect(req.get("referrer"));
		});
	});
});

// show login form
// router.get("/login", function(req, res){
// 	res.render("login");
// });

router.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect(req.get('referrer')); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect(req.get('referer'));
    });
  })(req, res, next);
});

// handling login logic
// router.post("/login", passport.authenticate("local", 
// 	{
// 		successReturnToOrRedirect : "/", 
// 		failureRedirect: "/"
// 	}), function(req, res){
// });



//logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

module.exports = router;