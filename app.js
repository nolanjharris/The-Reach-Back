var express       = require("express"),
	app           = express(),
	bodyParser    = require("body-parser"),
	mongoose      = require("mongoose"),
	passport      = require("passport"),
	LocalStrategy = require("passport-local"),
	User          = require("./models/user");

var Course = require('./models/course');
var Video = require('./models/videos');



// Connect to mongoose
mongoose.connect("mongodb://localhost/reachback");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIG
app.use(require("express-session")({
	secret: "DiscGolf for Life!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.get('/', function(req, res, next){
	res.render('home');
});

app.get('/scorecard', function(req, res){
	res.render('scorecard');
});

app.get('/videos/:page', function(req, res){
	var perPage = 6;
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


app.get('/courses/:page', function(req, res){
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
app.get("/course/:id", function(req, res){
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

// AUTH ROUTES

//show register form
// app.get("/register", function(req, res){
// 	res.render("register");
// });

//handle sign up logic
app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
	res.render("login");
});

// handling login logic
app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/", 
		failureRedirect: "/"
	}), function(req, res){
});

//logout route
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

app.listen(3000);
console.log('Running on port 3000...');