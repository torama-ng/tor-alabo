var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);
var walkSync = [];
walkSync = walk.walkSync('jss-1');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('view', {
        videoTitle: 'Junior Secondary School Class One Videos',
        videoFiles: walkSync,
        videoDir: 'jss-1'

    });
});



module.exports = router;