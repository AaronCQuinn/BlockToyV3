// Required imports.
const express = require('express');
const path = require('path');
const router = express.Router();

// Serves the homepage depending on if the user is authenticated or not.
router.get('/', (req, res) => {
    if (req.session.isAuth) {
        res.render(path.resolve('./views/homepage/index'), {name: req.session.username, auth: true});
    } else {
        res.render(path.resolve('./views/homepage/index'), {name: null, auth: false});
    }
});

module.exports = router;