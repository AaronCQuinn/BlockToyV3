const express = require('express');
const path = require('path');
const router = express.Router();
const Users = require('../models/users');
const crypto = require('crypto');
router.use(express.urlencoded());

function validPassword(password, hash, salt) {
        let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        return hash === hashVerify;
};

router.get('/login', (req, res) => {
        res.render(path.resolve('./views/login/login'), {message: req.flash('message')});
});

router.post('/login', async (req, res) => {
    let {username, password} = req.body;
    let checkUser = await Users.findOne({username});
    if (!checkUser) {
            console.log('No username match in database.');
            req.flash('message', "No user matching with that username.");
            res.redirect('/login');
    } else if (checkUser && !validPassword(password, checkUser.hash, checkUser.salt)) {
            console.log("Wrong password entered.");
            req.flash('message', "Wrong login credentials, please try to login again.")
            res.redirect('/login');
        } else {
            req.session.isAuth = "true";
            req.session.username = username;
            console.log("Correct credentials entered, logged in as user: " + username);
            res.redirect('/');
    }
});





module.exports = router;