var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var multer = require('multer');

var LocalStrategy = require('passport-local').Strategy;
const { getCode, getData } = require('country-list');

var User = require('../models/user');
var student = require('../models/students');


// Register
router.get('/register', /*ensureAuthenticated,*/ function(req, res) {
    res.render('register');
});

// Login
router.get('/login', function(req, res) {
    console.log(req.user);
    res.render('login', {
        userObj: req.user || null,

    });

});

router.get('/listusers', ensureAuthenticated, function(req, res) {
    console.log(req.user);
    User.find({}).sort({ name: 'asc' }).exec((err, users) => {
        console.log(users)
        res.render('userview', {
            users
        });
    })


});

// user edit form
router.get('/userform', function(req, res) {
    id = req.user._id
    countries = getData();
    console.log(countries)
    User.findById(id, function(err, user) {
        if (err) throw err
        console.log(` user for form is ${user}`)
        res.render('useredit', {
            user,
            countries
        });
    })


});

router.get('/details', function(req, res) {
    id = req.user._id;
    User.findById(id, function(err, user) {
        if (err) throw err

        res.render('teachers-data', {
            user,
        });
    })

})


//file upload

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

// Initial the upload variable
const uplaod = multer({
    storage: storage
});




// Update User
router.post('/useredit', uplaod.single('photourl'), ensureAuthenticated, function(req, res, next) {



    User.findById(req.user._id, function(err, user) {
        if (err) throw err

        if (!user) {
            req.flash('error', 'No account found');
            return res.redirect('/users/useredit');
        }


        var street, city, state, zipcode, country, ref_name, ref_email, ref_phone, phone1, phone2, name, username, email, start_date, end_date;
        var school = req.body.school,
            subject = req.body.subject,
            diploma = req.body.diploma,
            date_obtained = req.body.date_obtained;

        var place = req.body.place,
            roles = req.body.roles,
            start_year = req.body.start_year,
            end_year = req.body.end_year;



        var qualifications = {
            school: school,
            subject: subject,
            diploma: diploma,
            date_obtained: date_obtained
        };
        var work_experience = {
            place: place,
            roles: roles,
            start_year: start_year,
            end_year: end_year
        };
        // good idea to trim 
        start_date = req.body.start_date;
        end_date = req.body.end_date;
        var lastname = req.body.lastname.trim();
        if (req.body.email)
            email = req.body.email.trim();
        if (req.body.username)
            username = req.body.username.trim();
        if (req.body.firstname)
            var firstname = req.body.firstname.trim();
        if (req.body.phone1)
            phone1 = req.body.phone1.trim();
        if (req.body.phone2)
            phone2 = req.body.phone2.trim();

        if (req.body.street)
            street = req.body.street.trim()
        if (req.body.city)
            city = req.body.city.trim()
        if (req.body.state)
            state = req.body.state.trim()
        if (req.body.country)
            country = req.body.country.trim()
        if (req.body.zipcode)
            zipcode = req.body.zipcode.trim()
        if (req.body.ref_name)
            ref_name = req.body.ref_name.trim()
        if (req.body.ref_phone)
            ref_phone = req.body.ref_phone.trim()
        if (req.body.ref_email)
            ref_email = req.body.ref_email.trim()

        address = {
            street: street,
            city: city,
            state: state,
            country: country,
            zipcode: zipcode
        };

        if (req.body.ref_name)
            ref_name = req.body.ref_name.trim()
        if (req.body.ref_phone)
            ref_phone = req.body.ref_phone.trim()
        if (req.body.ref_email)
            ref_email = req.body.ref_email.trim()

        reference = {
            name: ref_name,
            phone: ref_phone,
            email: ref_email,
        }




        // no need for else since you are returning early ^
        // user.email = email;  // need to verify that no duplicate emails. Handle later
        // user.local.email = email; 
        user.firstname = firstname;
        user.lastname = lastname;

        user.username = username; // will update this late
        user.email = email;
        user.phone1 = phone1;
        user.phone2 = phone2;
        user.address = address;
        user.reference = reference;
        user.start_date = start_date;
        user.end_date = end_date;

        if (qualifications.school == '' &&
            qualifications.diploma == '' &&
            qualifications.subject == '' &&
            qualifications.date_obtained == '') {
            console.log('empty qualification fields')
        } else {
            user.qualifications.push(qualifications);
        }

        if (work_experience.place == '' &&
            work_experience.roles == '' &&
            work_experience.start_year == '' &&
            work_experience.end_year == '') {
            console.log('Work experience is empty')
        } else {
            user.work_experience.push(work_experience);
        }



        //Check file
        if (req.file == undefined) {
            console.log("No File Selected")
        } else {
            var photo = "/uploads/" + req.file.filename;
            user.photourl = photo;
        }




        // don't forget to save!
        user.save(function(err) {
            if (err) throw err;
            // todo: don't forget to handle err

            res.redirect('/users/listusers');
        });
    });
});
router.get('/students', ensureAuthenticated, function(req, res) {
    res.render('reg-student');
});
// Register User
router.post('/student', ensureAuthenticated, function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('reg-student', {
            errors: errors
        });
    } else {
        //checking for email and username are already taken
        User.findOne({
            username: {
                "$regex": "^" + username + "\\b",
                "$options": "i"
            }
        }, function(err, user) {
            User.findOne({
                email: {
                    "$regex": "^" + email + "\\b",
                    "$options": "i"
                }
            }, function(err, mail) {
                if (user || mail) {
                    res.render('register', {
                        user: user,
                        mail: mail
                    });
                } else {
                    var newUser = new User({
                        name: name,
                        email: email,
                        username: username,
                        password: password
                    });
                    User.createUser(newUser, function(err, user) {
                        if (err) throw err;
                        console.log(user);
                    });
                    req.flash('success_msg', 'Registered student Successfully');
                    res.redirect('/users/login');
                }
            });
        });
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Unknown User' });
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});


