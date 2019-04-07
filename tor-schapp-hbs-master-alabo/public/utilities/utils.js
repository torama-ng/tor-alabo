const ffmpeg = require('ffmpeg');
const path = require('path');
const fs = require('fs-extra');

var myUtils = new Object();


myUtils.transformFile = function (mp4file) {
    // returns a file that is good for ffmpeg 
    if (path.extname(mp4file) != '.mp4') {
            console.log('file ext not mp4');
            return false;
    }
    if (!fs.existsSync(mp4file)&& mp4file.split('.').pop()!='mp4') {
        console.log('mp4 file not existing');
        return;
    }
    var fname1 = path.basename(mp4file,'.mp4')
    
    var dirname = path.dirname(mp4file)
    var extname = path.extname(mp4file)
    var fname2 = fname1.replace(/[^a-z0-9]/gi, '_')
    // console.log (fname1, fname2);

    mp4s = path.join(dirname,fname2+extname)
    
    // console.log('mp4s ', mp4s)
    // rename mp4file to mp4s
    if (mp4file != mp4s && mp4s)
        fs.renameSync(mp4file,mp4s)

    // console.log(mp4s)
    
    return mp4s;

}

myUtils.toJpg  = function(mp4file,outpath) {
    try {
        console.log('processing:', mp4file)
        if (path.extname(mp4file) != '.mp4') {
            console.log('file ext not mp4');
            return;
        }
        const filename = "'" + path.basename(mp4file,'.mp4') + '-%s' + "'";
        
        const options = {
            frame_rate : 1,
            number : 1,
            size: '300x150',
            file_name : filename
        };
        // console.log(`${filename},${outpath}`);

        var process = new ffmpeg(mp4file);
        process.then(function (video) {
            // Callback mode
            video.fnExtractFrameToJPG(outpath,options,
            function (error, files) {
                if (error)
                    console.log(error)
                else 
                    console.log('Frames: ' );
            });
            
        }, function (err) {
            if (err)
                console.log('Error: ' + err);
        });
    } 
    catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
}

myUtils.removeFromArray =  function (array,el) {
    var index = array.indexOf(el);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

module.exports = myUtils;