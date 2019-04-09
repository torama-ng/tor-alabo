const ffmpeg = require('ffmpeg');
const path = require('path');
const fs = require('fs-extra');

const Utilities = require('./utils');


// console.log(Utilities);

// Set the source video path
var vpath = '../../videos';

// set target thumbnails path
const tpath = '../images/thumbnail/';

const dst = ".DS_Store"   // this file is a pain. Handle it

let mp4s;  // to store moved files

let lent = 0;
// console.log(tpath)

let   ar = []
const dir = path.join(__dirname,'../../videos/');
const fileList = [];

filesArr (dir,fileList) // populates fileList[]

function filesArr (dir,filelist) {
	files = fs.readdirSync(dir);
	files = Utilities.removeFromArray(files,'.DS_Store'); // remove .DS_Store
	filelist = filelist || [];
	files.forEach(function(file) {
    if (fs.statSync(path.join(dir,file)).isDirectory()) {
      filelist = filesArr(path.join(dir,file), filelist);
    }
    else {
      filelist.push(path.join(dir,file));
    	}
  	});
  	return filelist;
}

// console.log('fileList Array lenght:',fileList.length)
// loop through fileList and create thumbnails
fileList.forEach((file) => {
	let ffmpegFile = Utilities.transformFile(file);

	// console.log(ffmpegFile);
	if (ffmpegFile) {
		// setTimeout(function(){},3000)
		Utilities.toJpg(ffmpegFile,tpath);
	}

})

