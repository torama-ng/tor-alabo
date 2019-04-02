const fs = require("fs");
const path = require("path");

const dree = require('dree')
const trim = require('deep-trim-node');
const ThumbnailGenerator = require('video-thumbnail-generator').default;

const videosPath = "../../videos";

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

dirs = fs.readdirSync(videosPath)
let  arr = ar = []
dirs.forEach(doc => {
    const tree = dree.scan(path.join(videosPath, doc), options)
    arr = recursedir (tree)
    //  console.log(arr)

})

function recursedir (tree) {
    if (tree.type == 'file') {
        ar.push(tree.path)
        thumbCreate(tree.path);
    }
    else if (tree.type=='directory') {
        if (tree.children && tree.children.length >0)
        tree.children.forEach( (child) => {
            recursedir(child)
        })
            
    }
    return ar

}

function thumbCreate (mp4file) {
    if (!fs.existsSync(mp4file)) {
        console.log('mp4 file not existing');
        return false;
    }

    tpath = path.join(__dirname, '../images/thumbnail')
    const tg = new ThumbnailGenerator({
        sourcePath: mp4file,
        thumbnailPath: tpath,
        tmpDir: '/tmp' //only required if you can't write to /tmp/ and you need to generate gifs
    });

    tg.generateOneByPercent(02, { size: '615x345' })
    .then((err, result) => {
        if (err) throw err;    
        console.log(tpath);
        return true ;
    })
    .catch((err) => {
        console.log(err);
        throw err;
    })
}
