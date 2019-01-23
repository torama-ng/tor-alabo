var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);
var walkSync = [];
walkSync = walk.walkSync('primary-2');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('view', {
        videoTitle: 'Primary Two Videos',
        videoFiles: walkSync,
        videoDir: 'primary-2'

    });
});



module.exports = router;