const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.isAuth) {
        res.render(path.resolve('./views/homepage/index'), {name: req.session.username, auth: true});
    } else {
        res.render(path.resolve('./views/homepage/index'), {name: null, auth: false});
    }
})

module.exports = router;