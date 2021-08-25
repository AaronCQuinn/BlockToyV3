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
        res.render(path.resolve('./views/login/login'));
});

router.post('/login', async (req, res) => {
    let {username, password} = req.body;

    let checkUser = await Users.findOne({username});

    if (!checkUser) {
            console.log('No username match in database.');
            
    } else if (checkUser && !validPassword(password, checkUser.hash, checkUser.salt)) {
            console.log("Wrong password entered.");
            res.send({
                    message: "Wrong credentials."
            });
    } else {
            req.session.isAuth = "true";
            req.session.username = username;
            console.log("Correct credentials entered, logged in as user: " + username);
            res.redirect('/login');
    }
});





module.exports = router;