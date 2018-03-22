var mongoose = require("mongoose");

var scoreSchema = new mongoose.Schema({
    toPar: Number,
    date: String,
    course: String,
    player: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Score", scoreSchema);