var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
var walkSync = [];
walkSync = walk.walkSync('sss-1');

console.log(__dirname + '/sss-1');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.render('view', {
        videoTitle: 'Senior Secondary School Class One Videos',
        videoFiles: walkSync,
        videoDir: 'sss-1'

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