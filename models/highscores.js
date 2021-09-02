// Highscore schema.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const highscoreSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    completionTime: {
        type: Number, // Decided to use number instead of string for ease of ascending order find.
        required: true
    }
}, {timestamps: true}); // Included timestamps incase I wanted to expand the highscores to show when the highscore was submitted.

const Highscore = mongoose.model('Highscore', highscoreSchema);
module.exports = Highscore;