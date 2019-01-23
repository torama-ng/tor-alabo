var express = require('express');
var router = express.Router();
const walk = require('../walk.js');

var walkSync = [];
walkSync = walk.walkSync('jss-3');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.render('view', {
        videoTitle: 'Junior Secondary School Class Three Videos',
        videoFiles: walkSync,
        videoDir: 'jss-3'

    });
});

// Ensure Authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}


module.exports = router;