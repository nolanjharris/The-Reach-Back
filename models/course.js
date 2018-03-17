var mongoose = require("mongoose");
var courseSchema = new mongoose.Schema({
	name: String,
	par: String,
	description: String,
	location: String,
	image_url: String,
	holes: String,
	yearEst: String,
	length: String,
	directions: String
});

module.exports = mongoose.model("Course", courseSchema);