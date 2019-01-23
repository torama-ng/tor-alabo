var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
var walkSync = [];

walkSync = walk.walkSync('primary-3');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('view', {
        videoTitle: 'Primary Three Videos',
        videoFiles: walkSync,
        videoDir: 'primary-3'

    });
});



module.exports = router;