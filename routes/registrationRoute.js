const express = require('express');
const path = require('path');
const router = express.Router();
const userRegistration = require('../models/users');
const crypto = require('crypto');
router.use(express.urlencoded());

function genPassword(password) {
    let salt = crypto.randomBytes(32).toString('hex');
    let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: genHash,
    };
};

router.post('/registration', async (req, res) => {
    const {username, email, password} = req.body;
    let newUser = await userRegistration.findOne({username});

    if (newUser) {
        req.flash('message', "User already exists, please choose a different username.")
        res.redirect('/registration');
    } else {

    let saltHash = genPassword(password);
    let salt = saltHash.salt;
    let hash = saltHash.hash;
    newUser = new userRegistration({
        username: username,
        hash: hash,
        salt: salt,
        email: email
    });

    newUser.save()
        .then((result) =>{
            console.log('New user added to the database.');
            res.redirect('/login');
        })
        .catch((err) => {
            console.log('Error registering user to database: ' + err);
        })
    }
});

router.get('/registration', (req, res) => {
    res.render(path.resolve('./views/registration/registration'), {message: req.flash('message')});
});

module.exports = router;