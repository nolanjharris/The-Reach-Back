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
	directions: String,
	hole1: String,
	hole2: String,
	hole3: String,
	hole4: String,
	hole5: String,
	hole6: String,
	hole7: String,
	hole8: String,
	hole9: String,
	hole10: String,
	hole11: String,
	hole12: String,
	hole13: String,
	hole14: String,
	hole15: String,
	hole16: String,
	hole17: String,
	hole18: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

courseSchema
	.virtual('parList')
	.get(function(){
		return [this.hole1, this.hole2, this.hole3, this.hole4, this.hole5, this.hole6, this.hole7, this.hole8, this.hole9, 
		this.hole10, this.hole11, this.hole12, this.hole13, this.hole14, this.hole15, this.hole16, this.hole17, this.hole18]
	});

module.exports = mongoose.model("Course", courseSchema);