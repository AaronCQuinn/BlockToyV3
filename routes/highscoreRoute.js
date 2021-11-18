// Imports for this route.
const express = require('express');
const path = require('path');
const router = express.Router();
const Highscore = require('../models/highscores');
router.use(express.urlencoded());

// Checks if authentication is present on the express session.
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Highscore times are stored as seconds in the database, for ascending order purposes.
// Returns the time from seconds to the same format string as seen on the homepage.
function formatTime(time) {
    let diffInHours = time / 3600;
    hrText = Math.floor(diffInHours);

    let diffInMin = (diffInHours - hrText) * 60;
    minText = Math.floor(diffInMin);

    let diffInSec = (diffInMin - minText) * 60;
    secText = Math.floor(diffInSec);

    hrText = hrText.toString().padStart(2, "0");
    minText = minText.toString().padStart(2, "0");
    secText = secText.toString().padStart(2, "0");

    return (hrText + ":" + minText + ":" + secText);
}

// Returns the needed names and their completion times from the database in an array while serving the highscore page.
router.get('/highscores', isAuth, async (req, res) => {
    let nameArray = [];
    let timeArray = [];
    let getHighscores = await Highscore.find().sort({completionTime: 'asc'})
    .then((result) => {
        console.log(result);
        for (let i = 0; i < result.length; i++) {
                nameArray.push(result[i].firstName);
                timeArray.push(formatTime(result[i].completionTime));
        };
    })
    res.render(path.resolve('./views/highscores/highscores'), {names: nameArray, times: timeArray});
});

// Highscore post route.
router.post('/highscore', (req, res) => {
    const highscore = new Highscore({
        firstName: req.body.name,
        completionTime: req.body.score
    });
    highscore.save()
        .then((result) => {
            console.log('Highscore saved.');
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;