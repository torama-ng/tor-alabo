var express = require('express');
var router = express.Router();
var walkSync = [];

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
    const walk = require('../walk.js');
    walkSync = walk.walkSync('primary-4');

    res.render('view', {
        videoTitle: 'Primary Four Videos',
        videoFiles: walkSync,
        videoDir: 'primary-4'

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