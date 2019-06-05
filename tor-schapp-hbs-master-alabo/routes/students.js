var express = require('express');
var router = express.Router()
var passport = require('passport');
var Student = require('../models/students');
var path = require('path');
var multer = require('multer');
var LocalStrategy = require('passport-local').Strategy;


// Display student registration form
router.get('/form/register', ensureAuthenticated, (req, res, next) => {
    res.render('reg-student')

});

//Insert Student data in DataBase
router.post('/form/register', ensureAuthenticated, (req, res, next) => {
    var body = req.body;

    var studentData = {
        firstname: body.firstname,
        lastname: body.lastname,
        middlename: body.middlename,
        gender: body.gender,
        dob: body.dob,
        student_class: body.student_class,

        state: body.state,
        lga: body.lga,
        street: body.street,
        city: body.city,

        title: body.title,
        surname: body.surname,
        othername: body.othername,
        email: body.email,
        phone1: body.phone1,
        phone2: body.phone2,


    }

    if (body.surname) {
        var data = new Student(studentData);
        data.save(function(err) {
            if (err) throw err
            res.redirect('/students/studentview')
        });
    } else {
        res.status(200).send("fill names");
    }

});


const storage = multer.diskStorage({
    destination: './public/students',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

// Initial the upload variable
const uplaod = multer({
    storage: storage
});


router.post('/update/:id', ensureAuthenticated, uplaod.single('student_dp'), function(req, res, next) {

    let student = {};
    let body = req.body;
    if (body.lastname) {
        student.lastname = body.lastname;
    }
    if (body.firstname) {
        student.firstname = body.firstname;
    }
    if (body.middlename) {
        student.middlename = body.middlename
    }
    if (body.gender) {
        student.gender = body.gender;
    }
    if (body.dob) {
        student.dob = body.dob
    }
    if (body.student_class) {
        student.student_class = body.student_class
    }
    if (body.state) {
        student.state = body.state
    }
    if (body.lga) {
        student.lga = body.lga
    }
    if (body.street) {
        student.street = body.street
    }
    if (body.city) {
        student.city = body.city
    }
    if (body.title) {
        student.title = body.title
    }
    if (body.surname) {
        student.surname = body.surname
    }
    if (body.othername) {
        student.othername = body.othername
    }
    if (body.phone1) {
        student.phone1 = body.phone1
    }
    if (body.phone2) {
        student.phone2 = body.phone2
    }
    if (body.email) {
        student.email = body.email
    }
    if (body.int1 || body.int2 || body.int3 || body.int4) {
        var student_interests = {
            int1: body.int1,
            int2: body.int2,
            int3: body.int3,
            int4: body.int4
        }
        student.student_interests = student_interests
    }
    //Check file
    if (req.file == undefined) {
        console.log("No File Selected")
    } else {
        var photo = "/students/" + req.file.filename;
        student.student_dp = photo;
    }

    let query = { _id: req.params.id }
    Student.update(query, student, (err) => {
        if (err) throw err
        res.redirect('/students/studentview')
    })

});
router.get('/update/:id', ensureAuthenticated, function(req, res) {
    // id = req.query._id
    //     // countries = getData();
    //     // console.log(countries)
    // let query = req.query
    Student.findById(req.params.id)
        .exec()
        .then(doc => {
            res.render('student_update', {
                confirmation: 'Success',
                stud: doc
            })


        })
        .catch(err => {
            console.log(err)

        });
});



router.get('/profile/:id', ensureAuthenticated, function(req, res) {
    // id = req.query._id
    //     // countries = getData();
    //     // console.log(countries)
    // let query = req.query
    Student.findById(req.params.id)
        .exec()
        .then(doc => {
            dob = doc.dob
            res.render('student_profile', {
                confirmation: 'Success',
                stud: doc,

            })


        })
        .catch(err => {
            console.log(err)

        });
});


//Filter by class
router.get('/profile/filter/:class', ensureAuthenticated, function(req, res) {
    // id = req.query._id
    //     // countries = getData();
    //     // console.log(countries)
    // let query = req.query
    Student.find(req.params.class)
        .exec()
        .then(doc => {
            dob = doc.dob
            res.render('student_profile', {
                confirmation: 'Success',
                stud: doc,

            })


        })
        .catch(err => {
            console.log(err)

        });
});

// Display Students in columns
router.get('/studentview', ensureAuthenticated, (req, res, next) => {

    Student.find({}, (err, data) => {
        if (err) throw err;
        res.render('student-view', { data })
    })
});






// Main Student Profile
router.get('/profile', ensureAuthenticated, (req, res, next) => {

    Student.find({}, (err, data) => {
        if (err) throw err;
        res.render('student-view', { data })
    })
});



// Delete Student from Database
router.get('/delete', (req, res, next) => {
    var id = req.query._id
    Student.findOneAndDelete(id).exec(function(err, result) {
        if (err) throw err;
        res.render('student-view')
    });

});
// Delete student by ID
router.get('/studentview/del', (req, res, next) => {
    let query = req.query
    Student.findByIdAndRemove(query.id)
        .exec()
        .then(data => {
            res.render('student-view')

        })

    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

});

router.get('/filter/:class', ensureAuthenticated, (req, res, next) => {
    let query = { student_class: req.params.class}
    Student.find(query, (err, data) => {
        if (err) throw err;
        res.render('student-view', { data })
    })
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/courses/listree');
    }
}


module.exports = router;