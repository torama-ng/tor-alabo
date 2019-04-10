/* 
This version uses OS command form of ffmpeg, not nodejs-wrapped
*/
const cmd = require('node-cmd')

const path = require('path');
const fs = require('fs-extra');
const ffmpeg = "/usr/local/bin/ffmpeg";

const Utilities = require('./utils');


const dir = path.join(__dirname,'../../videos');
const fileList = [];

walkDir (dir,fileList) // populates fileList[]

function walkDir (dir,filelist) {
	files = fs.readdirSync(dir);
	files = Utilities.removeFromArray(files,'.DS_Store'); // remove .DS_Store
	filelist = filelist || [];
	files.forEach(function(file) {
    if (fs.statSync(path.join(dir,file)).isDirectory()) {
      filelist = walkDir(path.join(dir,file), filelist);
    }
    else {
      filelist.push(path.join(dir,file));
    	}
  	});
  	return filelist;
}
let ouput_path = "./tmp/";
fileList.forEach((file) => {
    if (path.extname(file) === '.mp4'){ 
        let videoFile = Utilities.transformFile(file);
        fname = path.basename(file,'.mp4');
        thmb = path.join(ouput_path, fname) + '_tn.jpg';
        filter_c = '"scale=iw*sar:ih, pad=max(iw\\,ih*(2/1)):ow/(2/1):(ow-iw)/2:(oh-ih)/2:black"';
        let ffmpegCmd =  "ffmpeg -i " + file +" -r 1 -s 300x150 -ss 2 -aspect 2:1 -vframes 1 -filter_complex "
        ffmpegCmd = ffmpegCmd  + " " + filter_c + " " + thmb;

        // execute the os cmd
        console.log('processing  ',ffmpegCmd);
        cmd.run(ffmpegCmd)
    }

})
