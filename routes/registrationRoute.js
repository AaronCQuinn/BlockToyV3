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
        console.log('Username already exists in database, redirecting to registration page.');
        return res.redirect('registration');
    } 

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
            res.render('./views/registration/registration');
        })
        .catch((err) => {
            console.log('Error registering user to database: ' + err);
        })
});

router.get('/registration', (req, res) => {
    res.render(path.resolve('./views/registration/registration'));
});

module.exports = router;