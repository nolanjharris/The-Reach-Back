var express       = require("express"),
	app           = express(),
	bodyParser    = require("body-parser"),
	mongoose      = require("mongoose"),
	passport      = require("passport"),
	LocalStrategy = require("passport-local"),
	User          = require("./models/user");

var Course = require('./models/course');
var Video = require('./models/videos');
var Comment = require('./models/comment');

var courseRoutes = require("./routes/courses");
var indexRoutes = require("./routes/index");
var videoRoutes = require("./routes/videos");

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

app.use(indexRoutes);
app.use(courseRoutes);
app.use(videoRoutes);

app.listen(3000);
console.log('Running on port 3000...');