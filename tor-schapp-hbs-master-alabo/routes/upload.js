var express = require('express');
var router = express.Router();
var path = require('path');
const multer = require('multer');


// Set storage engine
const storages = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + Date.now() +
            path.extname(file.originalname));
    }
});

// Initial the upload variable
const uplaod = multer({
    storage: storages
}).single('userdp');


router.post('/profile', function(req, res, next) {

    uplaod(req, res, (err) => {
        if (err) throw err;
        // console.log(req.file);
        var filePath = "/uploads/" + req.file.filename;
        console.log(filePath);
        res.send('file uploaded');
    });

});

module.exports = router;