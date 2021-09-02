// Required imports.
const express = require('express');
const path = require('path');
const router = express.Router();
const Users = require('../models/users');
const crypto = require('crypto');
router.use(express.urlencoded());

// Checks if hashed password is valid.
function validPassword(password, hash, salt) {
        let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        return hash === hashVerify;
};

// Serves the homepage.
router.get('/login', (req, res) => {
        res.render(path.resolve('./views/login/login'), {message: req.flash('message')});
});

// Post route to login, which inclued authentication check.
router.post('/login', async (req, res) => {
    let {username, password} = req.body;
    let checkUser = await Users.findOne({username});
    if (!checkUser) {
            // If user doesn't exist, redirect to the login page with related message.
            req.flash('message', "No user matching with that username.");
            res.redirect('/login');
    } else if (checkUser && !validPassword(password, checkUser.hash, checkUser.salt)) {
            // If password isn't correct, redirect to the login page with related message.
            req.flash('message', "Wrong login credentials, please try to login again.")
            res.redirect('/login');
    } else {
        // Successful login marks session as auth, and puts username on session for use in homepage EJS.
        req.session.isAuth = "true";
        req.session.username = username;
        res.redirect('/');
    }
});

module.exports = router;