var express = require('express');
var router = express.Router();
var walkSync = [];

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
    const walk = require('../walk.js');
    walkSync = walk.walkSync('sss-2');

    res.render('view', {
        videoTitle: 'Senior Secondary School Class Two Videos',
        videoFiles: walkSync,
        videoDir: 'sss-2'

    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;