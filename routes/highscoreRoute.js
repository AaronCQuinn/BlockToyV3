const express = require('express');
const path = require('path');
const router = express.Router();
const Highscore = require('../models/highscores');
router.use(express.urlencoded());

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/login');
    }
}

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

router.get('/highscores', isAuth, async (req, res) => {
    let getHighscores = await Highscore.find({}).sort({completionTime: 'asc'});
    let nameArray = [];
    let timeArray = [];
       for (let i = 0; i < getHighscores.length; i++) {
            nameArray.push(getHighscores[i].firstName);
            timeArray.push(formatTime(getHighscores[i].completionTime));
       };
    res.render(path.resolve('./views/highscores/highscores'), {names: nameArray, times: timeArray});
});

router.post('/highscore', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.score);
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