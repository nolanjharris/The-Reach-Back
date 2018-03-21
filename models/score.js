var mongoose = require("mongoose");

var scoreSchema = new mongoose.Schema({
    toPar: String,
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