const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
const dree = require('dree')
const trim = require('deep-trim-node');
const ThumbnailGenerator = require('video-thumbnail-generator').default;



const subjectsData = require('../../models/subject');
const subjectsDree = require('../../models/subjectdree');

const videosPath = path.join(__dirname, '../../videos');

const log = (message) => { console.log(message) }


const options = {
    stat: true,
    normalize: true,
    sizeInBytes: false,
    hash: false,
    size: true,
    isSymbolicLink: true,
    depth: 5,
    exclude: /desc/,
    extensions: ['mp4']
};

router.get('/listree', ensureAuthenticated, (req, res, next) => {
    subjectsDree.find({}).sort({ name: 'asc' }).exec((err, children) => {
        if (err) return res.status(404).send('Error Encountered');
        if (children) {

            res.render('listree', {
                title: 'Tree of subjects',
                children,
                count: children.length
            });
        }
    })
})


router.get('/search', ensureAuthenticated, (req, res, next) => {

    var videotitle = req.query.text;
    if (!videotitle) return res.status(404).send('empty search field')
    console.log(videotitle);

    subjectsDree.find({}).sort({ name: 'asc' }).exec((err, data) => {
        if (err) throw err;
        let dpath, vt;

        if (data) {

            // console.log(Array.isArray(data));
            // console.log(data.slice(0,10))
            let q = [];

            function getVal(dat) {
                // dat is our db object
                if (dat.type === 'file') {
                    dpath = dat.path.toLowerCase();
                    vt = videotitle.toLowerCase();

                    if (dpath.includes(vt)) {
                        q.push(dat.path);
                    }

                } else if (dat.type === "directory") {
                    for (var k = 0; k < dat.children.length; k++) {
                        getVal(dat.children[k])
                    }

                }
                return q;
            }

            qq = qs = []

            data.forEach((doc) => {
                q = [];
                qq.push(...getVal(doc))

            })
            qs = qq.slice(0, 10);

            console.log('qs ', qs)




            res.render('search', {
                title: `Search results for `,
                children: qs,
                text: videotitle,
                count: qs.length,
                // pagination: {
                //     page: 4,
                //     pageCount: qs.length
                // }
            });
        } else {
            console.log(' no data from DB ...................');
            return res.status('404').send('No data found in search')
        }
    })
})

router.post('/play', ensureAuthenticated, (req, res, next) => {
    let categName;
    let vsplit = [];
    let vpath = req.body.path;
    // we can get the dree of the path element

    if (vpath) {
        vsplit = vpath.split('/');
        categName = vsplit[vsplit.length - 2]; // extract subject name
        filename = vsplit[vsplit.length - 1];
        let basepath = path.dirname(vpath); // we can then dree basepath and return its children into an arrary
        if (!basepath) { return res.status(404).send(`${basepath} folder not exists`); }
        filename = path.basename(vpath);
        log(`filename is ${filename} basepath is ${basepath}`);

        tree = dree.scan(basepath, options)
        tree.children.splice(tree.children.findIndex(v => v.path === vpath), 1); //remove this path from children
        tree.children.splice(tree.children.findIndex(v => v.path.split('.').includes('mp4') == false), 3); //remove path not having mp4 from children

    } else return res.status(404).send('vpath not good')


    let filename2 = path.basename(filename, '.mp4')

    res.render('playview', {
        title: categName,
        filename,
        filename2,
        vpath,
        files: tree.children

    });


})


router.post('/walkdel', ensureAuthenticated, (req, res, next) => {

    // if (process.env.PLATFORM != "PROD"){
    //     return res.send('This is not PROD environment. Data is not deleted');
    // }
    subjectsDree.deleteMany({}, (err, result) => {

        })
        .then(() => {
            res.redirect('/courses/listree');
            // return res.send(' All subjectsdree  deleted');
        })
        .catch((err) => {
            return res.status(500).send(`${err} Error in dree Data delete`);
        })
})


// recursive walk down videospath and load
router.post('/treeload', ensureAuthenticated, (req, res, next) => {


    dirs = fs.readdirSync(videosPath)
        // if (process.env.PLATFORM !="PROD") {
        //     return res.send('Wrong platform')
        // }

    //read data from db

    // data insert
    dirs.forEach(doc => {
        const tree = dree.scan(path.join(videosPath, doc), options);
        // inject a boolean file 

        let subjectd = new subjectsDree({
            name: tree.name.trim(),
            type: tree.type.trim(),
            path: tree.path.trim(),

            children: trim(tree.children)
        });

        subjectd.save()
            .then(() => {
                console.log(`${doc} tree saved in db`);

            })
            .catch((err) => {
                console.log(err);

            })

    })
    res.redirect('/courses/listree');

})

router.get('/videothumb', ensureAuthenticated, (req, res, next) => {
    // create video thumbnail of given video
    mp4file = req.query.v;
    if (!fs.existsSync(mp4file)) {
        res.status(404).send('mp4 file not existing');
    }

    tpath = path.join(__dirname, '../../public/images/thumbnail')
    const tg = new ThumbnailGenerator({
        sourcePath: mp4file,
        thumbnailPath: tpath,
        tmpDir: '/tmp' //only required if you can't write to /tmp/ and you need to generate gifs
    });

    tg.generateOneByPercent(02, { size: '615x345' })
        .then((err, result) => {
            if (err) throw err;
            log(result);
            return true;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
})






// find and display one subject by name - eg
router.get('/:name', ensureAuthenticated, (req, res, next) => {

    subject = req.params.name;

    subjectsData.findOne({ name: subject }, (err, doc) => {
        if (err) error = 'Error Encountered in model findOnes';
        else if (doc) {
            // sort courses

            courses = doc.courses;
            count = courses.length;
            /*
            var mapped = courses.map(function(el, i) {
                return { index: i, value: el.filename.toLowerCase() };
              })
            */
            // console.log(`before sort ${courses}`)
            sorted_courses = courses.sort((a, b) => {
                return a.toString().localeCompare(b)
            })


            sorted_courses = courses.sort(
                (a, b) => {
                    if (a.filename < b.filename) {
                        return -1;
                    }
                    if (a.filename > b.filename) {
                        return 1;
                    }

                    return 0;
                }
            );
            if (sorted_courses != courses) {
                console.log('there is diff')
            } else {
                console.log('no diff')
            }

            category = subject;

            res.render('search', {
                title: 'Course Category',
                category,
                result: sorted_courses,
                count
            });
        }
    })
})

// list courses under a subject
router.get('/:subject/:course', ensureAuthenticated, (req, res, next) => {
    subject = req.params.subject;
    course = req.params.course;
    let result = [];
    subjectsData.findOne({ name: subject }, (err, doc) => {
        if (err) error = 'Error Encountered in model findOnes';
        else if (doc) {
            doc.courses.forEach(cs => {
                if ((cs.filename).toLowerCase().indexOf(course.toLowerCase()) > 0) {
                    //  res.send('Result found');
                    result.push(cs.filename);
                }
            });

            count = result.length;
            res.render('search', {
                title: 'Search Result',
                result: result,
                count
            });
        }

    })
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