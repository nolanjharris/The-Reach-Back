var express       = require("express"),
	app           = express(),
	bodyParser    = require("body-parser"),
	mongoose      = require("mongoose"),
	passport      = require("passport"),
	LocalStrategy = require("passport-local"),
	flash         = require("connect-flash");

var	User = require("./models/user");
var Course = require('./models/course');
var Video = require('./models/videos');
var Comment = require('./models/comment');
var Score = require('./models/score');

var courseRoutes = require("./routes/courses");
var indexRoutes = require("./routes/index");
var videoRoutes = require("./routes/videos");
var statsRoutes = require("./routes/stats");
var scorecardRoutes = require("./routes/scores");

// Connect to mongoose
mongoose.connect("mongodb://nolanjharris:nhspiffy123@ds135619.mlab.com:35619/thereachback");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIG
app.use(require("express-session")({
	secret: "DiscGolf for Life!",
	cookie: {maxAge: 600000},
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
app.use(statsRoutes);
app.use(scorecardRoutes);

app.listen(process.env.PORT || 3000);
console.log('Running on ' + (process.env.PORT || 'localHost') + ".......");