// Register User
router.post('/register', /*ensureAuthenticated,*/ function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('firstname', 'First Name is required').notEmpty();
    req.checkBody('lastname', 'Last Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        //checking for email and username are already taken
        User.findOne({
            username: {
                "$regex": "^" + username + "\\b",
                "$options": "i"
            }
        }, function(err, user) {
            User.findOne({
                email: {
                    "$regex": "^" + email + "\\b",
                    "$options": "i"
                }
            }, function(err, mail) {
                if (user || mail) {
                    res.render('register', {
                        user: user,
                        mail: mail
                    });
                } else {
                    var newUser = new User({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        username: username,
                        password: password
                    });
                    User.createUser(newUser, function(err, user) {
                        if (err) throw err;
                        console.log(user);
                    });
                    req.flash('success_msg', 'You are registered and can now login');
                    res.redirect('/users/login');
                }
            });
        });
    }
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/users/register', failureFlash: true }),
    function(req, res) {
        res.redirect('/home');
    });

router.get('/logout', function(req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});

//Student Reg
router.post('/students', ensureAuthenticated, function(req, res) {
    var body = req.body;

    var items = {
        surname: body.surname,
        othername: body.othername,
        email: body.email,
        phone: body.phone,
        class: body.class,
        state: body.state,
        lga: body.lga,
        address: body.address

    }

    if (body.surname) {
        var doc = new student(items);
        doc.save();

        res.render('student_profile', {
            items
        });

    } else {
        res.status(200).send("fill names");
    }

});


// userData.find({ email: req.body.email }, (err, doc) => {
//     if (err) throw err;
//     if (doc) {
//         res.render("forgot_password", {
//             userData: items,
//             error: "User with this email already exists"
//         });
//     } else {
//         var data = new userData(items);
//         data.save();

//         res.render('signedup_view', {
//             username: data.name,
//             password: password,
//         })
//     }
// });            user: ""

// mkdirSync("../public/upload/");
// img upload
// router.post('/student_img', (req, res, next) => {

//     if (req.files) {

//         var file = req.files.image;
//         var name = file.name;
//         id = req.body.id;

//         var filePt = path.join(`../public/upload/${name}`);
//         file.mv(filePt, (err) => {
//             if (err) throw err;
//             console.log('File moved');

//             student.findOneAndUpdate({ _id: id }, ({
//                     $push: { 'profilepic': filePt }
//                 }),
//                 ({ new: false }),
//                 (err, data) => {
//                     if (err) throw err;
//                     res.json(data);


//                 })

//         })

//         console.log(file);
//     } else {
//         res.send('Errorrrrr');
//     }
// });




router.get('/student_profile', ensureAuthenticated, (req, res, next) => {

    student.find({ surname: "Ala" }).limit(0).exec(function(err, data) {
        if (err) throw err;

        console.log(data);

        res.render('student_profile', {
            items: data[0]
        });

    });

})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/courses/listree');
    }
}

module.exports = router;