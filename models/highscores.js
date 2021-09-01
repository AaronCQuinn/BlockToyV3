const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const highscoreSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    completionTime: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Highscore = mongoose.model('Highscore', highscoreSchema);
module.exports = Highscore;