const hbs = require('handlebars');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// Connect to DB
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.log(err));

const videoRoutes = require('./routes/videoroutes');
const torplay = require('./routes/torplay');
const routes = require('./routes/index');
const users = require('./routes/users');

const nurseryone = require('./routes/nurseryone');
const nurserytwo = require('./routes/nurserytwo');
const nurserythree = require('./routes/nurserythree');
const primary1 = require('./routes/pry1');
const primary2 = require('./routes/pry2');
const primary3 = require('./routes/pry3');
const primary4 = require('./routes/pry4');
const primary5 = require('./routes/pry5');
const junior1 = require('./routes/js1');
const junior2 = require('./routes/js2');
const junior3 = require('./routes/js3');
const senior1 = require('./routes/sss1');
const senior2 = require('./routes/sss2');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts/',
    defaultLayout: 'layout'
}));

app.set('view engine', 'hbs');

// Handlebars helpers
hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

hbs.registerHelper('formatMe', function(txt) {

    txt = path.basename(txt, '.mp4');
    txt = decodeURI(txt);

    return txt.substring(0, 20);

});


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'videos')));


// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.title = "</>Torama Videonet"
    next();
});

// Routes
app.use('/api/videos', videoRoutes);
app.use('/torplay', torplay);

app.use('/', routes);
app.use('/users', users);





app.use('/nurseryone', nurseryone);
app.use('/nurserytwo', nurserytwo);
app.use('/nurserythree', nurserythree);
app.use('/pry1', primary1);
app.use('/pry2', primary2);
app.use('/pry3', primary3);
app.use('/pry4', primary4);
app.use('/pry5', primary5)
app.use('/js1', junior1);
app.use('/js2', junior2);
app.use('/js3', junior3)
app.use('/sss1', senior1)
app.use('/sss2', senior2)



module.exports = app;