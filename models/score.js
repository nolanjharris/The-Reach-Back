var mongoose = require("mongoose");

var scoreSchema = mongoose.Schema({
    score: String,
    date: String,
    course: String,
    user: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);