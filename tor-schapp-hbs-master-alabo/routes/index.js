var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");
const resize = require('../public/utilities/resizeimage');

const subjectsData = require('../models/subject');
const User = require('../models/user');

const log = (message) => { console.log(message) }
    // const videosPath = path.join(__dirname, '../videos');

// Get Homepage
router.get('/', function(req, res) {


    res.render('home');
});
router.get('/home', ensureAuthenticated, function(req, res) {

    res.render('loggedin');
});


router.get('/file', ensureAuthenticated, function(req, res) {

    res.render('fileupload');
});




// stream Video
router.get('/video', ensureAuthenticated, function(req, res) {
    // this creates a stream that can then be added to html video tag as src.
    // eg. <video id="videoPlayer" controls>
    // <source src="http://localhost:3000/video" type="video/mp4"></video>

    let vpath = req.query.path;

    filename = vpath.substring(vpath.indexOf('videos'))
        // stream file using fs
    const stat = fs.statSync(filename)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        //  console.log('range: ',range)
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1] ?
            parseInt(parts[1], 10) :
            fileSize - 1
        const chunksize = (end - start) + 1
        const file = fs.createReadStream(filename, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
});

// add a document to the DB collection recording the vido click event
router.post('/clicked', ensureAuthenticated, (req, res) => {
    cpath = req.query.cpath;

    const click = {
        path: cpath,
        act_date: new Date()
    };
    console.log(req.user);
    console.log('cpath: ' + cpath);

    User.update({ _id: req.user._id }, { $push: { 'activity': click } },
        function(err, numberAffected, rawResponse) {
            //handle it
            if (err) throw err;
            log('click result:', rawResponse, numberAffected);
        }
    );


});

router.get('/resizeimage', ensureAuthenticated, (req, res, next) => {



})


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;