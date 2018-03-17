var express       = require("express"),
	app           = express(),
	bodyParser    = require("body-parser"),
	mongoose      = require("mongoose"),
	passport      = require("passport"),
	LocalStrategy = require("passport-local");
	// User          = require("./models/user");
// var Course = require("./models/course");

var Course = require('./models/course');


// Connect to mongoose
mongoose.connect("mongodb://localhost/reachback");
// app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));


app.get('/', function(req, res){
	res.render('home');
});

app.get('/scorecard', function(req, res){
	res.render('scorecard');
});

app.get('/courses', function(req, res){
	Course.find({}, function(err, allCourses){
		if(err){
			console.log(err);
		} else {
			res.render("courses", {courses:allCourses});
		}
	});
});

//Show route
app.get("/courses/:id", function(req, res){
	Course.findById(req.params.id).exec(function(err, foundCourse){
		if(err || !foundCourse){
			req.flash("error", "Course not found");
			res.redirect("back");
		} else {
			res.render("show", {course: foundCourse});
		}
	});	
});



app.listen(3000);
console.log('Running on port 3000...');