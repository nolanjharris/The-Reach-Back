var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var flas = require("connect-flash");


var express = require("express");
var router = express.Router();

// homepage route
router.get('/', function(req, res, next){
	res.render('home');
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

router.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect(req.get('referrer')); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/login/auth', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {return res.send({'status':'err','message':err.message}); }
      if (!user) {return res.send({'status':'fail','message':info.message}); }
      req.logIn(user, function(err) {
        if (err) { return res.send({'status':'err','message':err.message}); }
        return res.send({'status': 'ok'});
      });
    })(req, res, next);
  },
  function(err, req, res, next) {
    if (err) { return next(err); }
    return res.send({'status':'err','message':err.message});
});


//logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

module.exports = router;