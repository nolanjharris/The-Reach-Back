var mongoose = require("mongoose");
var videoSchema = new mongoose.Schema({
	name: String,
	iframe: String,
	type: String	
});

module.exports = mongoose.model("Video", videoSchema);