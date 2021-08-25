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

router.get('/highscores', isAuth, async (req, res) => {
    let getHighscores = await Highscore.find({});
    let nameArray = [];
    let timeArray = [];
       for (let i = 0; i < getHighscores.length; i++) {
            nameArray.push(getHighscores[i].firstName);
            timeArray.push(getHighscores[i].completionTime);
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
            res.send(result);
            console.log('Highscore saved.');
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;