var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);
var walkSync = [];
walkSync = walk.walkSync('primary-1');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('view', {
        videoTitle: 'Primary One Videos',
        videoFiles: walkSync,
        videoDir: 'primary-1'

    });
});



module.exports = router;