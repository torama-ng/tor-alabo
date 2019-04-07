const ffmpeg = require('ffmpeg');
const path = require('path');
const fs = require('fs-extra');

const Utilities = require('./utils');


console.log(Utilities);
var vpath = path.join(__dirname, '../../videos')
const dst = ".DS_Store"

let mp4s;  // to store moved files

const tpath = path.join(__dirname, '../images/thumbnail/')
let lent = 0;
console.log(tpath)
const dreeOptions = {
	stat: true,
	normalize: true,
	sizeInBytes: true,
	hash: true,
	size: true,
	isSymbolicLink: true,
	depth: 10,
	exclude: /desc/,
	extensions: ['mp4']
};

let  arr = ar = []
const dir = path.join(__dirname,'../../videos/');
const fileList = [];

filesArr (dir,fileList) // populates ar[]

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

console.log('fileList Array lenght:',fileList.length)
// loop through fileList and create thumbnails
fileList.forEach((file) => {
	let ffmpegFile = Utilities.transformFile(file);

	console.log(ffmpegFile);
	if (ffmpegFile) {
		setTimeout(function(){},3000)
		Utilities.toJpg(ffmpegFile,tpath);
	}

})

